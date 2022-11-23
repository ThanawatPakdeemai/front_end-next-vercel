export enum ELocalKey {
  token = "token",
  email = "email",
  address = "address",
  loginWith = "loginWith",
  time = "time"
}

export interface ILocal {
  key: ELocalKey
  val?: string
}
