import CONFIGS from "@configs/index"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded"
import { useWeb3Provider } from "@providers/Web3Provider"

interface IPleaseCheckWalletProps {
  size?: "small" | "medium" | "large" | undefined
}

const PleaseCheckWallet = ({ size }: IPleaseCheckWalletProps) => {
  const { successToast } = useToast()
  const { onAddToken } = useWeb3Provider()
  return size === "small" ? (
    <div className="flex flex-col items-start justify-center rounded-sm bg-neutral-800 p-4 text-sm">
      Please make sure that you are already connected correctly wallet.
    </div>
  ) : (
    <div className="flex h-full flex-col items-start justify-center rounded-sm bg-neutral-800 p-6 text-base md:col-span-5 md:m-2">
      <Typography
        variant="h3"
        className="mb-4 text-base"
      >
        Please make sure that you are already connected wallet following the
        instructions above.
      </Typography>
      <ul>
        <li>1. Login your wallet on Matamask</li>
        <li className="relative">
          <div className="flex items-center">
            <span>2. Import token to Matamask </span>
            <span className="mx-2 inline-block rounded-sm bg-neutral-700 px-2 pt-2 pb-1">
              {Helper.shortenString(CONFIGS.CONTRACT_ADDRESS.ERC20 as string)}
            </span>
            <ButtonIcon
              onClick={() => {
                Helper.copyClipboard(CONFIGS.CONTRACT_ADDRESS.ERC20 as string)
                successToast(MESSAGES.copy)
              }}
              className="m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
              icon={<ContentCopyRoundedIcon />}
            />
          </div>
          <div className="mt-[-10px] mb-2">
            or click{" "}
            <button
              type="button"
              onClick={onAddToken}
              className="mt-1 underline hover:no-underline"
            >
              Import NAKA Token
            </button>
          </div>
        </li>
        <li>3. Your connected chain is supporting to our website</li>
        <li>4. Connecting correct wallet</li>
      </ul>
    </div>
  )
}

export default PleaseCheckWallet
