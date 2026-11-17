# 贡献指南

感谢你愿意为 **dsh-skills-bundle** 添加或修订技能插件。

## 项目形态

DSH（DeepSeek Harness）技能插件集合仓，一个 monorepo 打包 200+ 个可按需安装的技能插件。

技术栈：Node（npm workspaces），每个插件位于 `plugins/<name>/`，`scripts/validate-all.mjs` 负责结构校验。

## 本地校验

```bash
git clone https://github.com/satan9394/dsh-skills-bundle.git
cd dsh-skills-bundle
npm install
npm run lint
npm run stats
```

新增插件请从 `_template` 复制，保持 `plugin.json` / `SKILL.md` 的字段完整；只加文件不更新索引会被 lint 拦下。

## 新增一个插件

1. 从 `plugins/_template` 复制目录，改成 kebab-case 名称。
2. 补齐 `plugin.json`、`SKILL.md` 与必要脚本；描述写「什么时候用」，不要写营销文案。
3. 跑 `npm run lint`，确保索引与元数据同步。
4. 一个 PR 只加一个插件（或一组强相关插件），便于逐个体检。

## 工作流

1. 新插件或行为变更先开 Issue。
2. 从 `master` 切分支（`feat/<plugin>`、`fix/<plugin>`）。
3. 提交信息用 Conventional Commits。
4. PR 里贴 `npm run lint` 的结果。

## 约定

- 插件必须自包含：不假设用户装了别的插件。
- 不在技能里写死个人路径、内部仓库地址或真实凭证。
- 引用的外部工具要写清安装方式与失败时的退化行为。

## 安全

发现漏洞请不要开公开 Issue，按 [SECURITY.md](SECURITY.md) 的私密渠道报告。
