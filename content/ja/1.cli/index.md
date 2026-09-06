---
title: OmniScout CLI
description: AIエージェント向けローカルファーストのブラウザ操作・セマンティック検索・リサーチ。
navigation:
  icon: i-lucide-book-open
seo:
  title: "OmniScout CLI"
  description: "AIエージェント向けローカルファーストのブラウザ操作・セマンティック検索・リサーチ。"
---
## インストール

```bash
pip install omniscout
omniscout install --skill
```

## 使い方

```bash
omniscout daemon start

# 検索
omniscout answer "what is the capital of france"

# 抽出
omniscout extract https://example.com

# ブラウザ
omniscout browser navigate https://example.com
omniscout browser snapshot --refs-only
omniscout browser click '@e3'
omniscout browser screenshot --out /tmp/page.png

# リサーチ
omniscout research "AI agents in 2026"

# ナレッジグラフ
omniscout graph "Cursor"
```

## 内容一覧

| コマンド | 内容 |
|---|---|
| `omniscout answer` | 引用付きの直接Q&A |
| `omniscout search` | リランク付きWeb検索 |
| `omniscout extract` | URLを取得してクリーンなコンテンツを返す |
| `omniscout research` | マルチステップのリサーチパイプライン |
| `omniscout graph` | ナレッジグラフを構築 |
| `omniscout browser` | ブラウザを操作 |
| `omniscout computer` | デスクトップ自動化（macOS） |
| `omniscout remember` | URLをメモリに保存 |
| `omniscout daemon` | バックグラウンドサービスを管理 |

## JSON出力

```bash
export OMNISCOUT_JSON=1  # エージェント向け構造化出力
```

## ローカルファースト

クラウドアカウント、APIキー、ホスト型サーバーは不要です。外部への通信はDuckDuckGo検索と明示的に取得したURLのみです。
