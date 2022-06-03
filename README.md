# Cheers

술에 대해 이야기 하고 다양한 모임을 만들거나 참여할 수 있는 커뮤니티 사이트

모바일, 태블릿, 데스크탑 3가지 뷰포트를 지원하는 반응형으로 제작

## 기술 스택

![react](https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=white&style=for-the-badge)
![react-router](https://img.shields.io/badge/-React%20Router-CA4245?logo=React%20Router&logoColor=white&style=for-the-badge)
![redux-toolkit](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=Redux&logoColor=white&style=for-the-badge)
![react-query](https://img.shields.io/badge/-React%20Query-FF4154?logo=React%20Query&logoColor=white&style=for-the-badge)
![styled-components](https://img.shields.io/badge/-Styled%20Components-DB7093?logo=Styled%20Components&logoColor=white&style=for-the-badge)
![netlify](https://img.shields.io/badge/-Netlify-00C7B7?logo=Netlify&logoColor=white&style=for-the-badge)

## 프로젝트 링크

배포 주소 : https://cheers-kr.com

노션 주소 : https://cheers-kr.notion.site/Cheers-8b8541e794c04119bcfb9470f20c8218

## 프로젝트 진행 기간

2022.03 ~ 2022.05

## 주요 기능

### 0. 공통 기능

- 로그인 기능
  - 일반 로그인
  - 소셜 로그인(카카오 로그인)
- 회원가입 기능
  - 일반 회원가입
  - 소셜 로그인의 경우 닉네임 추가 입력을 통해 서비스 가입
- 로그아웃 기능

💡 react-hook-form 라이브러리를 사용해 입력 폼 관리 및 유효성 검사

### 1. 메인 페이지

- 최신 등록된 모임을 캐러셀 형식으로 구현

💡 react-slick 라이브러리 사용하여 무한 루프 캐러셀로 구현

### 2. 게시판 페이지

- 게시물 리스트 필터링 기능
- 게시물 리스트 페이지네이션 기능

💡 쿼리스트링을 통해 게시물 리스트 필터링 및 페이지 관리 구현

### 3. 게시물 작성 페이지

- 게시물 작성 기능

💡 toast ui editor 라이브러리를 사용해 wysiwyg와 mardown 두가지 형태의 작성 기능 제공

### 4. 게시물 상세 페이지

- 게시물 상세 보기
- 게시물 수정 및 삭제 기능
- 좋아요 기능
- 댓글 작성, 수정, 삭제 기능

### 5. 모임 페이지

- 모임 필터링 기능
- 모임 리스트 무한 스크롤 기능
- 근처 모임 기능

💡 쿼리스트링을 통해 모임 리스트 필터링 구현 및 Intersection Observer API를 활용해 모임 리스트 Lazy Loading 구현

💡 geolocation API를 활용해 디바이스 근처의 모임 제공 기능 구현

### 6. 모임 작성 페이지

- 모임 날짜 선택 캘린더 기능
- 모임 장소 검색 기능

💡 캘린더 형태로 모임 날짜 선택 기능 구현, 카카오 지도를 활용해 모임 장소 검색 기능 구현

### 7. 모임 상세 페이지

- 모임 상세 보기
- 모임 수정 및 삭제 기능
- 모임 참여 기능
- 댓글 보기 및 작성, 수정, 삭제 기능

### 8. 마이 페이지

- 프로필 이미지 변경 및 삭제 기능
- 닉네임 수정 기능
- 사용자가 작성한 게시물 제공 기능
- 사용자가 작성하거나 참여한 모임 제공 기능

💡 게시물, 모임 리스트는 Intersection Observer API를 활용해 Lazy Loading 구현
