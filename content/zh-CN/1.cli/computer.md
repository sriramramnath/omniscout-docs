---
title: 电脑自动化
description: 通过 `omniscout computer` 子命令实现 macOS 桌面自动化。
navigation:
  title: 电脑命令
  icon: i-lucide-monitor
seo:
  title: "电脑自动化"
  description: "通过 omniscout computer 子命令实现 macOS 桌面自动化。"
---
OmniScout 可以控制原生 macOS 应用、窗口、剪贴板和屏幕。

## 命令

| 命令 | 功能 |
|---------|--------------|
| `computer navigate <target>` | 打开应用、文件或 URL |
| `computer type <text>` | 在聚焦窗口中输入 |
| `computer key <combo>` | 发送键盘快捷键（例如 `cmd+v`） |
| `computer screenshot` | 截取屏幕 |
| `computer clipboard get` | 读取剪贴板 |
| `computer clipboard set <text>` | 写入剪贴板 |
| `computer window list` | 列出打开的窗口 |
| `computer window activate <title>` | 将窗口置于前台 |
| `computer window close <title>` | 关闭窗口 |
| `computer wait <ms>` | 休眠指定毫秒数 |

## UI 元素交互

| 命令 | 功能 |
|---------|--------------|
| `computer ui snapshot` | 获取 UI 元素引用 |
| `computer ui click <ref>` | 点击 UI 元素 |
| `computer ui drag <src> <dst>` | 在元素之间拖拽 |
| `computer ui is <ref> <role>` | 检查元素是否匹配某个角色 |

## 示例

```bash
# 打开备忘录并输入消息
omniscout computer navigate "Notes" --session notes
omniscout computer type "Hello from OmniScout!" --session notes
omniscout computer screenshot --out /tmp/notes.png --session notes
```

所有选项见 `omniscout computer --help`。
