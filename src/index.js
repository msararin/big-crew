#!/usr/bin/env node

const { buildEngineeringWorkPackage } = require("./orchestrator/engineeringOrchestrator");

async function main() {
  const task = readTaskFromArgs(process.argv.slice(2));

  if (!task) {
    process.stdout.write([
      "Usage:",
      "  big-crew \"Task description\"",
      "",
      "Example:",
      "  big-crew \"D1 spike: validate inventory-aware menu routing\"",
      "",
    ].join("\n"));
    process.exitCode = 1;
    return;
  }

  const workPackage = buildEngineeringWorkPackage(task);
  process.stdout.write(`${workPackage}\n`);
}

function readTaskFromArgs(args) {
  return args.join(" ").trim();
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message || String(error)}\n`);
  process.exitCode = 1;
});
