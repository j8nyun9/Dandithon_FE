# Dandithon_FE

단디보상운동 웹사이트 · React + TypeScript + Vite + Tailwind CSS v4.

기획 내용은 [docs/기획.md](docs/기획.md), 백엔드 API 약속은 [docs/api.md](docs/api.md)를 봅니다.

## 실행

Node.js 22 이상. 이 폴더에서 `npm.cmd install` 후 `npm.cmd run dev`.
접속: http://localhost:5173

현재 화면은 `src/mocks`의 목업 데이터로 동작하며 BE 없이 실행됩니다. 개발 중 `/api` 요청은 `vite.config.js`에서 BE 3001 포트로 전달합니다.

## 구조

- `src/App.tsx`: 라우팅 (react-router-dom)
- `src/pages`: 화면
  - `Home` 홈 · `Activities` 활동하기 탭 · `Recommendations` AI 활동 추천 · `Verification` 참여 인증
  - `League` 대학 리그 · `Awards` 시상 · `Records` 의연록 · `About` 소개 · `Partners` 파트너 · `Admin` 운영자
- `src/components/layout`: 상단 메뉴(Header), 푸터, 공통 페이지 틀(SiteShell)
- `src/components/common`: 배지, 페이지 헤더, 육각형 차트(RadarHex), 학기 타임라인, 호외 카드, 건물 일러스트
- `src/mocks`: 목업 데이터 (리그, 활동, 참여 기록, 의연록, 파트너 지표)
- `src/types`: 공통 타입 · `src/utils`: 사회공헌 유형 정의, 포맷 함수
- `src/styles/global.css`: Tailwind 테마 토큰 (`primary`, `accent`, `paper` 등). 색은 토큰으로만 씁니다.
- `src/services/api.ts`: 서버 통신 (현재 화면에서는 미사용)
- `src/features`, `src/hooks`, `src/assets`: 비어 있음 (`.gitkeep`)

검사: `npm.cmd run check`. 배포 빌드: `npm.cmd run build`.
API 비밀 키를 FE에 넣지 마세요. 배포 환경에서는 `/api` 전달 설정을 별도로 구성해야 합니다.
