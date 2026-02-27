# PodRSS-FE

팟캐스트 채널 정보를 조회/변환하기 위한 프론트엔드 프로젝트입니다.  
엑셀 업로드 기반 조회와 수동 입력 기반 조회를 모두 지원하며, 결과를 테이블로 확인하고 엑셀 파일로 다운로드할 수 있습니다.

## 주요 기능

- 엑셀 업로드 기반 채널 조회
  - 채널명으로 Apple ID + RSS 조회
  - Apple ID로 RSS 조회
- 수동 입력 기반 조회
  - 채널명으로 RSS 조회
  - Apple ID로 채널명 조회
  - 국가 코드 기준 Top Podcast 조회
- 결과 기능
  - 결과 테이블 렌더링
  - 셀 단위 복사
  - 엑셀 다운로드

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- react-hot-toast
- xlsx

## 시작하기

### 1) 요구 사항

- Node.js 18 이상 권장
- npm

### 2) 환경변수 설정 (서버 주소)

API 서버 주소를 .env 파일에서 설정합니다.

```
VITE_API_BASE_URL={백엔드 주소}
```

### 3) 설치

```bash
npm install
```

### 4) 개발 서버 실행

```bash
npm run dev
```

기본 실행 주소: `http://localhost:5173`

## 스크립트

- `npm run dev` : 개발 서버 실행
- `npm run build` : 타입 체크 + 프로덕션 빌드
- `npm run preview` : 빌드 결과 미리보기
- `npm run lint` : ESLint 실행

## 라우트

- `/excel-channel` : 엑셀 업로드로 Apple ID + RSS 조회
- `/excel-apple-id` : 엑셀 업로드로 RSS 조회
- `/manual-channel` : 수동 입력 채널명 조회
- `/manual-apple-id` : 수동 입력 Apple ID 조회
- `/top-podcast` : 국가 코드 기반 Top Podcast 조회

## 프로젝트 구조 (요약)

```text
src/
  app/            # 라우터, 레이아웃
  entities/       # 도메인 타입/설정
  features/       # 기능 단위 API, UI
  pages/          # 화면 컴포넌트
  shared/         # 공용 UI, 유틸, API 인스턴스
  widgets/        # Header, Sidebar 등 페이지 구성 요소
```

## 참고

- 일부 입력 폼은 마지막 입력값을 `localStorage`에 저장합니다.
- 조회 결과는 화면에서 확인 후 엑셀로 내보낼 수 있습니다.
