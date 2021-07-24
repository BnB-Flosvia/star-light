import AppStore from "./app"
import CreateTrackOfBestStore from "./createTrackOfBest"
import MainStore from "./main"
import SignInStore from "./signIn"
import SignUpStore from "./signup"
import TrackOfBestStore from "./trackOfBest"
import TrackOfBestDetailStore from "./trackOfBestDetail"
import UpdateTrackOfBestStore from "./updateTrackOfBest"

class RootStore {
  constructor() {
    this.app = new AppStore(this)
    this.main = new MainStore(this)
    this.signIn = new SignInStore(this)
    this.signUp = new SignUpStore(this)
    this.trackOfBest = new TrackOfBestStore(this)
    this.createTrackOfBest = new CreateTrackOfBestStore(this)
    this.trackOfBestDetail = new TrackOfBestDetailStore(this)
    this.updateTrackOfBest = new UpdateTrackOfBestStore(this)
  }
}

export default RootStore
