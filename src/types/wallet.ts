/* eslint-disable no-unused-vars */
export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect"
}

export interface Config {
  title: string
  icon: string
  connectorId: ConnectorNames
}

export interface IExchangePlatform {
  title: string
  icon: string
  link: string
}

export type Login = (connectorId: ConnectorNames) => void
