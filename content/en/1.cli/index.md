---
title: OmniScout CLI
description: Local-first browser control, semantic search, and research for AI agents.
navigation:
  icon: i-lucide-book-open
seo:
  title: "OmniScout CLI"
  description: "Local-first browser control, semantic search, and research for AI agents."
---
## Install

```bash
pip install omniscout
omniscout install --skill
```

## Use

```bash
omniscout daemon start

# Search
omniscout answer "what is the capital of france"

# Extract
omniscout extract https://example.com

# Browser
omniscout browser navigate https://example.com
omniscout browser snapshot --refs-only
omniscout browser click '@e3'
omniscout browser screenshot --out /tmp/page.png

# Research
omniscout research "AI agents in 2026"

# Knowledge graph
omniscout graph "Cursor"
```

## What's in the box

| Command | What it does |
|---|---|
| `omniscout answer` | Direct Q&A with citations |
| `omniscout search` | Web search with reranking |
| `omniscout extract` | Fetch a URL and return clean content |
| `omniscout research` | Multi-step research pipeline |
| `omniscout graph` | Build a knowledge graph |
| `omniscout browser` | Control a browser |
| `omniscout computer` | Desktop automation (macOS) |
| `omniscout remember` | Store URLs in memory |
| `omniscout daemon` | Manage the background service |

## JSON output

```bash
export OMNISCOUT_JSON=1  # structured output for agents
```

## Local-first

No cloud account, API key, or hosted server required. The only outbound traffic is DuckDuckGo searches and URLs you explicitly fetch.
