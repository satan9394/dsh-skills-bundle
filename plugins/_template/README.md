# DSH 插件骨架模板（_template）

按 DeepSeek Harness 官方插件规范（`docs/user/develop/basic/publish.zh.md`）制作的通用骨架。
每个新插件 = 复制本目录为 `plugins/<plugin-name>/`，然后替换占位内容。

## 文件结构

```
plugins/<plugin-name>/
├── package.json       # 声明 "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
├── cordis.patch.yml   # 插入插件行的 patch 层（按包名引用）
├── index.js           # 插件入口：export const name + export function apply(ctx)
├── skills/<name>/SKILL.md   # 可选：注册进 ctx.skills 的技能（kebab-case 名称）
├── references/        # 可选：SKILL.md 引用的长文档
├── README.md
└── LICENSE
```

## 本地开发与验证（Windows）

```powershell
$cli = 'C:\Users\Satanchen\AppData\Local\npm-cache\_npx\1e7f6d9597241db0\node_modules\@deepseek-ai\dsh\lib\bin.js'

# 1) 安装到 web profile（开发模式 link:，改动即时生效）
node $cli plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\<plugin-name>

# 2) 验证层已挂载
node $cli --profile web --dump-config | Select-String '<plugin-name>'

# 3) 重启 dsh web 生效（profile 层在启动时组合）
```

## 发布（二选一，避免构建授权门槛）

- **npm**：`pnpm publish`（把构建产物 `lib/` 一起发布）；用户 `dsh plugin --profile web add <pkg>`
- **GitHub**：提交构建产物（非仅源码）或提供 `prepare` 脚本（需用户 `allowBuilds` 授权）；用户 `dsh plugin --profile web add github:<owner>/<repo>`

## 进入插件社区

给公开 GitHub 仓库打 `dsh-plugin` topic → 被 dshfind.com / dsh-plugin-marketplace（每日扫描
GitHub topic，2200+ 插件）/ DSH-Plugins-Marketplace / Oh-My-DSH / awesome-dsh-plugin 自动收录；
WhaleHub 另可 PR `registry/plugins.json`。

## 参考

- 官方发布教程：`E:\Code_file\GitHub_Repos\deepseek-harness\docs\user\develop\basic\publish.zh.md`
- Skill 子系统：`E:\Code_file\GitHub_Repos\deepseek-harness\docs\subsystems\skills.zh.md`
- MCP 桥接：`E:\Code_file\GitHub_Repos\deepseek-harness\packages\mcp\mcp-client\README.md`
