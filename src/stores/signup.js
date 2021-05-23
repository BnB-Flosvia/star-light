import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import * as EmailValidator from "email-validator"
import { isEmpty } from "lodash-es"

const pwdEmptyText = "비밀번호를 입력해주세요."
const emailEmptyText = "이메일을 입력해주세요."
const nicknameEmptyText = "닉네임을 입력해주세요."
const pwdFormatErrorText =
  "8자리 이상, 영문 대소문자, 숫자 및 특수문자를 사용하여야 합니다."
const pwdConfirmErrorText = "입력한 비밀번호가 같지 않습니다."
const emailFormatErrorText = "올바르지 않은 이메일 형식입니다."

export default class SignUpStore {
  // loading, success, error
  @observable status = ""

  @observable email = ""

  @observable password = ""

  @observable passwordConfirm = ""

  @observable nickname = ""

  @observable emailFormatErrorText = null

  @observable pwdConfirmErrorText = null

  @observable pwdFormatErrorText = null

  @observable nicknameErrorText = null

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
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
    this.passwordConfirm = ""
    this.nickname = ""
    this.emailFormatErrorText = null
    this.pwdFormatErrorText = null
    this.pwdConfirmErrorText = null
    this.nicknameErrorText = null
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

  @action setPasswordConfirm = (newPwd) => {
    if (newPwd !== this.passwordConfirm) {
      this.passwordConfirm = newPwd
    }
  }

  @action setNickname = (newNickname) => {
    if (newNickname !== this.nickname) {
      this.nickname = newNickname
    }
  }

  @action signUpRequest = async () => {
    if (isEmpty(this.email)) {
      // case 1. set email empty text
      this.emailFormatErrorText = emailEmptyText
    } else if (!this.emailValidated) {
      // case 2. set email format is not correct text
      this.emailFormatErrorText = emailFormatErrorText
    } else {
      // case 3. email validated
      this.emailFormatErrorText = null
    }

    if (isEmpty(this.password)) {
      // case 1. set pwd empty text
      this.pwdFormatErrorText = pwdEmptyText
    } else if (!this.pwdValidated) {
      // case 2. set pwd format error text
      this.pwdFormatErrorText = pwdFormatErrorText
    } else {
      // case 4. pwd validated
      this.pwdFormatErrorText = null
    }

    if (this.password !== this.passwordConfirm) {
      // case 3. set pwd is not confirmed text
      this.pwdConfirmErrorText = pwdConfirmErrorText
    } else {
      this.pwdConfirmErrorText = null
    }

    if (isEmpty(this.nickname)) {
      this.nicknameErrorText = nicknameEmptyText
    } else {
      this.nicknameErrorText = null
    }

    const isValid =
      this.emailFormatErrorText == null &&
      this.pwdFormatErrorText == null &&
      this.nicknameErrorText == null &&
      this.pwdConfirmErrorText == null

    if (!isValid) {
      return
    }

    try {
      this.status = "LOADING"
      await httpClient.post("/user/register/", {
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        userName: this.nickname,
      })

      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
      // TODO: show error toast
      console.log("case 400, throw error?")
      console.log(error)
      // case 4. email duplicated
      // check nickname duplication
    }
  }
}

const store = new SignUpStore()
autorun(() => store.emailValidated)
autorun(() => store.pwdValidated)
autorun(() => store.isApiCallError)
autorun(() => store.isApiCallSuccess)
autorun(() => store.isLoading)
