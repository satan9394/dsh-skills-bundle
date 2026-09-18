#!/usr/bin/env node
// scripts/validate-all.mjs — full-repo validator for DSH skill plugins.
//
// Scans every directory under plugins/ (except _template and dot-dirs) and
// checks that each one follows the documented plugin layout. Built with Node
// built-ins only: this repo intentionally has zero dependencies.
//
// Usage:
//   node scripts/validate-all.mjs          # human-readable report
//   node scripts/validate-all.mjs --json   # machine-readable report

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, basename, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const PLUGINS_DIR = join(ROOT, 'plugins')

const REQUIRED_FILES = ['package.json', 'README.md', 'cordis.patch.yml']
// index.js is optional per README ("插件入口（可选）").
const OPTIONAL_FILES = ['index.js']

const asJson = process.argv.includes('--json')

/** Read a file, returning null when missing/unreadable. */
function readMaybe(file) {
  try {
    return readFileSync(file, 'utf8')
  } catch {
    return null
  }
}

/** Leading `---` YAML frontmatter block, if any. */
function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/)
  return match ? match[1] : null
}

function listDirs(dir) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== '_template')
    .map((e) => e.name)
    .sort()
}

/** Collect SKILL.md definitions for a plugin: canonical + non-standard roots. */
function collectSkills(pluginDir) {
  const canonical = []
  const alternate = []

  const skillsDir = join(pluginDir, 'skills')
  let skillSubdirs = []
  try {
    skillSubdirs = readdirSync(skillsDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
      .map((e) => e.name)
      .sort()
  } catch {
    /* no skills/ dir */
  }

  for (const sub of skillSubdirs) {
    const file = join(skillsDir, sub, 'SKILL.md')
    if (readMaybe(file) !== null) {
      canonical.push({ file, skill: sub })
    }
  }

  // Enumerate real directory entries so case-insensitive filesystems (Windows)
  // do not alias "SKILL.md" and "skill.md" to the same file.
  let rootEntries = []
  try {
    rootEntries = readdirSync(pluginDir).filter((n) => n === 'SKILL.md' || n === 'skill.md')
  } catch {
    /* unreadable plugin dir */
  }
  for (const name of rootEntries) {
    alternate.push({ file: join(pluginDir, name), skill: basename(name, '.md') })
  }

  return { canonical, alternate }
}

/** Category declared anywhere in package.json (conventions differ across plugins). */
function pluginCategory(pkg) {
  return (
    pkg?.dsh?.plugin?.category ??
    pkg?.dsh?.marketplace?.category ??
    pkg?.metadata?.category ??
    null
  )
}

function validatePlugin(name) {
  const dir = join(PLUGINS_DIR, name)
  const errors = []
  const warnings = []

  for (const file of REQUIRED_FILES) {
    const raw = readMaybe(join(dir, file))
    if (raw === null) errors.push(`missing required file "${file}"`)
    else if (raw.trim().length === 0) errors.push(`required file "${file}" is empty`)
  }

  for (const file of OPTIONAL_FILES) {
    const raw = readMaybe(join(dir, file))
    if (raw === null) warnings.push(`optional file "${file}" is absent (README marks it optional)`)
    else if (raw.trim().length === 0) errors.push(`file "${file}" exists but is empty`)
  }

  let pkg = null
  const pkgRaw = readMaybe(join(dir, 'package.json'))
  if (pkgRaw !== null) {
    try {
      pkg = JSON.parse(pkgRaw)
    } catch (err) {
      errors.push(`package.json is not valid JSON: ${err.message}`)
    }
  }
  if (pkg && typeof pkg === 'object') {
    if (typeof pkg.name !== 'string' || pkg.name.trim() === '') {
      errors.push('package.json is missing a non-empty "name"')
    } else if (pkg.name !== name) {
      const related = pkg.name.includes(name) || name.includes(pkg.name)
      warnings.push(
        related
          ? `package.json name "${pkg.name}" differs from directory "${name}" (plausibly related)`
          : `package.json name "${pkg.name}" differs from directory "${name}"`,
      )
    }
    if (typeof pkg.version !== 'string' || pkg.version.trim() === '') {
      errors.push('package.json is missing a non-empty "version"')
    }
  }

  const { canonical, alternate } = collectSkills(dir)
  const skills = [...canonical, ...alternate]

  if (canonical.length === 0 && alternate.length > 0) {
    warnings.push(
      `skill defined at non-standard location "${relative(dir, alternate[0].file)}" ` +
        '(canonical layout is "skills/<skill-name>/SKILL.md")',
    )
  }
  if (skills.length === 0) {
    const category = pluginCategory(pkg)
    if (category === 'mcp') {
      warnings.push('no SKILL.md (declared category "mcp" — MCP bridge, skill not expected)')
    } else {
      errors.push('no SKILL.md found (expected skills/<skill-name>/SKILL.md)')
    }
  }

  for (const { file } of skills) {
    const raw = readMaybe(file)
    const rel = relative(ROOT, file).split(sep).join('/')
    if (raw === null || raw.trim().length === 0) {
      errors.push(`${rel} is empty`)
      continue
    }
    const fm = frontmatter(raw)
    if (fm === null) {
      errors.push(`${rel} is missing YAML frontmatter (leading "---" block)`)
      continue
    }
    if (fm.trim().length === 0) {
      errors.push(`${rel} has empty YAML frontmatter`)
      continue
    }
    if (!/^name:\s*\S/m.test(fm)) warnings.push(`${rel} frontmatter has no "name" field`)
    if (!/^description:\s*\S/m.test(fm)) warnings.push(`${rel} frontmatter has no "description" field`)
  }

  return { name, errors, warnings, skills: skills.length }
}

function main() {
  const pluginNames = listDirs(PLUGINS_DIR)
  const results = pluginNames.map(validatePlugin)

  const failed = results.filter((r) => r.errors.length > 0)
  const warned = results.filter((r) => r.errors.length === 0 && r.warnings.length > 0)

  const report = {
    plugins: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
    warned: warned.length,
    results,
  }

  if (asJson) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n')
    process.exit(failed.length > 0 ? 1 : 0)
  }

  const out = []
  out.push('DSH Skills Bundle — plugin validation')
  out.push(`Scanned: ${report.plugins} plugins (plugins/*, excluding _template)`)
  out.push(`Passed:  ${report.passed}`)
  out.push(`Failed:  ${report.failed}`)
  out.push(`Warnings: ${report.warned}`)

  if (failed.length > 0) {
    out.push('')
    out.push('FAILURES')
    for (const r of failed) {
      out.push(`  ${r.name}`)
      for (const e of r.errors) out.push(`    - ${e}`)
      for (const w of r.warnings) out.push(`    ~ ${w}`)
    }
  }

  if (warned.length > 0) {
    out.push('')
    out.push('WARNINGS (non-fatal)')
    for (const r of warned) {
      out.push(`  ${r.name}`)
      for (const w of r.warnings) out.push(`    ~ ${w}`)
    }
  }

  out.push('')
  out.push(
    failed.length > 0
      ? `RESULT: FAIL — ${failed.length} plugin(s) with errors`
      : `RESULT: PASS — all ${report.plugins} plugins valid`,
  )

  process.stdout.write(out.join('\n') + '\n')
  process.exit(failed.length > 0 ? 1 : 0)
}

main()
