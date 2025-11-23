# RE:BUY Frontend 🌿

> 친환경 제품 구매와 환경 활동 참여를 연결하는 **선순환 녹색 소비 플랫폼**
> 

[![React](https://img.shields.io/badge/React-blue?&style=for-the-badge&logo=React&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?&style=for-the-badge&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?&style=for-the-badge&logo=TailwindCSS&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?&style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?&style=for-the-badge&logo=Axios&logoColor=white)](https://axios-http.com/)

---

## 📋 목차

- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [API 연동](#-API-연동)
- [테스트](#-테스트)
- [팀원](#-팀원)

---

## 🛠 기술 스택

- **Framework :** React + TypeScript
- **CSS :** Tailwind CSS
- **Routing :** React Router 6
- **HTTP Client :** Axios
- **Build Tool :** Vite 4.x

---

## ✨ 주요 기능

### 1. 사용자 인증 및 관리
- ✅ 회원가입 및 로그인/로그아웃 UI 구현
- ✅ JWT 토큰 기반 인증 처
- ✅ 사용자 프로필 페이지

### 2. 상품 페이지 및 관리
- ✅ 상품 목록 페이지 (카드형 UI)
- ✅ 상품 상세 페이지 (환경 점수, 절약량 등 시각화)
- ✅ 카테고리별 필터링 및 상세 내용
- ✅ 친환경 정보 표시: 물, 나무 절감량

### 3. 장바구니 및 결제 UI
- ✅ 장바구니 담기, 수량 변경, 삭제 기능
- ✅ 결제 페이지: 총 금액, 배송비, 크레딧 적용
- ✅ 구매 완료 후 장바구니 초기화 및 주문 내역 페이지 이동

### 4. 포인트 표시
- ✅ 총 포인트, 물/나무 절약량 계산 및 표시
- ✅ 개별 상품별 포인트 내역 UI'
- ✅ 마이페이지에서 크레딧 조회

### 5. 환경 활동 관리
- ✅ 환경 활동(플로깅) 신청 페이지
- ✅ 인증샷 업로드 UI
- ✅ 참여 내역 확인 페이지

### 6. AI 추천 시스템 UI
- ✅ 맞춤형 상품 추천 UI
- ✅ 월별 녹색 소비 리포트 시각화
- ✅ 환경 기여도 차트 및 사용자 순위 표시

### 7. 대시보드 및 통계
- ✅ 마이페이지 : 구매 내역, 포인트, 환경 점수

### 8. 공통
- ✅ 반응형 레이아웃 (모바일/웹)
- ✅ Tailwind 기반 디자인 시스템
- ✅ React Icons 사용한 직관적 UI
- ✅ TopNav / BottomNav / Layout 컴포넌트 공통 적용

---

## 📁 프로젝트 구조


---

## 🚀 시작하기

## 사전 요구사항
- **Node.js 20.x** 이상
- **Yarn 또는 npm**
- **백엔드 서버 실행** (API 연동 필요)

### 1.프로젝트 클론

```bash
git clone https://github.com/RE-BUY/RE-BUY-FE.git
cd RE-BUY-FE
```

### 2.의존성 설치

```bash
yarn install
 또는
npm install
```

### 3.환경 변수 설정

```bash
cp .env.example .env
```

### 4.개발 서버 실행

```bash
yarn dev
 또는
npm run dev
```

### 5.빌드

```bash
yarn build
 또는
npm run build
```

---





##  📚 API 연동


- **Base URL** : .env에서 설정
- Axios로 REST API 호출 (로그인, 상품, 주문, 장바구니 등)
- JWT 토큰은 AuthContext에서 관리

---

## 🧪 테스트

```bash
# 전체 테스트 실행
yarn test
 또는
npm run test
```

---

## 👥 팀원

| 이름  | 역할 | 담당 기능                                 |
|------|-------|---------------------------------------|
| 최예윤   | Frontend Developer | 카테고리 및 상품 상세 페이지, 환경 활동 참여 / 인증, 장바구니 페이지, API 연동 |
| 우윤수   | Frontend Developer | 홈 화면, 회원가입 및 로그인, 마이페이지, 구매내역, 포인트 조회 |

---

