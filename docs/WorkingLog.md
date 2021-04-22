# 개발 로그
###### tags: `Side-Project`
[TOC]

## 2021.04.22 (목)
### [Done]
- Star light project 설계서 업데이트
  - 설계서 Hackmd <-> Star Light 프로젝트 깃헙 연결
  - 1차 개발 스코프 변경
    - 1차 개발 스코프를 로그인, 회원가입 이벤트 캘린더만 포함하기로 함
  - 사용자 요구사항 업데이트
    - 비밀번호 재설정
  - Project structure 수정
    - stores/ 추가
      - MobX store들을 관리하는 폴더
    - RouteContainer.js 컴포넌트 용도 정의
    - RoutePages.js 설명 추가

- Star Light 프로젝트 Mobx 기본 세팅
  - [Decorator 설정: customize-cra, react-rewired 사용](https://velog.io/@hadmarine/MobX-with-React-Applying#4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%EB%A3%A8%ED%8A%B8-%ED%8F%B4%EB%8D%94%EC%97%90-config-overridesjs%EB%A5%BC-%EC%B6%94%EA%B0%80%ED%95%B4%EC%9A%94)
    - config-overrides.js에 override 코드 추가
      - addDecoratorsLegacy,
      - disableEsLint,
    - "@babel/plugin-proposal-decorators", "@babel/plugin-proposal-class-properties" 패키지 설치
    - package.json에 babel 설정 추가
      - "@babel/plugin-proposal-decorators", "@babel/plugin-proposal-class-properties" 설정
    - jsconfig.json에 decorator 적용을 위한 complieOption 추가
      - lint 에러 방지
      - "experimentalDecorators": true
  - src/stores/ 추가
    - counter.js
      - Mobx decorator를 사용하여 샘플 counter 스토어 구현
    - index.js
      - counter.js를 불러와서 객체 리턴
  - pages/CounterPage.js 추가
    - store 동작 확인을 위한 임시 페이지
    - counter 스토어를 inject로 받아서 number, increase, decrease 값을 컴포넌트 props로 넘겨줌
  - src/index.js에서 Provider에 store props 넘겨주고 <App /> 컴포넌트를 감싸도록함

### [ISSUE]
- increase, decrease 함수는 호출이 되는데, @observable number 값이 바뀌어도 re-rendering이 안되는 이슈가 있었음 (resolved)
  - MobX version 6 이상은 constructor에서 makeObservable(this) 호출이 필요
    - [참고 자료](https://mobx.js.org/enabling-decorators.html)
- mobx-react-devtools 패키지 deprecated 이슈 (todo)
  - [공식 github](https://github.com/mobxjs/mobx-react-devtools)
  - 대체 방안 : 브라우저 확장 프로그램

### [TODO]
- 이벤트 캘린더 사용자 요구사항 작성
- Mobx devtool 브라우저 확장 프로그램 적용
- RouterContainer.js 추가
- 1차 개발 스코프 디자인 구상
  - ant design 사용할 예정
  - 일단 레이아웃만 구상
- docs 폴더 만들어서 설계서랑 개발로그 해당 폴더로 옮기기
- 1차 개발 스케줄 정의
  - Front-end 개발
  - Back-end 개발

## 2021.04.23 (금)