---
title: SDK Documentation
description: OmniScout SDK - Python API for programmatic access to OmniScout CLI
seo:
  title: "SDK Documentation"
  description: "OmniScout SDK - Python API for programmatic access to OmniScout CLI"
---
# OmniScout SDK Documentation

The OmniScout SDK provides a Python API for programmatic access to OmniScout CLI functionality. Use the SDK to integrate OmniScout into your Python applications.

## Quick Navigation

- **[Python API Reference](/sdk/api)** - Complete Python API documentation with code examples

## What is the SDK?

The OmniScout SDK is a Python library that exposes OmniScout CLI engines as reusable Python modules. Instead of shelling out to CLI commands, you can import OmniScout directly into your Python code.

## Key Features

- **Search API** - Programmatic web search with local reranking  
- **Extraction API** - Extract and parse URLs  
- **Crawler API** - Async crawling with intelligent fallbacks  
- **Research API** - Full research pipeline orchestration  
- **Browser API** - Control browsers programmatically  
- **Configuration API** - Access and override settings  
- **Type Hints** - Full type hints for IDE autocomplete  

## Installation

```bash
pip install omniscout
```

The Python package namespace is `omniscout` (e.g. `from omniscout.client import DaemonClient`).

## Quick Example

```python
from omniscout.engines.search import ddg

# Search the web
results = ddg.search("python async patterns", limit=10)

for hit in results:
    print(f"{hit.title}: {hit.url}")
```

## Common Use Cases

### Search and Extract
```python
from omniscout.engines.search import ddg
from omniscout.engines.extractor import extract_url

# Search
results = ddg.search("topic", limit=5)

# Extract top result
if results:
    content = extract_url(results[0].url)
    print(content.content)
```

### Research Pipeline
```python
from omniscout.engines.research import run_research

# Run full research
report = run_research(
    topic="AI agents",
    depth=1,
    results=8
)

print(report.summary)
for passage in report.passages[:5]:
    print(f"- {passage.text}")
```

### Browser Automation
```python
from omniscout.client import DaemonClient

client = DaemonClient()

# Navigate and interact
client.navigate(url="https://example.com", session="default")
client.click(selector="button.submit", session="default")
client.screenshot(session="default", output_path="result.png")
```

## API Reference

See [Python API Reference](/sdk/api) for complete documentation.

## Modules

- **`omniscout.engines.search`** - Search engines (DDG, embeddings, reranking)
- **`omniscout.engines.extractor`** - Content extraction
- **`omniscout.engines.crawler`** - Async crawling
- **`omniscout.engines.research`** - Research pipeline
- **`omniscout.engines.browser`** - Browser automation
- **`omniscout.client`** - Daemon client
- **`omniscout.config`** - Configuration and paths
- **`omniscout.models`** - Pydantic result types
- **`omniscout.logging`** - Logging utilities

## Type Hints

All APIs use Python type hints for IDE autocomplete:

```python
from omniscout.models import SearchResponse, ExtractResult

def process_search(response: SearchResponse) -> None:
    for hit in response.hits:
        print(f"{hit.title}: {hit.url}")
```

## Async Support

Most I/O operations support async:

```python
import asyncio
from omniscout.engines.crawler import crawl_many

async def main():
    results = await crawl_many(
        urls=["https://example.com/1", "https://example.com/2"],
        max_concurrent=5
    )

asyncio.run(main())
```

## Configuration

Access and override settings programmatically:

```python
from omniscout.config import get_settings, get_paths

settings = get_settings()
paths = get_paths()

print(f"Data dir: {paths.data}")
print(f"Search limit: {settings.search_limit}")
```

## Error Handling

```python
from omniscout.client import DaemonClient, DaemonError

client = DaemonClient()

try:
    result = client.navigate(url="https://example.com", session="default")
except DaemonError as e:
    print(f"Error: {e}")
    print(f"Kind: {e.kind}")
```

## Testing

Use provided test fixtures for offline testing:

```python
import pytest
from pathlib import Path

@pytest.fixture
def article_html():
    fixture_path = Path(__file__).parent / "fixtures" / "article.html"
    return fixture_path.read_text()

def test_extract(article_html):
    from omniscout.engines.extractor import extract_html
    
    result = extract_html(article_html)
    assert result.title
    assert result.word_count > 0
```

## Performance Tips

1. **Reuse Clients** - Create one `DaemonClient` and reuse it
2. **Batch Operations** - Use `crawl_many()` for concurrent fetching
3. **Cache Results** - Check `PageCache` before fetching
4. **Lazy Loading** - Models and indices load on-demand
5. **Async** - Use async APIs for I/O-bound operations
6. **Profiles** - Reuse browser profiles to avoid re-login

## Next Steps

- **[Python API Reference](/sdk/api)** - Complete API documentation
- **[CLI Documentation](/cli/overview)** - Learn about the CLI
- **[Examples](/cli/examples)** - See common workflows

## Support

For issues or questions:
1. Check the [Python API Reference](/sdk/api)
2. Review [CLI Examples](/cli/examples) for patterns
3. Check [CLI Troubleshooting](/cli/troubleshooting) for debugging tips

---

**Ready to get started?** Head to [Python API Reference](/sdk/api).
