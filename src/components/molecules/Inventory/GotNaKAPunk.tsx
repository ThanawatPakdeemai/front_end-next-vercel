import { Chip, Divider, Typography } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"

const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  address: string
  token_id: string
}

const GotNaKAPunk = ({ address, token_id }: IProp) => {
  const { copyClipboard } = Helper
  const { successToast } = useToast()

  const handleCopyClipboard = (_copy: string) => {
    copyClipboard(_copy)
    successToast(MESSAGES.copy)
  }

  return (
    <div className="flex w-full min-w-[320px] flex-col gap-x-2 gap-y-1 py-1 pl-8 pr-4 md:flex-row">
      <div className="flex w-fit max-w-[204px] flex-row items-center gap-x-1">
        <Typography className="text-xs uppercase text-white-primary">
          address :
        </Typography>
        <Chip
          label={address}
          variant="outlined"
          size="small"
          className="max-w-[113px] cursor-pointer uppercase"
        />
        <ButtonIcon
          onClick={() => handleCopyClipboard(address)}
          className="flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900"
          icon={<Icomoon className="icon-Copy" />}
        />
      </div>
      <div className="flex w-fit flex-row items-center gap-x-1">
        <Typography className="text-xs uppercase text-white-primary">
          token id :
        </Typography>
        <Chip
          label={token_id}
          variant="outlined"
          size="small"
          className="max-w-[113px] cursor-pointer uppercase"
        />
        <ButtonIcon
          onClick={() => handleCopyClipboard(token_id)}
          className="flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900"
          icon={<Icomoon className="icon-Copy" />}
        />
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75 md:hidden" />
    </div>
  )
}

export default GotNaKAPunk
