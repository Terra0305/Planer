# Planer - 마감 관리 및 일정 추적 MVP

대학생 및 취업 준비생을 위한 마감 관리, 서류 제출, 일정 추적 올인원 서비스의 MVP 버전입니다.

## 주요 기능
1. **대시보드**: 전체 등록된 활동, 마감 임박 활동, 오늘 기준 다가오는 마감일 등을 한눈에 확인합니다.
2. **활동 관리**: 공모전, 대외활동, 인턴, 자격증 등 다양한 카테고리의 일정을 등록하고 상태를 변경합니다.
3. **서류 및 자소서 관리**: 각 활동별 제출 서류 체크리스트를 관리하고, 자소서 및 지원 문항을 작성할 수 있습니다.
4. **마감 캘린더**: 이번 주, 이번 달 등 기한별로 활동들을 묶어서 확인할 수 있습니다.

## 기술 스택
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, `lucide-react` (Icons)
- **State/Storage**: React Hooks, LocalStorage 기반 임시 데이터 저장
- **Routing**: React Router v6

## 실행 방법

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 브라우저 접속
- 터미널에 표시된 로컬 주소 (일반적으로 `http://localhost:5173`) 로 접속합니다.
- 초기 로드 시 `src/data/sampleActivities.ts` 에 정의된 4개의 샘플 데이터가 로컬 스토리지에 자동 저장됩니다.

## 주요 폴더 구조
```text
src/
├── components/        # 재사용 가능한 UI 컴포넌트 (Layout, Card, Form 등)
├── data/              # 샘플 초기 데이터
├── pages/             # 라우팅되는 각 페이지 단위 컴포넌트
├── types/             # TypeScript 타입 정의 (Activity 모델 등)
├── utils/             # 날짜 포맷, 로컬스토리지 관리 등의 유틸리티 함수
├── App.tsx            # 메인 라우터 설정
├── index.css          # Tailwind CSS 글로벌 설정
└── main.tsx           # React 엔트리 포인트
```

## 향후 백엔드 연동 확장 방향
현재는 `localStorage`를 활용한 클라이언트 전용 MVP이지만, 백엔드 연동을 위한 아래와 같은 확장 계획을 고려하여 코드를 구성했습니다.
1. `src/utils/storage.ts`의 로직들을 API 호출(fetch/axios)로 쉽게 대체할 수 있도록 함수화되어 있습니다. 추후 `api.ts` 또는 React Query 기반의 훅으로 전환하면 매끄러운 백엔드 연동이 가능합니다.
2. 인증(Authentication) 도입 시, `App.tsx`의 `<Routes>` 를 보호된 라우트(Protected Route)로 감싸고 사용자 토큰을 통해 본인의 데이터를 가져오도록 구조 확장이 가능합니다.
3. 데이터 모델(`Activity`)의 구조는 RDBMS(예: PostgreSQL)나 NoSQL(예: MongoDB)에서도 유효한 형태이므로, 백엔드 스키마 설계에 그대로 활용할 수 있습니다.
