function summarizeMarkdownInput(markdown) {
  const text = String(markdown || "").trim();

  if (!text) {
    return "";
  }

  const title = extractFirstHeading(text);
  const taskSection = extractSection(text, "Task");
  const expectedFocusSection = extractSection(text, "Expected Focus");
  const constraintsSection = extractSection(text, "Constraints");
  const expectedOutputSection = extractSection(text, "Expected Output");
  const sentences = [];
  const titleLower = title.toLowerCase();
  const isRepositoryContract = containsAny(text, [
    "Medication Repository Contract",
    "repository contract",
    "contract/interface slice",
  ]) || titleLower.includes("medication repository contract");
  const isSchemaValidation = !isRepositoryContract && (containsAny(text, [
    "D1 Schema Validation",
    "schema validation",
    "SQL-backed data boundary",
  ]) || titleLower.includes("d1 schema validation"));
  const isRepoBootstrap = containsAny(text, [
    "Repo Bootstrap",
    "repo bootstrap",
    "bootstrapping a new repo",
    "bootstrap a new repo",
  ]) || titleLower.includes("repo bootstrap");
  const isMedicationReadHandler = !isRepositoryContract && !isSchemaValidation && !isRepoBootstrap && (containsAny(text, [
    "Medication Read Handler",
    "read-only medication schedule flow",
    "thin runtime wiring",
    "LINE handler",
    "เช็กยาวันนี้",
  ]) || titleLower.includes("medication read handler"));
  const isPriorityReview = containsAny(taskSection || text, [
    "prioritize first",
    "operating priorities",
    "priority mindset",
  ]);

  if (isSchemaValidation) {
    sentences.push("Maliwan 2.0 D1 Schema Validation is a planning task for Big Crew's Maliwan 2.0 mission.");
    sentences.push("Validate the first SQL-backed data boundary for a senior-friendly household-aware care workflow, using household_id, member_id, and line_user_id to keep member-scoped medication safe for the Malaithong household with Rin and Benchawan.");
    sentences.push("Keep household-scoped inventory and admin UI deferred; this is a schema validation task, not runtime implementation.");
  } else if (isRepositoryContract) {
    sentences.push("Maliwan 2.0 Medication Repository Contract is a planning task for Big Crew's Maliwan 2.0 mission.");
    sentences.push("Define the medication repository boundary so member-scoped schedules and logs stay safe for future LINE-based care workflows without coupling product logic directly to Cloudflare D1.");
    sentences.push("Keep real D1 queries, LINE runtime, inventory, and admin UI deferred; this is a contract/interface slice, not runtime implementation.");
  } else if (isRepoBootstrap) {
    sentences.push("Maliwan 2.0 Repo Bootstrap is a planning task for Big Crew's Maliwan 2.0 mission.");
    sentences.push("Create a new standalone maliwan-2 repository separate from Maliwan 1.0 and Big Crew, with a Cloudflare Worker + D1 skeleton and member-scoped medication as the first domain slice.");
    sentences.push("Do not copy runtime code; keep inventory and admin UI deferred.");
  } else if (isMedicationReadHandler) {
    sentences.push("Maliwan 2.0 Medication Read Handler is a planning task for Big Crew's Maliwan 2.0 mission.");
    sentences.push("Wire the read-only medication schedule flow from a LINE-style handler into the orchestrator and return a reviewable response model.");
    sentences.push("Keep medication logging, session/state engine, inventory, and admin UI deferred; this is a thin runtime wiring task, not full LINE behavior.");
  }

  if (isPriorityReview) {
    sentences.push("Big Crew needs to clarify its operating priorities before helping build Maliwan 2.0.");
    const boundarySentence = buildBoundarySentence(text);
    if (boundarySentence) {
      sentences.push(boundarySentence);
    }
    sentences.push("Keep it as one scoped validation/planning ticket.");
  } else if (title && !isRepositoryContract) {
    sentences.push(`${title} is a planning task for Big Crew's Maliwan 2.0 mission.`);
  }

  if (!isPriorityReview && !isSchemaValidation && !isRepositoryContract && !isMedicationReadHandler) {
    const balanceSentence = buildBalanceSentence(expectedFocusSection, expectedOutputSection, text);
    if (balanceSentence) {
      sentences.push(balanceSentence);
    }
  }

  if (!isRepoBootstrap && !isSchemaValidation && !isRepositoryContract && !isMedicationReadHandler) {
    const topicSentence = buildTopicSentence(text, isPriorityReview);
    if (topicSentence) {
      sentences.push(topicSentence);
    }
  }

  if (!isPriorityReview && !isRepoBootstrap && !isSchemaValidation && !isRepositoryContract && !isMedicationReadHandler) {
    const constraintSentence = summarizeConstraints(constraintsSection || text, isPriorityReview);
    if (constraintSentence) {
      sentences.push(constraintSentence);
    }
  }

  return dedupeSentences(sentences).join(" ");
}

function extractFirstHeading(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractSection(text, sectionName) {
  const lines = text.split(/\r?\n/);
  const header = `## ${sectionName}`;
  let collecting = false;
  const collected = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === header) {
      collecting = true;
      continue;
    }

    if (collecting && trimmed.startsWith("## ")) {
      break;
    }

    if (collecting) {
      collected.push(line);
    }
  }

  return collected.join("\n").trim();
}

function summarizeConstraints(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const matches = [];
  const keywords = [
    ["Do not jump into full implementation.", "avoid full implementation"],
    ["Do not migrate the whole system.", "avoid whole-system migration"],
    ["Do not build admin UI yet.", "avoid admin UI"],
    ["Do not over-engineer.", "avoid over-engineering"],
    ["Prefer small vertical slices.", "prefer small vertical slices"],
    ["Prefer evidence over assumptions.", "prefer evidence over assumptions"],
    ["Keep Maliwan 2.0 portfolio-first, production-later.", "keep Maliwan 2.0 portfolio-first, production-later"],
    ["Do not produce a broad Codex prompt.", "avoid broad Codex prompts"],
  ];

  for (const [needle, phrase] of keywords) {
    if (lines.some((line) => line.includes(needle))) {
      matches.push(phrase);
    }
  }

  if (matches.length === 0) {
    return "";
  }

  const planningPrefix = "Keep the slice small";
  if (matches.length === 0) {
    return "";
  }

  return `${planningPrefix}: ${joinParts(matches.slice(0, 4))}.`;
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function joinParts(parts) {
  if (parts.length <= 1) {
    return parts[0] || "";
  }

  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`;
  }

  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

function buildBoundarySentence(text) {
  const terms = [];

  if (containsAny(text, ["household-aware sessions"])) {
    terms.push("household-aware sessions");
  }
  if (containsAny(text, ["member-scoped medication"])) {
    terms.push("member-scoped medication");
  }
  if (containsAny(text, ["Cloudflare D1", "D1", "SQL-backed data layer"])) {
    terms.push("Cloudflare D1");
  }
  if (containsAny(text, ["household-scoped inventory"])) {
    terms.push("household-scoped inventory deferred");
  }
  if (containsAny(text, ["admin UI"])) {
    terms.push("admin UI deferred");
  }

  if (terms.length === 0) {
    return "";
  }

  const sentence = `The first slice should validate the household/member boundary with ${joinParts(terms)}.`;
  return sentence;
}

function buildBalanceSentence(expectedFocusSection, expectedOutputSection, text) {
  const haystack = [expectedFocusSection, expectedOutputSection, text].join("\n");
  const terms = [];

  if (containsAny(haystack, ["product value"])) {
    terms.push("product value");
  }
  if (containsAny(haystack, ["quality"])) {
    terms.push("quality");
  }
  if (containsAny(haystack, ["budget / Codex quota efficiency", "quota efficiency", "Codex quota efficiency"])) {
    terms.push("Codex quota efficiency");
  }
  if (containsAny(haystack, ["architecture learning"])) {
    terms.push("architecture learning");
  }
  if (containsAny(haystack, ["scope control"])) {
    terms.push("scope control");
  }
  if (containsAny(haystack, ["regression safety"])) {
    terms.push("regression safety");
  }
  if (containsAny(haystack, ["release readiness"])) {
    terms.push("release readiness");
  }

  if (terms.length === 0) {
    return "";
  }

  return `The work should balance ${joinParts(terms)}.`;
}

function buildTopicSentence(text, isPriorityReview) {
  if (isPriorityReview) {
    return "This is a planning/validation task, not an implementation task.";
  }

  const topicParts = [];
  if (containsAny(text, ["Cloudflare D1", "D1", "SQL-backed data layer"])) {
    topicParts.push("validate Cloudflare D1 as the first SQL-backed data layer");
  }
  if (containsAny(text, ["member-scoped medication", "medication"])) {
    topicParts.push("start with member-scoped medication workflows");
  }
  if (containsAny(text, ["household-scoped inventory", "inventory"])) {
    topicParts.push("keep household-scoped inventory separate");
  }
  if (containsAny(text, ["Google Sheets"])) {
    topicParts.push("move away from Google Sheets");
  }

  if (topicParts.length === 0) {
    return "";
  }

  return `The work should focus on ${joinParts(topicParts)}.`;
}

function dedupeSentences(sentences) {
  const seen = new Set();
  const result = [];

  for (const sentence of sentences) {
    const normalized = sentence.trim();
    if (!normalized || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

module.exports = {
  summarizeMarkdownInput,
};
