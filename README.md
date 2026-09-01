# Portfolio

React + Vite 포트폴리오. GitHub Pages 배포용으로 셋팅되어 있습니다.

## 스택

| 역할 | 라이브러리 |
| --- | --- |
| 스무스 스크롤 | [Lenis](https://lenis.darkroom.engineering/) |
| 스크롤 연동 애니메이션 | GSAP + ScrollTrigger (`@gsap/react` 의 `useGSAP`) |
| 페이지 전환 / 공유 레이아웃 | Motion (구 Framer Motion, `import ... from 'motion/react'`) |
| 라우팅 | react-router-dom `BrowserRouter` (basename = `BASE_URL`) |

## 실행

```bash
yarn install
yarn dev           # http://localhost:5173
yarn build
yarn preview
```

`yarn preview` 는 base 가 `/portfolio-zoo/` 로 빌드되므로 `http://localhost:4173/portfolio-zoo/` 로 열어야 합니다.

## 구조

```
src/
├─ lib/
│  ├─ gsap.js                        GSAP 플러그인 등록 지점 (여기서만 registerPlugin)
│  ├─ activeRoute.js                 전환 중 '스크롤의 주인'이 어느 라우트인지 기록
│  └─ exitScroll.js                  나가는 페이지를 보던 지점에 붙잡아 두기 위한 값
├─ providers/SmoothScrollProvider.jsx Lenis 인스턴스 1개 생성 + gsap.ticker 동기화
├─ components/
│  ├─ ScrollReset.jsx                라우트 변경 시 스크롤 0 리셋 + ScrollTrigger.refresh
│  ├─ PageTransition.jsx             커버 전환 (cover / fade)
│  ├─ Reveal.jsx                     ScrollTrigger 기반 등장 애니메이션 래퍼
│  ├─ ProjectShot.jsx                프로젝트 화면 캡처 (비율·lazy·플레이스홀더 공통 규칙)
│  ├─ CaseStudyCard.jsx              Selected Case Studies 의 큰 카드
│  ├─ ArchiveItem.jsx                Archive 의 작은 인덱스 카드 (캡처 + 제목 + 연도·유형)
│  ├─ TypeFilter.jsx                 유형 필터 탭 (WAI-ARIA tablist)
│  └─ Nav.jsx, Footer.jsx
├─ pages/                            Home, Projects, ProjectDetail, NotFound
└─ data/projects.js                  프로젝트 데이터 (여기만 고치면 전체 반영)
```

### Home 페이지 구조

한 페이지가 처음부터 끝까지 이어지는 구성입니다. About 은 페이지를 따로 두지 않고 여기 안에 들어가 있습니다.

```
Home
├─ Hero       Frontend / Developer + 경력 두 문장 + Projects 버튼
├─ About      소개 문단 + Experience + Toolbox
└─ Expertise  다뤄온 영역 4개. 화면을 꽉 채우고 pin 으로 고정된 채 한 칸씩 넘어갑니다
```

- **Expertise 패널에는 사진이 없습니다.** 예전에는 오른쪽 칸을 Unsplash 사진이 채웠는데,
  네 장이 서로 다른 소재를 흑백 + 유형 색으로 겨우 묶고 있을 뿐 내용과 이어지지 않아 걷어냈습니다.
  그 자리는 스펙 시트(`.service__spec`)가 대신하고, 패널을 구분하던 시각적 무게는
  큰 번호(`.service__no`)와 두 칸을 가로지르는 머리 실선(`.service__head`)이 넘겨받았습니다.
- **하단 스텝 표시기**(`.pin__steps`)는 진행 막대 대신 네 칸의 이름을 다 보여줍니다. 상태는
  스냅 컨트롤러가 확정한 뒤 클래스로만 내려오므로(`Home.jsx` 의 `showPanel`) 리렌더가 없습니다.
- **`.pin` 은 `height: 100vh` 안에 전부 들어가야 합니다.** `.nav` 가 `position: fixed` 라
  `padding-block` 위쪽에 `var(--nav-h)` 를 비워야 첫 줄이 헤더 뒤로 들어가지 않습니다.
  화면이 낮아 내용이 넘칠 때 잘리는 쪽은 **패널 안쪽**이어야 합니다 — `.pin__track` 에
  `min-height: 0` + `overflow: hidden` 을 줘서 트랙이 먼저 줄어들고, `.service` 의
  `align-content: safe center` 가 번호와 제목을 위쪽에 붙잡습니다. 트랙이 버티면 넘친 만큼이
  섹션 바닥에서 잘려 나가 하단 스텝 표시기부터 사라집니다. 패널 안쪽의 세로 여백을
  `vw` 가 아니라 `vh` 기준으로 잡는 것도 같은 이유입니다.
- **About 블록**(`.about`)은 `nth-of-type` 으로 heading 색을 돌리기 때문에 반드시 자기 래퍼
  안에 있어야 합니다. Home 의 다른 `<section>` 이 순번에 끼어들면 색이 밀립니다.
- **About 은 Expertise(`.pin`) 보다 위에 둡니다.** 소개 문단(`.about__intro`)은 스크롤에 맞춰
  어절이 하나씩 밝아지는데, 이 트리거는 만들어진 순서대로 위치를 잽니다. pin 아래에 두면
  pin 이 만드는 스크롤 거리(트랙 폭만큼)가 나중에 더해지면서 `start`/`end` 가 그만큼 어긋나고,
  문단이 화면에 닿기도 전에 진행이 끝나 연출이 통째로 사라집니다.

### Projects 페이지 구조

이력서와 역할을 나누기 위해 두 계층으로 되어 있다.

```
Projects
├─ 페이지 메타            "2015 — 2026 · 31 projects"  ← archiveMeta 에서 자동 생성
├─ Selected Case Studies  featured: true 인 프로젝트. 큰 캡처 + 한 문장 + 상세 페이지  → depth
└─ Archive                전체 프로젝트. 연도 역순 그룹 + 유형 필터 + 작은 캡처 그리드  → breadth
```

두 섹션은 같은 프로젝트를 확대 수준만 달리해 보여주는 관계다. Archive 는 index,
Case Study 는 expanded view. 그래서 캡처 규칙(`.shot`)을 공유하고 크기·정보량만 다르다.

- **Case Study 승격**은 데이터의 `featured` 플래그 하나로 정해진다. `featured` 를 켜면
  Selected 섹션에 나타나고 상세 페이지가 생기며,
  Archive 카드에는 "Case Study" 배지가 붙는다.
- **필터 상태는 URL 에 실린다** (`/projects?type=public`). 그대로 동작하고
  새로고침·공유·뒤로가기에서 유지된다. `replace` 로 넣어 히스토리는 쌓지 않는다.
- **Archive 의 정보량**은 캡처 · 제목 · 연도 · 유형까지다. 역할 · 스택 · 성과는 이력서와
  Case Study 상세가 맡는다. 호버도 정보를 펼치지 않고 클릭 가능 여부(→ / ↗)만 알린다.
- **색**: 이 페이지에서 색은 곧 유형이다. `data-type` 이 `--sc`(면·테두리)와
  `--sc-ink`(글자, 전부 4.5:1 이상)를 카드 하위 트리로 내려주고, 필터 탭의 색 점이 그대로
  범례가 된다. 다만 색은 **캡처를 덮지 않는 자리에만** 둔다 — 유형 이름, 필터 점,
  캡처 아래 띠, 호버 반응, 그리고 페이지 상단의 유형 비중 막대까지다.
  캡처가 없는 자리(`.shot[data-empty]`)만 예외적으로 넓게 물들이는데, 실제 화면이 들어오면
  `[data-empty]` 가 떨어지면서 그 색도 함께 사라지므로 사진과 부딪히지 않는다.
- **캡처가 없는 프로젝트**는 `.shot[data-empty]` 가 붙어 연도만 남은 중립 톤 자리로 렌더된다.
  데이터의 `thumb` / `cover` 에 경로를 넣으면 그 즉시 스크린샷으로 바뀐다.
  캡처는 16 : 10 비율로 맞추고 `public/images/projects/` 에 둔다.
- **성능**: Archive 썸네일은 전부 `loading="lazy"`, Case Study 앞 두 장과 상세 상단만 즉시
  받는다. 비율(`aspect-ratio: 16 / 10`)을 CSS 로 미리 확보해 늦게 도착해도 레이아웃이 밀리지 않는다.

### Lenis ↔ ScrollTrigger 동기화

`SmoothScrollProvider` 에서 한 번만 생성합니다.

- `autoRaf: false` — Lenis 자체 rAF 루프를 끄고 `gsap.ticker` 하나로 합칩니다. 루프가 둘이면 Lenis 가 스크롤을 옮긴 프레임과 ScrollTrigger 가 읽는 프레임이 어긋나 애니메이션이 한 프레임씩 밀립니다.
- `lenis.on('scroll', ScrollTrigger.update)` — 스크롤이 움직일 때마다 ScrollTrigger 를 갱신합니다.
- `gsap.ticker.lagSmoothing(0)` — GSAP 의 랙 보정을 끕니다. 스무스 스크롤에서는 이 보정이 오히려 튀는 원인입니다.

### 페이지 전환

모든 라우트가 아래에서 덮으며 올라오는 커버 전환을 씁니다. `AnimatePresence` 의 `mode` 는 **기본값(sync)** 입니다. `mode="wait"` 을 쓰면 이전 페이지가 완전히 언마운트된 뒤에야 새 페이지가 마운트돼서 '덮으며 올라오는' 그림이 나오지 않습니다.

sync 라서 두 페이지가 잠깐 함께 존재하는데, `.page-stack` 이 CSS 그리드로 둘을 같은 칸(`grid-area: 1 / 1`)에 겹쳐 쌓아 세로로 이어붙지 않게 합니다.

## GitHub Pages 배포

### 1. 저장소에 올리기

```bash
git init
git add -A
git commit -m "init portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### 2. Pages 소스를 Actions 로 바꾸기

저장소 **Settings → Pages → Build and deployment → Source** 를 `GitHub Actions` 로 설정합니다. (기본값인 `Deploy from a branch` 로 두면 워크플로우가 배포 단계에서 실패합니다.)

이후 `main` 에 푸시할 때마다 `.github/workflows/deploy.yml` 이 빌드 후 배포합니다.

### base 경로

`vite.config.js` 의 `base` 는 빌드할 때만 적용되고, 값은 `BASE_PATH` 환경변수에서 옵니다.

- **CI**: 워크플로우가 `BASE_PATH=/${{ github.event.repository.name }}/` 를 넣어줍니다. 저장소 이름을 바꿔도 그대로 동작합니다.
- **로컬 빌드**: `vite.config.js` 의 `FALLBACK_BASE` (`/portfolio-zoo/`) 를 씁니다.
- **dev 서버**: 항상 `/`.

`<user>.github.io` 저장소(user/organization 페이지)라면 사이트가 루트로 서빙되므로 워크플로우의 `BASE_PATH` 를 `/` 로 바꾸세요.

### 주소에 `#` 없이 라우팅하기

GitHub Pages 는 정적 파일만 서빙하고 SPA 폴백이 없습니다. `/projects` 를 새로고침하면 그 이름의 파일을 찾다가 없으니 `404.html` 을 돌려줍니다. 그래서 빌드에서 **`404.html` 을 `index.html` 사본으로 만들어 둡니다** (`vite.config.js` 의 `spaFallback` 플러그인). 어떤 경로로 들어와도 같은 앱이 뜨고, 그다음은 라우터가 주소를 보고 화면을 고릅니다.

`BrowserRouter` 의 `basename` 은 `import.meta.env.BASE_URL` 에서 옵니다. 프로젝트 페이지는 `/<repo>/` 아래로 서빙되므로 라우터가 그 접두어를 경로에서 떼어내야 합니다. dev 서버에서는 `/` 라 아무것도 떼지 않습니다.

주의할 점 두 가지:

- **응답 상태 코드는 404 로 남습니다.** 사용자에게는 정상 화면이지만 크롤러에는 404 입니다. 이게 곤란하면 SPA 폴백을 제대로 지원하는 호스팅(Netlify · Cloudflare Pages 등)으로 옮기거나 `HashRouter` 로 되돌려야 합니다.
- **`index.html` 안의 경로는 상대 경로로 쓰면 안 됩니다.** `./favicon.svg` 로 두면 `/projects/task-manager` 로 직접 들어왔을 때 `/projects/favicon.svg` 를 찾아 404 가 납니다. `%BASE_URL%favicon.svg` 처럼 Vite 가 base 를 채워 넣게 합니다.

## 내용 바꾸기

- 프로젝트: `src/data/projects.js` — 이 파일 하나가 Projects · Home · 상세를 전부 결정합니다.
  - `year` 는 숫자입니다. Archive 의 연도 그룹 키이자 정렬 기준입니다.
  - `type` 은 `PROJECT_TYPES` 의 key 5종(`public` / `university` / `education` / `company` / `personal`) 중 하나.
    필터 탭과 카드 색이 이 값에서 나옵니다.
  - `featured: true` 를 켜면 Case Study 로 승격됩니다. `tagline` 과 `study` 가 함께 필요합니다.
  - `study` 는 `context` / `problem` / `approach` / `implementation` / `beforeAfter` / `result` 를
    가질 수 있고, **없는 섹션은 상세 페이지에서 통째로 빠집니다.** 자료가 준비된 것부터 채우면 됩니다.
- 커버 이미지: `cover` 필드에 경로를 넣습니다(`public/` 에 두고 `/shots/xxx.png`).
  비워 두면 유형 색 플레이스홀더가 자동으로 들어갑니다.
- 유형을 추가하려면: `PROJECT_TYPES` 에 항목을 넣고 `src/index.css` 의 `[data-type='...']` 에 색을 한 줄 추가합니다.
- 색상·간격: `src/index.css` 상단의 CSS 변수.
