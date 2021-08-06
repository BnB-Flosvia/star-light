# Star Light
띵곡 공유를 위한 웹 서비스 / [Star Light 웹 사이트](http://star-light-web.ap-northeast-2.elasticbeanstalk.com)

- [Star Light](#star-light)
  * [서비스 기능 소개](#service-features)
    + [나만 아는 갓띵곡](#track-of-best)
    + [이달의 명곡](#music-of-month)
    + [명예의 전당](#hall-of-frame)
  * [Tech Stack](#tech-stack)
  * [Usage](#usage)
    + [Clone repository](#clone-repository)
    + [Install dependencies](#install-dependencies)
    + [Run Storybook (UI Component view)](#run-storybook--ui-component-view-)
    + [Run development (Hot Reload)](#run-development--hot-reload-)
    + [Run code lint check](#run-code-lint-check)
    + [Run code lint auto fix](#run-code-lint-auto-fix)
    + [Run development build](#run-development-build)
    + [Run production build](#run-production-build)
  * [Todo](#todo)
  * [Reference](#reference)

## Service Features
> 서비스 기능 소개
### Track of best
> 나만 아는 갓띵곡
- 다른 사용자들이 등록한 숨겨진 **띵곡**들을 찾아볼 수 있습니다!
- 태그를 사용하여 원하는 장르, 가수, 분위기 등 다양한 토픽으로 음악을 검색할 수 있습니다.
- 나만 알고 있는 띵곡이 있다면! 내가 직접 음악 정보를 등록해서 다른 사용자와 공유할 수도 있습니다!
### Music of month
> 이달의 명곡
- 기능 오픈 예정
### Hall of frame
> 명예의 전당
- 기능 오픈 예정

## Tech Stack

- React + MobX + Styled-component + Axios
- Using Storybook for testing

## Usage

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

## Todo

- react-testing-library, Jest testing
- swr || react-query
- mobx devtools
- storyboard addon

## Reference

- [Star Light Design in Figma](https://www.figma.com/file/NyRHXYp1ydVb9l4yoHmDtH/Star-Light-Web?node-id=0%3A1)
  - If you need authorization for figma design, notify this email => "dkdudkc22@gmail.com"
- [Star Light Storyboard v1.0](https://docs.google.com/presentation/d/1Sp_AaRGX0Djxg1bEWvEA5sCDMwHlt4ju8T6O6NrWqA0/edit?usp=sharing)
- [Star Light Requirements Specification](https://hackmd.io/HwCwBPuvQR-Teo6EjRtAIg?view)
