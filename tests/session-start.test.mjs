import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../plugins/i-have-adhd/", import.meta.url);

test("全局开关关闭时不请求技能", () => {
  const codexHome = mkdtempSync(join(tmpdir(), "i-have-adhd-off-"));
  try {
    const result = runHook(codexHome);
    assert.equal(result.status, 0);
    assert.equal(result.stderr, "");
    assert.equal(result.stdout, "");
  } finally {
    rmSync(codexHome, { recursive: true });
  }
});

test("全局开关开启时只请求原生技能调用", () => {
  const codexHome = mkdtempSync(join(tmpdir(), "i-have-adhd-on-"));
  try {
    writeFileSync(join(codexHome, ".i-have-adhd-enabled"), "");
    const result = runHook(codexHome);
    assert.equal(result.status, 0);
    assert.equal(result.stderr, "");
    assert.match(result.stdout, /Invoke \$i-have-adhd through Codex's normal skill workflow/);
    assert.doesNotMatch(result.stdout, /## Rules|## What ADHD changes about reading/);
  } finally {
    rmSync(codexHome, { recursive: true });
  }
});

function runHook(codexHome) {
  return spawnSync(process.execPath, [fileURLToPath(new URL("hooks/session-start.mjs", root))], {
    encoding: "utf8",
    env: { PATH: process.env.PATH, CODEX_HOME: codexHome },
  });
}
