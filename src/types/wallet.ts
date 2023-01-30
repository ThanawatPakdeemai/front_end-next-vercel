/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum EConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect"
}

export interface Config {
  title: string
  icon: string
  connectorId: EConnectorNames
}

export interface IExchangePlatform {
  title: string
  icon: string
  link: string
}

export type Login = (_connectorId: EConnectorNames) => void
