import React, { memo, useState } from "react"
import { Box, Stack } from "@mui/material"
import { ModalCustom } from "../../../../components/molecules/Modal/ModalCustom"
import ButtonBuyItem from "../../atoms/ButtonBuyItem"
import FromBuyItem from "../../../buyItem/components/FromBuyItem"
import ModalHeader from "../../../../components/molecules/Modal/ModalHeader"

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
        className="min-w-[515px] gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
            <ModalHeader
              handleClose={handleClose}
              title="Buy Assets"
            />
          </div>
          <Box className="hide-scroll h-[480px] w-full overflow-y-scroll ">
            <FromBuyItem />
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}
export default memo(RightMenuBuyItem)
