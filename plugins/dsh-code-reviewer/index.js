// dsh-code-reviewer — code review skill provider for DeepSeek Harness
//
// Registers the code-reviewer skill on ctx.skills so the agent can load it
// on demand via the `skill` tool (rc.2-compatible: declares `inject: ['skills']`).

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'code-reviewer'
export const inject = ['skills']

const SKILL_PATH = join(dirname(fileURLToPath(import.meta.url)), 'skills', 'code-reviewer', 'SKILL.md')
const SKILL_CONTENT = readFileSync(SKILL_PATH, 'utf8')

// Extract `description` from the YAML frontmatter (best-effort).
function parseDescription(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fm) return ''
  const block = fm[1]
  const desc = block.match(/^description:\s*(?:>\s*\n)?([\s\S]*?)(?=^\w+:|$)/m)
  if (!desc) return ''
  return desc[1]
    .split('\n')
    .map((line) => line.replace(/^\s+/, ''))
    .join(' ')
    .trim()
}

const SKILL_DESCRIPTION =
  parseDescription(SKILL_CONTENT) ||
  'Perform a thorough, structured code review of a change set (diff, PR, staged changes) and surface correctness bugs, security vulnerabilities, and quality issues ranked by severity.'

export function apply(ctx, config = {}) {
  ctx.skills.register({
    name: 'code-reviewer',
    description: SKILL_DESCRIPTION,
    content: SKILL_CONTENT,
    invocation: { modelInvocable: true, userInvocable: true },
    provider: 'dsh-code-reviewer',
  })
}