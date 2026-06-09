---
seo:
  title: OmniScout Docs
  description: Give your AI agent a browser. No SDK. No cloud. Just a CLI.
---

::u-page-hero
#title
Give your AI agent a browser. No SDK. No cloud. Just a CLI.

#description
Local-first browser control, semantic search, and research for AI agents.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /cli/overview
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  size: xl
  to: https://omniscout.xyz
  variant: outline
  trailing-icon: i-lucide-external-link
  ---
  Website
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  to: https://github.com/sriramramnath/omniscout
  variant: ghost
  ---
  GitHub
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-pypi
  size: xl
  to: https://pypi.org/project/omniscout/
  variant: ghost
  ---
  PyPI
  :::
::

::div{.install-banner}
```bash
# Install and set up in two commands
pip install omniscout
omniscout install --skill
```
::


## What OmniScout does

OmniScout is a local daemon + CLI that gives Claude Code, Cursor, Codex, or any LLM agent real browser control — navigate, click, fill, screenshot, scrape — all through JSON-in, JSON-out commands that run entirely on your machine.

It exposes the same browser-control surface that products like **Kimi WebBridge**, **Claude for Chrome**, and **ChatGPT Atlas** ship with their models — but deliberately without the reasoning loop. Bring whatever LLM you want; OmniScout just exposes the actuator side as a CLI.

::card-group
  ::card
  ---
  title: One atomic CLI per action
  icon: i-lucide-rocket
  ---
  `navigate`, `snapshot`, `click`, `fill`, `scroll`, `key`, `screenshot`,
		`eval`, `wait`, `tab`, `network`, `login`, `captcha`. Every command
		returns structured JSON your agent can act on immediately.
  ::

  ::card
  ---
  title: Sub-second calls
  icon: i-lucide-circle-check
  ---
  A long-lived `omniscout daemon` keeps Playwright warm. Your agent never
		pays cold-start cost on every browser action.
  ::

  ::card
  ---
  title: Two backends, one vocabulary
  icon: i-lucide-puzzle
  ---
  Use headless Playwright by default, or flip to the Chrome extension to
		drive your *real* running browser — with its real cookies and logins.
  ::

  ::card
  ---
  title: Stable element refs
  icon: i-lucide-pencil
  ---
  `snapshot` returns accessibility-tree refs (`@eN`) that survive CSS
		class-hash churn. No brittle selectors. Same shape Kimi WebBridge uses.
  ::

  ::card
  ---
  title: Fully local
  icon: i-lucide-laptop
  ---
  No cloud API. No hosted browser. No MCP server to babysit. The CLI is
		the interface — your data never leaves your machine.
  ::

  ::card
  ---
  title: Agent-native output
  icon: i-lucide-braces
  ---
  Skill files install into `~/.claude/skills/`, `~/.cursor/skills-cursor/`,
		`~/.codex/skills/`, and `~/.gemini/config/skills/` so your agent learns OmniScout's vocabulary
		automatically after `omniscout install --skill`.
  ::
::

## Try it in 60 seconds

```bash
# 1. Install from PyPI
pip install omniscout

# 2. First-run setup + agent skill
omniscout install --skill

# 3. Start the daemon (idempotent)
omniscout daemon start

# 4. Drive a browser
omniscout browser navigate https://news.ycombinator.com
omniscout browser snapshot --refs-only
omniscout browser click '@e3'
omniscout browser screenshot --out /tmp/hn.png
```

::tip{title="Working from a git checkout?"}
Clone the repo and run `pip install -e cli/` for an editable install instead of
installing from PyPI.
::

## Drop these prompts into any agent

After `omniscout install --skill`, your agent reads `SKILL.md` and learns OmniScout's
command vocabulary. From then on, paste any of the following and it routes
browser tasks through OmniScout automatically.

::tabs
  :::tabs-item{label="Research a topic"}
```text
Use OmniScout to research "open-source browser agents in 2026" and summarize
the top 5 passages with their source URLs.
```
  :::

  :::tabs-item{label="Navigate & act"}
```text
Open https://news.ycombinator.com using OmniScout, get a snapshot of the
interactive elements, click the top story link, and screenshot the
resulting page to /tmp/hn-top.png.
```
  :::

  :::tabs-item{label="Persistent login"}
```text
Run `omniscout browser login https://github.com --profile work` and pause
for me to authenticate. Then use that profile to screenshot my
notifications page.
```
  :::

  :::tabs-item{label="Fill a form"}
```text
Use OmniScout to open https://duckduckgo.com, fill the search box with
"local-first AI agents", press Enter, wait for results, and return
the titles of the first 3 results.
```
  :::

  :::tabs-item{label="Inspect network"}
```text
Open the Vercel pricing page with OmniScout, start network capture, scroll
through the page, then stop capture and list any requests matching
"stripe|payment|checkout" with their response status codes.
```
  :::
::

## Prior art, and where OmniScout sits

| Product | Where it runs | What OmniScout borrows |
|---|---|---|
| Kimi WebBridge | Local daemon + Chrome extension | `@eN` refs, `/status` shape, optional extension backend |
| Claude for Chrome | MV3 side panel | Hybrid `@eN` + coordinates, click/key/scroll vocabulary |
| ChatGPT Atlas | Forked Chromium | Per-session tab groups, persistent login |
| browser-use | Playwright in-process | Backend-agnostic action surface, persistent profiles |

All of those products ship the reasoning model alongside the actuator. OmniScout's
deliberate non-goal is to own the reasoning loop — bring whatever LLM you want,
OmniScout just exposes the actuator side as a CLI.

## Where to go next

::card
---
title: Website
to: https://omniscout.xyz/
---
Install guide, use cases, and product overview.
::
::card
---
title: CLI Overview
to: /cli/overview/
---
Install, configure, and run your first commands.
::
::card
---
title: Command reference
to: /cli/commands/
---
Every verb in the action vocabulary, with JSON shapes.
::
::card
---
title: Using OmniScout with AI agents
to: /cli/agents/
---
Drop-in prompts for Claude Code, Cursor, and Codex.
::
::card
---
title: Examples & recipes
to: /cli/examples/
---
Common workflows: research, login, captcha, multi-tab automation.
::
::card
---
title: Architecture
to: /cli/architecture/
---
Daemon, backends, snapshot refs, lifecycle.
::
::card
---
title: Python SDK
to: /sdk/
---
Use OmniScout engines directly from Python.
::
