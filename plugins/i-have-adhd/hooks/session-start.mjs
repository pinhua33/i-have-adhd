import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const codexHome = process.env.CODEX_HOME || join(homedir(), ".codex");
const enabled = existsSync(join(codexHome, ".i-have-adhd-enabled"));

if (enabled) {
  // 开关只请求 Codex 调用技能；技能正文交给 Codex 的原生加载流程。
  process.stdout.write(
    "The user enabled i-have-adhd globally. Invoke $i-have-adhd through Codex's normal skill workflow for this session and follow its SKILL.md.\n",
  );
}
