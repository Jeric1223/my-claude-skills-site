# my-claude-skills-site

[my-claude-skills](https://github.com/Jeric1223/my-claude-skills) 마켓플레이스에 등록된 Claude Code 스킬을 보여주는 쇼케이스 사이트.

## 데이터가 어디서 오나

이 저장소에는 스킬 내용이 없다. 빌드 시점에 스킬 저장소의 raw 파일을 읽는다.

```
.claude-plugin/marketplace.json   → 스킬 목록, 설명, 버전  (유일한 레지스트리)
<스킬 폴더>/README.md              → 상세 페이지 본문
<스킬 폴더>/SKILL.md               → 프런트매터의 name(호출 이름) + 절차 본문
```

경로 규칙은 `src/lib/skills.ts` 한 곳에 모여 있다. 스킬 저장소에 새 스킬을 추가하고 `marketplace.json`에 항목만 등록하면 이 사이트에는 손댈 게 없다 — 페이지는 `revalidate: 3600`이라 재배포 없이 한 시간 안에 반영된다.

## 디자인

`src/app/globals.css` 상단의 CSS 변수가 전부다. 액센트 색을 바꾸려면 `--accent`, `--accent-soft`, `--bloom` 세 줄만 고치면 된다.

규칙 세 가지:

- **배경은 순백/순흑이 아니다.** 라이트는 크림(`#faf8f2`) 위에 흰 카드, 다크는 검정(`#0b0b0d`) 위에 밝은 카드. 그림자 없이 테두리만으로 카드가 떠 보인다.
- **폰트는 역할이 하나씩.** 세리프(Crimson Pro + Noto Serif KR)는 히어로 제목에만, 모노(JetBrains Mono)는 라벨·명령어·숫자에만, 나머지는 Hanken Grotesk.
- **섹션 제목은 `.label`** — 12px 모노 대문자에 자간 0.12em. 본문보다 작지만 자간 덕에 라벨로 읽힌다.

한글은 어디서나 줄바꿈이 되기 때문에 `word-break: keep-all`을 `:lang(ko)`에 걸어뒀다. 빼면 제목이 단어 중간에서 끊긴다.

## 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## 배포

Vercel에 저장소를 연결하면 기본 설정 그대로 동작한다. 환경변수 없음.
