---
title: SDK Documentation
description: Use OmniScout engines directly from Python.
navigation: false
seo:
  title: "SDK Documentation"
  description: "Use OmniScout engines directly from Python."
---
The OmniScout SDK lets you use OmniScout's search, extraction, and browser engines directly from Python code.

## Install

```bash
pip install omniscout
```

## Quick example

```python
from omniscout.engines.search import ddg

results = ddg.search("python async patterns", limit=10)
for hit in results:
    print(f"{hit.title}: {hit.url}")
```

## Search

```python
from omniscout.engines.search import ddg

results = ddg.search("topic", limit=5)
for hit in results:
    print(f"{hit.title}: {hit.url}")
```

## Extract

```python
from omniscout.engines.extractor import extract_url

result = extract_url("https://example.com")
print(result.content)  # Markdown
```

## Research

```python
from omniscout.engines.research import run_research

report = run_research(topic="AI agents", depth=1, results=8)
print(report.summary)
```

## Browser automation

```python
from omniscout.client import DaemonClient

client = DaemonClient()
client.navigate(url="https://example.com", session="default")
client.click(selector="button.submit", session="default")
client.screenshot(session="default", output_path="result.png")
```

## See also

- [Python API reference](/sdk/api) — complete API docs
- [CLI documentation](/cli/overview) — command-line usage
