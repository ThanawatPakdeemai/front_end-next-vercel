export type TKey = "token" | "time" | "email" | "address" | "loginWith"

export interface ILocal {
  key: TKey
  val?: string
}
