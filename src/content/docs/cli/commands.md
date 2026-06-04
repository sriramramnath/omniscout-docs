---
title: Commands reference
description: Every command and JSON shape in OmniScout's agent-facing CLI.
---

OmniScout is organized into command groups. Use `omniscout --help` to see all of
them, or `omniscout <command> --help` for command-specific options.

## Global options

All commands support:

- `--json` — emit machine-readable JSON to stdout. Logs go to stderr.
- `--verbose`, `-v` — verbose stderr logging.
- `--version` — print version and exit.

You can also set `OMNISCOUT_JSON=1` in the environment to make JSON output
the default for every command in a session — the typical setup for an AI
agent.

## Daemon (`omniscout daemon ...`)

The daemon is a long-lived process that holds Playwright (and optionally a
WebSocket bridge to the Chrome extension) open. Every `omniscout browser ...`
command is a thin HTTP client into the daemon.

### `omniscout daemon start`

```bash
omniscout daemon start [--port N]
```

Idempotent. If a daemon is already up it returns the existing status. If
not, it spawns a background process and waits for `/healthz`.

```json
{
  "running": true,
  "port": 7720,
  "version": "0.1.0",
  "protocol_version": "1",
  "extension_connected": false,
  "extension_id": null,
  "uptime_seconds": 0,
  "sessions": [],
  "backends": ["playwright"],
  "pid": 12345
}
```

### `omniscout daemon stop`

SIGTERM, then SIGKILL after 5 seconds.

### `omniscout daemon restart`

`stop` followed by `start`.

### `omniscout daemon status`

Same JSON shape as `start`. Returns `{ "running": false }` when down.

### `omniscout daemon logs`

```bash
omniscout daemon logs [-n LINES] [-f] [--prev]
```

- `-n N` — tail the last N lines (default 100).
- `-f` — follow the log live (Ctrl-C to exit).
- `--prev` — read the previous run's log (rotated on each `start`).

### `omniscout daemon trace`

Show recent rows from the structured action history (one JSONL row per
command the daemon has handled, capped at 10,000 rows then rotated).

```bash
omniscout daemon trace [-n N] [--session NAME] [--action VERB] [--since SECONDS] [--prev]
omniscout daemon trace last     # shorthand: print the most recent row as JSON
```

Each row looks like:

```json
{
  "action_id": "8f3a7c9e1b2d4e5f",
  "ts": "2026-05-26T19:00:42.123456Z",
  "elapsed_ms": 42,
  "ok": true,
  "session": "default",
  "action": "click",
  "args": {"selector": "@e3"},
  "snapshot_generation": 18,
  "error_kind": null,
  "error": null,
  "backend": "playwright"
}
```

`--prev` also includes the rotated `actions.prev.jsonl`.

### `omniscout daemon replay`

Re-run actions from the history without retyping them.

```bash
omniscout daemon replay <action_id>                        # single action
omniscout daemon replay --session NAME [--since SECONDS]   # everything in a window
omniscout daemon replay --session NAME --dry-run           # list, don't run
```

Interactive verbs (`login`, `login_done`, `captcha_solve`, `upload`) are
skipped by default. Pass `--include-interactive` to replay them too. The
replayed call's response includes a `source_action_id` field pointing
back to the original row for traceability.

### `omniscout daemon watch`

Subscribe to the daemon's live event stream (Server-Sent Events).

```bash
omniscout daemon watch [--filter TYPE]... [--json-lines]
```

Events you'll see: `action.start`, `action.finish`, `session.opened`,
`session.closed`, `extension.connected`, `extension.disconnected`. Use
`--filter action.finish` to narrow down, and `--json-lines` to emit one
JSON object per line for piping into another tool.

## Browser action vocabulary

These are the verbs an AI agent will use most. Same JSON shape regardless
of which backend (Playwright or extension) handles the session.

All accept `--session NAME` (default `default`) to isolate parallel tasks.

### `omniscout browser navigate`

```bash
omniscout browser navigate <url> [--new-tab] [--profile NAME] [--headful] \
                                [--wait-until {load,domcontentloaded,networkidle}] \
                                [--session NAME]
```

First call binds the session to a backend. Without `--new-tab`, navigates
the active tab.

```json
{
  "action": "navigate",
  "url": "https://example.com",
  "title": "Example Domain",
  "tab_id": "0",
  "status": 200
}
```

`omniscout browser open` is a backwards-compatible alias.

### `omniscout browser snapshot`

```bash
omniscout browser snapshot [--refs-only] [--session NAME]
```

Returns the accessibility tree of the active page with stable `@eN` refs
on every focusable / semantic element. The primary way to address
elements — refs survive across calls until the next `navigate`.

```json
{
  "action": "snapshot",
  "url": "https://example.com",
  "title": "Example",
  "refs": [
    { "ref": "@e1", "role": "heading", "name": "Example Domain", "value": "" },
    { "ref": "@e2", "role": "link", "name": "More information...", "value": "" }
  ],
  "tree": { /* full nested tree, suppressed with --refs-only */ }
}
```

### `omniscout browser click`

```bash
omniscout browser click <ref-or-selector> [--button {left,right,middle}] \
                                        [--mod cmd|ctrl|alt|shift]... \
                                        [--clicks N] [--session NAME]
omniscout browser click --coord X Y [--session NAME]
```

`<ref-or-selector>` is an `@eN` ref from `snapshot` (preferred), any CSS
selector, or omitted if you pass `--coord`. Coordinates are the
vision-agent escape hatch.

```json
{ "action": "click", "mode": "selector", "tag": "BUTTON", "text": "Submit" }
```

### `omniscout browser fill`

```bash
omniscout browser fill <ref-or-selector> <value> [--session NAME]
```

Replaces existing content. Works on `<input>` / `<textarea>` *and*
`[contenteditable]` (ProseMirror, Lexical, Slate, TipTap, Quill) via
`execCommand('insertText')`.

```json
{ "action": "fill", "mode": "value", "tag": "input" }
```

`mode` is `"value"` for native inputs, `"contenteditable"` for rich-text.

### `omniscout browser scroll`

```bash
omniscout browser scroll [up|down|left|right] [--amount N] [--ref REF] [--session NAME]
```

`--amount` is in 100px ticks (default 3). `--ref` scrolls *within* an
element instead of the page.

### `omniscout browser key`

```bash
omniscout browser key <combo> [--session NAME]
```

`combo` is e.g. `cmd+a`, `Escape`, `Enter`, `ctrl+shift+t`. Aliases:
`cmd`/`command`→`Meta`, `option`→`Alt`, `return`→`Enter`, `esc`→`Escape`.

### `omniscout browser hover`

```bash
omniscout browser hover <ref-or-selector> [--session NAME]
omniscout browser hover --coord X Y [--session NAME]
```

### `omniscout browser upload`

```bash
omniscout browser upload <ref-or-selector> <file>... [--session NAME]
```

Attaches files to an `<input type="file">`. Playwright backend only.

### `omniscout browser screenshot`

```bash
omniscout browser screenshot [URL] [-o PATH] [--ref REF] [--full-page] \
                            [--format {png,jpeg}] [--quality 0-100] \
                            [--profile NAME] [--session NAME]
```

If `URL` is given, navigates first. The daemon writes the file to disk
and returns the path — agents read the file via their file-read tool.

```json
{
  "action": "screenshot",
  "format": "png",
  "path": "/tmp/state.png",
  "size_bytes": 7275,
  "mime_type": "image/png"
}
```

### `omniscout browser pdf`

```bash
omniscout browser pdf [URL] [-o PATH] [--paper {letter,a4,legal,a3,tabloid}] \
                    [--landscape] [--scale 0.1-2.0] [--session NAME]
```

Playwright backend only (requires headless Chrome's print pipeline).

### `omniscout browser eval`

```bash
omniscout browser eval <js> [--session NAME]
```

Evaluates JavaScript in the active page. `async`/`await` supported.

```bash
omniscout browser eval "document.title"
# {"action":"evaluate","type":"str","value":"Example"}
```

### `omniscout browser wait`

```bash
omniscout browser wait [--ref REF] [--url PATTERN] [--idle] [--ms N] [--timeout-ms 30000]
```

Exactly one of `--ref`, `--url`, `--idle`, or `--ms` must be set. `--url`
takes a regex.

### `omniscout browser login`

```bash
omniscout browser login <url> [--profile NAME] [--success-pattern REGEX] \
                            [--timeout-ms 300000] [--session NAME]

# In a second shell once you've authenticated:
omniscout browser login --done [--session NAME]
```

Opens headful Chrome on `<url>`, then *blocks* until either the URL
matches `--success-pattern` OR you call `omniscout browser login --done`
from another shell. Cookies persist in the profile, so subsequent
commands with the same `--profile` are already logged in.

```json
{ "action": "login", "logged_in": true, "final_url": "https://github.com/" }
```

### `omniscout browser captcha`

```bash
omniscout browser captcha [--detect-only] [--solver {none,2captcha,capsolver,manual}] \
                        [--api-key KEY] [--timeout-ms 120000] [--session NAME]
```

Detects reCAPTCHA v2/v3, hCaptcha, and Cloudflare Turnstile.

- `--detect-only` returns `{ detected, type, sitekey, frame_url }` and
  exits.
- Default `--solver none` flips the tab headful and **blocks** the
  calling CLI until the page is captcha-free (typically because you
  solved it manually).
- `--solver 2captcha` / `--solver capsolver` sends the sitekey + page URL
  to the third-party API. API key from `--api-key` or env
  (`TWOCAPTCHA_API_KEY` / `CAPSOLVER_API_KEY`).

### `omniscout browser close`

```bash
omniscout browser close [--session NAME] [--all]
```

Always call at the end of a task.

## Tab management (`omniscout browser tab ...`)

```bash
omniscout browser tab list                 # show all tabs in the session
omniscout browser tab close [TAB_ID]       # default = active tab
omniscout browser tab switch <TAB_ID>      # make TAB_ID active
```

`tab list` JSON:

```json
{
  "action": "list_tabs",
  "tabs": [
    { "tab_id": "0", "url": "https://...", "title": "...", "active": true }
  ]
}
```

## Network capture (`omniscout browser network ...`)

```bash
omniscout browser network start            # begin capturing requests + responses
omniscout browser network stop             # stop and return count
omniscout browser network list [--filter REGEX]
omniscout browser network detail <REQUEST_ID>
```

```json
{
  "action": "network.list",
  "entries": [
    { "id": 12345, "url": "https://api.example.com/track", "method": "POST",
      "status": null, "kind": "request", "ts": 1716796020.34 }
  ],
  "count": 1
}
```

## Search, extract, research

These existed before OmniScout's daemon work and still operate directly
(no daemon round-trip).

## Stateful Workflow Commands

These top-level commands provide deterministic workflow continuity for agents:

```bash
omniscout search "OpenAI operator"
omniscout open 1
omniscout snapshot --refs-only
omniscout extract @e42
omniscout context
```

Deterministic shorthand rules:

- `omniscout open 1` means index `1` from the **latest search result set only**.
- Numeric `open` targets never map to tabs, snapshots, or mixed contexts.
- `omniscout extract @eN` resolves through the latest snapshot lineage.
- If refs are stale, re-run `omniscout snapshot` before retrying extraction.

### `omniscout open`

```bash
omniscout open <url-or-index> [--session NAME] [--profile NAME] [--new-tab]
```

Opens a URL directly, or resolves an integer index from the most recent search.

### `omniscout snapshot`

```bash
omniscout snapshot [--session NAME] [--refs-only] [--overlay]
```

Top-level alias for browser snapshot with `@eN` ref output.

### `omniscout context`

```bash
omniscout context
```

Shows persisted workflow state: active session/page/tab, latest snapshot
generation, latest search set, and tracked refs.

### `omniscout reset`

```bash
omniscout reset
```

Clears workflow continuity state (`open` index mappings, snapshot ref lineage,
active workflow context) without force-closing browser sessions.

### `omniscout remember`

```bash
omniscout remember <url> [--note TEXT] [--session NAME] [--cache/--no-cache]
```

Fetches and extracts a URL, then indexes it into **browser memory** as a
`visit` record. Optional `--note` adds a linked `note` record. Memory is
explicit only — normal `navigate` / `extract` / `snapshot` do not auto-index.

### `omniscout memory ...`

```bash
omniscout memory list [--kind visit|note] [--limit N]
omniscout memory show <id>
omniscout memory note "text" [--session NAME]
omniscout memory delete <id>
omniscout memory delete --url <url>
omniscout memory clear --yes
omniscout memory stats
```

Memory lives in `$OMNISCOUT_DATA_DIR/memory.sqlite` with vectors in the
`omniscout_memory` Qdrant collection. Deletion removes both SQLite rows and
matching vectors. `stats` reports record counts, vector count, and storage hints.

### `omniscout workflow export`

```bash
omniscout workflow export [--session NAME] [--since SECONDS] [--from-context] [--include-interactive]
```

Exports agent-friendly JSON steps:

```json
{
  "steps": [
    { "search": "OpenAI pricing" },
    { "open": 1 },
    { "snapshot": true },
    { "extract": "@e12" }
  ]
}
```

Sources: persisted `workflow_state.json` plus replayable rows from
`daemon/actions.jsonl`. Pass `--from-context` to export only current workflow
state without reading action history.

### `omniscout replay`

Top-level alias for daemon replay:

```bash
omniscout replay action-<action_id>
omniscout replay session-<name> [--since SECONDS] [--dry-run] [--include-interactive]
```

Also accepts a bare 16-character hex `action_id`. See `omniscout daemon replay`.

### `omniscout search`

```bash
omniscout search <query> [--limit N] [--source {ddg,index,memory,hybrid}] [--rerank/--no-rerank] \
  [--answer] [--depth {auto,fast,balanced,deep}] [--data]
```

| Source | Meaning |
|--------|---------|
| `ddg` | Live DuckDuckGo HTML results |
| `index` | Local Qdrant crawl corpus from research |
| `memory` | Remembered visits and notes (`omniscout remember`) |
| `hybrid` | Memory + DDG, deduplicated by URL |

```json
{ "query": "...", "source": "ddg", "count": 10, "hits": [ { "url": "...", "title": "...", "snippet": "...", "score": 0.92, "rank": 1 } ] }
```

Answer-first mode (`--depth` defaults to **`auto`**, classifier-routed):

```bash
# Sub-second: live DDG snippets only (no embedding model)
omniscout search "who is the president of the united states" --answer

# Local index + DDG fallback (may load embedding model on first run)
omniscout search "..." --answer --depth balanced

# Crawl + extract top sources (slow; own pipeline, not omniscout research)
omniscout search "..." --answer --depth deep

# Timing breakdown
omniscout search "..." --answer --data
```

| Depth | Latency target | What it does |
|-------|----------------|--------------|
| `auto` (default) | ~0.3–3s | Query classifier chooses `fast`/`balanced`/`deep` |
| `fast` | ~0.3–1.5s | DDG snippets only; no embeddings |
| `balanced` | ~1–3s warm | Local Qdrant index when relevant, else DDG |
| `deep` | ~5–15s | `deep_answer_pipeline`: search → crawl → extract |

With `--answer` alone, stdout is **plain text** (just the answer sentence).
Add `--data` for the full Rich UI plus diagnostics (`elapsed_ms`, `depth`,
`cache_hit`, `ddg_ms`, `index_ms`, `model_load_ms`, etc.).

Answers are cached (default TTL 30 minutes; 15 minutes for time-sensitive
queries like `who is the president`). Cache schema supports future adaptive
TTL based on source freshness.

### `omniscout warmup`

```bash
omniscout warmup
```

Preloads the embedding model in the **daemon** (not a throwaway CLI process).
The model stays hot for subsequent `search`, `research`, and `remember` calls.
Search commands auto-start the daemon and route embeds through it by default, so
`warmup` is optional — use it when you want to pay the first-load cost (~2s)
before a batch of queries.

Set `OMNISCOUT_EMBED_DAEMON=0` to load the model in-process instead (tests,
debugging).

### `omniscout benchmark answers`

```bash
omniscout benchmark answers [--queries 100] [--modes fast,balanced,deep] [--dataset PATH]
```

Runs a full matrix over answer modes with:

- cold + warm runs
- cache enabled + cache bypassed
- per-query correctness against the gold dataset
- persisted metrics (`p50`, `p95`, success rate, cache hit rate, fallback frequency)

### `omniscout benchmark startup`

```bash
omniscout benchmark startup [--iterations 10]
```

Profiles Python CLI startup overhead for critical commands and appends metrics
to the benchmark metrics log.

### Embed model in the daemon

Search, research, and memory commands route embedding through the same
long-lived daemon that powers browser automation (`127.0.0.1:7720`). The
sentence-transformers model loads once into daemon RAM (~80MB, ~2s) and stays
warm across CLI invocations.

- `omniscout daemon status` reports `embed_model_loaded`, `embed_model`, and
  `embed_model_dim`.
- `OMNISCOUT_EMBED_DAEMON=1` (default) — embed via daemon; auto-starts if needed.
- `OMNISCOUT_EMBED_DAEMON=0` — in-process load (legacy behavior).
- Model files are prefetched to disk by `omniscout install` (default). If
  missing, the first embed attempt downloads them automatically.

### `omniscout extract`

```bash
omniscout extract <url> [--format {markdown,text,json}] [--cache/--no-cache]
```

### `omniscout research`

```bash
omniscout research <topic> [--depth N] [--results K] [--summarize/--no-summarize]
```

Multi-step: search → crawl → extract → embed → rerank → summarize.

## Profiles (`omniscout profile ...`)

```bash
omniscout profile create <name>
omniscout profile list
omniscout profile delete <name>
```

Persistent Chrome user-data-dirs under
`~/Library/Application Support/omniscout/profiles/<name>/`. Login state and
cookies persist across runs.

## Legacy sessions (`omniscout session ...`)

The pre-daemon long-lived browser session model. Still supported for
direct CDP attach from other tools.

```bash
omniscout session start [--profile NAME] [--headful]
omniscout session list
omniscout session attach <SESSION_ID>
omniscout session kill [--id ID] [--all]
```

For agents, prefer the daemon model (`--session NAME` on every browser
command) over these.

## Install helper

```bash
omniscout install [--bundled] [--skill] [--print-data-dir]
```

- `--bundled` — download Playwright's Chromium even if system Chrome
  exists.
- `--skill` — copy `SKILL.md` + `references/operations.md` into
  `~/.claude/skills/scout/`, `~/.cursor/skills-cursor/scout/`,
  `~/.codex/skills/scout/`, and `~/.gemini/config/skills/scout/`.
- `--print-data-dir` — print the resolved data directory and exit.

## Response envelope

Every command returns the same envelope. On success:

```json
{
  "ok": true,
  "action": "click",
  "data": {
    "mode": "selector",
    "tag": "BUTTON",
    "text": "Sign in",
    "snapshot_generation": 18
  },
  "elapsed_ms": 42,
  "action_id": "8f3a7c9e1b2d4e5f"
}
```

The two cross-cutting fields agents should treat specially:

- **`action_id`** is a stable hex ID for this exact invocation. Pass it
  to `daemon trace`, `daemon replay`, or correlate against
  `daemon watch` events.
- **`data.snapshot_generation`** is a monotonic per-session counter that
  bumps whenever cached `@eN` refs become invalid (`snapshot`,
  `navigate`, `switch_tab`, `close_tab` of the active tab). Re-snapshot
  if it differs from what your last `snapshot` returned.

On failure:

```json
{
  "ok": false,
  "action": "click",
  "error": "ref @e9 not found (re-snapshot the page)",
  "error_kind": "no_such_ref",
  "elapsed_ms": 42,
  "action_id": "8f3a7c9e1b2d4e5f"
}
```

Stable `error_kind` values agents can branch on:

| Kind | Meaning |
|---|---|
| `timeout` | Operation exceeded its budget |
| `no_such_session` | Session doesn't exist |
| `no_such_ref` | `@eN` ref expired — re-snapshot |
| `backend_unavailable` | Extension backend not connected |
| `invalid_args` | Bad arguments |
| `internal` | Unhandled error in the daemon |
| `requires_user` | Human needed (captcha/login) |
| `unsupported` | Backend doesn't implement this verb |

## Environment variables

| Var | Purpose |
|---|---|
| `OMNISCOUT_JSON=1` | Force JSON output on every command |
| `OMNISCOUT_DAEMON_AUTO_START=0` | Don't auto-start the daemon on first call |
| `OMNISCOUT_DAEMON_PORT` | Override the daemon's port (default 7720) |
| `OMNISCOUT_DATA_DIR` | Override data dir (default `~/Library/Application Support/omniscout/`) |
| `OMNISCOUT_CONFIG_DIR` | Override config dir |
| `OMNISCOUT_CACHE_DIR` | Override cache dir |
| `OMNISCOUT_EMBED_DAEMON=1` | Route embeds through daemon (default on) |
| `OMNISCOUT_EMBED_LOCAL_ONLY=0` | Allow runtime Hugging Face model fetches |
| `TWOCAPTCHA_API_KEY` | API key for `--solver 2captcha` |
| `CAPSOLVER_API_KEY` | API key for `--solver capsolver` |

Legacy `OMNISCOUT_*` names are accepted for all `OMNISCOUT_*` variables above.
