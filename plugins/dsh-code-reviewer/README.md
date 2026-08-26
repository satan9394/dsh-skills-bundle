# dsh-code-reviewer

代码审查技能插件 | Code Review Skill Plugin

## 功能简介

为 DeepSeek Harness 提供专业的代码审查能力，支持审查 git diff、GitHub/GitLab PR、暂存更改或任何语言的变更集。

### 支持的审查类型
- 正确性缺陷（逻辑错误、空指针、竞态条件）
- 安全漏洞（注入、认证绕过、数据泄露）
- 质量问题（可读性、重复代码、死代码）
- 性能问题（N+1 查询、不必要的内存分配）
- 测试覆盖（缺失覆盖、弱断言）

### 审查流程
1. 收集变更集（gh pr diff、git diff 等）
2. 理解意图（阅读 PR 描述/提交信息）
3. 构建上下文（函数签名、类型、测试）
4. 三重透镜审查：正确性 → 安全性 → 质量/可维护性
5. 按严重等级排序发现（Critical → High → Medium → Low → Nit）
6. 生成结构化报告
7. 给出结论：批准 / 批准但有建议 / 请求修改 / 阻止

## 安装

### 从本地路径安装

```bash
cd E:\DeepSeek_Harness\plugins\dsh-code-reviewer
dsh plugin --profile web add .
```

### 从 git 仓库安装

```bash
dsh plugin --profile web add "github:your-username/dsh-code-reviewer#main"
```

## 使用方法

安装后，技能会自动注入到系统提示中。当用户提到以下关键词时自动触发：

- "review this PR"
- "review my diff"
- "code review"
- "look over these changes"
- "check this code before merge"
- "find bugs in this change"

### 手动调用

```bash
# 审查当前 PR
dsh run code-reviewer -- "审查当前 PR"

# 审查暂存的更改
dsh run code-reviewer -- "审查 git diff --cached"
```

## 审查报告示例

```
# Code Review Report

**PR/Diff**: Add user authentication
**Verdict**: Request changes
**Summary**: Found 1 critical security issue and 2 medium correctness bugs

---

## Findings

### [CRITICAL] Security

**File**: `src/auth/login.ts:42`
**Summary**: SQL injection vulnerability in login query
**Why it matters**: Attackers can bypass authentication or extract database contents
**Suggested fix**:
```typescript
// Before (vulnerable)
const query = `SELECT * FROM users WHERE username = '${username}'`

// After (safe)
const query = 'SELECT * FROM users WHERE username = ?'
db.query(query, [username])
```
```

## 卸载

```bash
dsh plugin --profile web remove dsh-code-reviewer
```

## 许可证

MIT License
