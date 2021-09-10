import React, { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import LoadingView from "components/LoadingView"
import RouteContainer from "./RouteContainer"

// 페이지 별로 필요한 자바스크립트 코드만 로드하기 위해 lazy load를 사용하여 코드 스플리팅
const MainPage = lazy(() => import("pages/Main"))
const SignInPage = lazy(() => import("pages/SignIn"))
const SignUpPage = lazy(() => import("pages/SignUp"))
const TrackOfBestPage = lazy(() => import("pages/TrackOfBest"))
const TrackOfBestDetailPage = lazy(() => import("pages/TrackOfBestDetail"))
const CreateTrackOfBestPage = lazy(() => import("pages/CreateTrackOfBest"))
const UpdateTrackOfBestPage = lazy(() => import("pages/UpdateTrackOfBest"))

export default function RoutePages() {
  return (
    <Suspense fallback={<LoadingView />}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/main" />
        </Route>
        <RouteContainer path="/main" exact>
          <MainPage />
        </RouteContainer>
        <RouteContainer path="/signin" exact fullSize>
          <SignInPage />
        </RouteContainer>
        <RouteContainer path="/signup" exact fullSize>
          <SignUpPage />
        </RouteContainer>
        <RouteContainer path="/trackOfBest" exact>
          <TrackOfBestPage />
        </RouteContainer>
        <RouteContainer path="/trackOfBest/register" exact hiddenFooter requiredLogin>
          <CreateTrackOfBestPage />
        </RouteContainer>
        <RouteContainer path="/trackOfBest/edit" exact hiddenFooter requiredLogin>
          <UpdateTrackOfBestPage />
        </RouteContainer>
        <RouteContainer path="/trackOfBest/:id" exact>
          <TrackOfBestDetailPage />
        </RouteContainer>
      </Switch>
    </Suspense>
  )
}
