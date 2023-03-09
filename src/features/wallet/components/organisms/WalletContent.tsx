import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import SkeletionWallet from "@components/atoms/skeleton/SkeletonWallet"
import SwitchChain from "@components/atoms/SwitchChain"
import { JsonRpcSigner } from "@ethersproject/providers"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { TokenSupport } from "@feature/wallet/containers/hooks/useWalletContoller"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import React, { ReactNode } from "react"
import WalletLightAnimation from "../molecules/WalletLightAnimation"

interface IWalletContent {
  chainSupport: ITokenContract[]
  loading: boolean
  address: string
  signer: JsonRpcSigner | undefined
  handleConnectWithMetamask: (() => Promise<void>) | undefined
  isWrongNetwork: boolean
  type: TokenSupport
  handleSwitchNetwork: () => void
  renderWallets: () => ReactNode
  statusWalletConnected: IErrorMessage
}

const WalletContent = ({
  chainSupport,
  loading,
  address,
  signer,
  isWrongNetwork,
  type,
  handleSwitchNetwork,
  renderWallets,
  statusWalletConnected
}: IWalletContent) => {
  let content: ReactNode
  if (
    loading ||
    !chainSupport.length ||
    signer === undefined ||
    address === undefined
  ) {
    content = <SkeletionWallet />
  } else if (isWrongNetwork) {
    content = (
      <div className="m-2 flex h-full flex-col items-center justify-center md:col-span-5">
        <SwitchChain
          chainName={type === "NAKA" ? "Polygon" : "Binance Smart Chain"}
          handleClick={handleSwitchNetwork}
          variant="full"
        />
      </div>
    )
  } else if (!statusWalletConnected.responseStatus) {
    content = <PleaseCheckWallet />
  } else {
    content = (
      <div className="relative w-full gap-1 md:mx-2 md:grid md:grid-cols-7">
        {renderWallets()}
        <WalletLightAnimation />
      </div>
    )
  }

  // if (handleConnectWithMetamask !== undefined) {
  //   content = <PleaseCheckWallet />
  // } else

  return <>{content}</>
}
export default WalletContent
