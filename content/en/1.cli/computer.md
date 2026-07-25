---
title: Computer automation
description: Desktop automation for macOS via the `omniscout computer` sub-command.
navigation:
  title: Computer commands
  icon: i-lucide-monitor
seo:
  title: "Computer automation"
  description: "Desktop automation for macOS via the omniscout computer sub-command."
---
OmniScout can control native macOS applications, windows, the clipboard, and the screen.

## Commands

| Command | What it does |
|---------|--------------|
| `computer navigate <target>` | Open an app, file, or URL |
| `computer type <text>` | Type into the focused window |
| `computer key <combo>` | Send a keyboard shortcut (e.g., `cmd+v`) |
| `computer screenshot` | Capture the screen |
| `computer clipboard get` | Read the clipboard |
| `computer clipboard set <text>` | Write to the clipboard |
| `computer window list` | List open windows |
| `computer window activate <title>` | Bring a window to foreground |
| `computer window close <title>` | Close a window |
| `computer wait <ms>` | Sleep for milliseconds |

## UI element interaction

| Command | What it does |
|---------|--------------|
| `computer ui snapshot` | Get UI element refs |
| `computer ui click <ref>` | Click a UI element |
| `computer ui drag <src> <dst>` | Drag between elements |
| `computer ui is <ref> <role>` | Check if element matches a role |

## Example

```bash
# Open Notes and type a message
omniscout computer navigate "Notes" --session notes
omniscout computer type "Hello from OmniScout!" --session notes
omniscout computer screenshot --out /tmp/notes.png --session notes
```

See `omniscout computer --help` for all options.
