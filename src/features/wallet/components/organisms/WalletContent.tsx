import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import SkeletionWallet from "@components/atoms/skeleton/SkeletonWallet"
import SwitchChain from "@components/atoms/SwitchChain"
import { TokenSupport } from "@configs/chain"
import { JsonRpcSigner } from "@ethersproject/providers"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
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
  } else if (!statusWalletConnected.responseStatus) {
    content = <PleaseCheckWallet />
  } else if (isWrongNetwork) {
    content = (
      <div className="m-2 mx-auto flex h-full max-w-sm flex-col items-center justify-center md:col-span-5">
        <SwitchChain
          chainName={type === "NAKA" ? "Polygon" : "Binance Smart Chain"}
          handleClick={handleSwitchNetwork}
          variant="full"
        />
      </div>
    )
  } else {
    content = (
      <div className="relative flex h-full w-full gap-1 md:p-2">
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
