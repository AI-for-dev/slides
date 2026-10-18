---
theme: ./theme
title: Workshop, act 2 - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF day 2, October 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
lang: en
colorSchema: auto
# Logo de l'organisation AI-for-dev (dépôt AI-for-dev/.github, profile/brand).
favicon: /favicon.svg
themeConfig:
  footer: IA4Dev 2026 · ANF day 2
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/
  # Le même deck en français, relatif à celui-ci (/slides/en/jour2/).
  translation: ../../jour2/
# Version anglaise de jour2.md, slide pour slide : le bouton de langue garde
# le numéro de slide. Publiée sous /slides/en/jour2/, en hash comme les autres.
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
IA4Dev 2026 · ANF day 2
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Understanding and building your harness"}
# Workshop<br />Act 2
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

# Today’s programme :Hint[installation and setup: in the appendix]

::::Stack{gap=1}
::Act{n=1 title="First steps with Pi"}
Install, get to grips with herdr, compare models
::
::Act{n=2 title="Security and sandbox"}
Measure what an instruction is worth against a guardrail
::
::Act{n=3 title="Context"}
Read a session, what fills the window, what it costs
::
::Act{n=4 title="Evaluate"}
Measure the context levers on three models, with trysquare
::
::Act{n=5 title="Skills"}
Write a working procedure, then measure what it produces
::
::::

::::Stack{gap=1 .mt-4}
::Note{tag="Written version"}
Each part follows a module of the course:
[Pi](https://ai-for-dev.github.io/hands-on-harness/act1-pi),
[sandbox](https://ai-for-dev.github.io/hands-on-harness/act2-sandbox),
[context](https://ai-for-dev.github.io/hands-on-harness/act2-contexte),
[trysquare](https://ai-for-dev.github.io/hands-on-harness/act3-trysquare) and [measurements](https://ai-for-dev.github.io/hands-on-harness/act3-contexte),
[skills](https://ai-for-dev.github.io/hands-on-harness/act2-skill)
::
::::

---
section: Introduction
---

# How we will work

::::::Stack{fill center gap=6}
::Lead
A single run tells you almost nothing about a model. So every exercise today follows the same steps.
::

::::Cols{cols=3 gap=5}
::Step{n=1 title="Predict"}
Before running, ask yourself a few questions: which model succeeds, what it will read, how many turns it needs.
::
::Step{n=2 title="Run twice"}
The same request on two models, or with two settings, each in a fresh session.
::
::Step{n=3 title="Read the session"}
Compare what the agent read and did, not just the result.
::
::::

::Takeaway
Analysing the traces shows you a model’s strengths and weaknesses in detail. You can then tell which model to use for what you need.
::
::::::

---
layout: section
index: Part 1 / 5
---

::SectionHead{num="01"}
# First steps<br />with Pi
::

::Agenda
- What Pi does when you ask it a question
- Installing Pi and herdr
- Getting to grips with Herdr and Fresh
- Connecting to the course models
- Comparing two models and two reasoning levels
::

---
section: Part 1 · First steps with Pi
---

# A request that reads a single file

::::Cols{cols="12.5rem 1fr" gap=6 fill align=center}
:::Stack{gap=3}
::Bullet{k="1"}
Question → LLM
::
::Bullet{k="2" accent}
Tool call
::
::Bullet{k="3"}
LLM → Result
::
:::
:::Cell{fill}
<PiSequence />
:::
::::

---
section: Part 1 · First steps with Pi
---

# Installing Pi and herdr :Hint[macOS and Linux]

::::::Stack{fill center gap=6}
::::Cols{cols=2 gap=7 align=start}
:::Stack{gap=3 .code-sm}
:Eyebrow[Pi · the agent]

```bash
curl -fsSL https://pi.dev/install.sh | sh
pi --version      # check
pi update         # update
```

::Detail
Or via npm, with Node.js 22.19 or newer:
::

```bash
npm install -g --ignore-scripts \
  @earendil-works/pi-coding-agent
```

::Detail
Windows: [pi.dev/docs/latest/quickstart](https://pi.dev/docs/latest/quickstart)
::
:::

:::Stack{gap=3 .code-sm}
:Eyebrow[herdr · the multiplexer]{tone=teal}

```bash
curl -fsSL https://herdr.dev/install.sh | sh
herdr             # run it, to check
herdr update      # update
```

::Detail
Or via Homebrew, which then handles updates:
::

```bash
brew install herdr
brew upgrade herdr
```

::Detail
Windows: [herdr.dev/docs/install](https://herdr.dev/docs/install)
::
:::
::::

::Takeaway
If the terminal cannot find the command, open a new one: the installer added the folder to your `PATH`.
::
::::::

---
section: Part 1 · First steps with Pi
---

# Getting to grips with Herdr

:::Stack{gap=3}
:Eyebrow[In the terminal]

```bash
herdr
```

::Note{tag="Key shortcut"}
Press `Ctrl+B`, release, then choose a key.<br />For example, `?` shows the full list of active shortcuts.
::
:::

::Lead{.mt-3}
**The mouse works for navigating too.**
::

::::Cols{cols="3fr 2fr" gap=6 align=center .mt-2}
<Fig src="/images/herdr-interface.jpg" frame="bare" h="13.6rem" caption="Interface" captionAlign="center" />
<Fig src="/images/herdr-tree.png" h="13.6rem" caption="How it fits together" captionAlign="center" />
::::

---
section: Part 1 · First steps with Pi
---

# Using Fresh in Herdr

::::::Stack{fill center gap=5}
:::Stack{gap=3}
:Eyebrow[In a herdr pane]

```bash
fresh
```
:::

::::Cols{cols=2 gap=5 align=stretch}
:::Card{variant=soft eyebrow="Keyboard" title="Show the file explorer"}
`Ctrl+B` shows or hides the explorer, but herdr already uses that shortcut.

`Ctrl+B`, release, then `Ctrl+B`: herdr then passes a `Ctrl+B` on to Fresh.
:::
:::Card{variant=soft eyebrow="Mouse" tone=teal title="Open a file’s context menu"}
A right click shows herdr’s menu, which keeps it for itself.

`Ctrl` + right click passes the click on to Fresh, which shows the file’s context menu.
:::
::::
::::::

---
section: Part 1 · First steps with Pi
routeAlias: connecter
---

# Connecting to models :Hint[pi.dev/docs/latest/providers]{href="https://pi.dev/docs/latest/providers"}

::Lead
**Method 1**: if you have an API key, by editing your `~/.pi/agent/models.json`
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell{.code-xs}
```json
{
  "providers": {
    "ilaas": {
      "baseUrl": "https://llm.ilaas.fr/v1",
      "api": "openai-completions",
      "apiKey": "XXXXX",
      "models": [
        {
          "id": "gemma-4-31b",
          "contextWindow": 128000,
          "reasoning": true,
          "cost": { "input": 0.14, "output": 0.28,
                    "cacheRead": 0.0028, "cacheWrite": 0 }
        },
        { "id": "qwen-3.8-27b", "contextWindow": 256000 }
      ]
    }
  }
}
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="The cost block" size=sm}
Optional, zero by default: without it, `/session` reports a zero cost. Prices are per million tokens.
::
::Note{tag="Key point"}
The cost an agent displays does not come from the provider: it is a multiplication based on a field that **you** wrote.
::
:::
::::

---
section: Part 1 · First steps with Pi
---

# Connecting to models :Hint[github.com/AI-for-dev/providers]{href="https://github.com/AI-for-dev/providers"}

::Lead
**Method 2**: with the course package, which adds our two providers to Pi
::

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=3}
:Eyebrow[Install, once]

```bash
pi install npm:@ai-for-dev/providers
```

:Eyebrow[Log in]{.mt-2}

1. Run `pi`
2. Type `/login ia4dev-ilaas` or `/login ia4dev-gricad`
3. Paste your API key
4. Pick a model with `/model`
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="What the package sets up for you" tone=teal}
- **the list of models**, read from the server with your key
- **the window**, **image input** and **reasoning** of each model, measured on the servers
::

::Note{tag="Methods 1 and 2"}
A provider with the same name in `~/.pi/agent/models.json` takes precedence over the package’s.
::
:::
::::

---
section: Part 1 · First steps with Pi
---

# Two model families :Hint[all open weight]

::::::Stack{fill center gap=6}
::::Cols{cols=4 gap=4 align=stretch}
:::Card{eyebrow="Google" title="Gemma 4 31B" size=sm}
::Specs{w="5rem"}
- **Type** dense
- **Released** 2026
- **Size** 31B
- **Window** 256K
- **Licence** Apache 2.0
::
:::
:::Card{eyebrow="Alibaba" title="Qwen3.8 27B" size=sm}
::Specs{w="5rem"}
- **Type** dense
- **Released** 2026
- **Size** 27B
- **Window** 256K
- **Licence** Apache 2.0
::
:::
:::Card{variant=soft eyebrow="DeepSeek" tone=teal title="V4 and V4.1 Flash" size=sm}
::Specs{w="5rem"}
- **Type** MoE
- **Released** 2026
- **V4** 284B A13B
- **V4.1** 552B A16B
- **Window** 1M
- **Licence** MIT
::
:::
:::Card{variant=soft eyebrow="Z.ai" tone=teal title="GLM 5.2 and 5.3" size=sm}
::Specs{w="5rem"}
- **Type** MoE
- **Released** 2026
- **Size** 753B A40B
- **Window** 1M
- **Licence** MIT (5.2)<br />custom (5.3)
::
:::
::::

::::Cols{cols=2 gap=4}
::Note{tag="Dense"}
Every parameter works on every token. Around thirty billion: once quantised, these models fit on one GPU.
::
::Note{tag="MoE"}
Only a few experts activate per token (the “A”: A13B, A40B). Too big for a workstation, you use them through a provider.
::
::::
::::::

---
section: Part 1 · First steps with Pi
---

# The course models :Hint[endpoint configuration]{to="connecter"}

::::::Stack{fill center gap=4}
:Eyebrow[Each line: the context window served by the platform]{tone=quiet}

::::Cols{cols="1.15fr 1fr 1fr" gap=5 align=stretch}
:::Card{variant=accent eyebrow="ILaaS" title="Scaleway offer (limited credits)"}
- **GLM 5.2** · 256K
- **GLM 5.3** · 256K
- **DeepSeek V4.1 Flash** · 256K
- **DeepSeek V4 Flash 0731** · 256K
- **Qwen3.8 27B** · 262K
:::
:::Card{variant=soft eyebrow="ILaaS" title="Outside the Scaleway offer"}
- **Qwen3.6 35B Instruct** · 262K
- **Gemma 4 31B** · 131K
:::
:::Card{variant=teal eyebrow="GRICAD" title="IA4Dev platform"}
- **Qwen3.8 27B** · 262K
- **DeepSeek V4.1 Flash** · 1M
- **Gemma 4 31B** · 159K
:::
::::

::::Stack{gap=2}
::Note{tag="Vision"}
Gemma 4, Qwen3.6, Qwen3.8 and DeepSeek V4.1 Flash also read images. GLM and DeepSeek V4 Flash do not.
::
::Note{tag="Reasoning"}
Always on in the Scaleway offer. Qwen3.6 and Gemma 4 turn it on or off. On GRICAD, Qwen3.8 and DeepSeek V4.1 are set by level with `Shift+Tab`.
::
::::
::::::

---
section: Part 1 · First steps with Pi
---

# Exercise: first tries on NÉON

:::::Stack{fill center gap=3}
::::Cols{cols="6fr 5fr" gap=7 align=start}
:::Stack{gap=3}
:Eyebrow[Prepare, once]{tone=quiet}

1. Import [github.com/AI-for-dev/neon](https://github.com/AI-for-dev/neon) into a GitLab (*Import project*), then clone it
2. In your terminal, run `herdr`
3. In `neon`, create the `dev` branch and switch to it
4. Open your IDE, or `fresh` in a 2nd herdr tab
5. Run `pi` in the first tab

:::

:::Stack{gap=3}
:Eyebrow[Try, four fresh sessions]

::Lead
Write down your prediction, then start with:
::

```text
Without changing the code, explain to me…
```

::Matrix{size=md first="9rem"}
| | low reasoning | high reasoning |
| --- | --- | --- |
| `gemma-4-31b` | session 1 | session 2 |
| `qwen-3.8-27b` | session 3 | session 4 |
::
:::
::::

:Eyebrow[Shortcuts]{tone=quiet}

::::Cols{cols="6fr 5fr" gap=7}
:::Specs{w="8.5rem" raw}
- **/new** opens a fresh session
- **/model** picks the model, `Ctrl+P` cycles through them
- **/scoped-models** narrows the list of models
:::
:::Specs{w="5.5rem" raw}
- **Shift+Tab** changes the reasoning level, like `/thinking`
- **Ctrl+T** shows or hides the reasoning
- **Ctrl+S** keeps this model and level as default
:::
::::
:::::

---
layout: section
index: Part 2 / 5
---

::SectionHead{num="02" detail="Isolate the agent from your machine"}
# Security<br />and sandbox
::

::Agenda
- What a coding agent can do on your machine
- What each isolation level protects
- A guardrail inside Pi: `pi-permission-system`
- An instruction against a guardrail: count the refusals
::

---
section: Part 2 · Security and sandbox
---

# Telling the problems apart

:::::Stack{fill center gap=6}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Sharing with a provider" center}
Secrets or data sent to OpenAI, Anthropic, OpenCode… along with the request context.
:::
:::Card{badge="2" title="Malicious content" center}
A booby-trapped repository, extension or skill. NÉON’s `SUPPORT.md` asks for the `.env` to be sent to a third party: the agent that opens it treats the instruction as if it came from you.
:::
:::Card{badge="3" title="The model itself" center}
The latest models can act without being controlled.
::Detail
e.g. July 2026: OpenAI models under evaluation escape their sandbox and hack Hugging Face to cheat on the test
::
:::
::::

::Takeaway
An instruction (“don’t read anything outside the repository”) is still just text, followed or not by a non-deterministic model.
You need a limit **that does not depend on its obedience**.
::
:::::

---
section: Part 2 · Security and sandbox
---

# Pi has no sandbox :Hint[pi.dev/docs/latest/security]{href="https://pi.dev/docs/latest/security"}

::Lead
Pi’s tools read, write and run commands “with the permissions of the pi process”.
Anything you can do from your terminal, the agent can do too.
::

::::Cols{cols=3 gap=5 fill .mt-2}
:::Card{badge="1" title="Your files" center}
- the repository it works on
- `~/.ssh`, `~/.pi/agent/auth.json`
- the `.env` files of your other projects
:::
:::Card{badge="2" title="The network" center}
- install any package
- run a `curl | sh` read in a README
- send what it has just read
:::
:::Card{badge="3" title="Your processes" center}
- the Docker daemon, the `rm` command
- `git push --force` on the remote
- and `sudo`, if you have it
:::
::::

::Note{tag="Pi’s docs" .mt-5}
“For untrusted repositories, generated code you do not intend to monitor closely, or unattended automation, run pi in a contained environment.”
::

---
section: Part 2 · Security and sandbox
---

# What each level protects

:::Stack{fill center gap=6}
::Matrix{size=md first="15rem" left}
| what is protected | throwaway clone | container | Docker Sandboxes |
| --- | --- | --- | --- |
| your home directory | :Mark{v=no} | :Mark[if only the repository is mounted]{v=part} | :Mark{v=yes} |
| outbound network | :Mark{v=no} | :Mark[open by default]{v=no} | :Mark[denied by default, allow list]{v=yes} |
| your API keys | :Mark{v=no} | :Mark[they end up in the image]{v=no} | :Mark[only the host’s proxy sees them]{v=yes} |
::

::Takeaway
These levels isolate Pi from the host. Inside, nothing yet stops an `rm -rf` on the repository or a read of a `.env`: that is the job of a guardrail inside Pi.
::
:::

---
section: Part 2 · Security and sandbox
---

# A guardrail inside Pi: pi-permission-system :Hint[pi.dev/packages]{href="https://pi.dev/packages/@gotgenes/pi-permission-system"}

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
The extension hooks into the `tool_call` event: every tool, bash command, MCP call or skill is checked
against `allow` / `deny` / `ask` rules **before** it runs.

::Specs{w="4.5rem"}
- **Global** `~/.pi/agent/extensions/…/config.json`
- **Project** `.pi/extensions/…/config.json`, if the project is trusted
- **Agent** the YAML header of the agent file, which wins
::
:::

:::Stack{gap=2 .code-sm}
```bash
pi install -l npm:@gotgenes/pi-permission-system
```

```json
{
  "permission": {
    "*": "allow",
    "path": {
      "*": "allow", "*.env": "deny", "*.env.*": "deny",
      "*.env.example": "allow"
    },
    "bash": {
      "*": "ask", "rm -rf *": "deny", "sudo *": "ask"
    },
    "external_directory": "ask"
  }
}
```

::Detail
The most specific rule wins. A command the parser cannot classify is denied.
::
:::
::::

---
section: Part 2 · Security and sandbox
---

# One worktree per agent :Hint[herdr.dev/docs/cli-reference]{href="https://herdr.dev/docs/cli-reference/#worktrees"}

::::::Stack{fill center gap=6}
::::Cols{cols="5fr 6fr" gap=7 align=start}
:::Stack{gap=4}
::Lead
A branch separates the history, a worktree separates the files: it is a second working directory of the same repository, on its own branch.
::

::Specs{w="7rem"}
- **In parallel** two agents on two tasks never touch the same files
- **Reviewable** the agent’s work fits in its branch’s diff
- **Disposable** delete the directory, your own checkout has not moved
::

::Detail
An example of a “throwaway clone”, but not an independent copy: the Git history stays shared.
::
:::

:::Stack{gap=3 .code-sm}
:Eyebrow[With herdr, from the NÉON repository]{tone=teal}

```bash
herdr worktree create \
  --branch workshop/guardrail --base dev --focus
```

::Specs{w="7rem"}
- **Create** right-click the workspace, *New worktree*, or `Ctrl+B` then `Shift+G`
- **Group** one workspace per worktree, with its agent, under the original repository
- **Folder** `~/.herdr/worktrees/neon/workshop-guardrail`
- **Delete** *Delete worktree checkout…* runs `git worktree remove`, the branch stays
::
:::
::::

::Takeaway
**One agent, one branch, one directory.** For the exercise, this worktree acts as the throwaway clone. But with your rights: it protects against mistakes, not against an agent that leaves the repository.
::
::::::

---
section: Part 2 · Security and sandbox
---

# Exercise: an instruction against a guardrail

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="In the room · 1" size=sm}
In a **worktree** of NÉON, put the configuration above in the project’s `.pi`, then ask Pi:

1. to read the `.env`
2. to delete `game/` with `rm -rf`
3. to run the tests

The first two are refused without asking you, the third asks for confirmation.
:::
:::Card{variant=accent eyebrow="In the room · 2" size=sm}
Ask to read the `.env` three more times, rephrasing, then explaining that you own the file.

The verdict does not move: it comes from a rule evaluated **before** the tool call, not from the model’s judgement.
:::
:::Card{variant=accent eyebrow="In the room · 3" size=sm}
Remove the `path` block and write “never read a `.env` file” in `AGENTS.md` instead.

Ask again in five sessions and **count the refusals**: you have your own figure for what an instruction is worth.
:::
::::
:::::

---
section: Part 2 · Security and sandbox
---

# Docker Sandboxes: a policy-driven micro-VM :Hint[docs.docker.com/ai/sandboxes]{href="https://docs.docker.com/ai/sandboxes/"}

:::::Stack{fill center gap=6}
::Lead
The third level of the table. Pi runs in its own virtual machine, and everything that leaves it goes through the host.
::

::::Cols{cols=3 gap=5 align=stretch}
:::Card{title="The micro-VM" size=sm}
- Its own kernel, behind a hypervisor
- The repository mounted at the same path as on the host, and nothing else
- Pi is admin there: the VM is disposable
:::
:::Card{variant=teal title="The host’s proxy" size=sm}
- All outbound traffic goes through it
- Denied by default, then a list of allowed domains
- It puts the key in the HTTP header: “Credential values never enter the VM”
:::
:::Card{variant=soft title="The cost" size=sm}
- A 650 MB image and a daemon on the host
- A list of domains to maintain
- `sbx` does not know Pi: you need a kit,<br />[AI-for-dev/ai4dev-pi-kit](https://github.com/AI-for-dev/ai4dev-pi-kit)
:::
::::

:Pipeline{label="The key" flow="Pi reads a placeholder > the host’s proxy inserts the key > llm.ilaas.fr only"}

::Detail
Docker also publishes 70 kits in [docker/sbx-kits-contrib](https://github.com/docker/sbx-kits-contrib): 33 agents, including Pi (`sbx/pi-kit`), and 37 add-ons such as GitLab, Playwright or Trivy.<br />
Getting started with our kit, key handling and the sandbox’s limits: cf. appendix
::
:::::

---
section: Part 2 · Security and sandbox
---

# Generalising

::::Stack{fill gap=4 center}
:::Item{variant=goal n=1}
A boundary that does not depend on obedience
::Detail
A permission written in `AGENTS.md` or `SKILL.md` is a suggestion. A guardrail is evaluated before the tool call, and the sandbox holds when the harness itself is at fault.
::
:::
:::Item{variant=goal n=2 ghost}
Experiment rather than believe
::Detail
Repeated tries show you the trend, which depends on the model and on how full the context is. They let you make the right choices and draw that boundary well.
::
:::
:::Item{variant=goal n=3 ghost}
Isolate the agent from the machine
::Detail
The key stays on the host and the network is denied by default. Appendix B shows how, with the Docker Sandboxes kit.
::
:::
::::

---
layout: section
index: Part 3 / 5
---

::SectionHead{num="03" detail="What goes in, what it costs"}
# Context
::

::Agenda
- What is really in the window
- A session: resume it, export it, read it
- Configuring Pi: tools, settings, AGENTS.md
- Managing the window: sub-agents, compaction
::

---
section: Part 3 · Context
---

# Five sources, a single window

::::Cols{cols="1fr 19rem" gap=7 fill align=center}
:::Cell
<ContextStack />
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="“Just say OK”" tone=teal size=sm}
With no context file, skill or extension, the input weighs **1,660 tokens**. With a three-line system prompt: **1,110**.
So Pi’s costs about 550 tokens.
::
::Note
Most of it does not come from the harness, but from what you and the agent pour in over the session.
::
:::
::::


---
section: Part 3 · Context
---

# Understanding sessions

::Lead
Everything you have done so far happened in a session.
At the bottom of your Pi tab, you will have seen your context grow.
::

::::Cols{cols="11fr 9fr" gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[To do, in order]

::Specs{w="6.5rem" raw}
- **/new** open a second session and ask another question there, still starting with “Without changing the code,…”
- **/resume** go back to the first session
- **/name** give it a name
- **/tree** browse its history
::
:::

:::Stack{gap=4}
::Note{tag="After /new"}
The context shown at the bottom of the tab goes back to zero.
::
::Note{tag="With /tree"}
Going back to a point in time does not restore your files. The `pi-workspace-history` extension ties the history to your changes.
::
:::
::::

::Takeaway
A new session as soon as you change topic.
::

---
section: Part 3 · Context
---

# Exporting a session

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
<Fig src="/images/jour2/pi-export-session.jpg" frame="screen" caption="HTML export of a NÉON session" />
:::

:::Stack{gap=3}
::Specs{w="5.5rem" raw}
- **/session** the session’s statistics, and the `.jsonl` file where it is stored
- **/export** the same session as html, readable in a browser
::

:Eyebrow[In the export]{tone=quiet .mt-6}

::Specs{w="5.5rem"}
- **On the left** the thread: every message, every tool call
- **At the top** the model, the tokens, the cost
- **In italics** the model’s reasoning
::
:::
::::

::Takeaway
Export your session as html, open it and start reading.
::

---
section: Part 3 · Context
---

# What does a call cost? :Hint[opencode Zen prices, per million tokens]{href="https://opencode.ai/docs/zen/"}

::::Cols{cols=2 gap=9 fill align=center}
:::Stack{gap=5}
::Matrix{size=md}
| model | input | output | cache read |
| --- | --- | --- | --- |
| `deepseek-v4.1-flash` | $0.30 | $1.20 | $0.006 |
| `deepseek-v4-pro` | $1.74 | $3.48 | $0.145 |
::

::Note{tag="ILaaS"}
Free for the course, and does not report the cache: `cacheRead` is always zero there. You will count tokens rather than euros.
::
:::

:::Stack{gap=4}
::Bullet{k="×6" accent}
`pro` costs 5.8 times `flash` on input, 2.9 times on output.
::
::Bullet{k="×50" accent}
Between input and cache read: **×50** on `flash`, ×12 on `pro`.
::
::Card{variant=soft size=sm}
That second gap is what makes an agent viable: it rereads its whole history every turn, and would otherwise pay twenty times its context over a twenty-turn session.
::
:::
::::

---
section: Part 3 · Context
---

# The cache, measured :Hint[Five turns on game/theme.js, model switch on the 4th]

::Matrix{size=xs first="3.4rem"}
| call | turn | prompt | model | input | output | cache read | cost |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | “Read `game/theme.js`…” | `flash` | 1,718 | 92 | 0 | $0.000626 |
| 2 | 1 | (reading the file) | `flash` | 621 | 138 | 1,664 | $0.000362 |
| 3 | 1 | (answer) | `flash` | 472 | 70 | 2,176 | $0.000239 |
| 4 | 2 | “name one colour…” | `flash` | 182 | 53 | 2,560 | $0.000134 |
| 5 | 3 | “how many colours…” | `flash` | 130 | 82 | 2,688 | $0.000154 |
| 6 | 4 | “confirm that number…” | `pro` | 2,995 | 41 | **0** | **$0.005354** |
| 7 | 5 | “say that number again…” | `pro` | 111 | 17 | 2,944 | $0.000679 |
::

::::Cols{cols=2 gap=6 .mt-3}
::Takeaway
**Stable at the front, variable at the back.** The cache only works on an unchanged prefix:
a timestamp or a `git status` in the system prompt makes you pay for everything again, every turn.
::
::Takeaway
**Switching models is not free.** The switch resets the cache: that turn costs eight times the next one, with the same model.
::
::::

---
section: Part 3 · Context
---

# Pi is a minimal harness

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
Several ways to extend it:

::Musts
- AGENTS.md
- prompt template
- extension
- skill
- …
::
:::
:::Stack{gap=5}
::Card{variant=soft eyebrow="What an extension is"}
**A TypeScript/JavaScript module loaded by Pi, which uses the extension API to build new capabilities.**
::

Many extensions already exist on [pi.dev/packages](https://pi.dev/packages).
:::
::::

---
section: Part 3 · Context
---

# Four tools by default

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Chips
- read
- write
- edit
- bash
::

::Lead
Enough in most cases.
::

::Card{variant=accent eyebrow="In the room" size=sm}
With your questions, try to trigger each of these four tools.
::
:::
:::Card{variant=soft eyebrow="For large repositories, extensions" tone=teal size=sm}
::Specs{w="9.5rem" raw}
- **pi-fff** indexes your files, optimised fuzzy search: “where is the code?”
- **@henryqw/pi-codegraph** navigates the code graph; `pi-codegraphcontext` is more powerful but needs an MCP: “how is the code connected?”
- **pi-gitnexus** a knowledge-graph approach: “how is the code connected to the rest of the system and the organisation?”
::

::Detail{.mt-3}
`pi-gitnexus` is MIT, but the GitNexus engine is PolyForm Noncommercial. Graphify is Apache 2, its Pi extensions (`@wwjd/pi-graphify`…) are MIT.
::
:::
::::

---
section: Part 3 · Context
---

# An exposed setting is not necessarily passed on

:::::Stack{fill center gap=6}
::Lead
`pi --help` advertises seven reasoning levels, from `off` to `max`.
::

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=4}
::Card{variant=accent eyebrow="In the room" size=sm}
Run the same task with `--thinking minimal`, then `--thinking max`, on `gemma-4-31b`: **no difference**, both produce the same request. This model only has `on` and `off`.

Redo the comparison between two truly distinct levels, `off` and `high`.
::
:::
:::Stack{gap=4}
::Card{variant=soft size=sm}
Between the configuration you type and the request sent to the inference server, there is a **mapping table** written by someone, which may be incomplete.
::
::Takeaway
Find out where a flag lands before trusting it.
::
:::
::::
:::::

---
section: Part 3 · Context
---

# With recent models, a minimal AGENTS.md

::Lead
Only put in it what concerns **recurring problems**.
::

::::Cols{cols="3fr 1fr" gap=7 fill align=center}
:::Stack{gap=2}
:Eyebrow[Example]{tone=quiet}

<Fig src="/images/jour2/agents-md-minimal.jpg" frame="screen" h="270px" />
:::
::Note
`** **` can be used to flag what matters most.
::
::::

---
section: Part 3 · Context
---

# An AGENTS.md evolves over time

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="With a new model, two strategies" size=sm}
- delete everything, and rebuild as problems come back… or don’t
- assess the impact by removing only the parts you think are useless, with the [trysquare](https://github.com/AI-for-dev/trysquare) tool for example
::
::Card{variant=teal eyebrow="One AGENTS.md can hide another" tone=teal size=sm}
Pi stacks them: `~/.pi/agent/`, every parent directory, then the current directory. `-nc` turns this discovery off, essential for measuring.
::
:::
:::Card{variant=accent eyebrow="Budget: 40 lines" center}
NÉON’s `AGENTS.md` will never go over 40 lines. To add a rule, you first have to remove one, or merge two.

:Rule

Every line enters the context **every turn**, and later models will make some of them useless.
:::
::::

---
section: Part 3 · Context
---

# Exercise: testing NÉON’s AGENTS.md

::::Cols{cols="5fr 6fr" gap=8 fill align=start .mt-6}
:::Stack{gap=3 .code-sm}
:Eyebrow[neon/AGENTS.md, the course’s starting point]{tone=quiet code}

```md
# NÉON

- One task = one ticket. Do not fix
  another issue along the way.
- Do not rename or delete an export of
  `game/neon.js`: the tests depend on it.
- Zero dependencies: no package, no CDN.
- Run the tests with `npm test`.
```

::Detail
Put it at the root of your clone, on the `dev` branch.
::
:::

:::Stack{gap=3}
:Eyebrow[Measure, two fresh sessions]

1. Without the file, run `pi -nc` and give the sloppy request: “The ball goes through the bricks instead of bouncing. Fix that.”
2. With the file, run `pi` and give the same request again
3. In both sessions, check whether the agent ran `npm test` and added a test
4. Add the missing rule: run the tests after each change, write some if there are none. Run again.

::Detail
`git restore .` between two sessions, to start from the same code.
::
:::
::::

::Takeaway
Only add a rule after seeing the agent fail without it, and keep the file under 40 lines.
::

---
section: Part 3 · Context
---

# Managing the context

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3}
::Note{tag="Observation"}
Performance drops as the window fills up, to a degree that varies between models.
::
::Bullet{k="1" accent}
The simplest: **a new session** for each new topic, `/new`
::
::Bullet{k="2" accent}
**Delegate** some steps to a sub-agent: it gathers the context for its task and only sends its conclusions back to the main agent (see delegation, tomorrow)
::
::Bullet{k="3"}
`/handoff <goal>` (a Pi example extension, or the `pi-handoff` package) writes a note of the session and opens a new session with it
::
:::
:::Card{variant=soft eyebrow="Compaction" tone=teal}
Pi compacts automatically when

```text
contextTokens > contextWindow - reserveTokens
```

`reserveTokens` is 16,384 by default. Better not to get that far.

`/compact` triggers it whenever you want, with optional instructions to steer the summary.
:::
::::

---
section: Part 3 · Context
---

# What happens during a compaction?

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=4}
The LLM reads the old history and writes a structured summary, with the list of files read and modified:

::Chips
- Goal
- Constraints & Preferences
- Progress
- Key Decisions
- Next Steps
- Critical Context
::

::Card{variant=soft eyebrow="The latest tokens stay intact" size=sm}
`keepRecentTokens` is 20,000 by default: these latest tokens are not summarised but kept as they are, after the summary. The cut shows in `/tree`.
::
:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="More hands-on" size=sm}
Create a `memory.md` file and ask the LLM to write it, telling it the important points. Takes some discipline.
::
::Card{variant=teal eyebrow="On your own" tone=teal size=sm}
With `gemma-4-31b` (128K, threshold around 112,000), compaction does not trigger on NÉON. Declare a second provider `ilaas-bride` that advertises `"contextWindow": 32000`, work until it triggers, then read the summary and the cut in `/tree`.
::
:::
::::

---
section: Part 3 · Context
---

# Generalising :Hint[What stays true when the tool changes]

::::Stack{fill gap=4 center}
:::Item{variant=goal n=1}
Stable at the front, variable at the back
::Detail
The system prompt, context files and tools at the start; what varies at the end. Switching models or tools mid-session resets the cache.
::
:::
:::Item{variant=goal n=2 ghost}
Check that a setting reaches the model
::Detail
`--thinking max` can send the same request as `minimal`. If you test models, make sure you check the inference providers’ configurations.
::
:::
:::Item{variant=goal n=3 ghost}
Manage what goes in and out of your main window
::Detail
A script, a command or `codemode` cost less than a compaction, except on a small task.
::
:::
::::

---
layout: section
index: Part 4 / 5
---

::SectionHead{num="04" detail="The context levers, measured"}
# Evaluate
::

::Agenda
- trysquare, to repeat a configuration and compare
- The experiment: four context levers, three models
- Check a campaign before reading its scores
- What each lever changes, and why it differs between models
::

---
section: Part 4 · Evaluate
---

# trysquare: repeat, score, compare :Hint[github.com/AI-for-dev/trysquare]{href="https://github.com/AI-for-dev/trysquare"}

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
A single run says nothing about a configuration: over six identical runs of the baseline, the criterion is missed twice.
::

::Specs{w="6rem"}
- **Repeat** each configuration of a TOML scenario, in a throwaway clone of the `etalon-v1` tag
- **Score** with a validation script that returns its metrics and the reason for each: an LLM judge is possible, we avoid it
- **Compare** two configurations: does the 95% interval of the difference exclude zero?
::
:::
:::Stack{gap=3 .code-xs}
:Eyebrow[Exercise, in trysquare-starter]{tone=teal}

```bash
# adapt [agent] to your provider, then three repetitions:
# 16 configurations × 3 = 48 runs, during the rest of the day
uv run trysquare run scenarios/issue1-context.toml \
  --output results --repetitions 3

# analyse without calling the model again
uv run trysquare render scenarios/issue1-context.toml \
  --output results --repetitions 3
uv run trysquare replay results/issue1-context_… \
  --scenario scenarios/issue1-context.toml --rescore
uv run trysquare compare results/… results/…
```

::Note{tag="Before running"}
Bet on the lever that will help your model most, and on the one that will change nothing.
::
::Note{tag="On your own"}
Change the model in `[agent]` and compare your matrix with ours.
::
:::
::::

---
section: Part 4 · Evaluate
---

# The experiment: four crossed levers :Hint[16 configurations × 20 runs, per model]

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="The task: NÉON issue #1" size=sm}
The ball goes through the bricks. The code comment describes the basic fix. `ISSUES.md` adds the corner, the junction of two bricks, tunneling and red tests first.
::
:Eyebrow[Scored by a probe and by the diff]{tone=teal}

::Specs{w="5.5rem"}
- **criterion** on each face, the axis hit flips and the other does not
- **corner** both components flip
- **tunneling** a fast ball no longer goes through
- **tests** the suite has more cases than at the start
::
:::
:::Stack{gap=4}
::Matrix{size=sm left first="6.5rem"}
| lever | without | with |
| --- | --- | --- |
| ticket | “The ball goes through the bricks instead of bouncing. Fix that.” | a ticket that points to the issue, asks to think about interactions and sets the scope |
| `blind` | the repository as is | no git history, no `ISSUES.md` |
| reasoning | off | `medium` |
| probe | none | `probe.test.js` dropped in from the start |
::

::Note{tag="Models"}
`gemma-4-31b` (ILaaS), `qwen-3.8-27b` and `DeepSeek-V4.1-Flash` (GRICAD).
::
::Note{tag="On purpose"}
The ticket points to `ISSUE.md`, without the S: does the model look for the right file, or give up?
::
:::
::::

---
section: Part 4 · Evaluate
---

# Can we trust the campaigns? :Hint[13 and 14 October 2026, 30 min timeout]

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
::Matrix{size=md first="17rem"}
| out of 320 runs per model | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| with no file modified | 3 | **18** | 1 |
| cut off by the timeout | 25 | **181** | 1 |
| provider-side retries | **974** | 9 | 0 |
| probe left intact, out of 160 | 160 | 158 | 160 |
| median throughput (tokens/s) | 21 | 8 | 49 |
::

::Note{tag="Convention" .mt-5}
All our figures cover the twenty runs of a configuration: an empty run counts as a failure.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="DeepSeek" size=sm}
Clean: no retries, a single run cut off.
::
::Card{variant=soft eyebrow="gemma" size=sm}
Usable, but ILaaS was unstable. A retry replays the turn with the whole context: the cost columns cannot be read.
::
::Card{variant=accent eyebrow="qwen" size=sm}
Rerun on GRICAD, but slow: its figures say what it achieves **in 30 minutes** with that provider.
::
:::
::::

---
section: Part 4 · Evaluate
---

# Configuration by configuration :Hint[corner passed, out of 20 runs]

::Stack{fill center}
<Heatmap
  :groups="['gemma-4-31b', 'qwen-3.8-27b', 'DeepSeek-V4.1-Flash']"
  :notes="['criterion: 267/320', 'criterion: 226/320', 'criterion: 315/320']"
  :row-groups="['Sloppy request', 'Well-written ticket']"
  :row-labels="['ISSUES.md', 'blind']"
  :col-groups="['reasoning off', 'medium']"
  :col-labels="['none', 'probe']"
  :values="[
    [[0, 12, 0, 19], [0, 10, 0, 17], [16, 17, 17, 17], [0, 16, 0, 19]],
    [[12, 16, 4, 18], [0, 10, 0, 20], [9, 16, 8, 15], [1, 13, 1, 16]],
    [[19, 20, 20, 20], [0, 20, 0, 20], [20, 20, 19, 20], [5, 20, 4, 20]],
  ]"
/>
::

::Takeaway{.mt-5}
The criterion mostly separates the models: DeepSeek passes it almost everywhere. The levers show on the hard cases, such as the corner: a “probe” column that lights up, a `blind` row that goes dark.
::

---
section: Part 4 · Evaluate
---

# The effect of each lever :Hint[gap in points, 160 runs with vs 160 without]

::::Cols{cols=2 gap=6 fill content=center .effects}
:::Stack{gap=1}
:Eyebrow[The probe provided]

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| criterion | :Effect{v="12" lo="4" hi="20"} | :Effect{v="16" lo="6" hi="26"} | :Effect{v="3" lo="1" hi="6"} |
| corner | :Effect{v="59" lo="49" hi="68"} | :Effect{v="56" lo="46" hi="64"} | :Effect{v="46" lo="38" hi="53"} |
| tunneling | :Effect{v="51" lo="42" hi="59"} | :Effect{v="41" lo="31" hi="51"} | :Effect{v="32" lo="25" hi="39"} |
| tests | :Effect{v="-31" lo="-41" hi="-21"} | :Effect{v="-38" lo="-48" hi="-28"} | :Effect{v="-42" lo="-51" hi="-32"} |
::
:::
:::Stack{gap=1}
:Eyebrow[The well-written ticket]{tone=teal}

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| criterion | :Effect{v="7" lo="-1" hi="15"} | :Effect{v="-11" lo="-21" hi="-2"} | :Effect{v="-1" lo="-4" hi="2"} |
| corner | :Effect{v="27" lo="17" hi="38"} | :Effect{v="-1" lo="-11" hi="10"} | :Effect{v="6" lo="-4" hi="15"} |
| tunneling | :Effect{v="28" lo="18" hi="38"} | :Effect{v="6" lo="-4" hi="17"} | :Effect{v="18" lo="11" hi="26"} |
| tests | :Effect{v="34" lo="23" hi="44"} | :Effect{v="33" lo="22" hi="44"} | :Effect{v="54" lo="46" hi="63"} |
::
:::
:::Stack{gap=1}
:Eyebrow[Medium reasoning]

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| criterion | :Effect{v="17" lo="9" hi="25"} | :Effect{v="16" lo="6" hi="26"} | :Effect{v="-1" lo="-3" hi="2"} |
| corner | :Effect{v="11" lo="1" hi="22"} | :Effect{v="3" lo="-8" hi="14"} | :Effect{v="-1" lo="-10" hi="9"} |
| tunneling | :Effect{v="16" lo="6" hi="26"} | :Effect{v="25" lo="15" hi="35"} | :Effect{v="-3" lo="-11" hi="5"} |
| tests | :Effect{v="48" lo="38" hi="56"} | :Effect{v="12" lo="1" hi="23"} | :Effect{v="-4" lo="-15" hi="6"} |
::
:::
:::Stack{gap=1}
:Eyebrow[No ISSUES.md or history (blind)]{tone=teal}

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| criterion | :Effect{v="3" lo="-4" hi="11"} | :Effect{v="8" lo="-3" hi="17"} | :Effect{v="-2" lo="-5" hi="1"} |
| corner | :Effect{v="-23" lo="-33" hi="-12"} | :Effect{v="-23" lo="-34" hi="-12"} | :Effect{v="-43" lo="-51" hi="-35"} |
| tunneling | :Effect{v="-16" lo="-26" hi="-5"} | :Effect{v="-10" lo="-21" hi="0"} | :Effect{v="-29" lo="-37" hi="-22"} |
| tests | :Effect{v="-5" lo="-16" hi="6"} | :Effect{v="-2" lo="-12" hi="9"} | :Effect{v="-23" lo="-33" hi="-13"} |
::
:::
::::

::Note
The bar is the 95% interval, obtained by resampling. Filled dot: the interval excludes zero. Hollow dot: nothing to conclude.
::

---
section: Part 4 · Evaluate
---

# Four levers, four effects

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="The probe helps all three models" size=sm}
With it, the corner is passed in **79%**, **78%** and **100%** of runs.

::Detail
In return, the agent stops writing its own tests: -31 to -42 points. It has the cases in front of it. On a real ticket, nobody will hand you the probe.
::
:::
:::Card{badge="2" title="The ticket gets tests written" size=sm}
+33 to +54 points of added tests. For gemma, it is what makes it read `ISSUES.md`: +27 on the corner.

::Detail
For qwen, -11 on the criterion: it investigates, writes tests, and the timeout hits before the fix.
::
:::
:::Card{badge="3" title="Reasoning helps the weakest" size=sm}
gemma: +17 on the criterion, +48 on tests. qwen: +16, and 54 timeouts instead of 127.

::Detail
DeepSeek is already at the ceiling: it only gains time, 482 s vs 335 s median.
::
:::
:::Card{badge="4" title="blind only costs models that read" size=sm}
With the sloppy request and no probe, removing `ISSUES.md` drops the corner to zero for qwen and DeepSeek, which open it on their own (58 and 79 times out of 80).

::Detail
gemma almost never opens it (2/80): it only loses what the ticket sent it to read. The criterion does not move.
::
:::
::::

---
section: Part 4 · Evaluate
---

# How do the models work? :Hint[from the sessions]

::Matrix{size=sm first="22rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| tool calls (median), baseline configuration | 5 | 27 | 22 |
| same configuration, in `blind` | 5 | 9 | 11 |
| median duration without reasoning / with | 269 s / 556 s | 1,800 s / 1,422 s | 335 s / 482 s |
::

::::Cols{cols=3 gap=5 .mt-5}
:::Card{variant=soft eyebrow="gemma" title="Does what it is shown" size=sm}
With the sloppy request and no probe, 35 runs out of 40 follow the same path: `ls -R`, read `neon.js`, `npm test`, the fix from the comment, `npm test`.
:::
:::Card{variant=soft eyebrow="qwen" title="Debugs by simulation" size=sm}
Throwaway scripts, ball speeds, a tweak, and start again. With a slow provider, the timeout hits.
:::
:::Card{variant=soft eyebrow="DeepSeek" title="Works methodically" size=sm}
It reads everything, uses git and reruns the tests after its last change in 317 runs out of 319.
:::
::::

::Note{.mt-4}
Sessions classified with regular expressions: these are trends, not measurements.
::

---
section: Part 4 · Evaluate
---

# Generalising :Hint[What stays true when the tool changes]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**The path taken is a poor predictor of the result**: what decides the corner and tunneling is the information the agent has read.
::
::Bullet{k="2" accent}
**A lever measured on one model says nothing about another**: gemma only reads what it is pointed to, qwen and DeepSeek explore on their own.
::
::Bullet{k="3"}
**Putting the tests in the loop** works on every model, at the cost of the tests the agent no longer writes.
::
::Bullet{k="4"}
**Check a campaign before reading its scores**: retries, reruns, timeouts. None of them shows in the table.
::
::::

::Takeaway{.mt-5}
**What you should be able to say at the end**: one lever whose effect changes from one model to another, and why. The well-written ticket makes gemma read `ISSUES.md`, and changes almost nothing to the corner for DeepSeek, which reads it anyway.
::

---
layout: section
index: Part 5 / 5
---

::SectionHead{num="05" detail="A working procedure loaded on demand"}
# Skills
::

::Agenda
- What a skill is, and using one for the first time
- Rebuilding: `playtester`, then `dynamic-playtester`
- Measuring a skill on three models
::

---
section: Part 5 · Skills
---

# Where we start from

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="What part 4 showed" size=sm}
The corner and tunneling are only handled if the agent has read `ISSUES.md` or the probe. Yet a real ticket rarely describes every case.
::
::Card{variant=soft eyebrow="The only lever that helps all three models" size=sm}
Providing the tests already written. But nobody will do that on a real ticket.
::
:::
:::Card{variant=accent eyebrow="One possible answer: the skill" center}
::Pull{size=lg}
Keep the agent’s attention on complex sequences (TDD, refactoring, audit) without bloating the system prompt.
::
:::
::::

---
section: Part 5 · Skills
---

# Location and anatomy :Hint[agentskills.io]{href="https://agentskills.io"}

::::Cols{cols="4fr 5fr" gap=7 fill align=center}
:::Stack{gap=4}
::Specs{w="6rem"}
- **Global** `~/.pi/agent/skills/`
- **Project** `my-project/.pi/skills/` or `my-project/.agents/skills/`
::

::Detail
Subfolders are possible, and other locations if declared in `.pi/settings.json`: `{ "skills": ["../src/database"] }`
::

::Card{variant=soft eyebrow="A markdown file" size=sm}
- a **YAML frontmatter**: a name, the directory’s as the specification requires, and a description, without which Pi does not load the skill
- a **body**: the rules to follow and, if there are several steps, the step-by-step procedure
::

::Note
`AGENTS.md` enters the context every turn. A skill is meant to come in only when the task calls for it.
::
:::
:::Stack{gap=2 .code-sm}
:Eyebrow[.pi/skills/revue-rapide/SKILL.md]{tone=quiet code}

```markdown
---
name: revue-rapide
description: Reviews the repository’s pending changes.
  Use when the user asks for a review
  before committing.
---

# Quick review

1. Run `git diff` and read the whole output.
2. Note what could break an existing test,
   then what lacks a test.
3. Return two lists: “fix before the commit”
   and “can wait”.
```
:::
::::

---
section: Part 5 · Skills
---

# What the model sees of it

:::::Cols{cols=2 gap=8 fill}
:::Stack{gap=3 .code-sm}
On **every turn**, Pi injects into the system prompt the name, description and path of each skill. The body is not there.

```xml
<available_skills>
  <skill>
    <name>revue-rapide</name>
    <description>Reviews the pending changes…</description>
    <location>…/revue-rapide/SKILL.md</location>
  </skill>
</available_skills>
```

::Note
Twenty skills means twenty descriptions in every turn: a hefty preamble.
::
:::

::::Stack{gap=4 center}
:Eyebrow[Two paths to the body]

:::Choice{k="Path 1" title="The model decides to open it"}
::Detail
With the read tool, based on the description alone. Pi’s docs warn that a model may not load a relevant skill.
::
:::
:::Choice{k="Path 2" title="You type /skill:revue-rapide" hero}
::Detail
Pi pastes the body into your first message, on the client side. The model has nothing left to decide.
::
:::
::::
:::::

---
section: Part 5 · Skills
---

# Two kinds of skills

::::Cols{cols=2 gap=7 fill}
:::Card{eyebrow="Triggered by the model" title="Model-invoked" size=sm}
- the default mode
- the name and description of every skill, project and global, are in the system prompt every turn
- the description must tell the model **when** and **why** to use it: as precisely as possible

::Specs{w="6rem" .mt-3}
- **Pro** little load on the human, who does not need to know the slash commands
- **Con** weighs on the window; the agent can miss a skill; you have to test and check it is used at the right time
::
:::
:::Card{variant=teal eyebrow="Triggered by the user" title="User-invoked" tone=teal size=sm}
- `disable-model-invocation: true` in the frontmatter
- missing from the list of skills the model sees
- the developer types `/skill:skill-name`: only then does the harness load it
- the description is still required: without it, Pi does not load the skill

::Specs{w="6rem" .mt-3}
- **Pro** the user is in control, more deterministic; does not weigh on the window
- **Con** easy to forget, especially in long sessions; more mental load, growing with the number of skills
::
:::
::::

---
section: Part 5 · Skills
---

# Exercise: checking the mechanics

::::Cols{cols=4 gap=4}
::Step{n=1 title="Drop in"}
`revue-rapide/SKILL.md`, change one line of the game, open a session
::
::Step{n=2 title="Export"}
`/export`: the `<available_skills>` block is there, the body is not
::
::Step{n=3 title="Ask"}
“review what I just changed”, without naming the skill: will the model read `SKILL.md`?
::
::Step{n=4 title="Force"}
fresh session, `/skill:revue-rapide`: the body is in your first message
::
::::

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=6 .mt-6}
::Card{variant=accent eyebrow="In the room" center}
The first path relies entirely on the description, the second does not need it. The call to the read tool shows in the session.
::
::Card{variant=soft eyebrow="Writing the description" center}
Does it say **when** to use it, or only **what** the procedure does? Only the former helps the model decide.
::
::::
:::::

---
section: Part 5 · Skills
---

# Should I write my own skill?

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Card{variant=accent eyebrow="Be careful" size=sm}
Some sites offer lots of them, like [skills.sh](https://www.skills.sh/). But a skill can make your agent run scripts: security matters.
::
::Lead
Start by writing your own, drawing on people with some hindsight.
::
:::
:::Card{variant=soft eyebrow="Our sources of inspiration, October 2026" tone=teal}
- Lauren Tan: [cursor/plugins/pstack](https://github.com/cursor/plugins/tree/main/pstack)
- Matt Pocock: [mattpocock/skills](https://github.com/mattpocock/skills)
- Addy Osmani: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)

::Detail{.mt-3}
For a first skeleton: Anthropic’s [skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) skill.
::
:::
::::

---
layout: statement
---

:Eyebrow[Rebuild]{.mb-6}

# A skill for NÉON

<p class="muted mt-6" style="font-size:0.95rem">
Get the tests for issue #1 without a ticket describing every case.<br />
In two versions: a hand-written catalogue, then a catalogue built by web search.
</p>

---
section: Part 5 · Skills
---

# Version 1: playtester :Hint[hands-on-harness/scripts/skills/depart/playtester]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/skills/depart/playtester"}

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
A symptom reported by a player is only the visible case. Brick breakers always break in the same places.
::

::Card{variant=soft eyebrow="A catalogue of the genre’s known bugs" size=sm}
Each entry has its cause, its **invariant** (what the test checks) and its source.
::

:Eyebrow[The procedure]{tone=quiet}

1. **Component**: the function behind the symptom, the game’s boundary values
2. **Selection**: every entry for that component
3. **Red tests**: one by one
4. **Check**: when is the work done?

:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="In the room · 1" size=sm}
Write the frontmatter so that the skill is called as soon as someone asks to fix a bug in NÉON. Test it with different models.
::
::Card{variant=accent eyebrow="In the room · 2" size=sm}
Copy [this skill draft](https://github.com/AI-for-dev/hands-on-harness/blob/main/scripts/skills/depart/playtester/SKILL.md) into `.pi/skills/playtester/SKILL.md`: the catalogue and steps 1 and 2 are written, steps **3** and **4** are empty. Write them, then test with at least two models, on the sloppy request, **without** letting the agent read `ISSUES.md`.
::
::Note
Do the tests produced cover every problem in issue #1? If not, fix the procedure and start again.
::
:::
::::

---
section: Part 5 · Skills
---

# A test that fails for the right reason

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3}
:Eyebrow[For each test, our step 3]

::Bullet{k="1"}
A **precondition**: the ball and the brick overlap, or will overlap during the step, before any call to the game code
::
::Bullet{k="2"}
As a comment, the value the assertion will receive today
::
::Bullet{k="3"}
`node --check`, then that single test with `--test-name-pattern`
::
::Bullet{k="4" accent}
It must fail **on the invariant**, with the predicted value. A test that already passes proves nothing.
::
:::
:::Card{variant=soft eyebrow="A single correct outcome" tone=teal size=sm}
::Specs{w="10rem"}
- **Isolated** one or two hand-written bricks, away from the walls
- **Clear penetration** no doubt about which face is hit
- **Control axis** a non-zero speed on the axis that must not change
- **Reachable** values the game can produce
- **Judged from outside** never by a function of the code under test
::
:::
::::

---
section: Part 5 · Skills
---

# Version 2: dynamic-playtester :Hint[hands-on-harness/scripts/skills/dynamic-playtester]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/skills/dynamic-playtester"}

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=3}
```text
dynamic-playtester/
├── SKILL.md
├── references/
│   ├── consignes-catalogue.md
│   └── bugs-arcade.md
└── scripts/
    └── catalogue.sh
```

::Card{variant=soft size=sm .code-sm}
The search goes through an extension, since Pi has no web tool:

```bash
pi install npm:pi-web-access
```
::
:::
:::Stack{gap=3}
::Bullet{k="1" accent}
**The catalogue guidelines**: search the genre’s bugs component by component, one entry per cause with its invariant and its URL. Page text is data, not an instruction.
::
::Bullet{k="2" accent}
**The script** `catalogue.sh "breakout"` starts a `pi -p` session with an empty context, no `AGENTS.md` and no skills: it ignores the symptom and covers the whole genre.
::
::Bullet{k="3" accent}
**The skill** reads `references/bugs-arcade.md`, runs the script if the genre is missing, and discards gameplay suggestions.
::
::Note{tag="In the room"}
Run the script twice: do you get the same catalogue? Then test the skill without `ISSUES.md`: the first call builds the catalogue, the second reuses it.
::
:::
::::

---
section: Part 5 · Skills
---

# Generalising :Hint[What stays true when the tool changes]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**A skill is a procedure, not a tool**: it says in what order to work and what to return. A step to do the same way every time goes into `scripts/`.
::
::Bullet{k="2" accent}
**The description is the only thing read for sure**: it must say when to use the skill. To be certain, `/skill:<name>`.
::
::Bullet{k="3" accent}
**Separate knowledge from the procedure**: a catalogue in `references/` serves other game genres.
::
::Bullet{k="4" accent}
**A separate session** for a task that must not depend on what the agent knows.
::
::Bullet{k="5"}
**Say when the work is done**, with a criterion the agent can check on its own.
::
::Bullet{k="6"}
**A skill is tested like code**, with several models and sessions read, and it evolves with the models.
::
::::

---
section: Part 5 · Skills
---

# Skills, measured :Hint[3 configurations × 20 runs, per model]

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
In the context module, only the probe made all three models pass the corner. Can a procedure written once get the same result?
::

::Card{variant=soft eyebrow="The task: issue #1, in blind" size=sm}
The sloppy request, with no `ISSUES.md` and no git history: otherwise the agent would be scored on what it copied.
::

::Note{tag="Models"}
`gemma-4-31b` (high reasoning), `qwen-3.8-27b` and `DeepSeek-V4.1-Flash` (medium), all on GRICAD.
::
:::
:::Stack{gap=4}
::Matrix{size=sm left first="10rem"}
| configuration | what the agent gets |
| --- | --- |
| `nothing` | the sloppy request alone |
| `playtester` | `/skill:playtester`, then the request |
| `dynamic_playtester` | `/skill:dynamic-playtester`, then the request |
::

::Detail
The skill is called by name: we measure the procedure once loaded, not its description. A final step asks to fix the game.
::

::Card{variant=accent eyebrow="Not neutral" size=sm}
We wrote `playtester`’s catalogue knowing `ISSUES.md`. `dynamic-playtester`’s was already built: we measure the procedure with that catalogue, not the web search.
::
:::
::::

---
section: Part 5 · Skills
---

# Judging the agent’s tests :Hint[without an LLM judge]

::::Cols{cols="6fr 5fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
The agent’s tests are run against fixes other than its own: one complete fix, and five fixes each missing one part.
::

::Specs{w="9rem" raw}
- **tests_sound** no test fails on the complete fix
- **detects_axis** the criterion: a sound test catches the fix that flips `vy` on every face
- **detects_corner** … the one that forgets the corner
- **detects_neighbors** … the one that bounces twice at the junction
- **detects_tunneling** … the one that lets a fast ball through
::

::Detail
The fix itself is still scored by the probe from the context module: faces, corner, tunneling.
::
:::
:::Stack{gap=3 .code-xs}
:Eyebrow[Exercise, in trysquare-starter]{tone=teal}

```bash
# adapt [agent] to your provider, then three repetitions:
# 3 configurations × 3 = 9 runs, longer ones
uv run trysquare run scenarios/issue1-skill.toml \
  --output results --repetitions 3
```

::Note{tag="Meanwhile"}
Open the `diff.patch` of a `playtester` run: can you find a catalogue entry per `describe`?
::
::Note{tag="On your own"}
Delete `references/bugs-arcade.md` from `dynamic-playtester` and rerun with `--only dynamic_playtester`: you then also measure the search.
::
:::
::::

---
section: Part 5 · Skills
---

# Can we trust the campaigns? :Hint[17 October 2026, GRICAD]

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
::Matrix{size=md first="19rem"}
| out of 20 runs | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| no file modified, without a skill | 0 | 2 | 0 |
| same with `playtester` | 0 | **11** | 0 |
| same with `dynamic_playtester` | 0 | **12** | 0 |
| provider-side retries, in total | 4 | 0 | 0 |
| tests that cannot run on the references, out of 60 | 13 | 14 | 16 |
::

::Note{tag="Convention" .mt-5}
An empty run, or one whose tests do not run on the references, counts as a failure. trysquare’s summary removes them from the denominator: 5/12 instead of 5/20.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="DeepSeek" size=sm}
Clean: no retries, no timeouts, every run delivers.
::
::Card{variant=soft eyebrow="gemma" size=sm}
Usable. The 4 retries fall in `playtester`: that configuration’s costs cannot be read.
::
::Card{variant=accent eyebrow="qwen" size=sm}
With a skill, it delivers nothing one time in two: its reasoning fills the turn’s 32,768 tokens without a single tool call. That is not an incident, it is a result.
::
:::
::::

---
section: Part 5 · Skills
---

# Configuration by configuration :Hint[successes, out of 20 runs]

::Stack{fill center}
<Heatmap
  :groups="['gemma-4-31b', 'qwen-3.8-27b', 'DeepSeek-V4.1-Flash']"
  :notes="['4 retries, in playtester', 'with a skill: 9 and 8 delivered', 'no retries']"
  :row-groups="['Configuration']"
  :row-labels="['nothing', 'playtester', 'dynamic']"
  :col-groups="['the fix', 'its tests']"
  :col-labels="['faces', 'corner', 'tunnel']"
  :values="[
    [[14, 0, 0, 4, 0, 0], [20, 20, 17, 5, 5, 8], [16, 0, 12, 8, 1, 4]],
    [[17, 0, 0, 0, 0, 0], [9, 9, 8, 9, 9, 7], [5, 4, 1, 7, 4, 1]],
    [[20, 0, 0, 0, 0, 0], [20, 20, 19, 20, 20, 18], [20, 12, 17, 20, 10, 17]],
  ]"
/>
::

::Takeaway{.mt-5}
Without a skill, no model passes the corner or tunneling, as in the context module. With `playtester`, gemma and DeepSeek pass the corner 20 times out of 20, without the probe.
::

::Note{.mt-3}
On the tests side, “faces” is the `detects_axis` criterion. The fix is scored by the probe, the tests on the reference fixes.
::

---
section: Part 5 · Skills
---

# Each skill against the request alone :Hint[gap in points, 20 runs vs 20]

::::Cols{cols=2 gap=6 fill content=center}
:::Stack{gap=1}
:Eyebrow[playtester vs nothing]

::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| corner | :Effect{v="100" lo="100" hi="100" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| tunneling | :Effect{v="85" lo="70" hi="100" max="120"} | :Effect{v="40" lo="20" hi="60" max="120"} | :Effect{v="95" lo="85" hi="100" max="120"} |
| test: faces | :Effect{v="5" lo="-20" hi="30" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test: corner | :Effect{v="25" lo="5" hi="45" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test: junction | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="35" lo="15" hi="55" max="120"} | :Effect{v="90" lo="75" hi="100" max="120"} |
::
:::
:::Stack{gap=1}
:Eyebrow[dynamic_playtester vs nothing]{tone=teal}

::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| corner | :Effect{v="0" lo="0" hi="0" max="120"} | :Effect{v="20" lo="5" hi="40" max="120"} | :Effect{v="60" lo="40" hi="80" max="120"} |
| tunneling | :Effect{v="60" lo="40" hi="80" max="120"} | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="85" lo="70" hi="100" max="120"} |
| test: faces | :Effect{v="20" lo="-10" hi="45" max="120"} | :Effect{v="35" lo="15" hi="55" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test: corner | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="20" lo="5" hi="40" max="120"} | :Effect{v="50" lo="30" hi="70" max="120"} |
| test: junction | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="0" lo="0" hi="0" max="120"} | :Effect{v="5" lo="0" hi="15" max="120"} |
::
:::
::::

::Note
The bar is the 95% interval, obtained by resampling. Filled dot: the interval excludes zero. With twenty runs on each side, the intervals are wider than in the context module.
::

---
section: Part 5 · Skills
---

# Same procedure, different catalogue :Hint[dynamic_playtester vs playtester]

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=4}
:Eyebrow[The corner invariant, in each catalogue]

::Card{variant=teal eyebrow="playtester, hand-written" tone=teal size=sm}
“when the ball penetrates as much on both axes, both components flip”

A condition and a value: the agent can turn it into an exact test.
::
::Card{variant=soft eyebrow="dynamic-playtester, taken from the web" size=sm}
“the chosen reflection side must be the face the ball is actually penetrating”

A vague invariant gives a vague test.
::
:::
:::Stack{gap=1}
::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| corner | :Effect{v="-100" lo="-100" hi="-100" max="120"} | :Effect{v="-25" lo="-50" hi="5" max="120"} | :Effect{v="-40" lo="-60" hi="-20" max="120"} |
| tunneling | :Effect{v="-25" lo="-50" hi="0" max="120"} | :Effect{v="-35" lo="-60" hi="-10" max="120"} | :Effect{v="-10" lo="-30" hi="5" max="120"} |
| test: faces | :Effect{v="15" lo="-15" hi="45" max="120"} | :Effect{v="-10" lo="-40" hi="20" max="120"} | :Effect{v="0" lo="0" hi="0" max="120"} |
| test: corner | :Effect{v="-20" lo="-40" hi="0" max="120"} | :Effect{v="-25" lo="-50" hi="5" max="120"} | :Effect{v="-50" lo="-70" hi="-30" max="120"} |
| test: junction | :Effect{v="0" lo="-15" hi="15" max="120"} | :Effect{v="-35" lo="-55" hi="-15" max="120"} | :Effect{v="-85" lo="-100" hi="-65" max="120"} |
::
:::
::::

::Takeaway{.mt-4}
The catalogue matters as much as the procedure. With the vague invariant, gemma never fixes the corner again (0/20) and DeepSeek only 12 times out of 20.
::

---
section: Part 5 · Skills
---

# What we take away

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="The procedure gets tests written first" size=sm}
Without a skill, no run writes a test before modifying `neon.js`. With one, every run that delivers does.

::Detail
10 cases added at the median with `playtester`, vs 2 to 4 without a skill.
::
:::
:::Card{badge="2" title="playtester gets the corner, no probe" size=sm}
gemma and DeepSeek pass the corner 20 times out of 20, tunneling 17 and 19 times.

::Detail
With one caveat: this catalogue was written by people who had read `ISSUES.md`.
::
:::
:::Card{badge="3" title="A green test may detect nothing" size=sm}
gemma fixes the corner 20 times out of 20, but its tests only detect the corner defect 5 times.

::Detail
Only one of its twenty test suites passes on the reference fix.
::
:::
:::Card{badge="4" title="A skill has a cost, and can cause failure" size=sm}
DeepSeek goes from 104 s to 470 s median, with about seven times more input tokens.

::Detail
For qwen, the reasoning exceeds its ceiling one time in two, before writing a single line.
::
:::
::::

---
section: Part 5 · Skills
---

# How do the models work? :Hint[from the sessions]

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5 align=stretch}
:::Card{variant=soft eyebrow="DeepSeek" title="Follows the procedure step by step" size=sm}
One test per catalogue entry, run alone to see it fail (17 times out of 20 with `playtester`), then the fix. Its tests only import functions that are already exported.
:::
:::Card{variant=soft eyebrow="gemma" title="Tests its own fix" size=sm}
It moves the collision out of `frame()` into `step()` or a new function, then rewrites its tests to call it there (15 times out of 20). They then check its code, no longer the expected behaviour.
:::
:::Card{variant=soft eyebrow="qwen" title="Plans everything before acting" size=sm}
When it delivers, it fixes the corner 9 times out of 9. But it designs every test in its reasoning, which goes over 32,768 tokens one time in two.
:::
::::

::Note
Sessions classified with regular expressions: these are trends, not measurements.
::
:::::

---
section: Part 5 · Skills
---

# Generalising :Hint[What the measurement teaches]

::::Stack{fill gap=2 center}
::Bullet{k="1" accent}
**A procedure changes the way of working, reproducibly**: all three models write their tests before fixing as soon as they are given one.
::
::Bullet{k="2" accent}
**Domain knowledge lives in the catalogue**: a useful invariant names a condition and a value the agent can turn into an exact test.
::
::Bullet{k="3"}
**Run the agent’s tests against a fix other than its own.** Failing that, compare the red tests at the start with the green tests at the end.
::
::Bullet{k="4"}
**Measure a skill on every target model**: the same file gives 20 corners out of 20 for DeepSeek and makes qwen fail one time in two.
::
::Bullet{k="5"}
**Check what the configuration measures**: here, `dynamic_playtester` started from a catalogue already written, not from a web search.
::
::::

---
layout: statement
---

# See you tomorrow!

::LogoBar{size=40 dark .mt-10}
::

---
layout: section
index: Appendices
---

::SectionHead{eyebrow="Appendices" num="A"}
# Going<br />further
::

::Agenda{numbering=alpha}
- Security and sandbox: three isolation approaches, the Docker Sandboxes kit
- Skills: method, sources of inspiration, and compared approaches
::

---
section: Appendix A · Security and sandbox
---

# Confining the Pi process :Hint[Approach 1 / 3 · process]

::Lead
Pi and the processes it starts are constrained by the OS, without a guest kernel or micro-VM.
::

::::Cols{cols=2 gap=7 .mt-4}
:::Card{eyebrow="Bubblewrap" title="pi-safe" size=sm}
[github.com/dimaginar/pi-safe](https://github.com/dimaginar/pi-safe)

- read-only file system, except the current project and `~/.pi`
- mainly protects against accidental writes outside the project

::Detail{.mt-3}
Key point: global reads and the network stay open.
::
:::
:::Card{eyebrow="Fine-grained policies" title="nono" tone=teal size=sm}
[github.com/nolabs-ai/nono](https://github.com/nolabs-ai/nono)

- access profiles for files, network and credentials
- a broker: each delegated tool can have its own policy

::Detail{.mt-3}
Granularity, without a VM boundary.
::
:::
::::

::Takeaway{.mt-4}
OS confinement limits access, but still shares the host’s kernel.
::

---
section: Appendix A · Security and sandbox
---

# Running tools in a micro-VM :Hint[Approach 2 / 3 · tools in a VM]

::Lead
The standard tools run behind a VM boundary; Pi stays on the host. Example: [Gondolin](https://github.com/earendil-works/gondolin), experimental, and [pi-gondolin](https://github.com/pasky/pi-gondolin). Keys passed as environment variables remain visible in the VM.
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Stack{gap=2}
::Card{eyebrow="Host" size=sm}
**Pi · extensions · credentials**
:Detail[the agent runtime, outside the micro-VM]
::
:Pipeline{label="Tool calls" flow="Pi > micro-VM"}
::Card{variant=teal eyebrow="Micro-VM" tone=teal size=sm}
**`bash` · `read` · `write` · `edit` · `!`**
:Detail[the project mounted read-write]
::
:::
:::Card{variant=soft eyebrow="What this changes" size=sm}
- a stronger VM boundary for commands
- extensions that are not delegated stay on the host
- the shared workspace can still be modified from the VM
:::
::::

::Takeaway{.mt-4}
Gondolin protects the host from the tools, not necessarily from extensions or from effects on the shared project.
::

---
section: Appendix A · Security and sandbox
---

# Isolating the whole agent runtime :Hint[Approach 3 / 3 · runtime]

::Lead
Pi, its tools and its extensions run in the same sandbox; the rights still need defining.
::

::::Cols{cols=3 gap=5 fill}
:::Card{eyebrow="Micro-VM" title="micro-pi + Microsandbox" size=sm}
- [micro-pi](https://github.com/asyrjasalo/micro-pi): all of Pi runs in a micro-VM
- project bind-mounted, changes made live
- Pi configuration copied; API keys passed as environment variables

::Detail{.mt-3}
Warning: the keys are accessible in the VM.
::
:::
:::Card{variant=accent eyebrow="Managed VM" title="Docker Sandboxes" size=sm}
- a VM environment dedicated to the agent
- secrets substituted by a host-side proxy
- workspace shared read-write (direct) or an isolated copy (Git clone, `--clone`)

::Detail{.mt-3}
Check the sharing mode.
::
:::
:::Card{eyebrow="Configurable runtime" title="OpenShell" tone=teal size=sm}
- Docker, Podman, Kubernetes or micro-VM sandbox
- policies: files, processes, network
- credentials bound to allowed endpoints, via a proxy

::Detail{.mt-3}
A separate kernel only with a VM.
::
:::
::::

---
section: Appendix A · Security and sandbox
---

# Docker Sandboxes: a kit for Pi :Hint[github.com/AI-for-dev/ai4dev-pi-kit]{href="https://github.com/AI-for-dev/ai4dev-pi-kit"}

::::Cols{cols="5fr 6fr" gap=7 fill}
:::Stack{gap=4}
Pi is not an agent built into `sbx`, which runs `claude`, `codex`, `opencode`… It goes through a **kit**: a directory described by a `spec.yaml`.

```text
ai4dev-pi-kit
├── spec.yaml       image, command, keys, network
└── files/home/.pi/agent
    ├── models.json
    ├── settings.json
    └── extensions/pi-permission-system/config.json
```

::Note{tag="Warning"}
Not to be confused with [carderne/pi-sandbox](https://github.com/carderne/pi-sandbox), an extension that confines `bash` at the OS level, without Docker.
::
:::

:::Cell{.code-sm}
```yaml
sandbox:
  image: docker.io/sbx/pi-image:latest
  entrypoint: [pi, -a]   # project marked as trusted

credentials:
  - service: ilaas
    apiKey:
      name: ILAAS_API_KEY
      proxyManaged: true   # Pi only sees a placeholder
      inject:
        - domain: llm.ilaas.fr
          scheme: bearer

permissions:
  network:
    allow: [llm.ilaas.fr, github.com, pypi.org,
            registry.npmjs.org, pi.dev, …]
```
:::
::::

:Pipeline{label="The key" flow="Pi reads a placeholder > the host’s proxy inserts the key > llm.ilaas.fr only" .mt-4}

---
section: Appendix A · Security and sandbox
---

# Getting started :Hint[docs.docker.com/ai/sandboxes]{href="https://docs.docker.com/ai/sandboxes/install/"}

::::Cols{cols=5 gap=3}
::Step{n=1 title="Install"}
the `sbx` tool
::
::Step{n=2 title="Fetch"}
the kit
::
::Step{n=3 title="Store"}
the service key
::
::Step{n=4 title="Set"}
the network policy
::
::Step{n=5 title="Run"}
from NÉON
::
::::

::::Cols{cols=2 gap=6 fill .mt-4}
:::Cell{.code-sm}
```bash
sbx login
git clone https://github.com/AI-for-dev/ai4dev-pi-kit \
  ~/Projects/ai4dev-pi-kit
sbx kit validate ~/Projects/ai4dev-pi-kit

sbx secret set ilaas          # then sbx secret ls
sbx policy init deny-all      # once and for all

cd ~/Projects/neon
sbx run ~/Projects/ai4dev-pi-kit
```
:::
:::Stack{gap=3}
::Card{variant=soft eyebrow="Why deny-all" size=sm}
On first run, `sbx` offers *Open*, *Balanced* or *Locked Down*. `Balanced` allows wildcards such as `*.googleapis.com`, much broader than model APIs.
Start from deny and only open what shows up in `sbx policy log`.
::
::Card{variant=accent eyebrow="Credential binding" size=sm}
On first run, `sbx` asks you to allow the kit to use this secret. Without an answer (CI, `--detach`), the sandbox starts without the key: `sbx` shows a warning and calls to the model fail.
::
:::
::::

---
section: Appendix A · Security and sandbox
---

# The keys stay on the host

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3 .code-xs}
:Eyebrow[Declare an ILaaS key]{tone=quiet code}

```bash
sbx secret set ilaas
sbx secret ls
```

:Eyebrow[Reuse the key already stored by Pi]{tone=quiet code .mt-3}

```bash
python3 -c "import json, os; print(json.load(open(
  os.path.expanduser('~/.pi/agent/auth.json')))['ilaas']['key'])" \
  | sbx secret set ilaas
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Shared by default" size=sm}
Secrets are shared by every sandbox.
::
::Card{variant=teal eyebrow="Restrict to one sandbox" tone=teal size=sm .code-sm}
```bash
sbx secret set ilaas --sandbox neon-bug-1
```
::
:::
::::

---
section: Appendix A · Security and sandbox
---

# Architecture choices

::::Cols{cols=2 gap=7 fill}
:::Card{eyebrow="One sandbox per worktree" .code-xs}
```text
herdr
└── WT bug1
    └── SBX
        └── Pi
```

::Detail{.my-3}
In `~/.herdr/worktrees/neon/fix-brick-bounce`:
::

```bash
sbx run --name neon-bug-1 ~/Projects/ai4dev-pi-kit .
sbx ls                      # list the sandboxes
sbx stop neon-bug-1         # stop
sbx run --name neon-bug-1   # restart
```
:::
:::Card{eyebrow="One sandbox per project" tone=teal .code-xs}
```text
herdr
└── neon
    └── SBX
        ├── main repository
        ├── WT1 → Pi
        └── WT2 → Pi
```

::Detail{.my-3}
From the main repository:
::

```bash
sbx run --name neon-project ~/Projects/ai4dev-pi-kit \
  ~/Projects/neon ~/.herdr/worktrees/neon

# Pi on the bug 1 worktree, in a herdr pane
sbx exec -it \
  --workdir ~/.herdr/worktrees/neon/fix-brick-bounce \
  neon-project pi -a
```
:::
::::

---
section: Appendix A · Security and sandbox
---

# One sandbox per project, with pi-permission-system

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3 .code-sm}
::Card{variant=soft eyebrow="Already installed" size=sm}
The kit lists the extension under `packages` in `settings.json`, with a pinned version: `npm:@gotgenes/pi-permission-system@40.1.1`. Pi installs it when each sandbox starts.
::

::Card{variant=soft eyebrow="A domain denied?" size=sm}
Read it in `sbx policy log`, then open it for this sandbox only, and close it again afterwards.
::

```bash
sbx policy allow network --sandbox neon-project \
  <domain>
sbx policy rm network --sandbox neon-project \
  --resource <domain>
```
:::
:::Stack{gap=2 .code-xs}
:Eyebrow[the kit’s global policy]{tone=quiet code}

```json
{
  "permission": {
    "*": "allow",
    "path": {
      "*": "allow",
      "*.env": "deny",
      "*.env.*": "deny"
    },
    "bash": {
      "*": "allow",
      "rm -rf *": "deny"
    },
    "external_directory": "allow"
  }
}
```

::Note{tag="No ask"}
With `pi -p`, nobody answers and the call is denied. Confirmations go in the project configuration, `.pi/extensions/…/config.json`, which takes precedence.
::
:::
::::

---
section: Appendix A · Security and sandbox
---

# In short, a three-layer setup

::::Cols{cols=3 gap=5 fill content=center}
::Criterion{n=1 title="Docker Sandbox"}
limits the playground
::
::Criterion{n=2 title="Worktree"}
isolates the tasks
::
::Criterion{n=3 title="pi-permission-system"}
decides which actions are acceptable
::
::::

---
layout: section
index: Appendices
---

::SectionHead{eyebrow="Appendix B" num="B"}
# Skills
::

::Agenda
- Design effective instructions
- Draw inspiration from complete workflows
- Compare several philosophies
::

---
section: Appendix B · Skills
---

# Method and design :Hint[Anthropic’s best practices]{href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices"}

::::Cols{cols=2 gap=5}
:::Card{badge="1" title="Break into steps, where relevant" size=sm}
- a numbered chronological sequence: the agent skips fewer steps
- precise action verbs, no vague instructions
- explicit stopping criteria, to avoid infinite loops
:::
:::Card{badge="2" title="Rely on external references" size=sm}
To keep the skill short: “For this step where you need to create a PRD, read `references/prd-template.md` carefully before writing.”
It saves context, and it is easier to understand and maintain.
:::
:::Card{badge="3" title="Dense technical terms" size=sm}
Rather than long paragraphs: *vertical slice*, *TDD red-green-refactor*, *blast radius*.
::Detail{.mt-3}
An agent is not a human: it does not sort what it reads, and will not guess what you forgot.
::
:::
:::Card{badge="4" title="Remove confusion and clutter" size=sm}
Rules piled up on the same topic dilute attention (likewise for repetitions across `AGENTS.md`, ticket and skill).
If removing an instruction (“write maintainable code”) changes nothing, delete it.
:::
::::


---
section: Appendix B · Skills
---

# A skills repository covering the production cycle :Hint[Matt Pocock’s workflow v1.3]{href="https://github.com/mattpocock/skills"}

::::Cols{cols=5 gap=3}
::Step{n=1 title="Framing"}
`/grill-with-docs`: the agent questions the developer, clarifies the need, updates the domain glossary or the ADRs
::
::Step{n=2 title="Specification"}
`/to-spec`: a clear specification, the source of truth for the implementation
::
::Step{n=3 title="Slicing"}
`/to-tickets`: independent tickets, sized for a single session
::
::Step{n=4 title="Execution"}
`/implement-spec`: sub-agents in parallel in worktrees, with TDD. `/implement` handles tickets one by one
::
::Step{n=5 title="Wrap-up"}
`/code-review`, `/pr`, `/retro`: review by sub-agents, blast radius, environment improvements for the next session
::
::::

::::Cols{cols="3fr 1fr" gap=6 .mt-5}
::Takeaway
Best to create your skills around your problems and your way of working, but drawing on what already exists is very useful.
::
::Note{tag="Video"}
9 Things People Get Wrong With My /grill-* skills
::
::::

---
section: Appendix B · Skills
---

# A comparative approach

::Matrix{size=xs left first="8rem"}
| | Matt Pocock (skills) | Superpowers (Jesse Vincent) | Agent Skills (Addy Osmani) |
| --- | --- | --- | --- |
| philosophy | **Requirements-first, composable.** Modular anti-framework: the human drives, clarification comes before speed | **Autonomous pipeline.** Full cycle without intervention: the agent plans and delegates to sub-agents | **Full lifecycle.** Google engineering culture: 24 skills over 6 phases (Define, Plan, Build, Verify, Review, Ship) |
| mode and control | **Human control.** Main flow user-invoked, disciplines (`tdd`, `code-review`, `pr`) model-invoked; sessions below the “smart zone” (~150k tokens) | **Model-invoked.** Takes a lot off the human, but a permanent context tax | **Targeted commands.** 9 commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`…) with human checkpoints |
| guardrails | **`/grill-with-docs`** resolves the dependency tree of ideas before the code | **Git worktrees** per branch, a fresh sub-agent per 2-to-5-minute task, strict TDD | **Anti-rationalisation tables**: each skill rebuts the agent’s usual excuses |
| verification | **`/retro`**: after the session, suggests environment improvements (checks, navigation, standards) | **One reviewer per task** checks compliance with the spec | **Evals in CI**: routing tested; `/ship` runs 3 review personas in parallel |
::

::::Cols{cols=2 gap=6 .mt-4}
::Note{tag="Another approach"}
[pstack](https://github.com/cursor/plugins/tree/main/pstack) (Lauren Tan, Cursor): “The best spec is code”, 23 intervention playbooks (perf, forensics…).
::
::Note{tag="Golden rules"}
Don’t download skills from just anywhere, don’t stack two skills on the same topic from two repositories, and evaluate.
::
::::
