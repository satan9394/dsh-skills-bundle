# DSH Skills Bundle

> 207 个 DSH skill 插件合集 — 一个仓库搞定 DeepSeek Harness 技能库

[![dsh-plugin](https://img.shields.io/badge/DSH-Plugin-blue)](https://github.com/topics/dsh-plugin)
[![npm](https://img.shields.io/npm/v/dsh-skills-bundle)](https://www.npmjs.com/package/dsh-skills-bundle)

## 快速安装

```bash
# 安装单个插件
dsh plugin --profile web add github:satan9394/dsh-skills-bundle#path:plugins/dsh-code-reviewer

# 或克隆后本地安装
git clone https://github.com/satan9394/dsh-skills-bundle.git
cd dsh-skills-bundle
dsh plugin --profile web add ./plugins/dsh-code-reviewer
```

## 插件分类

### 工程方法论 (30+)
`tdd` · `refactoring-guide` · `code-reviewer` · `unit-test-author` · `systematic-debugging` · `brainstorming` · `writing-plans` · `executing-plans` · `subagent-driven-development` · `verification-before-completion` · `requesting-code-review` · `receiving-code-review` · `using-git-worktrees` · `finishing-a-development-branch` · `writing-skills` · `ponytail-dev` · `karpathy-methodology` · `superpowers-essentials` · `doubt-driven-dev` · `context-engineering` · `domain-modeling` · `codebase-design` · `spec-driven` · `incremental` · `idea-refine` · `shipping` · `source-driven` · `code-simplify` · `debug-recovery` · `docs-adr`

### API & 架构 (20+)
`api-designer` · `api-design` · `api-documentation` · `api-scaffolding` · `architecture` · `microservices` · `event-driven-architecture` · `service-mesh` · `db-migration` · `database-design` · `sql-optimizer` · `sql-optimization` · `monorepo` · `terraform` · `kubernetes-operations` · `gitops` · `cicd` · `git-workflow` · `git-guardrails` · `gitops`

### 前端 & UI (15+)
`frontend-design` · `frontend-engineering` · `frontend-mobile` · `web-clone` · `web-artifacts` · `html-template-library` · `html-ppt` · `frontend-slides` · `pptx-engineering` · `canvas-design` · `css-art-styles` · `diagram-design` · `screenshot-to-code` · `a11y-audit` · `better-interface` · `hallmark-design` · `brand-design` · `brand-landingpage`

### 后端 & DevOps (15+)
`python-development` · `javascript-typescript` · `dotnet-backend` · `systems-programming` · `functional-programming` · `bash-scripting` · `bash-testing` · `dockerfile-pro` · `kubernetes-operations` · `cloud-cost-optimization` · `hybrid-cloud` · `multi-cloud` · `bazel-build-optimization` · `payment-processing` · `auth`

### AI & ML (10+)
`llm-eval` · `llm-finetuning` · `llm-api-integration` · `mlops` · `rag` · `prompt-engineering` · `prompt-audit` · `dataset-curation` · `vector-search` · `ai-image-design` · `self-improving-agent` · `autonomous-research` · `skill-optimization`

### 安全 & 合规 (10+)
`security-hardening` · `security-compliance` · `security-requirements` · `sast-security` · `threat-modeling` · `a11y-audit` · `pci-compliance` · `hr-legal-compliance` · `reverse-engineering` · `signed-audit-trails`

### 写作 & 沟通 (15+)
`technical-writer` · `writing-for-agents` · `writing-shape` · `writing-beats` · `writing-fragments` · `internal-comms` · `doc-coauthoring` · `document-generation` · `changelog` · `commit-message` · `content-distillation` · `content-marketing` · `social-publishing` · `x-twitter-research`

### 测试 (10+)
`unit-test-author` · `webapp-testing` · `browser-testing` · `e2e-testing` · `test-driven-development` · `recsys-pipeline` · `deployment-validation` · `before-you-build`

### 数据 & 分析 (10+)
`data-engineering` · `data-quality` · `data-storytelling` · `scientific-research` · `academic-research` · `investment-research` · `recsys-pipeline` · `cad-modeling` · `game-development`

### 产品 & 设计 (10+)
`project-planner` · `planning` · `planning-files` · `kpi-dashboard-design` · `designmd` · `ppt-creator` · `brand-guidelines` · `theme-factory` · `algorithmic-art` · `gif-creator`

### 效率 & 工具 (15+)
`handoff` · `context-engineering` · `persistent-memory` · `caveman-speak` · `adhd-friendly` · `last30days` · `live-docs` · `obsidian-vault` · `knowledge-brain` · `repo-graphify` · `skill-seekers` · `cli-anything` · `office-cli` · `desktop-agent-gui` · `model-gateway` · `boss-agent-cli`

### 生活 & 趣味 (10+)
`relationship-coach` · `career-ops` · `humanizer-zh` · `investment-research` · `colleague-creation` · `swarm-prediction` · `social-simulation` · `opinion-analysis` · `geo-seo` · `brand-design`

## 目录结构

```
dsh-skills-bundle/
├── package.json          # Monorepo 配置
├── README.md             # 本文件
├── plugins/              # 所有插件
│   ├── dsh-code-reviewer/
│   │   ├── package.json
│   │   ├── cordis.patch.yml
│   │   ├── index.js
│   │   ├── skills/code-reviewer/SKILL.md
│   │   └── README.md
│   ├── dsh-unit-test-author/
│   └── ... (207 个插件)
└── scripts/
    └── validate-all.mjs  # 全量校验脚本
```

## 每个插件的标准结构

```
dsh-<name>/
├── package.json          # dsh.bundle 声明
├── cordis.patch.yml      # 组合层注册
├── index.js              # 插件入口（可选）
├── skills/<name>/SKILL.md # 技能定义
└── README.md             # 说明文档
```

## 安装方式

### 方式 1：从 npm 安装单个插件
```bash
dsh plugin --profile web add dsh-<name>
```

### 方式 2：从 GitHub 安装单个插件
```bash
dsh plugin --profile web add github:satan9394/dsh-skills-bundle#path:plugins/dsh-<name>
```

### 方式 3：克隆仓库批量安装
```bash
git clone https://github.com/satan9394/dsh-skills-bundle.git
cd dsh-skills-bundle/plugins
for dir in dsh-*/; do
  dsh plugin --profile web add "./$dir"
done
```

## 开发

### 校验所有插件
```bash
node scripts/validate-all.mjs
```

### 添加新插件
1. 复制 `plugins/_template/` 目录
2. 修改所有 `dsh-<template>` 为 `dsh-<new-name>`
3. 编写 `skills/<new-name>/SKILL.md`
4. 运行校验脚本确认通过

## 许可证

MIT License — 各插件保留其原始许可证

## 相关链接

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [DSH Plugin Topic](https://github.com/topics/dsh-plugin)
- [Awesome DeepSeek Harness](https://github.com/Dominic789654/awesome-deepseek-harness)

