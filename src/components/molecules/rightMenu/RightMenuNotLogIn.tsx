import React, { memo, useState } from "react"
import { Box } from "@mui/material"

import { ModalCustom } from "../ModalCustom"
import ButtonLogin from "./ButtonLogin"
import ButtonMetamask from "./ButtonMetamask"

const RightMenuNotLogIn = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Box className="m-auto w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          <ButtonLogin handleButton={handleOpen} />
          {/* <Typography className="mx-3 text-center">or</Typography> */}
          <ButtonMetamask handleButton={handleOpen} />
        </Box>
        <ModalCustom
          open={open}
          onClose={handleClose}
          className="gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <>ddd</>
        </ModalCustom>
      </Box>
    </>
  )
}
export default memo(RightMenuNotLogIn)
