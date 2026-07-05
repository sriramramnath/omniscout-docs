---
title: OmniScout CLI
description: Local-first browser control, semantic search, and research for AI agents.
navigation:
  icon: i-lucide-book-open
seo:
  title: "OmniScout CLI"
  description: "Local-first browser control, semantic search, and research for AI agents."
---
The OmniScout CLI (`omniscout`) is the public interface for everything OmniScout
does. It's designed to be driven by AI agents, but it works just as well
from a human shell.

## Where to start

- **New here?** Read [What is OmniScout?](/cli/overview) for a 5-minute
  orientation.
- **Wiring this up to an AI agent?** Go to
  [Using OmniScout with AI agents](/cli/agents) — it has copy-paste
  prompts for Claude Code, Cursor, and Codex.
- **Looking for a specific command?** Jump to
  [Commands reference](/cli/commands).
- **Probe Zero answer engine?** See [Probe Zero](/cli/probe-zero) for setup,
  benchmarks, and `--probe` / settings defaults.
- **Want recipes?** [Examples & recipes](/cli/examples) has worked
  workflows like "research → screenshot → summarize".
- **Debugging?** [Troubleshooting](/cli/troubleshooting) covers the
  common failure modes.

## Quick start

```bash
# Install from PyPI
pip install omniscout
omniscout install --skill          # first-run setup + agent skill files
omniscout settings browsers        # optional: see installed Chromium browsers

# Start the daemon (idempotent)
omniscout daemon start

# Drive a browser
omniscout browser navigate https://example.com
omniscout browser snapshot --refs-only
omniscout browser screenshot --out /tmp/out.png
omniscout browser screenshot --full-length --out /tmp/full.png
omniscout browser close --all
```

## What's in the box

| Group | Purpose |
|---|---|
| `omniscout daemon ...` | Long-lived daemon: browser backends, warm embed model, trace/replay/watch |
| `omniscout browser ...` | Atomic browser actions (navigate, click, fill, snapshot, screenshot, login, captcha, network, tab, …) |
| `omniscout search` | DuckDuckGo + local embedding rerank; sources `ddg`, `index`, `memory`, `hybrid` |
| `omniscout answer` | Direct web answers → extractive → local LLM → crawl; Classic or **Probe Zero** engine |
| `omniscout remember` / `memory ...` | Browser memory — visit, note, semantic search over history |
| `omniscout extract` | Fetch a URL and return clean Markdown / text / JSON |
| `omniscout research` | Multi-step: search → crawl → extract → embed → rerank → summarize |
| `omniscout graph` | Knowledge graph tree for an entity; optional site-only crawl (`--website` or URL entity) |
| `omniscout open`, `snapshot`, `context` | Workflow shortcuts for agents |
| `omniscout replay`, `workflow export` | Replay daemon actions; export workflow JSON |
| `omniscout warmup` | Optional: preload embed + answer models in daemon before a batch |
| `omniscout benchmark ...` | Answer-mode latency/quality and startup benchmarks |
| `omniscout profile ...` | Persistent Chrome profiles for cookies/logins |
| `omniscout session ...` | Long-lived browser sessions (CDP attach) |
| `omniscout settings ...` | Browser selection and config.toml helpers |
| `omniscout install` | Browser picker, model prefetch, optional `--skill` for agent discovery |

CLI: primary command `omniscout`; short alias `scout`; legacy dev alias `harness`.

## JSON output

Every command supports `--json`. The typical AI-agent setup is to set
this once for the session:

```bash
export OMNISCOUT_JSON=1
```

After that, all stdout is structured JSON that your agent can pipe
through `jq`. Logs go to stderr.

## Local-first promise

Nothing about OmniScout's normal operation requires a cloud account, an API
key, or a hosted server. The only outbound traffic is:

- DuckDuckGo search results (when you run `omniscout search` /
  `omniscout research`).
- The URLs you explicitly tell it to fetch.
- A one-time download of the sentence-transformers embedding model
  (cached locally forever).

Third-party CAPTCHA solvers are opt-in via an explicit
`--solver 2captcha|capsolver` flag.
