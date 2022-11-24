export type TLocalKey =
  | "token"
  | "email"
  | "address"
  | "loginWith"
  | "time"
  | "wallet-connector"

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ELocalKey {
  token = "token",
  email = "email",
  address = "address",
  loginWith = "loginWith",
  time = "time",
  walletConnector = "wallet-connector"
}

export interface ILocal {
  key: TLocalKey
  value?: string
}
