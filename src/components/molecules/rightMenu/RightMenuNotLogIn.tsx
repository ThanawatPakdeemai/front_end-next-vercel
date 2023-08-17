import React, { ReactElement, memo, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"

const RightMenuNotLogInTemplate = dynamic(
  () => import("@components/templates/contents/RightMenuNotLogInTemplate"),
  {
    suspense: true,
    ssr: true
  }
)
const ButtonLogin = dynamic(() => import("./ButtonLogin"), {
  suspense: true,
  ssr: true
})

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
          component="div"
          className="w-full"
          onClick={handleOpen}
        >
          {button}
        </Box>
      ) : (
        <Box
          component="div"
          className="!rounded-[29px] !bg-[#FFFFFF20] !p-[6px]"
        >
          {/* <Box className="w-full rounded-xl bg-neutral-700 !p-[5px] md:w-max"> */}
          <Box
            component="div"
            className="xs:flex-col items-center justify-between gap-1 lg:flex"
          >
            <ButtonLogin handleButton={handleOpen} />
          </Box>
          {/* </Box> */}
        </Box>
      )}
    </RightMenuNotLogInTemplate>
  )
}
export default memo(RightMenuNotLogIn)
