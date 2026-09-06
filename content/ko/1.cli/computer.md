---
title: 컴퓨터 자동화
description: `omniscout computer` 하위 명령어를 통한 macOS용 데스크톱 자동화.
navigation:
  title: 컴퓨터 명령어
  icon: i-lucide-monitor
seo:
  title: "컴퓨터 자동화"
  description: "`omniscout computer` 하위 명령어를 통한 macOS용 데스크톱 자동화."
---
OmniScout는 네이티브 macOS 애플리케이션, 창, 클립보드, 화면을 제어할 수 있습니다.

## 명령어

| 명령어 | 설명 |
|---------|--------------|
| `computer navigate <target>` | 앱, 파일 또는 URL 열기 |
| `computer type <text>` | 포커스된 창에 입력 |
| `computer key <combo>` | 키보드 단축키 전송 (예: `cmd+v`) |
| `computer screenshot` | 화면 캡처 |
| `computer clipboard get` | 클립보드 읽기 |
| `computer clipboard set <text>` | 클립보드에 쓰기 |
| `computer window list` | 열린 창 나열 |
| `computer window activate <title>` | 창을 앞으로 가져오기 |
| `computer window close <title>` | 창 닫기 |
| `computer wait <ms>` | 밀리초만큼 대기 |

## UI 요소 상호작용

| 명령어 | 설명 |
|---------|--------------|
| `computer ui snapshot` | UI 요소 참조 가져오기 |
| `computer ui click <ref>` | UI 요소 클릭 |
| `computer ui drag <src> <dst>` | 요소 간 드래그 |
| `computer ui is <ref> <role>` | 요소가 역할과 일치하는지 확인 |

## 예제

```bash
# 메모 앱을 열고 메시지 입력
omniscout computer navigate "Notes" --session notes
omniscout computer type "Hello from OmniScout!" --session notes
omniscout computer screenshot --out /tmp/notes.png --session notes
```

모든 옵션은 `omniscout computer --help`를 참조하세요.
