# i-have-adhd for Codex

这是 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) 的 Codex 专用 fork，只保留 Codex 插件、技能和会话启动钩子。技能正文沿用上游规则；本 fork 不包含其他运行时的适配代码。

## 工作方式

- 插件安装后提供 `$i-have-adhd` 技能。技能禁止隐式调用；手动调用会加载完整 `SKILL.md`。
- 启用并信任 `SessionStart` 钩子后，Codex 在会话启动、恢复、清空或压缩时注入同一份完整规则。钩子不检查额外的开关文件。
- 要停用默认注入，在 Codex 的 `/hooks` 中禁用本插件的 `SessionStart` 钩子，并开启新会话。插件和 `$i-have-adhd` 技能仍可保留。

## 本机安装

```sh
codex plugin marketplace add /Users/bytedance/code/i-have-adhd
codex plugin add i-have-adhd@i-have-adhd-local
```

打开 Codex 的 `/hooks`，审阅并信任 `i-have-adhd` 的 `SessionStart` 钩子。新会话生效。不要同时在全局 `AGENTS.md` 复制同一套规则，以免重复注入。

更新本地插件时，修改清单版本后重新运行 `codex plugin add i-have-adhd@i-have-adhd-local`，并重新审阅发生变化的钩子。

## 验证

```sh
node --test tests/session-start.test.mjs
python3 /Users/bytedance/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/i-have-adhd
```

基于上游 MIT 许可，见 [LICENSE](LICENSE)。
