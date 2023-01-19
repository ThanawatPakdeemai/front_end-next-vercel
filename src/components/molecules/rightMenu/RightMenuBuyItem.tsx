import React, { memo, useState } from "react"
import { Box, Stack } from "@mui/material"
import { ModalCustom } from "../Modal/ModalCustom"
import ButtonBuyItem from "./ButtonBuyItem"
import FromButItem from "../../../features/authentication/components/FromButItem"
import ModalHeader from "../Modal/ModalHeader"

const RightMenuBuyItem = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
        <ButtonBuyItem handleButton={handleOpen} />
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
          <div className="rounded-2xl border-[1px] border-[#232329] bg-[#18181c] p-2">
            <ModalHeader
              handleClose={handleClose}
              title="Buy Assets"
            />
          </div>
          <FromButItem />
        </Stack>
      </ModalCustom>
    </>
  )
}
export default memo(RightMenuBuyItem)
