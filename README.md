![header](https://capsule-render.vercel.app/api?type=wave&color=1d254f&height=300&section=header&text=STAR%LIGHT&desc=나만%20아는%20띵곡을%20공유해보세요%21&fontSize=90)

# Star Light
## Tech Stack
<img src="https://img.shields.io/badge/React%20v17.0.1-61DAFB?style=flat-square&logo=React&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/StyledComponent%20v5.1.1-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/MobX%20v6.2.0-FF9955?style=flat-square&logo=MobX&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/AntDesign%20v4.15.6-0170FE?style=plastic&logo=Ant%20Design&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/MaterialUI%20v4.11.4-0081CB?style=plastic&logo=Material-UI&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/Storybook%20v5.3.19-FF4785?style=plastic&logo=Storybook&logoColor=white"/>

## 프로젝트 소개
- [Star Light 웹 서비스 URL](http://star-light-web.ap-northeast-2.elasticbeanstalk.com)

<h3>"나만 듣는 이 노래, 다른 사람들에게도 알려주고 싶다!" 라는 생각에서 시작된 프로젝트입니다.</h3>
사람들은 저마다 다른 음악 취향을 가지고 자신만의 특색이 담긴 플레이리스트를 만듭니다. 
그 안에는 어딜가나 자주 들을 수 있는 곡이 있을 수도 있고, 아주 소수의 사람들만 듣는 곡이 있을 수도 있습니다.
매일 내 이어폰으로 흘러나오는 그 노래들을 다른 사람과 공유해보는 것은 어떨까요? 
내가 좋아하는 이 노래를 다른 사람의 플레이리스트에 넣게될 수도 있고 아니면 내 플레이리스트를 채울 다른 음악을 찾을 수도 있을 겁니다!

## 기능 소개

### 나만 아는 갓띵곡
- 다른 사용자들이 등록한 숨겨진 **띵곡**들을 볼 수 있습니다.
- **태그**를 사용하여 원하는 장르, 가수, 분위기 등 다양한 토픽으로 음악을 검색할 수 있습니다.
- 목록 아이템을 클릭하면 상세화면에서 추천자가 작성한 이 노래가 좋은 이유와 음악을 들을 수 있는 유튜브 플레이어가 표시됩니다.
- 내가 추천하고 싶은 노래가 있다면 새 아이템을 추가할 수 있습니다. 단, 로그인된 사용자만 이용할 수 있는 기능입니다.

### 이달의 명곡
- 기능 오픈 예정

### 명예의 전당
- 기능 오픈 예정

## 개발 환경 설정 및 기타 툴 사용방법

### Clone repository

- repository url: `https://github.com/BnB-Flosvia/star-light-react`
- `git clone https://github.com/BnB-Flosvia/star-light-react.git`

### Install dependencies

- `npm install`

### Run Storybook (UI Component view)

- `npm run storybook`
- access `http://localhost:6006/`

### Run development (Hot Reload)

- `npm run start`
- `npx cross-env REACT_APP_ENVIRONMENT=development react-app-rewired start`
  - You can change the environment. Servers connected to each environment are different.
  - REACT_APP_ENVIRONMENT = production, development

### Run code lint check

- check code style (no fix, only check)
- `npm run lint`

### Run code lint auto fix

- fix code style (code formatting)
- not all problems are fixed.
- `npm start lint:fix && npm start format`

### Run development build

- `npm run build:dev`
- `npm i -g serve`
  - if you already install `serve` module, pass this step
- `npm run deploy`
- access `http://localhost:5000`

### Run production build

- `npm run build`

## TODO

- 네비게이션 바 디자인 수정 (반응형을 위해 모바일 뷰에서는 아이콘으로 열었다 닫았다 할 수 있도록 수정)
- 테스트 환경 구축 (react-testing-library, Jest, Cypress)
- storyboard에 추가할만한 addon이 더 있을지 알아보기 
- 초기 렌더링 속도 향상 + SEO를 위해 SSR 도입 생각중 (Next.js)
- light house 성능 측정

## Reference

- [Star Light Design in Figma](https://www.figma.com/file/NyRHXYp1ydVb9l4yoHmDtH/Star-Light-Web?node-id=0%3A1)
- [Star Light Storyboard v1.0](https://docs.google.com/presentation/d/1Sp_AaRGX0Djxg1bEWvEA5sCDMwHlt4ju8T6O6NrWqA0/edit?usp=sharing)
- [Star Light Requirements Specification](https://hackmd.io/@starmango/service-specification)
- [Star Light 웹 개발 로그](https://hackmd.io/@starmango/development-log)
