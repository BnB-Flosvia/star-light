# Star Light
- This is a web service for share your favorite songs with people
- React + MobX + Styled-component + Axios
- Using Storybook for testing
- TODO: react-testing-library, Jest testing

## Service Url
> [star light page:development web](http://star-light-web-dev.eba-mz52msmv.ap-northeast-2.elasticbeanstalk.com)

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
- `npm start`
- `npx cross-env REACT_APP_ENVIRONMENT=development react-app-rewired start`
  - You can change the environment. Servers connected to each environment are different.
  - REACT_APP_ENVIRONMENT = production, development

### Run code lint check
- check code style (no fix, only check)
- `npm run lint`

### Run production build
- `npm run build`

## Todo

## Reference
- [Star light design - Figma](https://www.figma.com/file/NyRHXYp1ydVb9l4yoHmDtH/Star-Light-Web?node-id=0%3A1)
  - If you need authorization for figma design, notify this email => "dkdudkc22@gmail.com"
- [Star light Storyboard v0.6](https://docs.google.com/presentation/d/1Sp_AaRGX0Djxg1bEWvEA5sCDMwHlt4ju8T6O6NrWqA0/edit?usp=sharing)
- [Star light Requirements Specification](https://hackmd.io/HwCwBPuvQR-Teo6EjRtAIg?view)
