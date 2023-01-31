import React, { memo, useState } from "react"
import { Box, Stack } from "@mui/material"
import { ModalCustom } from "../Modal/ModalCustom"
import ButtonWallet from "./ButtonWallet"
import FromWallet from "../../../features/authentication/components/FromWallet"
import ModalHeader from "../Modal/ModalHeader"

interface IProp {
  title: string
}

const RightMenuWallet = ({ title }: IProp) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
        <ButtonWallet
          title={title}
          handleButton={handleOpen}
        />
      </Box>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="min-w-[500px] gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
            <ModalHeader
              handleClose={handleClose}
              title={title}
            />
          </div>
          <FromWallet title={title} />
        </Stack>
      </ModalCustom>
    </>
  )
}
export default memo(RightMenuWallet)
