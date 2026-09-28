# i-have-adhd for Codex

这是 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) 的 Codex 专用 fork，只保留 Codex 插件、技能和会话启动钩子。技能正文沿用上游规则；本 fork 不包含其他运行时的适配代码。

## 工作方式

- 插件提供 `$i-have-adhd` 技能。Codex 可以按任务选择技能，也可以由用户显式调用。
- 全局开关为 `~/.codex/.i-have-adhd-enabled`；开启时，`SessionStart` 钩子在会话启动、恢复、清空或压缩时请求 Codex 调用该技能。钩子只发出请求，由 Codex 的技能流程加载完整 `SKILL.md`。
- 关闭开关后，新会话不再默认请求调用；技能仍可按任务被选中或由用户显式调用。也可以在 `/hooks` 中停用本插件的 `SessionStart` 钩子。

## 本机安装

```sh
codex plugin marketplace add /Users/bytedance/code/i-have-adhd
codex plugin add i-have-adhd@i-have-adhd-local
```

打开 Codex 的 `/hooks`，审阅并信任 `i-have-adhd` 的 `SessionStart` 钩子。启用全局开关：

```sh
touch ~/.codex/.i-have-adhd-enabled
```

关闭全局开关：

```sh
rm ~/.codex/.i-have-adhd-enabled
```

开关变更在新会话或下次 `SessionStart` 事件生效。不要同时在全局 `AGENTS.md` 复制同一套规则，以免重复注入。钩子请求由模型执行；它不会直接调用 Codex 的技能解析器，因此实际技能选择仍需在新会话中验证。

更新本地插件时，修改清单版本后重新运行 `codex plugin add i-have-adhd@i-have-adhd-local`，并重新审阅发生变化的钩子。

## 验证

```sh
node --test tests/session-start.test.mjs
python3 /Users/bytedance/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/i-have-adhd
```

基于上游 MIT 许可，见 [LICENSE](LICENSE)。
