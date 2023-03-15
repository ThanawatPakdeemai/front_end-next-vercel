import useGlobal from "@hooks/useGlobal"
import { Box, Divider } from "@mui/material"
import React from "react"

interface IProps {
  className?: string
  insideClassName?: string
  onClick: () => void
}

const ButtonClose = ({ onClick, className, insideClassName }: IProps) => {
  const { isMarketplace } = useGlobal()
  return (
    <Box
      component="div"
      className={` mr-2 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Box
        component="div"
        className={`group ml-2 flex
            h-8 w-8 rotate-45
             items-center rounded-[8px] ${
               isMarketplace
                 ? "bg-secondary-main hover:bg-secondary-main"
                 : "bg-error-main hover:bg-error-main"
             } ${insideClassName} duration-150 ease-bounce hover:rotate-0`}
      >
        <Divider
          className="m-auto mx-2 w-[16px] origin-center  rotate-[315deg] !border !border-neutral-200 group-hover:rotate-0"
          orientation="vertical"
          flexItem
        />
      </Box>
    </Box>
  )
}

export default ButtonClose
