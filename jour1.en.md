---
theme: ./theme
title: Workshop overview - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF day 1, October 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
lang: en
colorSchema: auto
# Logo de l'organisation AI-for-dev (dépôt AI-for-dev/.github, profile/brand).
favicon: /favicon.svg
themeConfig:
  footer: IA4Dev 2026 · ANF day 1
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/
  # Le même deck en français, relatif à celui-ci (/slides/en/jour1/).
  translation: ../../jour1/
# Version anglaise de jour1.md, slide pour slide : le bouton de langue garde
# le numéro de slide. Publiée sous /slides/en/jour1/, en hash comme les autres.
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
IA4Dev 2026 · ANF day 1
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Understanding and building your harness" style="transform: translateY(-2rem)"}
# Workshop<br />overview
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

# Who are we?

::::Cols{cols=2 gap=7 fill}
:::Speaker{name="Loïc" org="CMAP / CNRS / École polytechnique" avatar="avatar-loic" tone="blue"}
- Research engineer in scientific computing at CNRS
- Co-head of the HPC@Maths team
- Member of the Groupe Calcul
- Open source software developer
:::
:::Speaker{name="Max" org="PUD-GA / MSH Alpes / UGA" avatar="avatar-max" tone="red"}
- Research engineer in the humanities and social sciences at UGA
- Head of the TIPS-IA group
- Member of the CDGA unit
- Data processing and development
:::
::::

---
section: Introduction
---

# Before we start

:::::Stack{fill center gap=7}
::Lead
We are not experts in agentic AI. <br />
We are trying to **understand and tame the beast**.
::

::::Cols{cols=2 gap=6 content=center}
:::Card{variant=soft eyebrow="It moves very fast" center}
Keeping up with the field takes a lot of reading, and not just code review ;)
:::
:::Card{variant=soft eyebrow="True today" tone=teal center}
What we offer here will probably be different tomorrow.
:::
::::

::Takeaway
Our goal: give you enough to form **your own opinion** and shape how you use it.
::
:::::

---
section: Introduction
---

# How the workshop is organised

::::Stack{fill gap=2.5}
::Act{n=1 title="Today"}
Overview: where we stand, from model to agent, harness, today’s landscape, our tools, running example
::
::Act{n=2 title="Tomorrow"}
First steps with Pi, sandbox, context, evaluation, skill
::
::Act{n=3 title="The day after"}
Hook, delegation, workflow, experimenting on your own, evaluating and discussing
::
::::

::::Stack{gap=1.5 .mt-5}
::Note{tag="Written version"}
A written version of the course is available at
[github.com/AI-for-dev/hands-on-harness](https://github.com/AI-for-dev/hands-on-harness)
::
::Note{tag="Slides"}
The slides are available at
[github.com/AI-for-dev/slides](https://github.com/AI-for-dev/slides)
::
::::

---
layout: section
index: Part 1 / 6
---

::SectionHead{num="01"}
# The foundations
::

::Agenda
- A short history
- The many ways to use it
- Goals and where we stand
::

---
section: Part 1 · The foundations
---

# A brief history

::Stack{fill center}
<EraTimeline :eras="[
  { year: '2021 - 22', title: 'Completion', lines: ['The LLM completes code on the fly, in the editor'], tone: 'a' },
  { year: '2022 - 23', title: 'Chat', lines: ['ChatGPT opens to the public', 'Prompt engineering'], tone: 'b' },
  { year: '2023 - 24', title: 'Agent', lines: ['LLM + tools: it acts instead of answering', 'RAG for internal documentation'], tone: 'c' },
  { year: 'Late 2024 - 25', title: 'Harness', lines: ['MCP (late 2024), context engineering', 'A system that puts it all together, for long tasks'], tone: 'd' },
  { year: 'Late 2026 - 27?', title: 'Software factory', lines: ['Humans write specs and scenarios, agents code and validate'], tone: 'd', future: true },
]" />
::

---
section: Part 1 · The foundations
---

# Different ways to use AI for coding :Hint[Shapiro, 2026]{prefix="Inspired by" href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/"}

::Stack{fill center}
<AutonomyLadder />
::

---
section: Part 1 · The foundations
---

# Goals for the next two workshop days

::::Cols{cols=5 gap=6 fill align=center}
:::Cell{span=3}
::::Stack{gap=4}
:::Item{variant=goal n=1}
Better understand and control your agents and your harness
:::
:::Item{variant=goal n=2 ghost}
Experiment, discuss and move forward together
::Detail
Before, during and after the course
::
:::
::::
:::

:::Cell{span=2}
::Card{variant=soft center}
**We are not here to promote the use of AI.**<br />
It is up to each of you to decide where you stand.

:Rule

But by organising this ANF and this workshop, aren’t we encouraging the use of AI?
*Aren’t we?*
::
:::
::::

::Note{tag="Elsewhere in the ANF" .mt-4}
Legal, social and environmental questions are covered by other speakers.<br /> The course lists references in its appendix.
::

---
layout: quote
section: Part 1 · The foundations
---

::Quote{small eyebrow="Experiment, don’t bury your head in the sand" cite="Linus Torvalds" href="https://www.phoronix.com/news/Linux-Is-Not-Anti-AI" hrefLabel="phoronix.com/news/Linux-Is-Not-Anti-AI" note="in brackets, our additions"}
The solution is not to put your head in the sand and sing “La La La, I can’t hear you”
at the top of your voice like some people seem to do. The solution is to make sure those LLM tools *help*
maintainers :Added[and developers] instead of just causing them pain.
There’s no question on that side. We’re not forcing anybody to use it, but I will very
loudly ignore people who try to argue against other people from using it
:Added[or not using it]. And no, AI isn’t perfect. But Christ,
anybody who points to the problems at AI had better be looking in the mirror and pointing at themselves at the same time.
Because it’s not like *natural intelligence* is always all that great either.
::

---
layout: section
index: Part 2 / 6
---

::SectionHead{num="02"}
# From model<br />to agent
::

::Agenda
- LLM basics
- Reasoning effort
- The context window
- Tool calling, the heart of the agent
::

---
section: Part 2 · From model to agent
---

# LLM basics

::::Cols{cols=2 gap=9 fill align=center}
:::Cell
- Predicting the next token from the previous ones
- Different sizes and architectures
  ::Detail
  dense models or mixtures of experts (MoE), see the appendix
  ::
- Quantisation and optimisation
  ::Detail
  GGUF, see for example [unsloth](https://unsloth.ai/docs/fr/commencer/unsloth-model-catalog) · [MLX](https://korben.info/rapid-mlx-installation-macos.html) for Mac · <br /> [DS4](https://github.com/antirez/ds4) for DeepSeek and GLM MoE models
  ::
- [huggingface.co/models](https://huggingface.co/models)
  :Detail[no separate category for code, filed under “text generation”]
:::

:::Card{variant=soft eyebrow="A game with several parameters" tone=teal}
::Specs
- **VRAM** size of the GPU
- **Context** of the model, but also your infra
- **Speed** tokens per unit of time
- **Quality** on a specific task
- **Cost** economic, environmental…
::
:::
::::

---
section: Part 2 · From model to agent
---

# Reasoning effort :Hint[Cameron R. Wolfe]{prefix="Demystifying Reasoning Models," href="https://cameronrwolfe.substack.com/p/demystifying-reasoning-models"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Before answering, the model produces a long intermediate chain of thought. Quality improves by spending more compute **at answer time**: *test-time compute*.
::

::Note{tag="In a few months"}
[OpenAI o1](https://openai.com/index/learning-to-reason-with-llms/) in September 2024, <br /> [DeepSeek-R1](https://arxiv.org/abs/2501.12948) in January 2025
::
:::

:::Stack{gap=3}
::Bullet{k="$"}
It costs tokens and time. Most models let you **set the effort**, from fast mode to deep thinking.
::
::Bullet{k="↑" accent}
A planner benefits from reasoning at length.
::
::Bullet{k="↓"}
A well-scoped executor does not need it, and would cost a lot for nothing.
::
:::
::::

---
section: Part 2 · From model to agent
---

# The context window :Hint[Liu et al., 2023]{prefix="Lost in the Middle," href="https://arxiv.org/abs/2307.03172"}

:::::Stack{fill gap=6}
<div class="flex-1 min-h-0">
<LostInMiddle />
</div>

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=2}
::Note{tag="With nuance"}
Retrieving an isolated fact works almost perfectly on recent models (over 99% on the *needle in a haystack* test). Reasoning over scattered information remains harder.
::
:::

::Takeaway
Maximum and effective context windows are not the same. You need to manage your context. <br /> See tomorrow’s and the day after’s work.
::
::::
:::::

---
section: Part 2 · From model to agent
---

# Tool calling, or how a model acts

::Lead
The model executes nothing itself. It produces a **structured request**.  <br /> The harness runs it and sends back the result.
::

:::::Stack{fill gap=5}
<div class="flex-1 min-h-0">
<ToolLoop />
</div>

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=1}
:Eyebrow[From research to the API]{tone=teal}

::Detail
[ReAct](https://arxiv.org/abs/2210.03629) late 2022 · [Toolformer](https://arxiv.org/abs/2302.04761) early 2023 · [function calling](https://openai.com/index/function-calling-and-other-api-updates/) at OpenAI in June 2023 · [Claude tools](https://www.anthropic.com/news/tool-use-ga) in May 2024
::
:::

::Takeaway
This loop is the heart of the agent. <br />A harness enables orchestration that goes beyond tool calls
::
::::
:::::

---
layout: section
index: Part 3 / 6
---

::SectionHead{num="03"}
# What is<br />a harness?
::

:::Definition{source="After Avi Chawla, “The Anatomy of an Agent Harness”, April 2026" href="https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness"}
::Def{term="prompt engineering"}
shapes **the instructions** given to the model
::
::Def{term="context engineering"}
decides **what the model sees**, and when
::
::Def{term="harness engineering" hero}
contains both and adds **all the infrastructure**: tools, state, permissions, verification
::
:::

---
section: Part 3 · The harness
---

# A harness is software :Hint[Vivek Trivedy]{prefix="The Anatomy of an Agent Harness," href="https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2}
::Bullet{k="cfg" badge=tag size=sm}
A configuration file: available models, granted permissions
::
::Bullet{k="md" badge=tag size=sm}
An `AGENTS.md` or `CLAUDE.md` that holds the project’s rules
::
::Bullet{k="hooks" badge=tag size=sm}
Scripts that intercept the agent’s actions
::
::Bullet{k="skills" badge=tag size=sm}
A directory of skills loaded on demand
::
::Bullet{k="loop" badge=tag size=sm}
The agentic loop: model call, tool execution, review
::
:::

:::Stack{gap=4}
::Card{variant=accent center}
You build, debug and fix it **like any other software**: edited files, tests, commits.
::
::Note{tag="Weng"}
Compared with “agent = LLM + memory + tools + planning”, the harness adds work loops, evaluation, permissions and persistent state. <span class="muted">([Lilian Weng](https://lilianweng.github.io/posts/2026-07-04-harness/), July 2026)</span>
::
::Note{tag="Chawla"}
A harness reduced to a well-written system prompt is not a harness. <span class="muted">([Avi Chawla](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness), April 2026)</span>
::
:::
::::

---
section: Part 3 · The harness
---

# The seven building blocks of a harness

::Stack{fill center}
<HarnessMap />
::

---
section: Part 3 · The harness
---

# Formats shared across harnesses

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{eyebrow="Plugging in tools" title="MCP"}
A protocol to expose tools and data to an agent through a server: database, ticketing, documentation…

::Detail
Published by [Anthropic](https://www.anthropic.com/news/model-context-protocol) in November 2024
::
:::

:::Card{eyebrow="Setting the rules" title="AGENTS.md" tone=teal}
A Markdown file at the root of the repository: build and test commands, conventions, known pitfalls.

::Detail
Born at OpenAI Codex, Amp, Jules, Cursor and Factory, see [agents.md](https://agents.md)
::
:::

:::Card{variant=accent eyebrow="Loading on demand" title="Skills"}
A folder with a `SKILL.md` and scripts. The agent only reads the description, then the rest when it needs it.

::Detail
[Introduced by Anthropic](https://www.anthropic.com/news/skills) in October 2025, an open standard since December, see [agentskills.io](https://agentskills.io)
::
:::
::::

::Note{tag="Governance"}
Since December 2025, MCP and AGENTS.md have been entrusted to the [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), under the Linux Foundation.
::

::Takeaway
A skill or an MCP server written for one harness works in the others. Beware: each MCP server adds **its tool descriptions to the context**, so plug them in sparingly.
::
:::::

---
section: Part 3 · The harness
---

# Prompt injection :Hint[Simon Willison, June 2025]{prefix="The lethal trifecta," href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"}

::Lead
The model does not separate your instructions from the text it reads. An issue, a web page or a file in the repository can contain orders, and the agent may follow them.
::

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[Three ingredients that are dangerous together]{tone=accent}

::Bullet{k="1"}
Access to **private data**: keys, `.env`, internal code
::
::Bullet{k="2"}
Exposure to **untrusted content**: web, issues, dependencies
::
::Bullet{k="3"}
A way to **communicate externally**: network, `git push`, HTTP request
::
:::

:::Stack{gap=4}
::Card{variant=accent}
When all three come together, an injection can **exfiltrate your data**. The safest defence is to remove one of the three.
::
::Note{tag="In practice"}
Sandbox, bounded permissions, filtered network. The NÉON repository contains a booby-trapped file and a `.env` to practise on.
::
:::
::::

---
section: Part 3 · The harness
---

# A few characteristics :Hint[Addy Osmani]{prefix="Agent Harness Engineering," href="https://addyosmani.com/blog/agent-harness-engineering/"}

::::Stack{gap=4 fill center}
:::Card{badge="A" title="An evolving system"}
- No point starting too complex!
- Nor trying to cover every building block and calling it “done”
- Evolves with new models
  ::Detail
  e.g. [OpenAI’s “model guidance” for Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra)
  ::
- Ideally, should be **evaluated regularly**
:::

:::Card{badge="B" badgeTone=teal title="Tailor-made"}
- There is no universal harness that works well for everyone…
- It depends on **your uses** and **your history of failures**
:::
::::

::Takeaway{.mt-6}
The key skill is not to “install everything”, but to know which building blocks to
**thicken**, **minimise** or **remove**.
::

---
layout: section
index: Part 4 / 6
---

::SectionHead{num="04" detail="October 2026"}
# Today’s<br />landscape
::

::Agenda
- Models: what is on offer and what you can use
- Harnesses and ways of working with an agent
- Benchmarks and what studies measure
::

---
section: Part 4 · The landscape
---

# Everything on offer vs “what you can actually use”

::::Stack{fill center}
:::Cols{cols=4 gap=4}
::Criterion{n=1 title="Institutional constraint"}
The 1<sup>st</sup> question to ask! What does my institution (or institutions) allow?
::
::Criterion{n=2 title="Ethics"}
You may be allowed to use a model, but it may not be appropriate (strategic code, sensitive data…)
::
::Criterion{n=3 title="Human"}
A discussion to have within projects: what level(s) of AI use do we choose? Which AI(s)?
::
::Criterion{n=4 title="Technical"}
Given the infrastructure I can access (IlaaS, Albert API…, paid subscription), which models can I use?
::
:::
::::

---
section: Part 4 · The landscape
---

# How it evolves over time

::Stack{fill}
<Fig src="/images/llm-timeline-labonne.jpg" contain caption="Maxime Labonne, September 2026" href="https://maximelabonne.substack.com/p/the-state-of-the-open-frontier" />
::

---
section: Part 4 · The landscape
---

# Over the current period :Hint[artificialanalysis.ai, October 2026]{prefix="From" href="https://artificialanalysis.ai/"}

::::Cols{cols="1fr 17rem" gap=5 fill align=center}
:::Cell{fill}
<Fig src="/images/aa-index-chart.jpg" contain />
:::
:::Card{variant=soft eyebrow="Open weight" tone=teal size=sm}
::Specs
- **1T A42B** MiMo-V2.6-Pro
- **753B A40B** GLM-5.3
- **2.8T A104B** Kimi K3
- **320B A18B** GLM-5.3-Flash
- **552B A16B** DeepSeek V4.1 Flash
- **27B** Qwen3.8 27B
::

::Detail
**A 12-point gap** between the best proprietary model (58) and the best open weight one (46): the difference clearly shows in the quality of the answers.
::
:::
::::

::Note{tag="v4.3 · 10 evaluations" .mt-4}
AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode,
Humanity’s Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1
::

---
section: Part 4 · The landscape
---

# What you can use in French academia

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[Good practice in general, if you can]

:::Item{variant=role n=1}
**A large model** to plan
:::
:::Item{variant=role n=2 ghost}
**A smaller model** to carry out the tasks
:::
:::Item{variant=role n=3}
**A large model** to check
:::
:::

:::Card{variant=soft eyebrow="In French academia" tone=teal}
Things are improving, but still not great.

::::Stack{gap=2 .mt-4}
::Bullet{k="·"}
**DeepSeek Flash** via the Albert API <span class="muted">(with constraints)</span>
::
::Bullet{k="·"}
**Qwen 3.8 27B** <span class="muted">(via IlaaS)</span>
::
::Bullet{k="·"}
**GLM 5.2 and 5.3** <span class="muted">(limited and with a caching issue for now, via Scaleway)</span>
::
::::
:::
::::

---
section: Part 4 · The landscape
---

# Place a model, then try it

::::Cols{cols=2 gap=8 fill content=center}
:::Card{eyebrow="Place" title="The Hugging Face Hub"}
- The model **card**: size, architecture, window, languages, benchmarks, licence
- Its `config.json`: layers, number of experts and of active experts
- Filters by task, size and licence, and quantised versions (GGUF)
:::

:::Card{eyebrow="Try" title="The same prompt, two models" tone=teal}
- [LMArena](https://lmarena.ai): side by side, no account needed
- [Hugging Face Chat](https://huggingface.co/chat) and [OpenRouter](https://openrouter.ai): a broad catalogue

::Detail
Replay **your** prompt on a fast model, then on a reasoning model, to feel what each one brings and what it costs.
::
:::
::::

---
section: Part 4 · The landscape
---

# Evaluating a coding agent: the main benchmarks

::::Cols{cols=2 gap=6 fill content=center}
:::Card{variant=soft eyebrow="Resolving issues" title="SWE-bench Pro" size=sm}
Given a repository and a real issue, the agent produces a patch, graded by hidden tests.

::Detail
[Scale AI](https://arxiv.org/abs/2509.16941), 2025 · 1,865 tasks, 41 repositories including 18 proprietary
::
:::

:::Card{variant=soft eyebrow="Terminal tasks" title="Terminal-Bench" tone=teal size=sm}
System administration, data processing, model training: success is checked by tests on the final state of the container.

::Detail
[Stanford and Laude Institute](https://www.tbench.ai/) · version 4.0, August 2026
::
:::

:::Card{variant=soft eyebrow="Interaction and tool calling" title="τ²-bench" tone=teal size=sm}
The agent talks with a simulated user who also acts on the environment (shared control).

::Detail
[Sierra](https://arxiv.org/abs/2506.07982), June 2025 · airline, retail, telecom domains
::
:::

:::Card{variant=soft eyebrow="Long tasks" title="Time horizon" size=sm}
How long it takes a human to do the tasks that the agent completes with 50% probability.

::Detail
[METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/), March 2025 · doubling roughly every 7 months
::
:::
::::

::Note{tag="Results" .mt-4}
Scores per model: [BenchLM](https://benchlm.ai/benchmarks), [Epoch AI](https://epoch.ai/benchmarks). Tell independent measurements apart from self-reported scores.
::

---
section: Part 4 · The landscape
---

# Today’s harnesses

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{variant=soft eyebrow="Tied to a provider"}
- **[Claude Code](https://github.com/anthropics/claude-code)**
  :Detail[proprietary · Claude models]
- **[Codex CLI](https://github.com/openai/codex)**
  :Detail[Apache-2.0 · OpenAI models]
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)**
  :Detail[Apache-2.0 · Gemini models]
- **[Mistral Vibe](https://github.com/mistralai/mistral-vibe)**
  :Detail[Apache-2.0 · Mistral by default]
:::

:::Card{variant=soft eyebrow="Multi-model platforms" tone=teal}
- **[Cursor](https://cursor.com)**
  :Detail[proprietary · IDE and terminal]
- **[GitHub Copilot](https://github.com/github/copilot-cli)**
  :Detail[proprietary · IDE and terminal]

::Detail{.mt-4}
Several model providers, behind a subscription.
::
:::

:::Card{variant=accent eyebrow="Open source, any model"}
- **[OpenCode](https://github.com/anomalyco/opencode)**
  :Detail[MIT · terminal]
- **[Qwen Code](https://github.com/QwenLM/qwen-code)**
  :Detail[Apache-2.0 · terminal]
- **[Cline](https://github.com/cline/cline)**
  :Detail[Apache-2.0 · VS Code extension]
- **[Pi](https://github.com/earendil-works/pi)**
  :Detail[MIT · terminal, minimal]
:::
::::

::Takeaway
They all run the same tool-calling loop. What sets them apart is **the harness around it**: context, tools, permissions, and the freedom to choose your model.
::
:::::

---
section: Part 4 · The landscape
---

# Three ways to work with an agent

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{variant=soft eyebrow="In the editor" title="You follow every change"}
The agent proposes, you accept file by file.

::Detail
Cursor, Copilot, Cline
::
:::

:::Card{variant=soft eyebrow="In the terminal" title="You drive a session" tone=teal}
The agent reads the repository, runs commands and tests, then you review the diff.

::Detail
Claude Code, Codex CLI, OpenCode, Pi
::
:::

:::Card{variant=accent eyebrow="In the background" title="You review a pull request"}
You assign an issue. The agent works in a remote container and opens a PR.

::Detail
GitHub Copilot coding agent, Codex cloud, Claude Code on the web, Jules
::
:::
::::

::Takeaway
The further right you go, the higher you climb on Shapiro’s ladder. In the background, code and context go **to the provider’s infrastructure**: check your institutional constraints again.
::
:::::

---
section: Part 4 · The landscape
---

# And with real developers? :Hint[METR, July 2025]{prefix="Study" href="https://arxiv.org/abs/2507.09089"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
16 experienced developers, on **their own open source repositories**, 246 tasks, each randomly assigned: with or without AI.
::

::Note{tag="Tools"}
Cursor with Claude 3.5 and 3.7 Sonnet, early 2025. Models and harnesses have changed a lot since.
::

::Note{tag="Learning"}
52 developers learn a new Python library: with an assistant, they score 17% lower on the final quiz. <span class="muted">([Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills), January 2026)</span>
::
:::

:::Stack{gap=3}
::Bullet{k="+20%" badge=tag}
time saved as **estimated** by the developers afterwards
::
::Bullet{k="-19%" badge=tag}
time **measured**: they were slower with AI
::

::Takeaway{.mt-3}
The figure has aged, the lesson has not: **how it feels is not enough**, you have to measure.
::
:::
::::

---
layout: section
index: Part 5 / 6
---

::SectionHead{num="05"}
# Our choices
::

::Agenda{numbering=roman}
- **Pi** as our harness
- The **Herdr** multiplexer
- Different options for the IDE
::

---
section: Part 5 · Our choices
---

# Why Pi as our harness

:::::Cols{cols=2 gap=4 fill align=center}
::::Stack{gap=4}
::::Card{eyebrow="Minimal and extensible"}
::Pull{size=lg}
“There are many agent harnesses but this one is yours”
::
::::
:::Card{eyebrow="Open source" size=sm}
[github.com/earendil-works/pi](https://github.com/earendil-works/pi) :Tag[TypeScript]{tone=plain code}

::Detail
Created by [Mario Zechner](https://mariozechner.at/) and transferred in May 2026 to **Earendil Works**,
*an American public benefit corporation founded by [Armin Ronacher](https://ronacher.eu/) and [Colin Daymond Hanna](https://colin.day/)*.
::
:::
::::

::::Stack{gap=4}
:::Card{eyebrow="Community" tone=teal size=sm}
::Bullet{k="Reddit" badge=tag}
[r/PiCodingAgent](https://www.reddit.com/r/PiCodingAgent/)
::
::Bullet{k="Discord" badge=tag}
[the shitty coders club](https://discord.com/invite/3cU7Bz4UPx)
::
::Bullet{k="X" badge=tag}
[@pidotdev](https://x.com/pidotdev)
::
:::
:::Card{variant=accent size=lg}
**Effective** and **under control**
:::
::::
:::::

---
section: Part 5 · Our choices
---

# How effective Pi is :Hint[Databricks]{prefix="From a study by" href="https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase"}

::Stack{fill}
<Fig src="/images/pi-databricks-chart.jpg" contain caption="The best points use Opus 4.8 and GPT 5.5, proprietary models that French academia does not have access to" />
::

---
section: Part 5 · Our choices
---

# Another benchmark: Frontier Harness v1.0

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
::Bullet{k="M"}
**Kimi K3** (open weight) for every run
::
::Bullet{k="30"}
30 tasks: **21** Terminal-Bench, **9** DeepSWE
::
::Card{variant=accent .mt-1}
Pi slightly behind Codex, but at a <strong class="accent">lower cost</strong>.
::
::Note{tag="Sample"}
The gap with Codex amounts to about two tasks out of thirty.
::
:::
:::Cell{fill}
<Fig src="/images/frontier-harness-benchmark.jpg" contain caption="Frontier Harness v1.0" href="https://runta.com/blog/introducing-frontierharness-eval/" />
:::
::::

---
section: Part 5 · Our choices
---

# Pi can be surprising at first :Hint[pi.dev/packages]{prefix="Extensions on" href="https://pi.dev/packages"}

:::Surprises{left="Surprise!" right="An extension can fix it"}
::Surprise{q="YOLO mode"}
:Tag[pi-permission-modes]{tone=teal code href="https://pi.dev/packages/pi-permission-modes"}
::
::Surprise{q="No diff view to accept changes as you go"}
:Tag[pi-show-diffs]{tone=teal code href="https://pi.dev/packages/pi-show-diffs"}
::
::Surprise{q="No built-in plan mode or task list"}
<span class="t-xs muted">Available in</span> :Tag[pi-permission-modes]{tone=teal code href="https://pi.dev/packages/pi-permission-modes"} <span class="t-xs muted">or a home-made `TODO.md`,</span> :Tag[pi-todo]{tone=teal code href="https://pi.dev/packages/@diegopetrucci/pi-todo"} <span class="t-xs muted">or</span> :Tag[pi-task]{tone=teal code href="https://pi.dev/packages/@tintinweb/pi-tasks"} <span class="t-xs muted">for more structure</span>
::
::Surprise{q="No sub-agents out of the box"}
:Tag[pi-subagents]{tone=teal code href="https://pi.dev/packages/pi-subagents"}
::
:::

---
section: Part 5 · Our choices
---

# The Herdr multiplexer :Hint[herdr.dev]{href="https://herdr.dev/"}

::Lead
A multiplexer runs several terminals in a single session <span class="muted">(tmux, cmux, screen…)</span>. **Herdr** specialises in keeping track of agents.
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell{fill}
<Fig src="/images/herdr-interface.jpg" frame="screen" contain caption="Interface" />
:::

:::Card{variant=soft eyebrow="What it brings" tone=teal}
- **Mouse** support everywhere
- Persistent **sessions**
- **Several machines** from a single interface
- **Git worktrees** grouped under their original project
- **[Plugins](https://herdr.dev/plugins/)** and **[community](https://www.reddit.com/r/herdr/)**
:::
::::

---
section: Part 5 · Our choices
---

# Different options for the IDE

::Lead
From the most familiar to the most radical: where to put Herdr relative to your editor?
::

::::Cols{cols=4 gap=4 fill content=center}
:::Card{variant=soft eyebrow="Option 1" title="Keep your IDE"}
Herdr runs in the IDE’s built-in terminal.

::Detail
You quickly feel short of space.
::
:::

:::Card{variant=soft eyebrow="Option 2" title="Two windows"}
One for your IDE, one for Herdr.

::Detail
You switch between them.
::
:::

:::Card{variant=accent eyebrow="Option 3" title="The IDE in a Herdr pane"}
Lightweight: [getfresh.dev](https://getfresh.dev/)

::Detail
Heavier, VS Code in the terminal: [terminal-code](https://github.com/zenbu-labs/terminal-code)
::
:::

:::Card{variant=soft eyebrow="Option 4" title="No more IDE" tone=teal}
Everything happens in the terminal: the agent writes, you review the diffs.
:::
::::

---
layout: section
index: Part 6 / 6
---

::SectionHead{num="06"}
# The running<br />example
::

::Agenda
- **NÉON**: an imperfect repository
- What the harness learns
- Habits to keep
::

---
section: Part 6 · The running example
---

# NÉON: an imperfect repository :Hint[github.com/AI-for-dev/neon]{href="https://github.com/AI-for-dev/neon"}

::Lead
The goal is not to build a game, but to **improve an existing one that’s not so great…** <span class="muted"> <br /> (it happens sometimes <span>:-)</span></span>
::

::::Cols{cols=5 gap=6 fill align=center .mt-4}
:::Cell{span=2}
::Card{variant=soft eyebrow="The playground"}
A small HTML/JS brick breaker on `<canvas>`, with no dependencies.
::
:::
:::Cell{span=3}
::Chips
- Bugs + technical debt
- Issue backlog
- Partial tests
- Real git history
- Trapped file + sensitive `.env`
- “Zero dependency” constraint
::
:::
::::

::Takeaway{.mt-6}
Each difficulty in the repository becomes a **building block of the harness**.
::

---
section: Part 6 · The running example
---

# Maintaining rather than building

::::Cols{cols="2fr 3fr" gap=8 fill align=center}
:::Stack{gap=4}
::Lead
On the first lines of a codebase, an LLM does well: everything is still to be done. On a sizeable codebase, it is another story.
::
::Card{variant=soft size=sm}
Each building block answers a **concrete need** of the repository, and it carries straight over to your projects: repository, issue, diff, review, commit.
::
:::

:::Stack{gap=3}
:Eyebrow[The backlog: ISSUES.md]{tone=teal}

::Matrix{size=sm left first="2rem"}
| # | type | title |
| --- | --- | --- |
| 1 | bug | The ball goes through bricks instead of bouncing |
| 2 | performance | Collision scans every brick on every frame |
| 3 | feature | Night mode |
| 4 | feature | CSV import of a score table |
| 5 | debt | Score and combo are not tested |
| 6 | debt | Hard-coded colours instead of the palette |
::

::Note
No module covers **#3, #4 and #6**: keep them to try your harness on a request it has never seen.
::
:::
::::

---
section: Part 6 · The running example
---

# What the harness learns :Hint[A full maintenance cycle]

::::Cols{cols=6 gap=3}
::Step{n=1 title="Understand"}
the repository
::
::Step{n=2 title="Plan"}
the change
::
::Step{n=3 title="Delegate"}
and code
::
::Step{n=4 title="Test"}
and refactor
::
::Step{n=5 title="Secure"}
refuse the trap
::
::Step{n=6 title="Ship"}
diff + commit
::
::::

::::Cols{cols=2 gap=8 fill align=center .mt-4}
:::Cell
:Eyebrow[By the end of act 2, your clone contains]{tone=teal}

::Musts
- An `AGENTS.md` under 40 lines
- The `playtester` and `dynamic-playtester` skills
- The explorer, planner, coder and reviewer agents
- A flow that handles ticket #2, with the tests as judge
- Two extensions: one refuses forbidden commands, the other sends the agent back to work while tests are red
::
:::

:::Stack{gap=4}
::Card{variant=soft center}
All of this runs **in a sandbox**.
::
::Card{variant=accent center}
Act 3 then measures what some of these pieces really change.
::
:::
::::

---
section: Part 6 · The running example
---

# Habits to keep from tomorrow

::::Stack{gap=3 fill center}
:::Item{variant=adv n=1}
**Read the diff**
::Detail
The agent’s summary says what it thinks it did. The diff says what it did.
::
:::
:::Item{variant=adv n=2}
**Run the tests yourself**
:Detail[A green suite announced by the agent is not a green suite.]
:::
:::Item{variant=adv n=3}
**Check the tests it added**
:Detail[Remove the fix by hand: at least one test should fail.]
:::
:::Item{variant=adv n=4}
**Work on a branch, a clone or a worktree**
:Detail[You must be able to undo everything at any time.]
:::
:::Item{variant=adv n=5}
**Don’t commit what you don’t understand**
:Detail[Ask the agent for an explanation, or throw the change away.]
:::
::::

---
layout: statement
---

# See you tomorrow!

::LogoBar{size=40 dark .mt-10}
::

---
layout: section
index: Appendix
---

::SectionHead{eyebrow="Appendix" num="A"}
# Hosting<br />a model
::

::Agenda
- Mixture of experts: total and active
- How many GPUs for a large model?
::

---
section: Appendix · Hosting a model
---

# Mixture of experts: total and active :Hint[Hugging Face]{prefix="Illustrated introduction by" href="https://huggingface.co/blog/moe"}

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=4}
::Matrix{size=md}
| model | architecture | total | active |
| --- | --- | --- | --- |
| [Kimi K3](https://huggingface.co/moonshotai/Kimi-K3) | MoE | 2,800B | 104B |
| [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) | MoE | 1,600B | 49B |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | MoE | 552B | 8 to 16B |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | MoE | 320B | 18B |
| [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) | MoE | 35B | 3B |
| [Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B) | dense | 27B | 27B |
::

::Note{tag="Suffix"}
`A<n>B` gives the active parameters. Not a universal convention: Kimi K3, DeepSeek-V4 or GLM-5.3 are MoE models without the suffix. Check the model card.
::
:::

:::Card{variant=soft eyebrow="Only part of the network per token" tone=teal}
::Specs
- **Total** memory to load
- **Active** compute and speed
::

::Detail{.mt-3}
Two models of the same advertised size can behave very differently.
::
:::
::::

---
section: Appendix · Hosting a model
---

# How many GPUs for DeepSeek-V4.1-Flash? :Hint[model card]{href="https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"}

:::::Cols{cols="5fr 8fr" gap=8 fill align=center}
::::Stack{gap=6}
:::Card{variant=soft eyebrow="Memory to plan for" tone=teal}
**weights** + **KV cache** × tokens × sessions, plus a 10% margin

::Specs{w="5.4rem"}
- **Weights** 552B, experts in FP4
- **KV cache** 890 bytes per token
- **Cards** H100 80 GB · H200 141 GB · B200 180 GB
::
:::

::Takeaway
Here, **quantisation** decides. The cache is so compact that 16 sessions at 1 M tokens fit in 15 GB.
::
::::

::::Stack{gap=5}
::Matrix{size=sm left first="15rem"}
| format · context | weights | cache | H100 | H200 | B200 |
| --- | --- | --- | --- | --- | --- |
| BF16 (computed) · 128k | 1.1 TB | 0.1 GB | 16 | 16 | 8 |
| native FP4/FP8 · 128k | 308 GB | 0.1 GB | 8 | 4 | 2 |
| native FP4/FP8 · 16 × 1 M | 308 GB | 15 GB | 8 | 4 | 2 |
| Q2 GGUF (computed) · 128k | 163 GB | 0.1 GB | 4 | 2 | 2 |
::

::Note{tag="Assumptions"}
Number of cards rounded up to 2, 4, 8… to split the model. The 183 GiB of Engram memory stay in RAM, as in the [vLLM recipe](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash) (4 H200, 2 B200).
::
::::
:::::
