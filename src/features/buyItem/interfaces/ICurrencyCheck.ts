export interface ICurrencyCheckResult {
  jsonrpc: string
  id: number
  result: string
}
export interface ICurrencyCheckData {
  response_time: number
  url: string
  status: number
  response: ICurrencyCheckResult
}
export interface ICurrencyCheckResponse {
  data: ICurrencyCheckData[]
}
