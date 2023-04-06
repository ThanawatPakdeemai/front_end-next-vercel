import React, { ReactElement, memo, useState } from "react"
import { Box } from "@mui/material"
import RightMenuNotLogInTemplate from "@components/templates/contents/RightMenuNotLogInTemplate"
import ButtonLogin from "./ButtonLogin"

interface IProps {
  button?: ReactElement
}
const RightMenuNotLogIn = ({ button }: IProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <RightMenuNotLogInTemplate
      open={open}
      handleClose={handleClose}
    >
      {button ? (
        <Box
          className="w-full"
          onClick={handleOpen}
        >
          {button}
        </Box>
      ) : (
        <Box className="w-full rounded-xl bg-neutral-700 p-1 md:w-max">
          <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
            <ButtonLogin handleButton={handleOpen} />
          </Box>
        </Box>
      )}
    </RightMenuNotLogInTemplate>
  )
}
export default memo(RightMenuNotLogIn)
