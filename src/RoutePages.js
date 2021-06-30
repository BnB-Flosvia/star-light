import React, { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import RouteContainer from "./RouteContainer"

const MainPage = lazy(() => import("pages/Main"))
const SignInPage = lazy(() => import("pages/SignIn"))
const SignUpPage = lazy(() => import("pages/SignUp"))
const TrackOfBestPage = lazy(() => import("pages/TrackOfBest"))
const TrackOfBestDetailPage = lazy(() => import("pages/TrackOfBestDetail"))
const CreateTrackOfBestPage = lazy(() => import("pages/CreateTrackOfBest"))
const UpdateTrackOfBestPage = lazy(() => import("pages/UpdateTrackOfBest"))

export default function RoutePages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
