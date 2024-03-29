import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import * as EmailValidator from "email-validator"
import { isEmpty } from "lodash-es"

const pwdEmptyText = "비밀번호를 입력해주세요."
const emailEmptyText = "이메일을 입력해주세요."
const pwdFormatErrorText =
  "8자리 이상, 영문 대소문자, 숫자 및 특수문자를 사용하여야 합니다."
const emailFormatErrorText = "올바르지 않은 이메일 형식입니다."
const signInErrorText = "가입하지 않은 아이디이거나, 올바르지 않은 비밀번호 입니다."

export default class SignInStore {
  // loading, success, error
  @observable status = ""

  @observable email = ""

  @observable password = ""

  @observable emailFormatErrorText = null

  @observable pwdFormatErrorText = null

  @observable signInErrorText = null

  // MobX version is after 6, need makeObservalbe call
  constructor(root) {
    makeObservable(this)
    this.root = root
  }

  @computed
  get emailValidated() {
    if (EmailValidator.validate(this.email)) {
      return true
    }
    return false
  }

  @computed
  get pwdValidated() {
    const passwordRegExp = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    )
    if (passwordRegExp.test(this.password)) {
      return true
    }
    return false
  }

  @computed
  get isLoading() {
    return this.status === "LOADING"
  }

  @computed
  get isApiCallError() {
    return this.status === "ERROR"
  }

  @computed
  get isApiCallSuccess() {
    return this.status === "SUCCESS"
  }

  @action initialize = () => {
    this.status = ""
    this.email = ""
    this.password = ""
    this.emailFormatErrorText = null
    this.pwdFormatErrorText = null
    this.signInErrorText = null
  }

  @action setEmail = (newEmail) => {
    if (newEmail !== this.email) {
      this.email = newEmail
    }
  }

  @action setPassword = (newPwd) => {
    if (newPwd !== this.password) {
      this.password = newPwd
    }
  }

  @action signInRequest = async () => {
    if (isEmpty(this.email)) {
      this.emailFormatErrorText = emailEmptyText
    } else if (!this.emailValidated) {
      this.emailFormatErrorText = emailFormatErrorText
    } else {
      this.emailFormatErrorText = null
    }

    if (isEmpty(this.password)) {
      this.pwdFormatErrorText = pwdEmptyText
    } else if (!this.pwdValidated) {
      this.pwdFormatErrorText = pwdFormatErrorText
    } else {
      this.pwdFormatErrorText = null
    }

    if (this.emailFormatErrorText != null || this.pwdFormatErrorText != null) {
      return
    }

    try {
      this.signInErrorText = null
      this.status = "LOADING"
      const response = await httpClient.post("/user/login/", {
        email: this.email,
        password: this.password,
      })

      const { data } = response
      const { access, refresh } = data || {}

      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)

      const { data: nicknameData } = await httpClient.getWithToken("/user/me/")

      const { username } = nicknameData || {}
      const { setNickname } = this.root.app
      setNickname(username)

      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
      this.signInErrorText = signInErrorText
    }
  }
}

const store = new SignInStore()
autorun(() => store.emailValidated)
autorun(() => store.pwdValidated)
autorun(() => store.isApiCallError)
autorun(() => store.isApiCallSuccess)
autorun(() => store.isLoading)
