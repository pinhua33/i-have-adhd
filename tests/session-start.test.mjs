import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../plugins/i-have-adhd/", import.meta.url);

test("SessionStart 只注入简短默认风格，保留完整技能的按需加载", () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL("hooks/session-start.mjs", root))], {
    encoding: "utf8",
    env: { PATH: process.env.PATH },
  });

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.match(result.stdout, /^I HAVE ADHD \(default style\):/);
  assert.match(result.stdout, /explicit \$i-have-adhd invocation/);
  assert.ok(result.stdout.length < 400);
  assert.doesNotMatch(result.stdout, /## Rules|## What ADHD changes about reading/);
});
