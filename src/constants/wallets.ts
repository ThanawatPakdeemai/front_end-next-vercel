import { number } from "prop-types"
import { Config, ConnectorNames } from "../types/wallet"
import { defaultvalue } from "./sites"

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: "Metamask.svg",
    connectorId: ConnectorNames.Injected
  }
  // ,{
  //   title: "Fortmatic",
  //   icon: "Fortmatic.svg",
  //   connectorId: ConnectorNames.None,
  // },
  // {
  //   title: "WalletConnect",
  //   icon: "WalletConnect.svg",
  //   connectorId: ConnectorNames.None,
  // },
  // {
  //   title: "Fortmatic",
  //   icon: "Fortmatic.svg",
  //   connectorId: ConnectorNames.None,
  // },
  // {
  //   title: "WalletConnect",
  //   icon: "WalletConnect.svg",
  //   connectorId: ConnectorNames.None,
  // },
  // {
  //   title: "Binance Chain Wallet",
  //   icon: "BinanceChianWallet.svg",
  //   connectorId: ConnectorNames.None,
  // },
]

// eslint-disable-next-line import/no-mutable-exports
const CHAIN_ID: number = 0
// if (pathname === "p2p-dex") {
//   if (process.env.NEXT_PUBLIC_MODE === "development") {
//     CHAIN_ID = Number(97)
//   } else {
//     CHAIN_ID = Number(56)
//   }
// } else
if (process.env.NEXT_PUBLIC_MODE === "development") {
  const CHAIN_ID = Number(80001)
} else {
  const CHAIN_ID = Number(137)
}

export { CHAIN_ID }
export const connectorLocalStorageKey = "connectorId"
export const MATIC_ICON = "https://wallet.matic.network/favicon.ico"
export const CHAIN_NAME =
  process.env.NEXT_PUBLIC_MODE === "development"
    ? defaultvalue.chain_name
    : "Polygon Mainnet" // For production is Polygon Mainnet

export default connectors