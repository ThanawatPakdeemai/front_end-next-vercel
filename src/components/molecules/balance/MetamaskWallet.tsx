import LogoIcon from "@components/icons/LogoIcon"
import Helper from "@utils/helper"
import React from "react"
import CircleIcon from "@mui/icons-material/Circle"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import TextLink from "@components/atoms/TextLink"
import CloseIcon from "@mui/icons-material/Close"
import CopyAddress from "@components/atoms/CopyAddress"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import MetamaskLogo from "@components/icons/MetamaskLogo"
import { IBalanceDisplay } from "@hooks/useAllBalances"

interface IProp {
  isConnected?: boolean
  address?: string
  handleConnectWallet?: () => void
  handleOnDisconnectWallet?: () => void
  balance: IBalanceDisplay
  tokenName: string
  chainName: string
  blockExplorerURL: string
}

const MetamaskWallet = ({
  isConnected,
  address,
  handleConnectWallet,
  handleOnDisconnectWallet,
  balance,
  tokenName,
  chainName,
  blockExplorerURL
}: IProp) => (
  <div className="flex h-full flex-col rounded-default bg-neutral-700 p-2">
    <div className="relative mb-[10px] flex h-full flex-col items-center justify-center rounded-t-default bg-neutral-900">
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
      <div className="mt-6 flex flex-col items-center gap-4 uppercase">
        <span className="text-[14px] text-neutral-300">
          {isConnected
            ? "connected with metamask"
            : "not connected with metamask"}
        </span>
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
              name={`${chainName} Scan`}
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
    {/* isConnected */}
    {isConnected ? (
      <div className="box-metamask-shadow m-[2px] min-h-[50px] rounded-[13px] bg-neutral-700 p-[5px]">
        <div className="flex h-full items-center rounded-lg bg-neutral-900 p-1">
          <div className="flex h-full items-center rounded bg-neutral-800 p-1">
            <LogoIcon fill="#4E5057" />
          </div>
          <div className="ml-3 flex w-full flex-wrap items-center justify-between">
            <span className="whitespace-pre-wrap text-xs uppercase text-neutral-600">
              {tokenName} in{"\n"}metamask
            </span>
            <span className="whitespace-nowrap font-digital-7 text-[26px] leading-3 text-neutral-600">
              {balance.text} {tokenName}
            </span>
          </div>
        </div>
      </div>
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

export default MetamaskWallet
