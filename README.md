# Dandithon_FE

단디보상운동 모바일 웹 · React + TypeScript + Vite.

## 실행

Node.js 22 이상. 이 폴더에서 `npm.cmd install` 후 `npm.cmd run dev`.
접속: http://localhost:5173

BE를 별도 터미널에서 실행해야 예시 활동 목록이 표시됩니다. 개발 중 `/api` 요청은 `vite.config.js`에서 BE 3001 포트로 전달합니다.

## 구조

- `src/pages`: 홈, 추천, 활동, 인증, 대학 리그, 마이페이지 화면
- `src/components/common`: 공통 버튼·카드·입력 UI
- `src/components/layout`: 상단 영역·하단 탭
- `src/features`: auth, recommendations, activities, verification, league, records 기능
- `src/services/api.ts`: 서버 통신과 예시 활동 타입
- `src/hooks`, `src/types`, `src/utils`: 공통 훅·타입·도구
- `src/assets`, `src/styles`: 이미지·스타일
- `docs/api.md`: 백엔드와 합의한 요청·응답

빈 폴더는 `.gitkeep`으로 보존합니다. 실제 화면 연결과 라우팅은 후속 구현 대상입니다. 현재 `App.tsx`는 연결 확인 화면입니다.

검사: `npm.cmd run check`. 배포 빌드: `npm.cmd run build`.
API 비밀 키를 FE에 넣지 마세요. 배포 환경에서는 `/api` 전달 설정을 별도로 구성해야 합니다.
