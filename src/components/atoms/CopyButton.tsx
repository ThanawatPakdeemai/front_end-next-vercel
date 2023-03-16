import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"
import React from "react"
import ButtonIcon from "./button/ButtonIcon"

interface IProp {
  text: string
  className?: string
}

const CopyButton = ({ text, className }: IProp) => {
  const { successToast } = useToast()
  return (
    <ButtonIcon
      onClick={() => {
        Helper.copyClipboard(text)
        successToast(MESSAGES.copy)
      }}
      className={`ml-2 flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900 ${className}`}
      icon={<CopyMiniIcon />}
    />
  )
}

export default CopyButton
