---
name: code-reviewer
description: >
  Use this skill when the user asks to "review this PR", "review my diff",
  "code review", "look over these changes", "check this code before merge",
  "find bugs in this change", or pastes a diff/patch and wants feedback.
  Applies to git diffs, GitHub/GitLab PRs, staged changes, or a set of
  changed files in any language.
license: MIT
---

# Code Reviewer

## Overview
This skill performs a thorough, structured code review of a change set (a diff, a pull request, staged changes, or a list of modified files). It surfaces correctness bugs, security vulnerabilities, and quality/maintainability issues, ranks every finding by severity, and gives an actionable fix for each one.

## Workflow
1. Gather the change set (gh pr diff, git diff, etc.)
2. Understand intent before judging (read PR description/commit messages)
3. Build minimal context (function signatures, types, tests)
4. Pass over the diff with three lenses: Correctness → Security → Quality/maintainability
5. Rank every finding by severity (Critical → High → Medium → Low → Nit)
6. Write the report with severity, category, file:line, summary, why it matters, suggested fix
7. Verdict: Approve / Approve with nits / Request changes / Block

## Severity Rubric
- **Critical**: data loss, security breach, production outage
- **High**: correctness bug under realistic conditions
- **Medium**: bug under uncommon conditions, maintainability problem
- **Low**: style, naming, minor improvements
- **Nit**: cosmetic, optional

## Report Format

```markdown
# Code Review Report

**PR/Diff**: [title or description]
**Verdict**: [Approve / Approve with nits / Request changes / Block]
**Summary**: [one-line overview of findings]

---

## Findings

### [CRITICAL/HIGH/MEDIUM/LOW/NIT] [Category]

**File**: `path/to/file.ts:line`
**Summary**: [short description]
**Why it matters**: [impact explanation]
**Suggested fix**:
```code
// corrected code
```

---
```

## Review Categories

- **Correctness**: Logic errors, off-by-one, null dereferences, race conditions
- **Security**: Injection, auth bypass, data exposure, unsafe deserialization
- **Quality**: Readability, duplication, dead code, missing error handling
- **Performance**: N+1 queries, unnecessary allocations, blocking operations
- **Testing**: Missing coverage, weak assertions, flaky patterns

## Examples

When reviewing a PR:
1. Start with the PR description to understand intent
2. Use `git diff main...HEAD` or `gh pr diff <number>`
3. Apply the three-lens approach
4. Generate the structured report
5. Deliver verdict with actionable feedback

When reviewing staged changes:
1. Use `git diff --cached`
2. Apply same review process
3. Focus on completeness and correctness

When reviewing a diff/patch:
1. Parse the provided diff
2. Identify changed files and context
3. Apply review lenses
4. Report findings with line references
