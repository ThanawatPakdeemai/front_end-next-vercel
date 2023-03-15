import Helper from "@utils/helper"
import React from "react"
import CircleIcon from "@mui/icons-material/Circle"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import TextLink from "@components/atoms/TextLink"
import CloseIcon from "@mui/icons-material/Close"
import CopyAddress from "@components/atoms/CopyAddress"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import MetamaskLogo from "@components/icons/MetamaskLogo"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { numberWithCommas } from "@src/helpers/addComma"
import { IChainList } from "@configs/chain"
import { useWeb3Provider } from "@providers/Web3Provider"
import { Typography } from "@mui/material"
import BalanceWallet from "./BalanceWallet"

interface IProp {
  isConnected?: boolean
  address?: string
  handleConnectWallet?: () => void
  handleOnDisconnectWallet?: () => void
  blockExplorerURL: string | undefined
  chainSupport: ITokenContract[]
  currentTokenSelected: string
  currentChainSelected: IChainList
}

const MetamaskWallet = ({
  isConnected,
  address,
  handleConnectWallet,
  handleOnDisconnectWallet,
  blockExplorerURL,
  chainSupport,
  currentTokenSelected,
  currentChainSelected
}: IProp) => {
  const { onAddToken } = useWeb3Provider()
  /**
   * @description Handle display balances from wallet
   */
  const handleDisplayBalance = () => {
    const _tokenBalance = chainSupport.find(
      (item) => item.symbol === currentTokenSelected
    )
    return (
      <>
        <BalanceWallet
          balance={
            _tokenBalance
              ? numberWithCommas(
                  Helper.number4digit(
                    (_tokenBalance as ITokenContract).balanceWallet.digit
                  )
                )
              : "N/A"
          }
          tokenName={
            _tokenBalance ? (_tokenBalance as ITokenContract).symbol : "NAKA"
          }
        />
      </>
    )
  }

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
            <div>
              <span className="text-xs text-neutral-500">
                {Helper.shortenString(address, 5)}
              </span>
              <CopyAddress
                title="copy address"
                value={address}
                className="ml-2 cursor-pointer text-xs text-secondary-main"
              />
            </div>
          )}
          {isConnected ? (
            <div className="flex gap-2">
              <TextLink
                name={`${currentChainSelected.title} Scan`}
                className="!pb-0 capitalize"
                onClick={() =>
                  window.open(`${blockExplorerURL}address/${address}`, "_blank")
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
            />
          )}
        </div>
      </div>
      {isConnected ? (
        handleDisplayBalance()
      ) : (
        <ButtonToggleIcon
          startIcon={null}
          text="Connect Wallet"
          type="button"
          className="min-h-[40px] bg-secondary-main text-sm text-white-primary"
          handleClick={handleConnectWallet}
        />
      )}
    </div>
  )
}

export default MetamaskWallet
