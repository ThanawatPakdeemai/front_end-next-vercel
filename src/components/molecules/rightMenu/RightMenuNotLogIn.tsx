import React, { memo, useState } from "react"
import { Box } from "@mui/material"
import RightMenuNotLogInTemplate from "@components/templates/contents/RightMenuNotLogInTemplate"
import ButtonLogin from "./ButtonLogin"

const RightMenuNotLogIn = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <RightMenuNotLogInTemplate
      open={open}
      handleClose={handleClose}
    >
      <Box className="w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          <ButtonLogin handleButton={handleOpen} />
        </Box>
      </Box>
    </RightMenuNotLogInTemplate>
  )
}
export default memo(RightMenuNotLogIn)
