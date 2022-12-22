import { Box, Divider } from "@mui/material"
import React from "react"

interface IProps {
  onClick: () => void
}

const ButtonClose = ({ onClick }: IProps) => (
  <Box
    component="div"
    className="relative mr-2 cursor-pointer"
    onClick={onClick}
  >
    <div className="image-square ml-2 font-neue-machina text-default ">
      <div className="select-global-square !hover:h-[35px] !hover:w-[35px] h-8  w-8 rotate-45 rounded-[8px] !bg-error-main hover:rotate-0" />
    </div>
    <Divider
      className="select-square absolute bottom-[16px] left-[16px] w-[15px] !border !border-[#f1f4f4]"
      orientation="vertical"
      flexItem
    />
  </Box>
)

export default ButtonClose
