import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const skillUrl = new URL("../skills/i-have-adhd/SKILL.md", import.meta.url);
const skill = readFileSync(fileURLToPath(skillUrl), "utf8");
const body = skill.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").trimEnd();

// 会话启动时注入完整规则，避免全局 AGENTS.md 与技能文件各维护一份。
process.stdout.write(`I HAVE ADHD: Apply these response rules throughout this Codex session.\n\n${body}\n`);
