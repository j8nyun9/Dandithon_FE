# Dandithon_FE — 단디보상운동

국채보상운동의 연대 정신을 대학생의 사회공헌 활동으로 잇는 웹 서비스입니다.
React 19 · TypeScript · Vite · Tailwind CSS · React Router를 사용합니다.

## 실행

Node.js 22.19 이상에서 `npm.cmd ci` 후 `npm.cmd run dev`를 실행합니다.
기본 접속 주소는 http://127.0.0.1:5173 입니다.
백엔드는 별도로 실행하며, 두 프로젝트가 같은 상위 폴더에 있으면 `npm.cmd run dev:all`로 함께 실행할 수 있습니다.
원격 백엔드 사용 시 `.env.local`에 `DANDI_API_TARGET=https://dandi-backend.onrender.com`을 설정하고 개발 서버를 재시작합니다.
`DANDI_API_TARGET`은 개발용 프록시 설정입니다. 운영 배포에서는 `/api/*`를 백엔드로 전달하고, 나머지 경로는 `index.html`로 연결해야 합니다.
비밀 키는 프론트엔드에 저장하지 않습니다.

## 주요 화면과 서버 연동

- 홈: `/league`, `/community-progress`, `/ledger`, `/missions` 기반 현황. 비로그인도 순위 조회 가능.
- 활동하기: 공개 활동 조회, 로그인 학생의 관심 분야 선택·추천·신청 표시·참여 인증.
- 대학 리그: 학교별 승인 실적과 재학생 1,000명당 분야별 지표. 그래프 눈금 전환 지원.
- 의연록: 로그인 후 해당 시즌 승인 참여자의 이름과 학교 조회. 검색·학교 필터·40명 단위 표시.
- 마이페이지: 로그인한 사용자의 프로필과 참여·승인 이력.
- 소개: 서비스 목적과 산정 방식 설명.
- 운영자: 관리자 권한으로 활동 관리와 참여 확인 처리.

## AI 추천

`POST /api/ai/recommend`에 선택한 관심 분야를 전달합니다. 백엔드가 로그인한 학생의 승인된 분야별 참여 횟수를 DB에서 조회하여 모델 입력에 함께 사용합니다.
응답의 `recommendations`에 있는 활동 ID와 `reason`을 카드에 연결합니다.
`mode: live`는 실제 모델 응답이며, `mode: mock`은 호출 실패 또는 미설정에 따른 기본 추천입니다. 화면에서 두 경우를 구분합니다.
시간·거리·일정 최적화나 공식 참여 자격 판단은 현재 제공하지 않습니다.

## 구조

- `src/pages`: 페이지와 페이지별 스타일
- `src/components`: 공통 UI, 레이아웃, 인증 경로
- `src/services/api.ts`: 공통 API 호출, 세션, 응답 타입, 연결 오류·시간 초과 처리
- `src/hooks`: 데이터 로딩과 재시도
- `src/utils`, `src/types`: 공통 정의
- `src/assets`, `src/styles`: 이미지와 전역 스타일

## 검사와 시연

`npm.cmd run check`와 `npm.cmd run build`를 실행합니다.
배포: https://dandi-frontend.onrender.com/
전체 흐름과 AI 확인은 [시연 점검표](docs/demo-checklist.md)를 따릅니다.
배포 환경의 계정은 운영 담당자가 제공하며, 로컬 시드 계정과 다를 수 있습니다.
