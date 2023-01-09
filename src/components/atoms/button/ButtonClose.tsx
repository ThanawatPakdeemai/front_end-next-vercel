import { Box, Divider } from "@mui/material"
import React from "react"

interface IProps {
  className?: string
  onClick: () => void
}

const ButtonClose = ({ onClick, className }: IProps) => (
  <Box
    component="div"
    className={` mr-2 cursor-pointer ${className}`}
    onClick={onClick}
  >
    <div
      className="group ml-2 flex
            h-8 w-8 rotate-45
             items-center rounded-[8px] !bg-error-main duration-150 ease-bounce hover:rotate-0 hover:bg-error-main"
    >
      <Divider
        className="m-auto mx-2 w-[16px] origin-center  rotate-[315deg] !border !border-[#f1f4f4] group-hover:rotate-0"
        orientation="vertical"
        flexItem
      />
    </div>
  </Box>
)

export default ButtonClose
