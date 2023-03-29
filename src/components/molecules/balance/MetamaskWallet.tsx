import Helper from "@utils/helper"
import React from "react"
import CircleIcon from "@mui/icons-material/Circle"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import TextLink from "@components/atoms/TextLink"
import CloseIcon from "@mui/icons-material/Close"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import MetamaskLogo from "@components/icons/MetamaskLogo"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { numberWithCommas } from "@src/helpers/addComma"
import { IChainList } from "@configs/chain"
import { useWeb3Provider } from "@providers/Web3Provider"
import { Typography } from "@mui/material"
import useChainSupportStore from "@stores/chainSupport"
import WalletAddress from "@feature/wallet/components/atoms/WalletAddress"
import BalanceWallet from "./BalanceWallet"

interface IProp {
  address?: string
  handleConnectWallet?: () => void
  handleOnDisconnectWallet?: () => void
  blockExplorerUrls: string[]
  chainSupport?: ITokenContract[]
  currentTokenSelected?: string
  currentChainSelected?: IChainList
}

const MetamaskWallet = ({
  address,
  handleConnectWallet,
  handleOnDisconnectWallet,
  blockExplorerUrls
}: IProp) => {
  const { onAddToken, isConnected } = useWeb3Provider()
  const { currentChainSelected, currentTokenSelected } = useChainSupportStore()

  /**
   * @description Handle display balances from wallet
   */
  const handleDisplayBalance = () =>
    isConnected && currentTokenSelected ? (
      <BalanceWallet
        balance={
          currentChainSelected
            ? numberWithCommas(
                Helper.number4digit(
                  (currentTokenSelected as ITokenContract).balanceWallet.digit
                )
              )
            : "N/A"
        }
        tokenName={
          currentTokenSelected
            ? (currentTokenSelected as ITokenContract).symbol
            : "NAKA"
        }
      />
    ) : (
      <ButtonToggleIcon
        startIcon={null}
        text="Connect Wallet"
        type="button"
        className="min-h-[40px] bg-secondary-main text-sm text-white-primary"
        handleClick={handleConnectWallet}
      />
    )

  return (
    <div className="flex flex-[1_1_calc(100%-134px)] flex-col rounded-default bg-neutral-700 p-2 lg:max-w-[333px] lg:flex-[1_1_333px]">
      <div className="relative mb-[10px] flex h-full flex-col items-center justify-center rounded-t-default bg-neutral-900 pt-6">
        {/* isConnected */}
        <div className="absolute right-[14px] top-[14px] flex h-[30px] w-[57px] items-center justify-evenly rounded-[10px] bg-neutral-800">
          <CircleIcon
            className={`text-[6px] ${
              isConnected ? "text-green-lemon" : "text-error-main"
            }`}
          />
          <ChainPolygonIcon />
        </div>
        <div className="rounded-full border border-neutral-800 bg-[#34343433] p-6">
          <MetamaskLogo />
        </div>
        {/* isConnected */}
        <div className="my-6 flex flex-col items-center gap-4">
          <span className="text-[14px] uppercase text-neutral-300">
            {isConnected
              ? "connected with metamask"
              : "not connected with metamask"}
          </span>
          <Typography
            variant="h3"
            className="import-token--title my-4 text-center text-sm"
          >
            {`Don't see your token on Metamask?`}
            <span className="block">
              <button
                type="button"
                onClick={onAddToken}
                className="mt-1 text-sm underline hover:no-underline"
              >
                Import NAKA Token
              </button>
            </span>
          </Typography>
          {isConnected && address && (
            <WalletAddress contractAddress={address || ""} />
          )}
          {isConnected ? (
            <div className="flex gap-2">
              <TextLink
                name={`${currentTokenSelected?.symbol} Scan`}
                className="!pb-0 capitalize"
                onClick={() =>
                  window.open(
                    `${(blockExplorerUrls as string[])[0]}address/${address}`,
                    "_blank"
                  )
                }
              />
              <span className="text-neutral-700">|</span>
              <TextLink
                name="Disconnect"
                className="!pb-0 capitalize"
                icon={<CloseIcon sx={{ height: 14 }} />}
                onClick={handleOnDisconnectWallet}
              />
            </div>
          ) : (
            <TextLink
              name="What is metamask ?"
              className="!pb-0 capitalize"
              href="https://metamask.io/"
              target="_blank"
            />
          )}
        </div>
      </div>

      {handleDisplayBalance()}
    </div>
  )
}

export default MetamaskWallet
