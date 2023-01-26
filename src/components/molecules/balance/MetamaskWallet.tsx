import LogoIcon from "@components/icons/LogoIcon"
import Helper from "@utils/helper"
import React from "react"
import CircleIcon from "@mui/icons-material/Circle"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import MetamaskIcon from "@components/icons/MetamaskIcon"
import TextLink from "@components/atoms/TextLink"
import CloseIcon from "@mui/icons-material/Close"
import { IProfile } from "@src/types/profile"
import CopyAddress from "@components/atoms/CopyAddress"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"

interface IProp {
  isConnected?: boolean
  profile?: IProfile
  handleConnectWallet?: () => void
  handleOnDisconnectWallet?: () => void
}

const MetamaskWallet = ({
  isConnected,
  profile,
  handleConnectWallet,
  handleOnDisconnectWallet
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
        <MetamaskIcon />
      </div>
      {/* isConnected */}
      <div className="mt-6 flex flex-col items-center gap-4 uppercase">
        <span className="text-[14px] text-neutral-300">
          {isConnected
            ? "connected with metamask"
            : "not connected with metamask"}
        </span>
        {isConnected && profile && (
          <div>
            <span className="text-xs text-neutral-500">
              {Helper.shortenString(profile.address, 5)}
            </span>
            <CopyAddress
              title="copy address"
              value={profile.address}
              className="ml-2 cursor-pointer text-xs text-secondary-main"
            />
          </div>
        )}
        {isConnected ? (
          <div className="flex gap-2">
            <TextLink
              name="Polygon Scan"
              className="!pb-0 capitalize"
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
          <div className="ml-3 flex items-center">
            <span className="mr-11 whitespace-pre-wrap text-sm uppercase text-neutral-600">
              naka in{"\n"}metamask
            </span>
            <span className="font-digital-7 text-[26px] text-neutral-600">
              {Helper.formatNumber(294345)} NAKA
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