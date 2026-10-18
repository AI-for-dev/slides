---
theme: ./theme
title: Hooks, delegation, workflows, swarm and Pi Durable - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF day 3, October 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
lang: en
colorSchema: auto
# Logo de l'organisation AI-for-dev (dépôt AI-for-dev/.github, profile/brand).
favicon: /favicon.svg
themeConfig:
  footer: IA4Dev 2026 · ANF day 3
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/
  # Le même deck en français, relatif à celui-ci (/slides/en/jour3/).
  translation: ../../jour3/
# Version anglaise de jour3.md, slide pour slide : le bouton de langue garde
# le numéro de slide. Publiée sous /slides/en/jour3/, en hash comme les autres.
routerMode: hash
mdc: true
editor: false
drawings:
  persist: false
fonts:
  sans: Lexend Variable
  mono: Atkinson Hyperlegible Mono Variable
  serif: Instrument Serif
  provider: none
layout: cover
---

:::Cols{cols="1fr auto" align=start}
::CoverMeta
IA4Dev 2026 · ANF day 3
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Understanding and building your harness" style="transform: translateY(-3rem)"}
# Hooks, delegation, workflows,<br />swarm and Pi Durable
::

:::Cols{cols="1fr auto" align=end}
::Stack{gap=2}
:Rule{width="210px"}

:Author{name="Max Beligné" org="PUD-GA / MSH Alpes / UGA"}
:Author{name="Loïc Gouarin" org="CMAP / CNRS / École polytechnique"}
::
::CoverMeta
:License
October 2026
::
:::

---
section: Introduction
---

# Today’s programme :Hint[NÉON]{prefix="Running example," href="https://github.com/AI-for-dev/neon"}

::::Stack{gap=1}
::Act{n=1 title="Hooks"}
Trigger code at a set point of the loop, deterministically
::
::Act{n=2 title="Delegation"}
Split the work into sub-agents, and run the loop by hand
::
::Act{n=3 title="Workflows"}
The same loop, written in a file that Pi runs on its own
::
::Act{n=4 title="The swarm"}
Have agents debate on a shared board, until they agree
::
::Act{n=5 title="Pi Durable"}
Make execution state and tasks outlive the process that runs them
::
::::

::::Stack{gap=1 .mt-4}
::Note{tag="Written version"}
The first four parts follow a course module:
[hooks](https://ai-for-dev.github.io/hands-on-harness/act2-hooks),
[delegation](https://ai-for-dev.github.io/hands-on-harness/act2-delegation),
[workflows](https://ai-for-dev.github.io/hands-on-harness/act2-workflows),
[swarm](https://ai-for-dev.github.io/hands-on-harness/act2-swarm)
::
::::

---
layout: section
index: Part 1 / 5
---

::SectionHead{num="01" detail="Deterministic events"}
# Hooks
::

::Agenda
- Why a hook, and where to plug it into Pi
- The points in the loop where you can step in
- Two extensions for NÉON: refuse, then check
- Hooks, instructions and sub-agents
::

---
section: Part 1 · Hooks
---

# Yesterday’s findings :Hint[hooks module]{prefix="Course," href="https://ai-for-dev.github.io/hands-on-harness/act2-hooks"}

:::::Stack{fill center gap=7}
::::Cols{cols=2 gap=6 content=center}
:::Card{variant=soft eyebrow="An instruction gets forgotten" center}
A rule in `AGENTS.md`, or a skill the model invokes on its own, can be **ignored** by the agent: they get lost in the context.
:::
:::Card{variant=soft eyebrow="So does a reminder" tone=teal center}
For something you want run every time, a skill you must invoke yourself is not practical: you have to **always remember it**.
:::
::::

::Takeaway
Hence **hooks**: trigger code at the right moment, **deterministically**. The agent cannot ignore it, it is not text.
::
:::::

---
section: Part 1 · Hooks
---

# Where to plug a hook into Pi?

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
In an **extension**: a TypeScript file that Pi loads directly, without compiling. A folder with an `index.ts` for a bigger extension.
::
::Note{tag="Elsewhere"}
Claude Code uses a `settings.json` file that runs shell scripts. Pi has no equivalent: a hook is a function registered with `pi.on(...)`.
::
:::

:::Stack{gap=3}
:Eyebrow[Reminder: the folder sets the scope]{tone=teal}

::Matrix{size=md left first="15rem"}
| location | scope |
| --- | --- |
| `~/.pi/agent/extensions/` | all your sessions, whatever the project |
| `.pi/extensions/` | this project only, once the project is trusted |
| `pi --extension ./bloque-env.ts` | this session only, handy for testing |
::
:::
::::

---
section: Part 1 · Hooks
---

# How does it work? :Hint[An extension that blocks reading .env]

::::Cols{cols="1fr 1fr" gap=7 fill align=center}
:::Stack{gap=4 .code-xs}
```ts
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event) => {
    if (event.toolName === "read" && event.input.path.endsWith(".env")) {
      return { block: true, reason: "Reading the .env file is forbidden" };
    }
  });
}
```

::Note
Even if you have never written TypeScript, this code reads easily, with a few explanations.
::
:::

:::Card{variant=soft eyebrow="A few explanations" tone=teal size=sm}
::Specs{w="6.5rem" raw}
- **ExtensionAPI** the API used to extend Pi
- **pi.on(...)** listens to an event and reacts when it happens
- **"tool_call"** the agent is about to call a tool, described by `event.toolName` and `event.input`
- **block** the tool does not run, the agent gets `reason` instead of the result
::

::Detail{.mt-3}
Beware: `.env.local` or `.env.production` still get through.
::
:::
::::

---
section: Part 1 · Hooks
---

# Other moments than the tool call

::::Cols{cols=3 gap=5 fill}
:::Card{eyebrow="Before a job" title="Set up the environment" size=sm}
- `session_start`: start what must run during the session, `session_shutdown` to stop it
- `before_agent_start`: act before each agent run
- `input`: intercept the prompt, to let it through, rewrite it, or keep it away from the model
:::

:::Card{eyebrow="During a job" title="Guardrails" tone=teal size=sm}
- `tool_call`: block or change a tool call
- `tool_result`: rewrite the result, for example to add the linter output after an edit
- `context`: transform the messages sent to the model
- `session_before_compact`: act before compaction
:::

:::Card{variant=accent eyebrow="At the end of a job" title="Test and restart" size=sm}
- `turn_end`: after each reply
- `agent_before_settle`: last moment before the agent stops, you can still restart it
- `agent_settled`: notification only, the agent does not start again
:::
::::

::Note{tag="Not exhaustive" .mt-4}
Every event is detailed in the course’s [hooks module](https://ai-for-dev.github.io/hands-on-harness/act2-hooks).
::

---
section: Part 1 · Hooks
---

# Building on the first example

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Goal: reproduce the behaviour of [`pi-permission-system`](https://www.npmjs.com/package/@gotgenes/pi-permission-system), seen yesterday, which refuses forbidden commands.
::

::Specs{w="5.5rem"}
- **Pattern** a regular expression searched for in the command
- **Reason** what the agent gets if its command matches
::

::Note{tag="JSON"}
Backslashes are doubled: `\\.env(\\s|$)` reads `\.env(\s|$)`, which matches `cat .env` without blocking `cat .env.example`.
::
:::

:::Stack{gap=2 .code-xs}
:Eyebrow[neon/.pi/forbidden-commands.json]{tone=quiet code}

```json
{
  "forbidden": [
    { "pattern": "rm -rf",
      "reason": "recursive deletion, ask the user to run it themselves." },
    { "pattern": "git push.*--force",
      "reason": "rewrites the remote history." },
    { "pattern": "\\.env(\\s|$)",
      "reason": "the .env file contains secrets." },
    { "pattern": "curl|wget",
      "reason": "no network requests from the shell." }
  ]
}
```
:::
::::

---
section: Part 1 · Hooks
---

# Exercise: have Pi write the guardrail

:::::Cols{cols="1.25fr 1fr" gap=6 fill}
::::Card{badge="1" title="Write the prompt" size=sm}
Ask Pi to read its documentation and its extension examples, then to write `.pi/extensions/command-guard.ts`. The extension must:

- compare each command the agent runs with its `bash` tool against the rules in `.pi/forbidden-commands.json`, whose format Pi reads from the file;
- if a rule matches, block the command and send its reason back to the agent;
- re-read the file on every command, so that a new rule applies without restarting Pi;
- block everything if the file is missing or unreadable.

**Up to you to find:** which event to listen to, and what to return to refuse.
::::

::::Stack{gap=4}
:::Card{badge="2" title="Load the extension" size=sm}
```bash
pi -e .pi/extensions/command-guard.ts
```
:::

:::Card{badge="3" title="Ask the agent to run" size=sm}
::Matrix{size=sm left}
| command | expected |
| --- | --- |
| `rm -rf game/` | :Mark[refused, with the reason]{v=no} |
| `cat .env` | :Mark[refused, with the reason]{v=no} |
| `cat .env.example` | :Mark[executed]{v=yes} |
::
:::


::Bullet{size=sm k="4" accent}
**Switch models and try again:** which succeed, which fail, and on what?
::
::::
:::::

---
section: Part 1 · Hooks
---

# Solution :Hint[neon/.pi/extensions/command-guard.ts]

::::Cols{cols="2fr 1fr" gap=6 fill align=center}
:::Cell{.code-xs}
```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isToolCallEventType, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

const RULES_FILE = ".pi/forbidden-commands.json";

interface Rule {
  pattern: string;
  reason: string;
}

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event, ctx) => {
    if (!isToolCallEventType("bash", event)) return;
    // Re-read on every call: a new rule applies without restarting Pi.
    const text = readFileSync(join(ctx.cwd, RULES_FILE), "utf8");
    const rules: Rule[] = JSON.parse(text).forbidden;

    for (const rule of rules) {
      if (new RegExp(rule.pattern).test(event.input.command)) {
        return {
          block: true,
          reason: `Command refused by ${RULES_FILE}: ${rule.reason}`,
        };
      }
    }
  });
}
```
:::

:::Stack{gap=3}
::Lead
On every `bash` call, the extension checks the command against each rule. If one matches, it blocks and says why.
::
::Bullet{size=sm k="1"}
The rules are **re-read on every call**: you fix the JSON without restarting Pi.
::
::Bullet{size=sm k="2"}
Missing or invalid file: the handler throws, and Pi **blocks the tool** to be safe rather than letting everything through.
::
::Bullet{size=sm k="3"}
Only `bash` is watched: the other tools are not affected.
::
:::
::::

---
section: Part 1 · Hooks
---

# Exercise: a rule and its blind spot

::Lead
One refusal you saw does not prove that every path to the same action is blocked.
::

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=2}
:Eyebrow[In the room]{tone=accent}

::Bullet{size=sm k="1" accent}
**Start with the extension**: `pi -e .pi/extensions/command-guard.ts`
::
::Bullet{size=sm k="2" accent}
**Trigger a refusal**: ask to delete `game/`, then a `cat .env` through `bash`
::
::Bullet{size=sm k="3" accent}
**Change the rule live**: forbid `npm install` too, without restarting Pi
::
::Bullet{size=sm k="4" accent}
**Look for another path**: try the `read` tool on `.env`, then extend the hook
::
:::

:::Stack{gap=4}
::Card{variant=accent eyebrow="Blind spot · bash ≠ read" size=sm}
Blocking `cat .env` in `bash` does not block `read(".env")`.
::
::Card{variant=teal eyebrow="Limit · a regex does not understand the shell" tone=teal size=sm}
A rule on `rm -rf` lets `rm -r -f` or `rm -fr` through, and `find -delete` deletes without ever writing `rm`.

:Rule

The sandbox remains the layer that holds when the agent finds an unexpected path.
::
:::
::::

---
section: Part 1 · Hooks
---

# Test before handing back control :Hint[.pi/extensions/final-checks.ts]

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
::Criterion{n=1 title="Observe · tool_result"}
After an `edit` or a `write`: `codeChanged = true`.
::
::Criterion{n=2 title="Wait · agent_before_settle"}
Only if the code changed and the agent finished normally (`outcome` is `completed`).
::
::Criterion{n=3 title="Check · npm test"}
Command run **by the harness** through `pi.exec`, not by the model.
::
::::

::::Cols{cols=2 gap=5}
::Card{variant=teal eyebrow="Green tests" tone=teal size=sm}
“Checks: OK” is displayed and control comes back to you.
::
::Card{variant=accent eyebrow="Red tests" size=sm}
The failure output goes back to the model with `continue: true`: the agent gets back to work.
::
::::

::::Cols{cols=2 gap=5}
::Note{tag="MAX_RETRIES = 3"}
Pi does not limit continuations: without a counter, the restart loops forever.
::
::Note{tag="3,000 characters"}
The last ones of the output: what goes back to the model is paid in tokens.
::
::::
:::::

---
section: Part 1 · Hooks
---

# Exercise: have Pi write the check

:::::Cols{cols="1.25fr 1fr" gap=6 fill}
::::Card{badge="1" title="Write the prompt" size=sm}
Start from the three steps of the previous slide. Ask Pi to read its documentation and its extension examples, to write `.pi/extensions/final-checks.ts`, then to check that it loads. When the agent is about to hand back control, the extension must:

- run `npm test`, only if it changed files and was not interrupted;
- if the tests pass, display “Checks: OK” and hand back control;
- otherwise, restart the agent with the end of the output and the instruction to fix the code, not the tests;
- after three restarts, display a warning and hand back control.

**Up to you to find:** how to know that code changed, and how to restart the agent.
::::

::::Stack{gap=4}
:::Card{badge="2" title="Load the extension" size=sm}
```bash
pi -e .pi/extensions/final-checks.ts
```
:::

:::Card{badge="3" title="Ask the agent" size=sm}
::Matrix{size=sm left}
| request | expected |
| --- | --- |
| “What does `collides` do?” | no tests run |
| “Rename `collides` to `intersects`” | tests run, restart if they fail |
::
:::


::Bullet{size=sm k="4" accent}
**Switch models and try again:** which succeed, which fail, and on what?
::
::::
:::::

---
section: Part 1 · Hooks
---

# Exercise: the hook’s instruction against yours

:::::Cols{cols=2 gap=7 fill}
::::Stack{gap=3}
:::Cell{.code-sm}
```bash
pi -e .pi/extensions/command-guard.ts \
   -e .pi/extensions/final-checks.ts
```
:::

::Bullet{size=sm k="1" accent}
Ask to rename `collides` to `intersects` in `game/neon.js` and to **delete** `collides`, with no alias, **without touching** `game/neon.test.js`
::
::Bullet{size=sm k="2" accent}
The tests import `collides` and fail: the extension restarts the agent with “Fix the code (not the tests)”
::
::Bullet{size=sm k="3" accent}
Watch what the agent does after the restart: which instruction did it follow?
::
::::

::::Stack{gap=4}
::Card{variant=accent eyebrow="What we observed" center}
With gemma-4-31b and qwen-3.8-27b, the agent respects “don’t touch the test” but puts back a `collides` alias on the first restart, although you had forbidden it. The tests go green again.
::
::Takeaway
A hook’s message is an instruction like any other, and it arrives **last**. A guardrail enforces what it checks (green tests), not what you asked for.
::
::Detail
The full code of `final-checks.ts` is in the [hooks module](https://ai-for-dev.github.io/hands-on-harness/act2-hooks).
::
::::
:::::

---
section: Part 1 · Hooks
---

# Where do hooks fit? :Hint[Birgitta Böckeler]{prefix="Harness engineering for coding agent users," href="https://martinfowler.com/articles/harness-engineering.html"}

::Lead
Two questions: **when** to act, and can the rule be **checked by code**?
::

::::Cols{cols=4 gap=4 fill content=center}
:::Card{eyebrow="Before the action" title="Computational guide" size=sm}
**Block the action**: the rule can be checked by code.

::Detail
`tool_call`, like `command-guard.ts`
::
:::
:::Card{variant=soft eyebrow="Before the action" title="Inferential guide" size=sm}
**Steer the model**: the rule needs judgement.

::Detail
`AGENTS.md` or skills
::
:::
:::Card{eyebrow="After the work" title="Computational sensor" tone=teal size=sm}
**Test and fix**: the result can be checked by code.

::Detail
`agent_before_settle`, like `final-checks.ts`
::
:::
:::Card{variant=soft eyebrow="After the work" title="Inferential sensor" tone=teal size=sm}
**Assess quality**: the result needs judgement.

::Detail
Review by an LLM
::
:::
::::

::::Cols{cols=2 gap=5 .mt-5}
::Note{tag="Hooks"}
Control execution: when to step in, what to check, what to block?
::
::Note{tag="Sub-agents"}
Organise the work: who to delegate to, with what context, what specialisation?
::
::::

---
section: Part 1 · Hooks
---

# A hook or a sub-agent? :Hint[The final-checks.ts example]

:::::Stack{fill center gap=6}
::::Cols{cols=2 gap=6}
:::Card{eyebrow="With a hook" title="Tests, and a limit"}
After a change, the hook runs `npm test`. If the tests fail, the agent must fix things.

::Detail
Green tests do not say whether the code is well designed, readable or maintainable.
::
:::
:::Card{eyebrow="With a sub-agent" title="A separate judgement" tone=teal}
You delegate a code review to a specialised sub-agent, then the main agent uses its feedback.
:::
::::

::Takeaway
The big advantage of the sub-agent: **its context is independent** from the main agent’s. It gets a task, works and only sends back its conclusion, so the main window fills up much more slowly.
::
:::::

---
layout: section
index: Part 2 / 5
---

::SectionHead{num="02" detail="Splitting the work into sub-agents"}
# Delegation
::

::Agenda
- What a sub-agent receives, and what comes back
- combo and the anatomy of an agent
- Four roles, each limited by its tools
- The four-role loop, run by hand
::

---
section: Part 2 · Delegation
---

# Pi, agents, sub-agents and skills :Hint[delegation module]{prefix="Course," href="https://ai-for-dev.github.io/hands-on-harness/act2-delegation"}

:::::Stack{fill center gap=6}
::::Cols{cols=3 gap=5}
::Criterion{n=1 title="Pi, the harness"}
The software that runs the sessions, gives access to the models and exposes tools and extensions.
::
::Criterion{n=2 title="The main agent"}
Your interactive Pi session, with its instructions, its working context, its tools and possibly its skills.
::
::Criterion{n=3 title="A sub-agent"}
A separate session, opened for one task, with its prompt, its model, its tools and possibly its skills.
::
::::

::Takeaway
A sub-agent starts from an **empty** window. It gets a task as text and only sends back its conclusion: its reads, its tool calls and its reasoning disappear with it.
::
:::::

---
section: Part 2 · Delegation
---

# Four benefits of delegation

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="Isolate the context" size=sm}
Working out which files a ticket touches means reading a dozen of them, while the resulting note fits in thirty lines. Done in the main session, the ten files stay in your window until the end. Delegated, **only the note gets in**.
:::
:::Card{badge="2" title="Restrict the tools" size=sm}
A sub-agent without a write tool cannot write, whatever the instruction. A skill can only **ask** for it: Pi ignores its `allowed-tools` field.
:::
:::Card{badge="3" badgeTone=teal title="Separate generator and evaluator" size=sm}
A model reviewing its own code reviews its intentions. A fresh reviewer only knows the ticket, the plan and the diff.
:::
:::Card{badge="4" badgeTone=teal title="Prepare for orchestration" size=sm}
Today, manual delegation: **you are the orchestrator**. The next part automates this loop in a workflow.
:::
::::

---
section: Part 2 · Delegation
---

# A few existing extensions

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=2}
::Bullet{size=sm k="pi-delegator" badge=tag}
Simple delegation
::
::Bullet{size=sm k="subagent" badge=tag}
[The example in the Pi repository](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent): single, parallel and chain, one `pi` process per sub-agent
::
::Bullet{size=sm k="pi-subagents" badge=tag}
[Coordination](https://github.com/nicobailon/pi-subagents), ready-made agents, background tasks
::
::Bullet{size=sm k="pi-dynamic-workflow" badge=tag}
Workflow scripts generated on demand
::
::Bullet{size=sm k="pi-envoy" badge=tag}
[Governance](https://github.com/jmnargi/pi-envoy): one delegation contract per child, budgets, dashboard
::
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="Far from exhaustive" tone=teal size=sm}
- collaboration: `pi-orchestration`, `pi-messenger`, `pi-agent-teams`
- orchestration patterns: `pi-flows`
::
::Note{tag="Appendix"}
A comparison with combo, the tool used in this course, at the end of the deck.
::
:::
::::

---
section: Part 2 · Delegation
---

# The combo tool :Hint[github.com/AI-for-dev/combo]{href="https://github.com/AI-for-dev/combo"}

::::Cols{cols=2 gap=7 fill align=center}
:::Card{variant=accent eyebrow="Written for this course"}
A library on top of the Pi SDK: a markdown file becomes an agent, agents compose into workflows.

:Rule

One [herdr](https://herdr.dev) pane per sub-agent, each one’s time and tokens, an HTML and JSONL export.
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="The extension" tone=teal size=sm}
Loaded with `-e` or installed in the project, it adds a `subagent` tool that the main model calls, just like `read` or `edit`.
::
::Note{tag="Beware"}
Not a production library. Designed for teaching: manual orchestration here, automation in the next part.
::
::Note{tag="Elsewhere"}
For a pipeline you depend on, start from `subagent`, `pi-subagents` or `pi-envoy` instead. What we establish here carries over.
::
:::
::::

---
section: Part 2 · Delegation
---

# Anatomy of a sub-agent :Hint[fields detailed in the combo docs]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/agents.md"}

:::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3 .code-sm}
:Eyebrow[neon/.pi/agents/reader.md]{tone=quiet code}

```markdown
---
name: reader
description: Reads one file and reports what it exports
tools: read
model: ilaas/gemma-4-31b
---

You read the file you are given and list its
exported symbols, one per line, with the line
number. Nothing else.
```

::Note
A **YAML header**, then a **body** that becomes the sub-agent’s system prompt: it is always read, whereas a skill may never be opened.
::
::Note{tag="Portable"}
The same format works in Claude Code, Codex, OpenCode or Cursor. Fields specific to combo are ignored there.
::
:::

::::Stack{gap=3}
:::Card{variant=soft eyebrow="Pi’s agent format" tone=teal size=sm}
::Specs{w="6.4rem" raw}
- **name** required: without it, the file is ignored
- **description** required, one line: what the agent is for
- **tools** the toolkit
- **model** if absent, Pi’s current settings
::
:::

:::Card{variant=accent eyebrow="What combo adds" size=sm}
::Specs{w="6.4rem" raw}
- **tools** if absent: `read, grep, find, ls` (with Pi alone: all its tools)
- **skills** if absent, none. `read` must be in the toolkit to read them
- **lifetime** `task` (default) or `workflow`
::
:::

::::
:::::

---
section: Part 2 · Delegation
---

# Three things before you start

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="The project wins"}
combo loads the project’s agents (`.pi/agents/`), yours (`~/.pi/agent/agents/`) and its own. With the same name, **the project’s wins**.

:Rule

These are files from the cloned repository: read them before answering `Trust`. `/agents` lists what is loaded.
:::
:::Card{badge="2" title="The model is never inherited"}
It comes from the call, failing that from the pipeline file, failing that from the agent header, and as a last resort from `~/.pi/agent/settings.json`.

:Rule

The closest to the work wins.
:::
:::Card{badge="3" badgeTone=teal title="Watch the agents work"}
Start Pi in herdr, then `/herdr on`: each sub-agent opens its pane, which closes when it is done.

:Rule

Nicer than the trace after the fact.
:::
::::

::Note{tag="combo ≥ 0.5.0"}
Earlier versions only loaded the project’s agents if the call specified the scope. `pi update npm:@ai-for-dev/combo` updates it.
::
:::::

---
section: Part 2 · Delegation
---

# The task: NÉON issue #2

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
In `frame()`, collision detection, scoring and drawing are tangled together: the collision cannot be tested on its own.
::
::Card{variant=accent eyebrow="Expected outcome" size=sm}
A **pure** function, extracted from `frame()`, covered by new tests, with no export of `game/neon.js` changing name or signature.
::
::Note{tag="Deliverables"}
Those of the four sub-agents: impact note, split plan, diff and verdict.
::
:::
:::Stack{gap=4 center}
:Eyebrow[You are the one running the loop]{tone=teal}

::Bullet{size=sm k="1"}
**Scope**: only `game/neon.js` and `game/neon.test.js` change, and the suite ends green.
::
::Bullet{size=sm k="2"}
**Watch out**: the slowness claimed by the ticket is not measured. It is a sentence from the maintainer, not a figure.
::
:::
::::

---
section: Part 2 · Delegation
---

# Four roles, four toolkits :Hint[hands-on-harness/scripts/agents/]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/agents"}

::Matrix{size=md left first="8rem"}
| agent | deliverable | toolkit | what its toolkit forbids |
| --- | --- | --- | --- |
| `explorer` | a factual impact note | `read, grep, find, ls` | changing anything |
| `planner` | a plan in small testable steps | `read, grep, find, ls` | changing anything |
| `coder` | the code and the test for **one** step | `read, grep, find, ls, edit, write` | running a command |
| `reviewer` | `APPROVED` or `CHANGES REQUESTED`, with reasons | `read, grep, find, ls, verdict` | fixing what it reviews |
::

:::::Stack{fill center gap=5}
::::Cols{cols=4 gap=4 .mt-5}
::Card{variant=soft title="Observe, don’t advise" size=xs}
Checks in the code what the ticket claims, without suggesting a fix.
::
::Card{variant=soft title="Split, don’t code" size=xs}
Each step fits in one coder call and starts with a red test. “If in doubt, split.”
::
::Card{variant=soft title="Write, don’t run" size=xs}
Implements the step, without running the tests or claiming to have done so.
::
::Card{variant=soft title="Check, don’t fix" size=xs}
Reads the code in the repository, not the coder’s report. Gives its decision with the `verdict` tool.
::
::::
:::::

---
section: Part 2 · Delegation
---

# Exercise: each agent states its guarantee

:::::Cols{cols=2 gap=7 fill}
::::Stack{gap=3}
:::Cell{.code-xs}
```bash
cd /path/to/neon     # or the neon workspace in herdr
pi install -l npm:@ai-for-dev/combo
mkdir -p .pi/agents
cp /path/to/hands-on-harness/scripts/agents/*.md .pi/agents/
pi
```
:::

::Card{variant=accent eyebrow="In the room" size=sm}
No dedicated command: `subagent` is a tool. Name the agent and the task, the main model calls it. You can also name the model (“with the qwen-3.8-27b model from ilaas”), if it is declared in `models.json`.
::
::::
:::Stack{gap=4}
::Card{eyebrow="explorer" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">use the subagent "explorer" for the task "Name exactly the tools you have."</p>

“I have the following tools: `read`, `grep`, `find`, `ls`.”
::
::Card{eyebrow="coder" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">use the subagent "coder" for the task "Run npm test and report the result."</p>

“The "coder" subagent says it has no tool to run shell commands, so it cannot run npm test.”
::
::Note{tag="Trap"}
The main session has `bash` and sometimes runs `npm test` itself. The `bash` call after the `subagent` line shows it: that is not the coder.
::
:::
:::::

---
section: Part 2 · Delegation
---

# One turn of the loop, by hand :Hint[You are the orchestrator]

::Stack{fill center}
<LoopMap />
::

::::Cols{cols=3 gap=5 .mt-4}
::Note{tag="/step"}
`/step <agent> <instruction>` runs the agent on your text and on the output of the previous step.
::
::Note{tag="console"}
The reply is written to the transcript **without entering** the model’s context: you decide.
::
::Note{tag="/quote"}
Brings the last result into the context, when there is something to discuss.
::
::::

---
section: Part 2 · Delegation
---

# The loop in six steps

::::Stack{fill center gap=2}
::Bullet{size=sm k="1" accent}
`/step explorer handle ticket #2 in ISSUES.md` returns the impact note
::
::Bullet{size=sm k="2"}
You read it, then `/step planner split ticket #2 in ISSUES.md into steps, based on this note`
::
::Bullet{size=sm k="3" accent}
`/step --from none coder`, followed by step 1 copied from the plan: without `--from none`, it would get **the whole plan**
::
::Bullet{size=sm k="4"}
You run **`npm test` yourself**, in a second terminal, and keep the output
::
::Bullet{size=sm k="5" accent}
`/step reviewer`: paste the ticket, the step, `git diff` and the test output
::
::Bullet{size=sm k="6"}
You decide: next step, back to the coder, or back to the planner with `/step --from <id>`
::
::::

::::Cols{cols=3 gap=5 .mt-4}
::Note{tag="Retype the ticket"}
`/step` only passes on the output of the previous step.
::
::Note{tag="/chain"}
The trace of the steps and their export folder. `/chain reset` starts from scratch.
::
::Note{tag="Your log"}
What `/chain` does not see: **your decisions**, and on what basis.
::
::::

---
section: Part 2 · Delegation
---

# Reading the combo trace :Hint[combo docs, Export]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/export.md"}

:::::Cols{cols="5fr 4fr" gap=7 fill}
::::Stack{gap=2 .code-xs}
:Eyebrow[neon/runs/, after two /step]{tone=quiet code}

```text
runs/
├── .gitignore              ignores everything: nothing goes into git
└── 2026-10-14_12-42-14/    one chain of /step
    ├── 1-explorer/
    │   ├── explorer-1.html  the session, in a browser
    │   ├── explorer-1.jsonl the same, replayable
    │   └── usage.json       time, tools, tokens
    ├── 2-planner/  …
    └── chain.md             written by /chain export
```

:Eyebrow[1-explorer/usage.json, excerpt]{tone=quiet code}

```json
"agent": "explorer",  "model": "ilaas/gemma-4-31b",
"wallMs": 49393,      "toolCalls": 6,
"input": 35591,       "output": 4983,
"contextTokens": 10961,  "cost": 0
```
::::

::::Stack{gap=4}
::Specs{w="7.6rem" raw}
- **meanwhile** one line per sub-agent above the prompt: state, model, tokens sent and received, duration
- **/chain** the steps, what each one passed on, their folder
- **/chain export** `chain.md`: each step, its request, its reply, its cost, links to the sessions
- **/run** a flow adds `snapshot.json` (the flow and agents as read) and `journal.jsonl` (one fact per line)
::

::Note{tag="cost: 0"}
ILaaS does not report a cost: this 0 means not reported, not free.
::
::Note{tag="/export"}
It sees nothing of a loop made of `/step`: the trace is in `runs/`.
::
::::
:::::

---
section: Part 2 · Delegation
---

# Exercises: the loop, the window, the trace

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="01 · The loop" title="Decide the next step" size=sm}
Take step 1 to the first `APPROVED`. If rejected, send it back to the coder or the planner, and note why.

::Detail
To show: step 1 diff, `npm test` output, verdict and reasoned decision.
::
:::
:::Card{variant=accent eyebrow="02 · The window" title="Compare contexts and tokens" size=sm}
After the explorer’s note, `/session`: **no messages**. Redo the same note in a fresh session without combo (`pi -ne`). Compare the `/session` outputs, then the tokens of the direct session and those in the step’s `usage.json`.

::Detail
Our run, with gemma-4-31b: delegated, 36k tokens sent and nothing in your window; direct, 10k sent and 6k that stay there.
::
:::
:::Card{variant=accent eyebrow="03 · The trace" title="Prove who ran" size=sm}
`/chain` gives the `runs/<date>/` folder. Open the reviewer’s HTML session: which files did it read, with which model, in how many tool calls?

::Detail
To show: the step folder and its line in `usage.json`.
::
:::
::::

::Note{tag="Keep" .mt-5}
The `runs/<date>/` folder · the step 1 diff · the test output · the log of your decisions
::
:::::

---
section: Part 2 · Delegation
---

# Generalising

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Delegating means isolating a context
::Detail
The sub-agent works in its own context: only its conclusion comes back, not its reads. If it is as big as what it read, nothing is isolated.
::
:::
:::Item{variant=adv n=2}
Tools guarantee the limits
::Detail
Removing a capability is more reliable than forbidding it in a prompt. Without a shell, the coder cannot run the tests.
::
:::
:::Item{variant=adv n=3}
Separate production and evaluation
::Detail
The reviewer judges the code in a fresh context. It points out errors, but does not fix them.
::
:::
:::Item{variant=adv n=4}
Every omitted field has a default
::Detail
Without `model:`, today’s settings. Without `tools:`, read-only. Without `name`, the agent is not loaded.
::
:::
:::Item{variant=adv n=5}
Split to keep the work under control
::Detail
Each step fits in one coder call and starts with a red test. Otherwise, split further.
::
:::
:::Item{variant=adv n=6}
Drive before you automate
::Detail
Running the loop by hand brings out the decisions, the criteria and the returns to automate.
::
:::
::::

---
layout: section
index: Part 3 / 5
---

::SectionHead{num="03" detail="The loop written in a file"}
# Workflows
::

::Agenda
- Recognise the patterns of a workflow in the loop
- Write that loop in a file that Pi runs on its own
- Make the tests the final judge, and choose where the human stays in control
- Adapt the file to your needs in a few lines
- Find the same building blocks in Claude Code, Codex and OpenCode
::

---
section: Part 3 · Workflows
---

# Your loop is a graph :Hint[workflows module]{prefix="Course," href="https://ai-for-dev.github.io/hands-on-harness/act2-workflows"}

::Stack{fill center}
<LoopMap />
::

::::Cols{cols=2 gap=6 .mt-4}
::Takeaway
Doing this loop twice by hand is instructive. Twenty times, you would rather **automate** it in a workflow.
::
::Note{tag="But"}
Automating is not removing the human: it means deciding which moves to hand to code, and where to keep human judgement.
::
::::

---
section: Part 3 · Workflows
---

# Five patterns to assemble agents :Hint[Anthropic]{prefix="Building Effective Agents," href="https://www.anthropic.com/engineering/building-effective-agents"}

::Stack{fill center}
<Motifs />
::

::Note{.mt-4}
The same patterns come back in most multi-agent systems. In a flow, `parallel` and `loop` are dedicated nodes. The other patterns come from how the nodes follow one another.
::

---
section: Part 3 · Workflows
---

# A flow: a YAML and markdown file

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-sm}
:Eyebrow[neon/.pi/flows/impact-plan.md]{tone=quiet code}

```md
---
name: impact-plan
description: The impact note, then the plan
input: string
nodes:
  - id: note
    agent: explorer
    reads: [input]
  - id: plan
    agent: planner
    reads: [input, note]
---

## note
Return the impact note for the ticket named in `input`.

## plan
Split the ticket named in `input` into small steps,
using the note in `note` as a map.
```
:::
:::Stack{gap=4}
::Specs{w="4.5rem" raw}
- **Header** the flow’s name, its nodes, in execution order
- **Body** one `## <id>` section per node: the agent’s instruction
- **reads** exactly what each agent receives, nothing else
::

::Note
What you were doing when pasting the ticket, the step and the diff for the reviewer. The file is **checked in full** before any model call.
::

::Card{variant=accent eyebrow="In the room" size=sm}
Put this file in `.pi/flows/`, then in Pi:

<p class="mono" style="font-size:0.7rem;line-height:1.5">/herdr on<br />/run impact-plan handle ticket #2 in ISSUES.md</p>
::
:::
::::

---
section: Part 3 · Workflows
---

# What the flow automates

::Lead
Every move repeated in the hand-run loop becomes a checkable rule.
::

:::Stack{fill center}
::Matrix{size=md left first="22rem"}
| you, by hand | in the flow |
| --- | --- |
| `/step explorer`, and the tester alongside | `parallel`: two reads at once |
| the planner splits the ticket | `output.steps`: a list of steps |
| you pass each step to the coder | `map-from`: one step after another |
| you run `npm test` | `check`: runs `.pi/checks/test.sh` |
| you restart coder and reviewer | `loop` and `max`: until approval |
| you go back to the planner | the auditor reviews it all, a second round replans what is left |
| `/chain` and your log | `runs/<timestamp>/`: the trace of every agent |
::
:::

::Takeaway
The flow does not guess your method: it formalises the transitions that **you** decided.
::

---
section: Part 3 · Workflows
---

# An automatic test is not enough

:::::Cols{cols=2 gap=8 fill align=center}
::::Stack{gap=4}
::Lead
The loop only moves on if the test script succeeds **and** the reviewer approves. Otherwise, another try, three at most.
::

:::Cell{.code-sm}
```yaml
- id: step
  loop: tests.output.passed && review.output.approved
  max: 3
  do:
    - id: code
      agent: coder
    - id: tests
      check: .pi/checks/test.sh
    - id: review
      agent: reviewer
```
:::
::::
::::Stack{gap=4}
:::Card{variant=soft eyebrow="Two complementary proofs" size=sm}
::Specs{w="7rem"}
- **Green tests** the constrained behaviours are checked
- **APPROVED** the step is accepted by a fresh reviewer
::
:::
::Card{variant=accent eyebrow="A cap on every loop" size=sm}
Without `max`, a model that never converges would run until the budget is gone. combo says when the limit is reached.
::
::Card{variant=teal eyebrow="And for the whole ticket?" tone=teal size=sm}
Tests only check what they constrain. The **auditor** checks what tests and step reviews can miss.
::
::::
:::::

---
section: Part 3 · Workflows
---

# Issue #2: a two-level flow :Hint[hands-on-harness/scripts/flows/issue2.md]{href="https://github.com/AI-for-dev/hands-on-harness/blob/main/scripts/flows/issue2.md"}

::Lead
Six agents, two bounded loops, a final audit to judge the whole ticket.
::

::::Cols{cols=5 gap=3 .mt-4}
::Step{n=1 title="Reads"}
explorer + tester · `parallel`
::
::Step{n=2 title="Plan"}
planner · `output.steps`
::
::Step{n=3 title="Plan steps"}
coder → check → reviewer · `map-from`
::
::Step{n=4 title="Suite"}
`npm test` · `check`
::
::Step{n=5 title="Audit"}
auditor · overall verdict
::
::::

::::Cols{cols=2 gap=6 fill align=center .mt-4}
::Card{variant=soft eyebrow="Step loop · 3 tries at most" size=sm}
Green tests **and** an approving reviewer. `on-fail: continue` moves on to the next step.
::
::Card{variant=accent eyebrow="Ticket loop · 2 rounds at most" size=sm}
Unsatisfying audit: the planner replans what is still open, and only that.
::
::::

::Note{tag="Limits" .mt-4}
6 steps at most · 3 tries per step · 2 rounds · 15 minutes: the limits prevent endless runs.
::

---
section: Part 3 · Workflows
---

# What the first runs taught us

::Lead
The trace explains why a run stopped, and what to change in the flow.
::

::::Cols{cols=3 gap=5 fill content=center}
:::Card{badge="1" title="The planner answers in free text" size=sm}
A very good plan, but without the expected `output.steps` structure, and the run stops.

::Detail
**Fix**: `retry: 1`, the second try restates the expected format.
::
:::
:::Card{badge="2" title="The step can never turn green" size=sm}
A step that only “writes the red tests” cannot satisfy a loop that requires green tests: it burns its three tries.

::Detail
**Fix**: red test and fixing code in the **same step**.
::
:::
:::Card{badge="3" badgeTone=teal title="The verdict stays in the prose" size=sm}
The reviewer rejects twice in prose, without calling `verdict`: the step fails, the next ones pick up the work, the audit approves.

::Detail
Only the trace made it possible to understand.
::
:::
::::

::Takeaway{.mt-5}
Before raising `retry`, check that the exit condition is **reachable**.
::

---
section: Part 3 · Workflows
---

# Workshop: run and inspect the flow

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=3 .code-xs}
```bash
cd /path/to/neon
mkdir -p .pi/agents .pi/flows .pi/checks
cp /path/to/hands-on-harness/scripts/agents/*.md .pi/agents/
cp /path/to/hands-on-harness/scripts/flows/issue2.md .pi/flows/
printf '#!/usr/bin/env bash\nnpm test\n' > .pi/checks/test.sh

printf '.pi/\nruns/\n' >> .gitignore
git add .gitignore && git commit -m "ignore .pi and runs"

pi install -l npm:@ai-for-dev/combo   # if not done already
pi
```

```text
/flows                  the flows found
/flows issue2           the nodes, and the checked file
/run issue2 handle ticket #2 in ISSUES.md
/run resume             resume an interrupted run
```
:::
:::Stack{gap=3}
::Bullet{size=sm k="1" accent}
On first launch, choose **Trust**: otherwise, Pi loads neither `.pi/` nor combo
::
::Bullet{size=sm k="2" accent}
Break the file on purpose (`agent: codeur`): `/flows` names the node and suggests the right name
::
::Bullet{size=sm k="3" accent}
Run ticket #2: about twenty minutes on ILaaS with gemma-4-31b
::
::Note{tag=".gitignore"}
The `diff` read by the reviewer and the auditor counts untracked files: without these lines, the agents, the `.pi/` packages and the traces would end up in it.
::
::Card{variant=accent eyebrow="Don’t settle for the verdict" size=sm}
After `/run`, check `npm test`, the public exports, `git diff` and `runs/<timestamp>/` yourself.
::
:::
::::

---
section: Part 3 · Workflows
---

# Choosing a human stop before the commit

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-sm}
```yaml
  - id: go
    ask: "Commit this change?"
    confirm: true
    default: false
    reads: [diff]

  - id: ship
    choice:
      - when: go.output.yes
        do:
          - id: message
            agent: committer
            reads: [input, diff]
          - id: commit
            commit: message
    default: []
```
:::
:::Stack{gap=4}
::Lead
An automated flow can ask for approval where a mistake would be costly: a question, a branch, the commit.
::
::Specs{w="7.5rem" raw}
- **committer** shipped with combo, guided by a `## message` section
- **commit** on a branch of its own for the run, no automatic push
- **default: false** no implicit consent: with nobody at the screen, no commit
::
::Card{variant=soft eyebrow="A design choice" size=sm}
Put human stops where a mistake costs more to undo than to prevent. For example, a discussion of the ticket to enrich the plan.
::
:::
::::

---
section: Part 3 · Workflows
---

# A reusable flow becomes a building block

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-xs}
```md
---
name: ticket
description: The issue2 flow as a building block, then the commit
input: string
nodes:
  - id: work
    flow: issue2
    input: input
  - id: message
    agent: committer
    retry: 1
    reads: [input, diff]
  - id: commit
    commit: message
---

## message
Write the commit message for the change in `diff`,
made for the request in `input`.
```
:::
:::Stack{gap=3}
:Eyebrow[Adapt without rewriting everything]{tone=teal}

::Bullet{size=sm k="model" badge=tag}
A bigger model for the planner and the auditor: in their agent files
::
::Bullet{size=sm k="node" badge=tag}
An audit too costly for a small ticket: remove its node, simplify the round condition
::
::Bullet{size=sm k="parallel" badge=tag}
Independent steps, each in its own copy: `concurrency: 2` and `copies: true` on the `map`
::
::Card{variant=accent eyebrow="Beware" size=sm .mt-2}
Here, the commit is direct. To keep human approval, put `ask` and `choice` back in.
::
:::
::::

---
section: Part 3 · Workflows
---

# Generalising: four design principles

::Lead
A good harness is an explicit process, observed and corrected.
::

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=goal n=1}
Automate what you have observed
::Detail
The flow formalises the decisions made by hand in the previous part: you know where each line goes.
::
:::
:::Item{variant=goal n=2 ghost}
Make the trace talk
::Detail
A failed run should lead to a concrete change in the flow.
::
:::
:::Item{variant=goal n=3 ghost}
Structure the verdicts
::Detail
A tool like `verdict` rather than `APPROVED` searched for in prose. Classification models, like [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), answer this kind of question for very few tokens.
::
:::
:::Item{variant=goal n=4 ghost}
Place the human stops
::Detail
Ask for approval where a mistake is costly to fix, and nowhere else.
::
:::
::::

::Takeaway{.mt-4}
Automating does not remove responsibility: it shifts to **designing** and **checking** the flow.
::

---
section: Part 3 · Workflows
---

# The same building blocks elsewhere :Hint[official docs, 14 October 2026]

::Matrix{size=sm left first="12rem"}
<table>
<thead><tr><th></th><th>Pi + combo</th><th>Claude Code</th><th>Codex CLI</th><th>OpenCode</th></tr></thead>
<tbody>
<tr class="is-group"><th colspan="5">Hooks</th></tr>
<tr><td>written in</td><td>TypeScript</td><td>command (JSON)</td><td>command (JSON, TOML)</td><td>JS or TS plugin</td></tr>
<tr><td>block a tool</td><td><code>tool_call</code></td><td><code>PreToolUse</code></td><td><code>PreToolUse</code></td><td><code>tool.execute.before</code></td></tr>
<tr><td>restart at the end</td><td><code>agent_before_settle</code></td><td><code>Stop</code></td><td><code>Stop</code></td><td><Mark v="no">not documented</Mark></td></tr>
<tr class="is-group"><th colspan="5">Sub-agents</th></tr>
<tr><td>file</td><td><code>.pi/agents/*.md</code></td><td><code>.claude/agents/*.md</code></td><td><code>.codex/agents/*.toml</code></td><td><code>.opencode/agents/*.md</code></td></tr>
<tr><td>restricted tools</td><td><code>tools</code></td><td><code>tools</code></td><td><Mark v="no">no list</Mark></td><td><code>permission</code></td></tr>
<tr class="is-group"><th colspan="5">Workflows</th></tr>
<tr><td>in a file</td><td>markdown flow</td><td>JavaScript script</td><td><Mark v="no">no, SDK</Mark></td><td><Mark v="no">no, SDK</Mark></td></tr>
<tr><td>trace and tokens</td><td><code>runs/</code></td><td><code>~/.claude/projects/</code></td><td><code>codex exec --json</code></td><td><code>opencode stats</code></td></tr>
</tbody>
</table>
::

---
layout: section
index: Part 4 / 5
---

::SectionHead{num="04" detail="Having agents debate"}
# The swarm
::

::Agenda
- What sets a swarm apart from delegation or a workflow
- The shared board, and what stops a discussion
- Have three agents debate, and watch what moves them
- Give the debate a question it can settle
::

---
section: Part 4 · The swarm
---

# Agents that answer each other :Hint[swarm module]{prefix="Course," href="https://ai-for-dev.github.io/hands-on-harness/act2-swarm"}

::Stack{fill center}
<Topologies />
::

::::Cols{cols=2 gap=6 .mt-4}
::Takeaway
A question **with no known path** calls for a discussion: someone who argues for another option, and changes their mind when you are right.
::
::Note{tag="The price"}
Each member rereads what the others wrote at every round, and you cannot know in advance how many rounds it will take.
::
::::

---
section: Part 4 · The swarm
---

# The board: a shared log :Hint[combo docs, swarms]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/swarm.md"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
A swarm member is an ordinary agent whose toolkit includes the `board` tool. It keeps its own context and only sees of the others **what they post**.
::
::Specs{w="7rem" raw}
- **append-only** nobody changes or deletes a message: the debate reads back as it happened
- **author** written by the board, not declared by the member: nobody speaks for someone else
- **every round** combo hands each member what is new, starting with what answers it
- **caps** 200 messages, 50 per member, 2,000 characters, never the same message twice
::
:::
:::Stack{gap=4}
:Eyebrow[Three kinds of message for a debate]{tone=teal}

::Matrix{size=md left first="6rem"}
| kind | use |
| --- | --- |
| `result` | its answer to the question, here its vote; one per round |
| `tell` | an argument; with `re`, it answers a specific message |
| `ask` | a question, addressed to a single member with `to` |
::

::Note{tag="Elsewhere"}
In OpenAI’s [Swarm](https://github.com/openai/swarm), an agent hands over to another, which inherits the whole history. combo keeps one context per member: the trace says who said what to whom.
::
:::
::::

---
section: Part 4 · The swarm
---

# What stops a swarm?

:::::Stack{fill center gap=5}
::Lead
A ticket is done when the tests pass. A debate has no criterion that clear: combo offers three.
::

::::Cols{cols=3 gap=5}
:::Card{badge="1" title="The number of rounds" size=sm}
`--rounds`, 3 by default. It caps the spending.

::Detail
A debate stopped by this cap has concluded nothing.
::
:::
:::Card{badge="2" badgeTone=teal title="Coverage" size=sm}
`--claim` gives a list of things to take, and the swarm stops when each one has a result.

::Detail
Repurposed to hand out sides: `--hold 1` limits each member to one claim.
::
:::
:::Card{variant=accent badge="3" title="Agreement" size=sm}
`--until agree`: each member posts a `result` starting with `VOTE: <answer>`, and the swarm stops when **all** the latest votes are identical.

::Detail
Two out of three is not enough. A member that gives up prevents agreement.
::
:::
::::
:::::

---
section: Part 4 · The swarm
---

# The debater shipped with combo

::::Cols{cols="5fr 4fr" gap=7 fill align=center}
:::Stack{gap=2 .code-xs}
:Eyebrow[combo/agents/debater.md, excerpt]{tone=quiet code}

```markdown
---
name: debater
description: Argues one side of a question beside other
  debaters, and votes every turn until they all vote the same
tools: board
lifetime: workflow
---

You are one of several agents arguing about one question.
The others argue at the same time, none of you can see
another's context, and nobody arbitrates.

Every turn, post one `result` to the board: your vote,
and under it the one argument the others have not answered.

To answer somebody, post a `tell` with `re` set to the id
of the post you are answering.

Change your vote when somebody is right: agreeing is the
result, not a defeat. But agreeing to be done with it,
without a reason you could give out loud, is worse than
still disagreeing.
```
:::
:::Stack{gap=4}
::Specs{w="6.4rem" raw}
- **tools** the `board` tool only: it reads no file, the debate does not depend on the repository
- **lifetime** `workflow`: it remembers what it was told the round before
- **instruction** one vote per round, answer with `re`, change your mind when the other is right, never just to be done
::
::Note{tag="combo ≥ 0.5.0"}
First version shipping `--until agree` and the `debater` agent.
::
:::
::::

---
section: Part 4 · The swarm
---

# Exercise: three copies, then three sides to take

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-xs}
:Eyebrow[1 · No sides]{tone=quiet code}

```text
/herdr on
/swarm --members 3 --until agree --rounds 4 --agent debater
       Which language should we choose to write a new
       scientific computing software?
```

:Eyebrow[2 · One language to take per member]{tone=quiet code .mt-3}

```text
/swarm --members 3 --claim Python,Julia,C++ --hold 1
       --until agree --rounds 4 --agent debater
       Which language should we choose to write a new
       scientific computing software? Each of you starts
       by defending the language you took.
```

::Note{tag="--claim" .mt-3}
A member asking for a language already taken is refused, and invited to choose among those still free.
::
:::
:::Stack{gap=4}
:Eyebrow[To note, in the board pane and the sessions]{tone=teal}

::Specs{w="6rem" raw}
- **claim** the language each member asked for, and what the tool answered
- **vote** each member’s language, at every round
- **exchanges** the `tell` with `re` that answer another member
- **rounds** how many were played before the stop
::

::Card{variant=soft eyebrow="To discuss" size=sm}
Three copies of the same agent: is that three opinions? Is a language with a single holder actually defended?
::
:::
::::

---
section: Part 4 · The swarm
---

# One agent per side :Hint[hands-on-harness/scripts/agents/]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/agents"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-xs}
:Eyebrow[neon/.pi/agents/debat-julia.md, excerpt]{tone=quiet code}

```markdown
---
name: debat-julia
tools: board
lifetime: workflow
model: ilaas/gemma-4-31b
---

You are one of three agents debating one question on a
shared board. You open for Julia. The two others open for
Python and C++. […]
```

```text
/herdr on
/swarm --agent debat-python,debat-julia,debat-cpp
       --until agree --rounds 6
       Which language should we choose to write a new
       scientific computing software?
```
:::
:::Stack{gap=4}
::Lead
One file per side, with its prompt, its model and the line that says what it defends. A side that is **written** cannot be refused.
::
::Note{tag="--agent"}
A list of agents puts each of them once on the board. Needs combo > 0.6.0.
::
::Note{tag="--timeout"}
A debater can reread the board in a loop: `/swarm` cuts a round after 5 minutes, `--timeout 3m` shortens it, and a member cut twice leaves the debate.
::
::Card{variant=accent eyebrow="In the room" size=sm}
Copy `debat-*.md` into `.pi/agents/`, start the debate and follow the `board` pane. In `runs/<date>/1-swarm/`, note at which round each debater changes its vote, if it does.
::
:::
::::

---
section: Part 4 · The swarm
---

# Reading the trace of a debate

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Three places to look, from the most visible to the most private.
::
::Specs{w="7.6rem" raw}
- **board pane** the order of the messages, and what each `tell` answers
- **HTML session** each debater’s reasoning, round by round: what it is trying to get
- **usage.json** tokens, duration, members cut off by the timeout
::
:::
:::Stack{gap=3}
:Eyebrow[For the debrief]{tone=teal}

::Bullet{size=sm k="1"}
Did a vote move? At which round, and because of **which message**?
::
::Bullet{size=sm k="2"}
Do the debaters answer each other, or does each one repeat its case?
::
::Bullet{size=sm k="3"}
What does a debater’s reasoning say about what it calls **winning**?
::
::Bullet{size=sm k="4"}
If agreement comes, is it driven by an argument, or by the wish to be done?
::
:::
::::

---
section: Part 4 · The swarm
---

# Varying the setup

:::::Stack{fill center gap=5}
::Lead
Same debate, one setting changed at a time. Each group takes one, and we compare on the board.
::

::::Cols{cols=3 gap=5}
:::Card{badge="1" title="The instruction" size=sm}
Add a sentence to the question:

“The goal is not to win: it is to find the answer the others can also stand behind.”
:::
:::Card{badge="2" badgeTone=teal title="The model" size=sm}
`--model` forces the same model on all members. Try another one than in the files, for example `qwen3.8-flash` or `deepseek-v4.1-flash`.
:::
:::Card{badge="3" title="The vote format" size=sm}
Reread each member’s last `VOTE:` line. `--until agree` compares them **character for character**: do they say the same thing without writing it the same way?
:::
::::

::Note{tag="One run, one try"}
Two identical runs can differ: before drawing conclusions about a setting, run it again.
::
:::::

---
section: Part 4 · The swarm
---

# Give the debate a question it can settle

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Card{variant=soft eyebrow="The prompt, after the command" size=sm}
<p class="mono muted" style="font-size:0.64rem;line-height:1.45;white-space:nowrap">/swarm --agent debat-python,debat-julia,debat-cpp --until agree --rounds 4</p>

A team of six physicists and two research engineers is starting a new plasma simulation code. It must run on the national supercomputer’s **NVIDIA and AMD GPUs**, be maintained for **at least ten years**, and take over an **existing 40,000-line Fortran 90 kernel**. The physicists know **Python well and C++ little**. Which main language should this code use?

:Rule

Vote for the main language only, in one word: where the other languages fit goes in your argument. The goal is not to win: it is to find the answer the others can also stand behind.
:::
:::Stack{gap=3}
::Bullet{size=sm k="criteria" badge=tag}
Written requirements, on which one argument can beat another
::
::Bullet{size=sm k="vote" badge=tag}
One word, the split between languages goes in the argument
::
::Bullet{size=sm k="goal" badge=tag}
The sentence about the goal, from the previous try
::
::Card{variant=soft eyebrow="To discuss" size=sm .mt-2}
What did the first question not say? What changes in the exchanges?
::
:::
::::

---
section: Part 4 · The swarm
---

# Debrief

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Copies, opinions?
::Detail
What did three copies of the same agent do, with no sides? What does it take for a swarm to really debate?
::
:::
:::Item{variant=adv n=2}
What moves a vote?
::Detail
An argument, a sentence in the instruction, a criterion in the prompt, the model?
::
:::
:::Item{variant=adv n=3}
Did the stop see everything?
::Detail
Did members who agreed on substance vote differently? What exactly does `--until agree` count?
::
:::
:::Item{variant=adv n=4}
What is the answer worth?
::Detail
Does it differ from a single agent’s? Who can judge it, and with what in hand?
::
:::
:::Item{variant=adv n=5}
For which decision?
::Detail
How many tokens and minutes? For which decision in your field is a debate worth that cost, and when is a workflow enough?
::
:::
:::Item{variant=adv n=6}
Where does the human fit?
::Detail
Who asks the question, chooses the sides and sets the stop? What is left to decide after the debate?
::
:::
::::

---
layout: section
index: Part 5 / 5
---

::SectionHead{num="05" detail="Making work outlive the process"}
# Pi Durable
::

::Agenda
- Tell conversation history apart from execution state
- Install the SDK and assemble a durable harness
- Two uses: a collaborative interface and a multi-agent runtime
::

---
section: Part 5 · Pi Durable
---

# Pi and Pi Durable: two distinct roles

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=7}
:::Card{eyebrow="Pi" title="Coding agent" size=sm}
- Ready-to-use terminal interface
- Sessions and conversation history
:::
:::Card{variant=teal eyebrow="Pi Durable" title="Long-running SDK" tone=teal size=sm}
- Execution state and tool calls persisted
- Tasks resume after a restart
:::
::::

::Takeaway
Pi Durable saves the **work in progress**, not just the dialogue.
::

::::Cols{cols=3 gap=5}
::Note{tag="Since Pi 1.0.0"}
The SDK is part of the Pi repository.
::
::Note{tag="Experimental"}
For now it stays separate from Pi, and its API may change.
::
::Note{tag="To build"}
The SDK provides the durable engine, not the user interface.
::
::::
:::::

---
section: Part 5 · Pi Durable
---

# Installation and first steps :Hint[official README]{href="https://github.com/earendil-works/pi/blob/main/packages/durable/README.md"}

:::::Stack{fill center gap=5}
::Lead
An SDK installed alongside Pi, with npm and Node.js 22.19 or later:
::

:::Cell{.code-sm}
```bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```
:::

::::Cols{cols=4 gap=4 align=stretch}
::Step{n="01" title="Choose the model"}
API key or authentication.
::
::Step{n="02" title="Set up storage"}
SQLite or JSONL to resume after a stop.
::
::Step{n="03" title="Plug in the tools"}
`CodingTools`, project folder and environment.
::
::Step{n="04" title="Start the Harness"}
`open()`, `root()`, `submit()` and `resume()`.
::
::::

::Note{tag="Examples"}
[Coding agent](https://github.com/earendil-works/pi/blob/main/packages/durable/test/examples/26-coding-agent.ts) · [background sub-agents](https://github.com/earendil-works/pi/blob/main/packages/durable/test/examples/23-subagent-background.ts)
::
:::::

---
section: Part 5 · Pi Durable
---

# Two examples among others

:::::Stack{fill center}
::::Cols{cols=2 gap=7 align=stretch}
:::Card{variant=accent eyebrow="Collaborative experience" title="Pi Pocket" size=sm}
- Web and mobile app for Pi
- Access to agents from a browser
- Shared sessions and live steering
- Tasks and sub-agents that survive restarts

:Rule

**Role of Pi Durable:** persistent execution and state.

::Detail
[github.com/TannerMidd/pi-pocket](https://github.com/TannerMidd/pi-pocket)
::
:::

:::Card{variant=teal eyebrow="Multi-agent orchestration" title="pi-fabric" tone=teal size=sm}
- Programmable runtime for Pi
- Resident agents and composable workflows
- Coordination and durable tasks
- Runner built on Pi Durable for resuming

:Rule

**Role of Pi Durable:** a component of the runtime.

::Detail
[github.com/fabric-runtime/pi-fabric](https://github.com/fabric-runtime/pi-fabric)
::
:::
::::
:::::

---
layout: statement
---

:Eyebrow[Time to practise]{.mb-6}

# Your turn!

<p class="muted mt-6" style="font-size:0.95rem">
What to keep from combo and trysquare, where to find skills, which more mature tools:<br />
<a href="https://ai-for-dev.github.io/hands-on-harness/a-vous-de-jouer">ai-for-dev.github.io/hands-on-harness/a-vous-de-jouer</a>
</p>

::LogoBar{size=40 dark .mt-10}
::

---
layout: section
index: Appendix
---

::SectionHead{eyebrow="Appendix" num="A"}
# Pi extensions<br />and combo
::

::Agenda
- Which extensions are closest to combo?
::

---
section: Appendix · Pi extensions
---

# Extensions close to combo :Hint[from the GitHub repositories, 10 October 2026]

::Matrix{size=xs left first="10rem"}
| extension | how close | in common | main difference |
| --- | --- | --- | --- |
| official `subagent` | the foundations of delegation | specialised agents; single, parallel and chain; run tracking | one Pi process per child; composition limited to the three basic modes |
| `pi-dynamic-workflow` | very close: architecture and programmable composition | in-memory Pi sessions; parallelism; pipelines; structured outputs | JavaScript workflow created on demand; no persistence or resume |
| `pi-subagents` | very close: execution and lifecycle | Pi SDK; specialised agents; scripted workflows; supervision | background tasks, FleetView, missions and agent steering |
| `pi-flows` | very close: patterns and guardrails | loops; graphs; routing; validation; resume; observability | Pi subprocesses; cost and token caps, delegation policies |
| `pi-orchestration` | close: complex orchestration | decomposition; planning; parallelism; validation; resume | goal-driven, with task planning and replanning |
::

::Note{tag="combo" .mt-4}
Eight combinators and declarative flows, explicit memory, result contracts and execution controls. A comparison by mechanism, not a quality ranking.
::
