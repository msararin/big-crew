#!/usr/bin/env node

const { readFile } = require("node:fs/promises");
const { buildEngineeringWorkPackage } = require("./orchestrator/engineeringOrchestrator");

async function main() {
  try {
    const task = await readTaskFromArgs(process.argv.slice(2));

    if (!task) {
      process.stdout.write([
        "Usage:",
        "  big-crew \"Task description\"",
        "  big-crew --input examples/input-d1-spike.md",
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
  } catch (error) {
    process.stderr.write(`Error: ${error.message || String(error)}\n`);
    process.exitCode = 1;
  }
}

async function readTaskFromArgs(args) {
  if (args[0] === "--input") {
    const inputPath = args[1];

    if (!inputPath) {
      throw new Error("missing file path for --input");
    }

    try {
      const fileContents = await readFile(inputPath, "utf8");
      return fileContents.trim();
    } catch (error) {
      if (error && error.code === "ENOENT") {
        throw new Error(`input file not found: ${inputPath}`);
      }

      throw error;
    }
  }

  return args.join(" ").trim();
}

main();
