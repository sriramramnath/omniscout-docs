---
title: Computer automation & UI commands
description: Desktop automation and UI commands for macOS via the `omniscout computer` sub‑command.
navigation:
  title: Computer commands
  icon: i-lucide-monitor
seo:
  title: "Computer automation commands"
  description: "Desktop automation features for OmniScout (macOS)"
---

OmniScout now supports **desktop (computer) automation** on macOS. The `computer` sub‑command lets agents interact with native applications, windows, the clipboard, and the screen, extending the agent's capabilities beyond the browser.

## Core commands

| Command | Syntax | Description |
|---|---|---|
| `navigate` | `omniscout computer navigate <target> [--session <id>]` | Opens a file, URL, or application using macOS `open`. Sets the session’s active app for subsequent actions. |
| `type` | `omniscout computer type <text> [--session <id>]` | Sends keystrokes to the active app. The backend ensures the app is foreground before typing. |
| `key` | `omniscout computer key <combo> [--session <id>]` | Sends a keyboard shortcut (e.g., `cmd+n`). |
| `screenshot` | `omniscout computer screenshot [--out <path>] [--session <id>]` | Captures the screen (or active window) via macOS `screencapture`. Returns the file URL. |
| `clipboard get` | `omniscout computer clipboard get [--session <id>]` | Returns current clipboard contents (`pbpaste`). |
| `clipboard set` | `omniscout computer clipboard set <text> [--session <id>]` | Replaces the clipboard (`pbcopy`). |
| `window list` | `omniscout computer window list [--session <id>]` | Lists open windows (title and bundle identifier) using AppleScript. |
| `window activate` | `omniscout computer window activate <title|id> [--confirm] [--session <id>]` | Brings the specified window to the foreground. |
| `window close` | `omniscout computer window close <title|id> [--confirm] [--session <id>]` | Closes a window after confirmation. |
| `wait` | `omniscout computer wait <ms> [--session <id>]` | Simple sleep for the given milliseconds. |

## UI sub‑commands

| Command | Syntax | Description |
|---|---|---|
| `snapshot` | `omniscout computer ui snapshot [--session <id>]` | Returns the UI accessibility tree with stable `@eN` refs. |
| `click` | `omniscout computer ui click <ref> [--session <id>]` | Clicks the UI element identified by an `@eN` ref. |
| `drag` | `omniscout computer ui drag <src-ref> <dst-ref> [--session <id>]` | Drags an element from source ref to destination ref. |
| `is` | `omniscout computer ui is <ref> <role> [--session <id>]` | Checks whether the element matches a role (`button`, `textbox`, …). |
| `mouse_move` | `omniscout computer ui mouse_move <x> <y> [--session <id>]` | Moves the mouse cursor to screen coordinates. |
| `mouse_scroll` | `omniscout computer ui mouse_scroll <dx> <dy> [--session <id>]` | Scrolls the mouse wheel by the given deltas. |
| `drop` | `omniscout computer ui drop <ref> <filepath> [--session <id>]` | Drops a file onto the UI element. |


## Session model & safety

- **Session‑bound target app** – After `navigate` or `window activate`, the daemon records the app identifier. `type` and `key` automatically refocus this app, preventing accidental input to the wrong window.
- **Accessibility permission** – All System Events calls verify macOS Accessibility permission. If missing, the command returns a `requires_user` error with instructions.
- **Destructive confirmation** – Commands that can close windows require `--confirm` to avoid data loss.
- **Action history** – All computer actions are logged in the daemon’s history for replay, audit, and debugging.

## Quick usage example

```bash
# Open Apple Notes and type a message
omniscout computer navigate "Notes" --session notes-demo
omniscout computer type "Hello from OmniScout!" --session notes-demo

# Take a screenshot of the active window
omniscout computer screenshot --out /tmp/notes.png --session notes-demo
```

For the full technical overview, see the **Computer automation** report in the repository (`reports/computer_features.md`).
