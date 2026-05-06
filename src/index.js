#!/usr/bin/env node

const { mkdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const { buildEngineeringWorkPackage } = require("./orchestrator/engineeringOrchestrator");
const { summarizeMarkdownInput } = require("./utils/inputSummarizer");
const OUTPUT_FILE_PATH = path.join(process.cwd(), "output", "engineering-work-package.md");

async function main() {
  try {
    const taskInput = await readTaskFromArgs(process.argv.slice(2));
    const task = taskInput.source === "file"
      ? summarizeMarkdownInput(taskInput.text)
      : taskInput.text;

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
    await writeWorkPackageOutput(workPackage);
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
      return {
        source: "file",
        text: fileContents.trim(),
      };
    } catch (error) {
      if (error && error.code === "ENOENT") {
        throw new Error(`input file not found: ${inputPath}`);
      }

      throw error;
    }
  }

  return {
    source: "cli",
    text: args.join(" ").trim(),
  };
}

async function writeWorkPackageOutput(workPackage) {
  await mkdir(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
  await writeFile(OUTPUT_FILE_PATH, `${workPackage}\n`, "utf8");
}

main();
