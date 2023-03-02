export interface IErrorMessage {
  responseStatus: boolean
  errorMsg: string
  type: "error" | "success"
}
