export interface IUser {
  name: string
  email: string
  image: string
  id?: string
}

export interface IToken {
  name: string
  email: string
  picture: string
  sub: string
  iat: number
  exp: number
  jti: string
}

export interface ISession {
  user: IUser
  expires: string
}

export interface ISessionCallBaqck {
  session: ISession
  token: IToken
}

export interface ISessionData {
  data: ISession
  status: string
}
