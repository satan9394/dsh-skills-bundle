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

> 共 206 个可安装插件（另有 `_template` 开发模板），按 12 类整理。

### 工程方法论 (32)
`agent-teams` · `code-reviewer` · `code-simplify` · `codebase-design` · `context-engineering` · `debug-recovery` · `deprecation` · `distributed-debugging` · `docs-adr` · `domain-modeling` · `doubt-driven-dev` · `error-handling` · `framework-migration` · `grill-me` · `idea-refine` · `incremental` · `issue-triage` · `karpathy-methodology` · `merge-conflicts` · `parallel-dev` · `ponytail-dev` · `postmortem` · `refactoring-guide` · `shipping` · `source-driven` · `spec-driven` · `superpowers-essentials` · `tdd` · `tech-debt` · `track-driven-dev` · `unit-test-author` · `workflow-loop`

### API & 架构 (20)
`api-design` · `api-designer` · `api-documentation` · `api-scaffolding` · `architecture` · `cicd` · `cloud-well-architected` · `database-design` · `db-migration` · `event-driven-architecture` · `git-guardrails` · `git-workflow` · `gitops` · `kubernetes-operations` · `microservices` · `monorepo` · `service-mesh` · `sql-optimization` · `sql-optimizer` · `terraform`

### 前端 & UI (19)
`a11y-audit` · `better-interface` · `brand-design` · `brand-landingpage` · `canvas-design` · `css-art-styles` · `diagram-design` · `frontend-design` · `frontend-engineering` · `frontend-mobile` · `frontend-slides` · `hallmark-design` · `html-ppt` · `html-template-library` · `pptx-engineering` · `screenshot-to-code` · `web-artifacts` · `web-clone` · `web-scripting`

### 后端 & DevOps (20)
`auth` · `bash-scripting` · `bash-testing` · `bazel-build-optimization` · `blockchain-web3` · `cloud-cost-optimization` · `dotnet-backend` · `full-stack-orchestration` · `functional-programming` · `hybrid-cloud` · `javascript-typescript` · `multi-cloud` · `observability` · `observability-tools` · `payment-processing` · `performance` · `python-development` · `runbook` · `slo` · `systems-programming`

### AI & ML (17)
`agent-loop-engineering` · `ai-image-design` · `autonomous-research` · `dataset-curation` · `llm-api-integration` · `llm-eval` · `llm-finetuning` · `mlops` · `parallel-agent-ade` · `prompt-audit` · `prompt-engineering` · `rag` · `review-agent-governance` · `self-improving-agent` · `skill-optimization` · `vector-search` · `virtual-eng-team`

### 安全 & 合规 (10)
`contract-review` · `hr-legal-compliance` · `pci-compliance` · `reverse-engineering` · `sast-security` · `security-compliance` · `security-hardening` · `security-requirements` · `signed-audit-trails` · `threat-modeling`

### 写作 & 沟通 (16)
`changelog` · `commit-message` · `content-distillation` · `content-marketing` · `doc-coauthoring` · `doc-compiled-skills` · `document-generation` · `internal-comms` · `social-publishing` · `teach` · `technical-writer` · `writing-beats` · `writing-for-agents` · `writing-fragments` · `writing-shape` · `x-twitter-research`

### 测试 (7)
`before-you-build` · `browser-testing` · `code-review` · `deployment-validation` · `e2e-testing` · `test-desktop-app` · `webapp-testing`

### 数据 & 分析 (10)
`academic-research` · `cad-modeling` · `data-engineering` · `data-quality` · `data-storytelling` · `game-development` · `investment-research` · `quant-backtest` · `recsys-pipeline` · `scientific-research`

### 产品 & 设计 (15)
`algorithmic-art` · `brand-guidelines` · `designmd` · `gif-creator` · `kpi-dashboard-design` · `marketing-growth` · `operating-kit` · `planning` · `planning-files` · `ppt-creator` · `project-planner` · `prototype` · `startup-business-analyst` · `taste-review` · `theme-factory`

### 效率 & 工具 (29)
`adhd-friendly` · `agent-reach` · `boss-agent-cli` · `caveman-speak` · `channel-assistant` · `cli-anything` · `codebase-scanner` · `desktop-agent-gui` · `file-conversion` · `handoff` · `harness-os` · `knowledge-brain` · `last30days` · `live-docs` · `mcp-builder` · `meeting-minutes` · `model-gateway` · `obsidian-vault` · `office-cli` · `pdf-processing` · `persistent-memory` · `plugin-eval` · `repo-graphify` · `sales-automation` · `setup-wizard` · `skill-creator` · `skill-seekers` · `to-questionnaire` · `wayfinder`

### 生活 & 趣味 (11)
`career-ops` · `colleague-creation` · `discernment-nudge` · `geo-seo` · `hot-trends` · `humanizer-zh` · `opinion-analysis` · `personal-content-discovery` · `relationship-coach` · `social-simulation` · `swarm-prediction`


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

