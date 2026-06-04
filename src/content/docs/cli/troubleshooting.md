---
title: Troubleshooting & FAQ
description: Common OmniScout failure modes and how to fix them — especially when an AI agent is driving.
---

# Troubleshooting & FAQ

This page is organized into two halves:

1. **Things agents hit** — `@eN` refs, login, captcha, extension. Read
   these first if you're debugging an AI-agent loop.
2. **Classic installation / runtime issues** — Python, Chrome, daemon
   crashes, performance.

## Things agents hit most

### `@eN` ref not found (`no_such_ref`)

**What it means:** The ref was minted by a previous `snapshot`, but the
page has changed (navigation, virtual-DOM rerender, modal open/close) or
the ref's TTL expired.

**Fix:** Re-snapshot, then use the new ref.

```bash
omniscout browser snapshot --refs-only --session mine
omniscout browser click '@e7' --session mine
```

In an agent prompt, add: *"After every `navigate` and every `wait
--idle`, re-snapshot before clicking."*

### Login `--success-pattern` never matches

**What it means:** The site redirects to a URL your pattern doesn't
cover, or it sticks on the same URL after auth (single-page apps).

**Fix:** Use the `--done` signal from another shell:

```bash
# shell A:
omniscout browser login https://app.example.com --profile work

# shell B (once you've authenticated in the browser):
omniscout browser login --done
```

### CAPTCHA detected but blocks forever

**What it means:** Default `--solver none` waits for the page to be
captcha-free. If you closed the headful window without solving, it
won't ever clear.

**Fix:** Either solve in the headful window (recommended), or opt into
a third-party solver:

```bash
export TWOCAPTCHA_API_KEY=...
omniscout browser captcha --solver 2captcha
```

### Extension backend says `backend_unavailable`

**What it means:** The Chrome extension isn't connected to the daemon's
`/extension` WebSocket.

**Fix:**

```bash
omniscout daemon status   # extension_connected: false?
```

1. Open `chrome://extensions` — confirm the extension is loaded and
   enabled.
2. Click the extension's icon — the popup shows its WS status. If
   "disconnected", click reconnect.
3. If the daemon was restarted, the extension reconnects automatically
   with a few seconds of backoff. Wait, then retry.

Or just fall through to Playwright by dropping the `--backend extension`
flag.

### Agent picked the wrong element

**Symptom:** `click '@e3'` succeeded but did the wrong thing.

**Fix:** Tell the agent to inspect `name` + `role` rather than picking
the lowest-numbered link. The full snapshot (without `--refs-only`)
includes the surrounding tree so the agent can match on context.

```bash
omniscout browser snapshot --session mine \
  | jq '.refs[] | select(.role == "link" and (.name | test("docs"; "i")))'
```

---

## Installation Issues

### Python Version Error

**Error:** `Python 3.11+ required`

**Solution:**
```bash
# Check Python version
python --version

# Install Python 3.11+
# macOS with Homebrew
brew install python@3.11

# Or use pyenv
pyenv install 3.11.0
pyenv local 3.11.0
```

### Chrome Not Found

**Error:** `Chrome not found. Install Chrome or use --bundled`

**Solution:**

Option 1: Install Chrome
```bash
# macOS
brew install --cask google-chrome

# Linux
sudo apt-get install google-chrome-stable

# Windows
# Download from https://www.google.com/chrome/
```

Option 2: Use bundled Chromium
```bash
omniscout install --bundled
```

Option 3: Specify Chrome path
```bash
# In config.toml
browser_executable = "/path/to/chrome"

# Or via environment
export OMNISCOUT_BROWSER_EXECUTABLE="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

### Permission Denied

**Error:** `Permission denied: omniscout`

**Solution:**
```bash
# Ensure ~/.local/bin is on your PATH (where pip installs scripts)
export PATH="$HOME/.local/bin:$PATH"

# Or reinstall
pip install --upgrade --force-reinstall omniscout
```

### Module Not Found

**Error:** `ModuleNotFoundError: No module named 'omniscout'`

**Solution:**
```bash
pip install --upgrade omniscout

# Or, from a git checkout:
# Or, from a git checkout:
# pip install -e cli/
```

## Runtime Issues

### Daemon Connection Failed

**Error:** `Failed to connect to daemon on port 7720`

**Solution:**

```bash
# Check daemon status
omniscout daemon status

# Restart daemon
omniscout daemon stop
omniscout daemon start

# Check if port is in use
lsof -i :7720

# Use different port
omniscout daemon start --port 7721
```

### Timeout Errors

**Error:** `Timeout waiting for page to load`

**Solution:**

```bash
# Increase timeout
omniscout browser navigate https://slow-site.com --timeout 120

# Or in config.toml
request_timeout_seconds = 120

# For research
omniscout research "topic" --timeout 300
```

### Chrome Crash

**Error:** `Chrome process crashed`

**Solution:**

```bash
# Kill all Chrome processes
pkill -f "Google Chrome"

# Clear Chrome cache
rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Cache

# Try again
omniscout browser screenshot https://example.com
```

### Out of Memory

**Error:** `MemoryError` or `Killed`

**Solution:**

```bash
# Reduce concurrent operations
export OMNISCOUT_CRAWLER_CONCURRENCY=2

# Reduce research results
omniscout research "topic" --results 5

# Clear cache
rm -rf ~/.local/share/omniscout/cache/pages/*

# Restart daemon
omniscout daemon stop
omniscout daemon start
```

## Search Issues

### No Results

**Error:** `No results found`

**Solution:**

```bash
# Try different query
omniscout search "more specific query"

# Try different source
omniscout search "query" --source ddg
omniscout search "query" --source index
omniscout search "query" --source hybrid

# Check internet connection
ping google.com
```

### Slow Search

**Issue:** Search takes too long

**Solution:**

```bash
# Reduce limit
omniscout search "query" --limit 5

# Disable reranking
omniscout search "query" --no-rerank

# Check network
ping duckduckgo.com
```

### Reranking Not Working

**Error:** `Embedding model download failed`

**Solution:**

```bash
# Pre-download model
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Check disk space
df -h

# Try again
omniscout search "query" --rerank
```

If you want to guarantee zero runtime Hugging Face traffic, keep local-only mode enabled
(default) and prefetch once:

```bash
omniscout install --model
```

If you intentionally want runtime fetches, disable local-only mode:

```bash
export OMNISCOUT_EMBED_LOCAL_ONLY=0
```

## Extraction Issues

### Extraction Returns Empty

**Issue:** Extracted content is empty or minimal

**Solution:**

```bash
# Try with browser rendering
omniscout extract https://example.com --browser

# Check if site is JavaScript-heavy
# If so, use --browser flag

# Try different format
omniscout extract https://example.com --format text
omniscout extract https://example.com --format json
```

### Extraction Timeout

**Error:** `Timeout extracting URL`

**Solution:**

```bash
# Use browser rendering (might be faster)
omniscout extract https://example.com --browser

# Increase timeout
export OMNISCOUT_REQUEST_TIMEOUT=60

# Try again
omniscout extract https://example.com
```

### Extraction Returns Boilerplate

**Issue:** Extracted content includes ads, navigation, etc.

**Solution:**

```bash
# This is a trafilatura limitation
# Try different URL or site

# Check extracted JSON for metadata
omniscout extract https://example.com --format json | jq '.content'

# Report issue if consistently failing
```

## Research Issues

### Research Takes Too Long

**Issue:** Research pipeline is slow

**Solution:**

```bash
# Reduce results
omniscout research "topic" --results 5

# Reduce depth
omniscout research "topic" --depth 1

# Disable browser fallback
export OMNISCOUT_CRAWLER_USE_BROWSER=0

# Increase concurrency
export OMNISCOUT_CRAWLER_CONCURRENCY=10
```

### Research Returns Poor Results

**Issue:** Summary or passages are not relevant

**Solution:**

```bash
# Try more results
omniscout research "topic" --results 15

# Try deeper research
omniscout research "topic" --depth 2

# Check individual sources
omniscout research "topic" --json | jq '.sources[] | .url' | while read url; do
  echo "=== $url ==="
  omniscout extract "$url" | head -20
done
```

### Vector Index Issues

**Error:** `Qdrant connection failed`

**Solution:**

```bash
# Clear vector index
rm -rf ~/.local/share/omniscout/qdrant/

# Rebuild index
omniscout research "topic"

# Check disk space
df -h
```

## Browser Automation Issues

### Screenshot Blank

**Issue:** Screenshot is blank or shows error

**Solution:**

```bash
# Try with headful mode to see what's happening
omniscout browser screenshot https://example.com --headful

# Increase wait time
omniscout browser navigate https://example.com --wait-until networkidle

# Try different wait condition
omniscout browser navigate https://example.com --wait-until load
```

### Click Not Working

**Error:** `Element not found` or click has no effect

**Solution:**

```bash
# Get interactive elements
omniscout browser snapshot --session default --json | jq '.refs[]'

# Use correct selector
omniscout browser click --selector "button.submit" --session default

# Try coordinates instead
omniscout browser click --coord 100 200 --session default

# Wait for element to appear
omniscout browser navigate https://example.com --wait-until networkidle
omniscout browser click --selector "button" --session default
```

### Form Fill Not Working

**Error:** `Fill failed` or text not appearing

**Solution:**

```bash
# Check selector
omniscout browser snapshot --session default --json | jq '.refs[] | select(.role == "textbox")'

# Try clearing first
omniscout browser fill "input[name=search]" "" --session default
omniscout browser fill "input[name=search]" "text" --session default

# Try keyboard input instead
omniscout browser key "ctrl+a" --session default
omniscout browser key "Delete" --session default
omniscout browser key "t e x t" --session default
```

### Session Not Found

**Error:** `Session not found` or `No such session`

**Solution:**

```bash
# List active sessions
omniscout session list

# Use correct session ID
omniscout browser navigate https://example.com --session correct-id

# Start new session if needed
SESSION=$(omniscout session start --json | jq -r '.id')
omniscout browser navigate https://example.com --session $SESSION
```

### PDF Generation Failed

**Error:** `PDF generation failed`

**Solution:**

```bash
# Check disk space
df -h

# Try screenshot instead
omniscout browser screenshot https://example.com --out page.png

# Try different URL
omniscout browser pdf https://other.com --out page.pdf

# Check Chrome version
google-chrome --version
```

## Profile Issues

### Profile Not Found

**Error:** `Profile not found`

**Solution:**

```bash
# List profiles
omniscout profile list

# Create profile
omniscout profile create work

# Use correct profile name
omniscout browser screenshot https://example.com --profile work
```

### Profile Corrupted

**Issue:** Profile causes crashes or errors

**Solution:**

```bash
# Delete corrupted profile
omniscout profile delete work

# Recreate profile
omniscout profile create work

# Or manually delete
rm -rf ~/.local/share/omniscout/profiles/work
```

### Login State Not Persisting

**Issue:** Profile doesn't remember login

**Solution:**

```bash
# Use headful mode to login
omniscout browser open https://github.com --profile work --headful

# Wait for login to complete
# Close browser window

# Later, profile should have login state
omniscout browser screenshot https://github.com --profile work
```

## Daemon Issues

### Daemon Won't Start

**Error:** `Failed to start daemon`

**Solution:**

```bash
# Check logs
OMNISCOUT_VERBOSE=1 omniscout daemon start

# Kill existing daemon
pkill -f "omniscout daemon"

# Try different port
omniscout daemon start --port 7721

# Check port availability
lsof -i :7720
```

### Daemon Crashes

**Error:** `Daemon crashed` or `Connection lost`

**Solution:**

```bash
# Inspect the actual daemon log
omniscout daemon logs -n 200
omniscout daemon logs -f                 # follow live

# Restart
omniscout daemon restart

# Check system resources
top
df -h
```

### Daemon Auto-Start Disabled

**Issue:** Daemon doesn't auto-start

**Solution:**

```bash
# Enable auto-start
export OMNISCOUT_DAEMON_AUTO_START=1

# Or manually start
omniscout daemon start

# Check setting
echo $OMNISCOUT_DAEMON_AUTO_START
```

## Performance Issues

### Slow Searches

**Solution:**

```bash
# Reduce limit
omniscout search "query" --limit 5

# Disable reranking
omniscout search "query" --no-rerank

# Check network
ping duckduckgo.com
```

### Slow Extraction

**Solution:**

```bash
# Use httpx instead of browser
omniscout extract https://example.com

# Reduce timeout
export OMNISCOUT_REQUEST_TIMEOUT=10

# Check network
ping example.com
```

### Slow Research

**Solution:**

```bash
# Reduce results
omniscout research "topic" --results 5

# Reduce depth
omniscout research "topic" --depth 1

# Increase concurrency
export OMNISCOUT_CRAWLER_CONCURRENCY=10

# Disable browser fallback
export OMNISCOUT_CRAWLER_USE_BROWSER=0
```

## Cache Issues

### Cache Corruption

**Error:** `Cache corrupted` or `Invalid cache entry`

**Solution:**

```bash
# Clear page cache
rm -rf ~/.local/share/omniscout/cache/pages/*
rm ~/.local/share/omniscout/cache.sqlite

# Clear vector index
rm -rf ~/.local/share/omniscout/qdrant/

# Clear sessions
omniscout session kill --all

# Rebuild cache
omniscout search "query"
```

### Cache Too Large

**Issue:** Cache directory is taking too much space

**Solution:**

```bash
# Check cache size
du -sh ~/.local/share/omniscout/cache/

# Clear old cache entries
find ~/.local/share/omniscout/cache/pages/ -mtime +30 -delete

# Or clear all
rm -rf ~/.local/share/omniscout/cache/pages/*
```

## JSON Output Issues

### Invalid JSON

**Error:** `Invalid JSON output`

**Solution:**

```bash
# Check for errors in stderr
omniscout search "query" --json 2>&1 | head

# Disable verbose logging
unset OMNISCOUT_VERBOSE

# Try again
omniscout search "query" --json
```

### Missing Fields

**Issue:** JSON output missing expected fields

**Solution:**

```bash
# Check JSON schema
omniscout search "query" --json | jq 'keys'

# Check for errors
omniscout search "query" --json | jq '.error'

# Use jq with defaults
omniscout search "query" --json | jq '.hits[] | {title: .title, url: .url}'
```

## Configuration Issues

### Config File Not Found

**Error:** `Config file not found`

**Solution:**

```bash
# Create config directory
mkdir -p ~/.config/omniscout

# Create config file
cat > ~/.config/omniscout/config.toml << EOF
default_source = "ddg"
search_limit = 10
EOF

# Verify
cat ~/.config/omniscout/config.toml
```

### Invalid Config

**Error:** `Invalid configuration`

**Solution:**

```bash
# Check config syntax
cat ~/.config/omniscout/config.toml

# Validate TOML
python -c "import tomllib; tomllib.loads(open('~/.config/omniscout/config.toml').read())"

# Fix syntax errors
# TOML format: key = value
```

### Environment Variables Not Working

**Issue:** Environment variables not being used

**Solution:**

```bash
# Check variable is set
echo $OMNISCOUT_DATA_DIR

# Export variable
export OMNISCOUT_DATA_DIR=/custom/path

# Verify
omniscout search "query" --verbose 2>&1 | grep "data_dir"
```

## Logging & Debugging

### Enable Verbose Logging

```bash
# Global verbose flag
omniscout search "query" --verbose

# Environment variable
export OMNISCOUT_VERBOSE=1
omniscout search "query"

# Check logs
OMNISCOUT_VERBOSE=1 omniscout search "query" 2>&1 | grep -i error
```

### Check System Information

```bash
# Python version
python --version

# Chrome version
google-chrome --version

# Disk space
df -h

# Memory usage
free -h

# Network
ping google.com
```

### Collect Debug Information

```bash
#!/bin/bash

echo "=== System Info ==="
uname -a
python --version
google-chrome --version

echo -e "\n=== OmniScout Info ==="
omniscout --version
omniscout daemon status

echo -e "\n=== Disk Space ==="
df -h ~/.local/share/omniscout/

echo -e "\n=== Network ==="
ping -c 1 google.com
ping -c 1 duckduckgo.com
```

## FAQ

### Q: Is my data sent to the cloud?

**A:** No. OmniScout is local-first. All processing happens on your machine. The only outbound traffic is:
- DuckDuckGo search queries (when you call `omniscout search` / `omniscout research`).
- The URLs you explicitly tell it to fetch.
- A one-time download of the sentence-transformers embedding model (cached locally forever).

Third-party CAPTCHA solvers are *opt-in* — you have to explicitly pass `--solver 2captcha|capsolver`, at which point OmniScout sends the sitekey + page URL to that vendor's API. The default `--solver none` keeps everything local and asks the human.

### Q: Can I use OmniScout CLI with an AI agent?

**A:** Yes — that's the primary use case. Run `omniscout install --skill` once to drop the skill file into Claude Code's, Cursor's, and Codex's well-known skill directories. After that, those agents auto-discover OmniScout's vocabulary and route browser tasks through it. See [Using OmniScout with AI agents](/cli/agents) for drop-in prompts.

### Q: What's the difference between the Playwright backend and the Chrome extension backend?

**A:**

- **Playwright** (default): OmniScout launches its own Chrome with a persistent profile under `~/Library/Application Support/omniscout/profiles/<name>/`. Logins are scoped per OmniScout profile. Great for CI and server-side agents.
- **Chrome extension** (opt-in): OmniScout drives your *real* running Chrome via `chrome.debugger`. Real logins, real extensions, real fingerprint. Great for local dev agents that need access to your live session. Load the unpacked `extension/` in `chrome://extensions`, then add `--backend extension` to a session's first call.

### Q: What are `@eN` refs?

**A:** Stable element identifiers OmniScout mints from the accessibility tree on each `snapshot`. They survive across calls (until the next `navigate`) and are far more robust than CSS selectors against Tailwind/CSS-Modules class hashes. See [Architecture](/cli/architecture#snapshot--en-refs).

### Q: How do I use OmniScout CLI with my own Chrome profile?

**A:** OmniScout CLI creates isolated profiles in `~/.local/share/omniscout/profiles/`. To use your existing Chrome profile:

```bash
# Copy your profile
cp -r ~/Library/Application\ Support/Google/Chrome/Default ~/.local/share/omniscout/profiles/my-profile

# Use it
omniscout browser screenshot https://example.com --profile my-profile
```

### Q: Can I run OmniScout CLI in Docker?

**A:** Yes. See the Docker example in the Examples guide.

### Q: How do I contribute?

**A:** OmniScout CLI is open source. See the main README for contribution guidelines.

### Q: What's the difference between `--browser` and `--no-browser`?

**A:** 
- `--browser`: Use Chrome for rendering (slower, handles JavaScript)
- `--no-browser`: Use httpx only (faster, no JavaScript)

Default is to try httpx first, then fall back to Chrome.

### Q: Can I use OmniScout CLI with a proxy?

**A:** Set HTTP proxy environment variables:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
omniscout search "query"
```

### Q: How do I clear all data?

**A:** 

```bash
# Clear everything
rm -rf ~/.local/share/omniscout/
rm -rf ~/.cache/omniscout/
rm -rf ~/.config/omniscout/

# Or selectively
rm -rf ~/.local/share/omniscout/cache/pages/  # Clear page cache
rm -rf ~/.local/share/omniscout/qdrant/       # Clear vector index
omniscout session kill --all                   # Kill sessions
```

### Q: Can I use OmniScout CLI on Windows?

**A:** OmniScout CLI is designed for macOS and Linux. Windows support is not officially tested, but it should work with WSL2.

### Q: How do I update OmniScout CLI?

**A:**

```bash
pip install --upgrade omniscout
```

### Q: Can I use OmniScout CLI without Chrome?

**A:** Yes, use Playwright's bundled Chromium:

```bash
omniscout install --bundled
export OMNISCOUT_BROWSER_CHANNEL=chromium
```

### Q: How do I report a bug?

**A:** Open an issue on GitHub with:
- Error message
- Command that failed
- System information (OS, Python version, Chrome version)
- Verbose output (`--verbose` flag)

## Getting Help

- **Documentation:** Check the [CLI Overview](/cli/overview)
- **Examples:** See [Examples & Guides](/cli/examples)
- **API Reference:** Check [Python API](/sdk/api)
- **Architecture:** See [Architecture](/cli/architecture)
- **Issues:** Open an issue on GitHub
- **Discussions:** Start a discussion on GitHub
