import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../plugins/i-have-adhd/", import.meta.url);
const skill = readFileSync(fileURLToPath(new URL("skills/i-have-adhd/SKILL.md", root)), "utf8");
const expected = skill.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").trimEnd();

test("SessionStart 注入完整技能正文，无额外开关", () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL("hooks/session-start.mjs", root))], {
    encoding: "utf8",
    env: { PATH: process.env.PATH },
  });

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.equal(result.stdout, `I HAVE ADHD: Apply these response rules throughout this Codex session.\n\n${expected}\n`);
});
