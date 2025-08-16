# Next.js 프로젝트 구조 가이드

## �� 프로젝트 폴더 구조 및 역할 설명

이 문서는 Next.js 프로젝트의 폴더 구조와 각 폴더의 역할을 설명합니다.

## 🏗️ 루트 레벨 폴더

### `.next/`
- **역할**: Next.js 빌드 결과물이 저장되는 폴더
- **내용**: 컴파일된 JavaScript, CSS, 이미지 등
- **주의**: `.gitignore`에 포함되어 있어 Git에 커밋되지 않음
- **생성**: `npm run build` 또는 `npm run dev` 실행 시 자동 생성

### `.vscode/`
- **역할**: VSCode 에디터의 프로젝트별 설정
- **내용**: 
  - `settings.json`: 포맷팅, 린팅 등 에디터 설정
  - `extensions.json`: 권장 확장 프로그램 목록
- **목적**: 팀원들이 동일한 개발 환경을 사용할 수 있도록 함

### `node_modules/`
- **역할**: npm 패키지들이 설치되는 폴더
- **내용**: 프로젝트에서 사용하는 모든 외부 라이브러리
- **주의**: `.gitignore`에 포함되어 있어 Git에 커밋되지 않음
- **재생성**: `npm install` 명령어로 언제든 재생성 가능

### `public/`
- **역할**: 정적 파일들을 저장하는 폴더
- **내용**: 이미지, 아이콘, 폰트 등 웹에서 직접 접근 가능한 파일들
- **접근**: `/파일명` 형태로 URL에서 직접 접근 가능
- **예시**: `public/logo.png` → `http://localhost:3000/logo.png`

## 📂 src 폴더 (소스 코드)

### `src/app/`
- **역할**: Next.js 13+ App Router의 핵심 폴더
- **내용**:
  - `layout.tsx`: 모든 페이지에 적용되는 공통 레이아웃
  - `page.tsx`: 홈페이지 (`/` 경로)
  - `globals.css`: 전역 CSS 스타일
- **특징**: 폴더 기반 라우팅 (폴더명 = URL 경로)

### `src/components/`
- **역할**: 재사용 가능한 UI 컴포넌트들
- **구조**:
  - `ui/`: 기본 UI 컴포넌트 (Button, Input, Card 등)
  - `features/`: 기능별 컴포넌트 (ProductCard, UserCard 등)
- **목적**: 코드 재사용성과 유지보수성 향상

### `src/constants/`
- **역할**: 프로젝트에서 사용하는 상수 값들
- **내용**:
  - `api.ts`: API 엔드포인트 URL
  - `routes.ts`: 라우팅 경로 상수
  - `ui.ts`: UI 관련 상수 (색상, 크기 등)
- **장점**: 하드코딩 방지, 중앙 관리

### `src/hooks/`
- **역할**: 커스텀 React Hooks
- **내용**:
  - `useDebounce.ts`: 디바운스 기능
  - `useLocalStorage.ts`: 로컬 스토리지 관리
  - `useProducts.ts`: 상품 데이터 관리
- **목적**: 로직 재사용 및 컴포넌트 간 상태 공유

### `src/repositories/`
- **역할**: 데이터 접근 계층 (Repository Pattern)
- **내용**:
  - `base.repository.ts`: 기본 CRUD 작업
  - `product.repository.ts`: 상품 관련 데이터 접근
  - `user.repository.ts`: 사용자 관련 데이터 접근
- **장점**: 데이터 소스 변경 시 한 곳만 수정하면 됨

### `src/services/`
- **역할**: 비즈니스 로직 처리
- **내용**:
  - `product.service.ts`: 상품 관련 비즈니스 로직
  - `user.service.ts`: 사용자 관련 비즈니스 로직
- **목적**: 컴포넌트에서 비즈니스 로직 분리

### `src/types/`
- **역할**: TypeScript 타입 정의
- **내용**:
  - `api.ts`: API 응답/요청 타입
  - `index.ts`: 공통 타입들
- **장점**: 타입 안정성과 개발자 경험 향상

### `src/utils/`
- **역할**: 유틸리티 함수들
- **내용**:
  - `formatters.ts`: 데이터 포맷팅 함수
  - `helpers.ts`: 헬퍼 함수들
  - `validators.ts`: 데이터 검증 함수
- **목적**: 공통 기능을 함수로 분리하여 재사용

## �� 개발 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 린팅
```bash
npm run lint
```

## �� 폴더 구조의 장점

1. **명확한 책임 분리**: 각 폴더가 명확한 역할을 가짐
2. **확장성**: 새로운 기능 추가 시 적절한 위치에 배치 가능
3. **유지보수성**: 관련 코드들이 한 곳에 모여있어 수정이 쉬움
4. **팀 협업**: 팀원들이 코드 구조를 쉽게 이해하고 작업 가능

## 🔍 추가 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [App Router 가이드](https://nextjs.org/docs/app)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)