import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Web3 from "web3"
import { CHAIN_ID } from "@src/constants/wallets"
import { ConnectorNames } from "@src/types/wallet"
import getNodeUrl from "./getRpcUrl"

const POLLING_INTERVAL = 12000
const chainId = CHAIN_ID

const injected = new InjectedConnector({ supportedChainIds: [chainId] })
const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: getNodeUrl() },
  qrcode: true
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLibrary = (provider: any): Web3 => provider
