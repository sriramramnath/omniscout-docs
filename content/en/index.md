---
seo:
  title: OmniScout Docs
  description: Give your AI agent a browser. No SDK. No cloud. Just a CLI.
---

::div{.scout-hero-glow}
::

::div{.scout-home-hero}
::u-page-hero
#title
Give your AI agent a browser.

#description
Local-first browser control, semantic search, and research for AI agents. No SDK. No cloud. Just a CLI.

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
  variant: outline
  ---
  GitHub
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-pypi
  size: xl
  to: https://pypi.org/project/omniscout/
  variant: outline
  ---
  PyPI
  :::
::
::

::u-page-section{.scout-bento-section}
#title
Why OmniScout

#description
The actuator layer for browser-using agents — same surface as Kimi WebBridge or Claude for Chrome, but you bring the model.

#body
::div{.scout-bento}
  :::u-page-card{.scout-bento__span-8.scout-bento-card}
  ---
  title: Install in two commands
  icon: i-lucide-terminal
  variant: subtle
  spotlight: true
  ---
  ```bash
  pip install omniscout
  omniscout install --skill
  ```

  Then start the daemon once: `omniscout daemon start`
  :::

  :::u-page-card{.scout-bento__span-4.scout-bento-card}
  ---
  title: One atomic CLI per action
  description: navigate, snapshot, click, fill, scroll, screenshot, eval, wait, tab, network, login, captcha — every verb returns structured JSON.
  icon: i-lucide-rocket
  to: /cli/commands
  variant: subtle
  spotlight: true
  ---

  :::

  :::u-page-card{.scout-bento__span-4}
  ---
  title: Sub-second calls
  description: A long-lived daemon keeps Playwright warm. No cold-start tax on every browser action.
  icon: i-lucide-zap
  to: /cli/architecture
  variant: subtle
  ---

  :::

  :::u-page-card{.scout-bento__span-4}
  ---
  title: Stable @eN refs
  description: Snapshot returns accessibility-tree refs that survive CSS churn — same shape Kimi WebBridge uses.
  icon: i-lucide-crosshair
  to: /cli/architecture
  variant: subtle
  ---

  :::

  :::u-page-card{.scout-bento__span-4}
  ---
  title: Search, answer, extract
  description: DuckDuckGo search with local rerank, one-sentence answers, and URL-to-Markdown extraction — no browser required.
  icon: i-lucide-search
  to: /cli/overview
  variant: subtle
  ---

  :::

  :::u-page-card{.scout-bento__span-6}
  ---
  title: Two backends, one vocabulary
  description: Headless Playwright by default, or drive your real Chrome via the extension — cookies and logins intact.
  icon: i-lucide-puzzle
  to: /cli/overview
  variant: subtle
  ---

  :::

  :::u-page-card{.scout-bento__span-6}
  ---
  title: Fully local
  description: No cloud API, no hosted browser, no MCP server to babysit. Your data never leaves your machine.
  icon: i-lucide-laptop
  to: /cli/overview
  variant: subtle
  ---

  :::

  :::u-page-card{.scout-bento__span-6.scout-bento-card}
  ---
  title: Agent-native output
  description: Skill files land in Claude Code, Cursor, Codex, and Gemini skill dirs after install --skill.
  icon: i-lucide-braces
  to: /cli/agents
  variant: subtle
  spotlight: true
  ---
  ```text
  ~/.claude/skills/scout/
  ~/.cursor/skills-cursor/scout/
  ~/.codex/skills/scout/
  ```
  :::

  :::u-page-card{.scout-bento__span-6.scout-bento-card}
  ---
  title: Try it in 60 seconds
  icon: i-lucide-play
  variant: subtle
  ---
  ```bash
  omniscout browser navigate https://news.ycombinator.com
  omniscout browser snapshot --refs-only
  omniscout browser click '@e3'
  omniscout browser screenshot --out /tmp/hn.png
  ```
  :::
::
::

::u-page-section{.scout-home-section}
#title
Drop a prompt into any agent

#description
After `omniscout install --skill`, paste one of these — your agent routes browser work through OmniScout automatically.

#body
::tabs{.scout-prompt-tabs}
  :::tabs-item{label="Research"}
```text
Use OmniScout to research "open-source browser agents in 2026" and summarize
the top 5 passages with their source URLs.
```
  :::

  :::tabs-item{label="Navigate & act"}
```text
Open https://news.ycombinator.com using OmniScout, snapshot interactive
elements, click the top story, and screenshot the result to /tmp/hn-top.png.
```
  :::

  :::tabs-item{label="Persistent login"}
```text
Run `omniscout browser login https://github.com --profile work`, pause for
me to authenticate, then screenshot my notifications page with that profile.
```
  :::

  :::tabs-item{label="Inspect network"}
```text
Open the Vercel pricing page with OmniScout, capture network traffic while
scrolling, then list requests matching stripe|payment|checkout.
```
  :::
::
::

::u-page-section
#title
Where OmniScout sits

#description
These products ship the reasoning model with the actuator. OmniScout deliberately does not — bring whatever LLM you want.

#body
| Product | Where it runs | What OmniScout borrows |
|---|---|---|
| Kimi WebBridge | Local daemon + Chrome extension | `@eN` refs, `/status` shape, optional extension backend |
| Claude for Chrome | MV3 side panel | Hybrid `@eN` + coordinates, click/key/scroll vocabulary |
| ChatGPT Atlas | Forked Chromium | Per-session tab groups, persistent login |
| browser-use | Playwright in-process | Backend-agnostic action surface, persistent profiles |
::

::u-page-section
#title
Go deeper

#features
  :::u-page-feature
  ---
  icon: i-lucide-book-open
  to: /cli/overview
  ---
  #title
  [CLI overview](/cli/overview)

  #description
  Install, configure, and run your first commands.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bot
  to: /cli/agents
  ---
  #title
  [Using with AI agents](/cli/agents)

  #description
  Drop-in prompts for Claude Code, Cursor, and Codex.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list
  to: /cli/commands
  ---
  #title
  [Commands reference](/cli/commands)

  #description
  Every verb, flag, and JSON field in the action vocabulary.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-flask-conical
  to: /cli/examples
  ---
  #title
  [Examples & recipes](/cli/examples)

  #description
  Research, login, captcha, and multi-tab workflows.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers
  to: /cli/architecture
  ---
  #title
  [Architecture](/cli/architecture)

  #description
  Daemon, backends, snapshot refs, and lifecycle.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code-xml
  to: /sdk
  ---
  #title
  [Python SDK](/sdk)

  #description
  Use OmniScout engines directly from Python.
  :::
::
