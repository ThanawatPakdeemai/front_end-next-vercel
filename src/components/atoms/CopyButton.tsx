import React from "react"
import dynamic from "next/dynamic"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: true
  }
)

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
      icon={<Icomoon className="icon-Copy !text-[14px]" />}
    />
  )
}

export default CopyButton
