import React, { ReactNode } from "react"
import dynamic from "next/dynamic"
import { TokenSupport } from "@configs/chain"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import { useWeb3Provider } from "@providers/Web3Provider"
import useChainSupportStore from "@stores/chainSupport"
import CONFIGS from "@configs/index"

const WalletHeader = dynamic(() => import("../molecules/WalletHeader"), {
  suspense: true,
  ssr: true
})
const WalletBody = dynamic(() => import("../molecules/WalletBody"), {
  suspense: true,
  ssr: true
})
const WalletLightAnimation = dynamic(
  () => import("../molecules/WalletLightAnimation"),
  {
    suspense: true,
    ssr: true
  }
)
const WalletFooter = dynamic(() => import("../molecules/WalletFooter"), {
  suspense: true,
  ssr: true
})
const PleaseCheckWallet = dynamic(
  () => import("@components/atoms/PleaseCheckWallet"),
  {
    suspense: true,
    ssr: true
  }
)
const SkeletionWallet = dynamic(
  () => import("@components/atoms/skeleton/SkeletonWallet"),
  {
    suspense: true,
    ssr: true
  }
)
const SwitchChain = dynamic(() => import("@components/atoms/SwitchChain"), {
  suspense: true,
  ssr: true
})
const RightMenuWallet = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuWallet"),
  {
    suspense: true,
    ssr: true
  }
)

interface IWalletContent {
  isWrongNetwork: boolean
  type: TokenSupport
  handleSwitchNetwork: () => void
}

const WalletContent = ({
  isWrongNetwork,
  type,
  handleSwitchNetwork
}: IWalletContent) => {
  const { openWithDraw, openDeposit, handleOpen, handleClose } =
    useWalletContoller()
  const { chainSupport, currentTokenSelected, currentChainSelected } =
    useChainSupportStore()
  const { isConnected, signer, address } = useWeb3Provider()

  let content: ReactNode
  if (
    chainSupport.length === 0 ||
    (chainSupport && chainSupport[0].address === "") ||
    signer === undefined ||
    address === undefined
  ) {
    content = <SkeletionWallet />
  } else if (!isConnected) {
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
        <div
          key={
            ((currentTokenSelected as ITokenContract) || chainSupport[0])
              .address
          }
          className="w-full md:m-2 xl:max-w-[380px]"
        >
          <WalletHeader
            tokenName={
              ((currentTokenSelected as ITokenContract) || chainSupport[0])
                .symbol
            }
          />
          <WalletBody
            tokenSymbol={
              ((currentTokenSelected as ITokenContract) || chainSupport[0])
                .symbol
            }
            className={
              currentChainSelected ===
              (CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string)
                ? "text-binance-default"
                : "text-red-default"
            }
            balance={
              ((currentTokenSelected as ITokenContract) || chainSupport[0])
                .balanceVault
            }
            contractAddress={
              ((currentTokenSelected as ITokenContract) || chainSupport[0])
                .address
            }
          />
          <div className="flex w-full justify-end gap-1 sm:mb-4">
            <RightMenuWallet
              title="withdraw"
              titleHeader="Withdraw to metamask"
              open={openWithDraw}
              handleOpen={() =>
                handleOpen(
                  "withdraw",
                  (currentTokenSelected as ITokenContract) || chainSupport[0]
                )
              }
              handleClose={() => handleClose("withdraw")}
              tokenSelected={
                (currentTokenSelected as ITokenContract) || chainSupport[0]
              }
              method="withdraw"
            />
            <RightMenuWallet
              title="Deposit"
              titleHeader="deposit from metamask"
              open={openDeposit}
              handleOpen={() =>
                handleOpen(
                  "deposit",
                  (currentTokenSelected as ITokenContract) || chainSupport[0]
                )
              }
              handleClose={() => handleClose("deposit")}
              tokenSelected={currentTokenSelected as ITokenContract}
              method="deposit"
            />
          </div>
          <WalletFooter
            address={
              ((currentTokenSelected as ITokenContract) || chainSupport[0])
                .address
            }
          />
        </div>
        <WalletLightAnimation />
      </div>
    )
  }

  return <>{content}</>
}
export default WalletContent
