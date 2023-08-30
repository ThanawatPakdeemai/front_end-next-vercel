import { useWeb3Provider } from "@providers/Web3Provider"
import React, { ReactNode } from "react"
import dynamic from "next/dynamic"
import { ModalHeader } from "@components/molecules/Modal"
// import Web3 from "web3"
import OKXWalletIcon from "./svg/OKXWalletIcon"
import WalletConnectIcon from "./svg/WalletConnectIcon"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const IcomoonWallet = dynamic(
  () => import("@components/atoms/icomoon/IcomoonWallet")
)
interface IProps {
  open: boolean
  setOpen: (_value: boolean) => void
}

const ModalConnectWallet = ({ open, setOpen }: IProps) => {
  const { handleConnectWithMetamask } = useWeb3Provider()

  const getWalletIconByName = React.useCallback((_name: string) => {
    let _icon: ReactNode | undefined
    switch (_name) {
      case "MetaMask":
        _icon = <IcomoonWallet className="icon-Metamask text-[48px]" />
        break
      case "OKX Wallet":
        _icon = <IcomoonWallet className="icon-okx text-[48px]" />
        break
      case "WalletConnect":
        _icon = (
          <WalletConnectIcon
            width={48}
            height={48}
          />
        )
        break
      case "Binance Wallet":
        _icon = <Icomoon className="icon-binance text-[36px] text-[#F0B90C]" />
        break
      default:
        _icon = (
          <OKXWalletIcon
            width={48}
            height={48}
          />
        )
        break
    }
    return _icon
  }, [])

  return (
    <ModalCustom
      open={open}
      onClose={() => setOpen(false)}
      width={360}
    >
      <>
        <ModalHeader
          handleClose={() => setOpen(false)}
          title={
            <div className="flex w-full flex-row items-center gap-x-2">
              <Icomoon className="icon-Naka text-error-main" /> ConnectWallet
            </div>
          }
          btnCloseRed
          bg="capitalize border border-neutral-700 bg-neutral-800 h-12 px-2 pl-4 rounded"
        />
        <div className="flex w-full flex-col items-center gap-y-2 pt-2">
          <div className="flex flex-col sm:flex-row sm:gap-x-2">
            {/* {connectors.map((connector) => (
            <button
              key={connector.id}
              type="button"
              aria-label="connect-wallet"
              disabled={!connector.ready || !onConnectWallet}
              onClick={() => {
                onConnectWallet?.(connector)
                setOpen(false)
              }}
              className="relative flex h-32 w-36 flex-col items-center justify-center gap-y-2"
              className="rounded-sm border border-transparent hover:border-neutral-600"
            >
              {getWalletIconByName(connector.name)}
              {connector.name}
              {!connector.ready && " (not installed)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
              {connector.name === "WalletConnect" ? (
                <div className="absolute right-0 top-0 w-10 rounded-bl-[8px] rounded-tr-[8px]"
                 className=" bg-error-main text-sm uppercase text-white-primary">
                  v2.0
                </div>
              ) : undefined}
            </button>
          ))} */}
            <button
              key="connector-metamask"
              type="button"
              onClick={() => {
                handleConnectWithMetamask?.("metamask")
                setOpen(false)
              }}
              className="relative flex h-32 w-36 flex-col items-center justify-center gap-y-2 rounded-sm border border-transparent hover:border-neutral-600"
            >
              {getWalletIconByName("MetaMask")}
              MetaMask
            </button>
            <button
              key="connector-okx"
              type="button"
              onClick={() => {
                handleConnectWithMetamask?.("okx")
                setOpen(false)
              }}
              className="relative flex h-32 w-36 flex-col items-center justify-center gap-y-2 rounded-sm border border-transparent hover:border-neutral-600"
            >
              {getWalletIconByName("OKX Wallet")}
              OKX Wallet
            </button>
            {/* <button
              key="connector-binance"
              type="button"
              onClick={() => {
                handleConnectWithMetamask?.("binance")
                setOpen(false)
              }}
              
            >
              {getWalletIconByName("Binance Wallet")}
              Binance
            </button> */}
          </div>
          <button
            type="button"
            aria-label="close"
            onClick={() => setOpen(false)}
            className="h-12 w-24 rounded-sm border bg-error-main px-2 py-1 uppercase text-black-400 hover:opacity-80"
          >
            close
          </button>
        </div>
      </>
    </ModalCustom>
  )
}

export default ModalConnectWallet
