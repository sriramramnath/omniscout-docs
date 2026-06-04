---
title: Python API Reference
description: OmniScout CLI Python API for programmatic use
---

# Python API Reference

OmniScout CLI engines can be used programmatically from Python code. This guide covers the main APIs.

## Installation

```bash
pip install omniscout
```

The Python package namespace is `omniscout`. Example: `from omniscout.client import DaemonClient`.

## Search API

### Basic Search

```python
from omniscout.engines.search import ddg

# Search DuckDuckGo
results = ddg.search("python async patterns", limit=10)

for hit in results:
    print(f"{hit.title}: {hit.url}")
    print(f"  {hit.snippet}\n")
```

### Search with Reranking

```python
from omniscout.engines.search import ddg, embed, rerank

# Search
query = "machine learning"
hits = ddg.search(query, limit=20)

# Embed query and results
query_embedding = embed.embed_texts([query])[0]
hit_embeddings = embed.embed_texts([h.snippet for h in hits])

# Rerank by similarity
ranked = rerank.rerank(query_embedding, hit_embeddings, hits)

for hit in ranked[:5]:
    print(f"{hit.title} (score: {hit.score:.2f})")
```

### Hybrid Search (Web + Local Index)

```python
from omniscout.engines.search import pipeline

# Search combining DDG and local vector index
results = pipeline.search_hybrid(
    query="robotics",
    limit=10,
    rerank=True
)

for hit in results:
    print(f"{hit.title}: {hit.url}")
```

## Extraction API

### Extract URL

```python
from omniscout.engines.extractor import extract_url

# Extract content from URL
result = extract_url("https://example.com")

print(f"Title: {result.title}")
print(f"Author: {result.author}")
print(f"Published: {result.published}")
print(f"Word count: {result.word_count}")
print(f"\n{result.content}")  # Markdown content
```

### Extract with Browser Rendering

```python
from omniscout.engines.extractor import extract_url

# Use Chrome for JS-heavy sites
result = extract_url(
    "https://example.com",
    use_browser=True
)

print(result.content)
```

### Extract HTML

```python
from omniscout.engines.extractor import extract_html

html = """
<html>
  <head><title>Example</title></head>
  <body>
    <article>
      <h1>Article Title</h1>
      <p>Article content...</p>
    </article>
  </body>
</html>
"""

result = extract_html(html, format="markdown")
print(result.content)
```

## Crawler API

### Crawl Multiple URLs

```python
import asyncio
from omniscout.engines.crawler import crawl_many

async def main():
    urls = [
        "https://example.com/page1",
        "https://example.com/page2",
        "https://example.com/page3",
    ]
    
    results = await crawl_many(
        urls=urls,
        max_concurrent=5,
        throttle_seconds=1.0
    )
    
    for url, html in results.items():
        print(f"{url}: {len(html)} bytes")

asyncio.run(main())
```

### Crawl with Options

```python
from omniscout.engines.crawler import crawl_many, CrawlOptions

async def main():
    options = CrawlOptions(
        max_concurrent=10,
        throttle_seconds=0.5,
        timeout_seconds=30,
        use_browser_fallback=True
    )
    
    results = await crawl_many(
        urls=["https://example.com", ...],
        options=options
    )

asyncio.run(main())
```

## Research API

### Run Research Pipeline

```python
from omniscout.engines.research import run_research

# Run full research pipeline
report = run_research(
    topic="state of local AI agents in 2026",
    depth=1,
    results=8
)

print(f"Topic: {report.topic}")
print(f"Summary: {report.summary}\n")

print("Sources:")
for source in report.sources:
    print(f"  - {source.title}: {source.url}")

print("\nTop Passages:")
for passage in report.passages[:5]:
    print(f"  {passage.text[:100]}...")
    print(f"    (from {passage.source_url}, score: {passage.score:.2f})\n")
```

## Browser API

### One-Shot Browser Operations

```python
from omniscout.engines.browser import BrowserEngine

engine = BrowserEngine()

# Take screenshot
result = engine.screenshot(
    url="https://example.com",
    output_path="screenshot.png"
)
print(f"Screenshot saved: {result.output_path}")

# Generate PDF
result = engine.pdf(
    url="https://example.com",
    output_path="page.pdf"
)
print(f"PDF saved: {result.output_path}")
```

### Persistent Browser Profiles

```python
from omniscout.engines.browser import BrowserEngine

engine = BrowserEngine()

# Create profile
engine.create_profile("work")

# Use profile (cookies/login state persist)
result = engine.screenshot(
    url="https://news.ycombinator.com",
    profile="work",
    headful=True  # Show browser window
)
```

### Long-Lived Sessions

```python
from omniscout.engines.browser import BrowserEngine
from omniscout.store.sessions import SessionStore

engine = BrowserEngine()
store = SessionStore()

# Start session
session_info = engine.session_start(profile="default", headful=False)
print(f"Session ID: {session_info.id}")
print(f"CDP endpoint: {session_info.ws_endpoint}")

# Later, attach to session via daemon client
from omniscout.client import DaemonClient

client = DaemonClient()
result = client.navigate(
    url="https://example.com",
    session=session_info.id
)
```

## Daemon Client API

### Basic Commands

```python
from omniscout.client import DaemonClient

client = DaemonClient()

# Navigate
result = client.navigate(
    url="https://example.com",
    session="default"
)

# Click element
result = client.click(
    selector="button.submit",
    session="default"
)

# Fill form
result = client.fill(
    selector="input[name=search]",
    value="query text",
    session="default"
)

# Take screenshot
result = client.screenshot(
    session="default",
    output_path="screenshot.png"
)

# Get interactive elements
result = client.snapshot(session="default")
for ref in result.refs:
    print(f"{ref.ref}: {ref.role} - {ref.name}")
```

### Error Handling

```python
from omniscout.client import DaemonClient, DaemonError

client = DaemonClient()

try:
    result = client.navigate(
        url="https://example.com",
        session="nonexistent"
    )
except DaemonError as e:
    print(f"Error: {e}")
    print(f"Kind: {e.kind}")
    print(f"Action: {e.action}")
```

### Custom Timeout

```python
from omniscout.client import DaemonClient

client = DaemonClient(timeout=120.0)  # 120 second timeout

result = client.navigate(
    url="https://slow-site.com",
    session="default"
)
```

## Configuration API

### Get Paths

```python
from omniscout.config import get_paths

paths = get_paths()

print(f"Data dir: {paths.data}")
print(f"Config dir: {paths.config}")
print(f"Cache dir: {paths.cache}")
print(f"Profiles dir: {paths.profiles}")
print(f"Qdrant dir: {paths.qdrant}")
```

### Get Settings

```python
from omniscout.config import get_settings

settings = get_settings()

print(f"Default source: {settings.default_source}")
print(f"Search limit: {settings.search_limit}")
print(f"Embedding model: {settings.embedding_model}")
print(f"Browser channel: {settings.browser_channel}")
```

### Override Settings

```python
import os
from omniscout.config import get_settings

# Via environment variables
os.environ["OMNISCOUT_DATA_DIR"] = "/custom/data"
os.environ["OMNISCOUT_CONFIG_DIR"] = "/custom/config"

# Settings are cached, so create new instance
from omniscout.config import _settings_cache
_settings_cache.clear()

settings = get_settings()
```

## Models API

### Search Models

```python
from omniscout.models import SearchHit, SearchResponse

# Create search hit
hit = SearchHit(
    url="https://example.com",
    title="Example",
    snippet="Example snippet",
    source="ddg",
    score=0.95,
    rank=1
)

# Create search response
response = SearchResponse(
    query="example",
    source="ddg",
    count=1,
    hits=[hit]
)

# Serialize to JSON
import json
print(json.dumps(response.model_dump(), indent=2))
```

### Extract Models

```python
from omniscout.models import ExtractResult
from datetime import datetime

result = ExtractResult(
    url="https://example.com",
    title="Example Article",
    author="John Doe",
    published="2024-01-15",
    site_name="Example",
    content="# Example\n\nContent here...",
    text="Example\n\nContent here...",
    links=["https://example.com/related"],
    word_count=150,
    format="markdown",
    cached=False,
    fetched_at=datetime.utcnow()
)

print(result.model_dump_json(indent=2))
```

### Research Models

```python
from omniscout.models import (
    ResearchReport,
    ResearchSource,
    ResearchPassage
)

source = ResearchSource(
    url="https://example.com",
    title="Example",
    snippet="Example snippet"
)

passage = ResearchPassage(
    text="Passage text here",
    source_url="https://example.com",
    score=0.92
)

report = ResearchReport(
    topic="example topic",
    summary="Summary of research",
    sources=[source],
    passages=[passage]
)

print(report.model_dump_json(indent=2))
```

## Logging API

### Configure Logging

```python
from omniscout.logging import configure_logging, get_logger

# Configure logging (call once at startup)
configure_logging(verbose=True)

# Get logger for your module
log = get_logger("my_module")

log.info("Starting operation")
log.debug("Debug information")
log.warning("Warning message")
log.error("Error message")
```

## Complete Example: Research Workflow

```python
import asyncio
import json
from omniscout.engines.research import run_research
from omniscout.engines.extractor import extract_url
from omniscout.models import ResearchReport

async def research_workflow():
    # Run research
    print("Running research...")
    report = run_research(
        topic="local AI agents",
        depth=1,
        results=5
    )
    
    # Save report
    with open("research.json", "w") as f:
        json.dump(report.model_dump(), f, indent=2, default=str)
    
    # Extract top source
    if report.sources:
        top_source = report.sources[0]
        print(f"\nExtracting top source: {top_source.url}")
        
        extract_result = extract_url(top_source.url)
        print(f"Title: {extract_result.title}")
        print(f"Word count: {extract_result.word_count}")
        
        # Save extracted content
        with open("extracted.md", "w") as f:
            f.write(extract_result.content)
    
    # Print summary
    print(f"\nResearch Summary:")
    print(report.summary)
    
    print(f"\nTop Passages:")
    for i, passage in enumerate(report.passages[:3], 1):
        print(f"{i}. {passage.text[:100]}...")

asyncio.run(research_workflow())
```

## Complete Example: Browser Automation

```python
from omniscout.client import DaemonClient
import time

def browser_workflow():
    client = DaemonClient()
    
    # Navigate to page
    print("Navigating to example.com...")
    client.navigate(
        url="https://example.com",
        session="default",
        wait_until="networkidle"
    )
    
    # Get interactive elements
    print("Getting page elements...")
    snapshot = client.snapshot(session="default")
    
    print(f"Found {len(snapshot.refs)} interactive elements:")
    for ref in snapshot.refs[:5]:
        print(f"  {ref.ref}: {ref.role} - {ref.name}")
    
    # Take screenshot
    print("Taking screenshot...")
    client.screenshot(
        session="default",
        output_path="page.png"
    )
    
    # Scroll down
    print("Scrolling...")
    client.scroll(
        direction="down",
        amount=3,
        session="default"
    )
    
    time.sleep(1)
    
    # Take another screenshot
    client.screenshot(
        session="default",
        output_path="page_scrolled.png"
    )
    
    print("Done!")

browser_workflow()
```

## Type Hints

All APIs use Python type hints for IDE autocomplete and type checking:

```python
from typing import Optional
from omniscout.models import SearchResponse, ExtractResult

def process_search(response: SearchResponse) -> None:
    for hit in response.hits:
        print(f"{hit.title}: {hit.url}")

def process_extract(result: ExtractResult) -> Optional[str]:
    if result.word_count > 100:
        return result.content
    return None
```

## Async APIs

Most I/O operations support async:

```python
import asyncio
from omniscout.engines.crawler import crawl_many

async def main():
    # Crawl multiple URLs concurrently
    results = await crawl_many(
        urls=["https://example.com/1", "https://example.com/2"],
        max_concurrent=5
    )
    
    for url, html in results.items():
        print(f"{url}: {len(html)} bytes")

asyncio.run(main())
```

## Testing

Use the provided test fixtures for offline testing:

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

1. **Reuse Clients:** Create one `DaemonClient` and reuse it
2. **Batch Operations:** Use `crawl_many()` for concurrent fetching
3. **Cache Results:** Check `PageCache` before fetching
4. **Lazy Loading:** Models and indices load on-demand
5. **Async:** Use async APIs for I/O-bound operations
6. **Profiles:** Reuse browser profiles to avoid re-login

## Troubleshooting

### Chrome Not Found

```python
from omniscout.config import get_settings

settings = get_settings()
print(f"Browser channel: {settings.browser_channel}")
print(f"Browser executable: {settings.browser_executable}")
```

### Daemon Connection Issues

```python
from omniscout.client import DaemonClient
from omniscout.daemon import lifecycle

# Check daemon status
port = lifecycle.read_port()
print(f"Daemon port: {port}")

# Force restart
lifecycle.stop()
client = DaemonClient()  # Auto-starts daemon
```

### Embedding Model Download

The first search/research operation downloads the embedding model (~100MB). This is cached locally.

```python
from omniscout.engines.search import embed

# Pre-download model
embed.embed_texts(["test"])
```
