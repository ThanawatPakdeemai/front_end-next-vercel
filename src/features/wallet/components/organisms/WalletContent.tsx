import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import SkeletionWallet from "@components/atoms/skeleton/SkeletonWallet"
import SwitchChain from "@components/atoms/SwitchChain"
import RightMenuWallet from "@components/molecules/rightMenu/RightMenuWallet"
import { TokenSupport } from "@configs/chain"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import { useWeb3Provider } from "@providers/Web3Provider"
import useChainSupportStore from "@stores/chainSupport"
import React, { ReactNode } from "react"
import WalletBody from "../molecules/WalletBody"
import WalletFooter from "../molecules/WalletFooter"
import WalletHeader from "../molecules/WalletHeader"
import WalletLightAnimation from "../molecules/WalletLightAnimation"

interface IWalletContent {
  handleConnectWithMetamask: (() => Promise<void>) | undefined
  isWrongNetwork: boolean
  type: TokenSupport
  handleSwitchNetwork: () => void
}

const WalletContent = ({
  isWrongNetwork,
  type,
  handleSwitchNetwork
}: IWalletContent) => {
  const {
    openWithDraw,
    openDeposit,
    handleOpen,
    handleClose,
    onSubmit,
    onClickMaxValue
  } = useWalletContoller()
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
              currentChainSelected === "0x61"
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
              // value={value}
              // setValue={setValue}
              handleOpen={() =>
                handleOpen(
                  "withdraw",
                  (currentTokenSelected as ITokenContract) || chainSupport[0]
                )
              }
              handleClose={() => handleClose("withdraw")}
              onSubmit={() => onSubmit("withdraw")}
              onClickMaxValue={onClickMaxValue}
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
              onSubmit={() => onSubmit("deposit")}
              onClickMaxValue={onClickMaxValue}
              // disabled={disabled}
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
