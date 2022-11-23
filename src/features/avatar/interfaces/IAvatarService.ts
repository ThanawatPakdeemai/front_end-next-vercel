export interface IAvatar {
  name: string
  value: string
  type: string
  key: number
}

export interface IGetAvatar {
  status: boolean
  data: IAvatar[]
  message: string
  error: boolean
}
