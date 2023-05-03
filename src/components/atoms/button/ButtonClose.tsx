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
      className={`button-close m-auto flex w-12 cursor-pointer justify-center ${className}`}
      onClick={onClick}
    >
      <Box
        component="div"
        className={`group flex h-6 w-6 rotate-45 items-center rounded ${
          isMarketplace
            ? "bg-secondary-main hover:bg-secondary-main"
            : "bg-error-main hover:bg-error-main"
        } ${insideClassName} duration-150 ease-bounce hover:rotate-0`}
      >
        <Divider
          className="m-auto w-[16px] origin-center rotate-[315deg] !border !border-neutral-200 group-hover:rotate-0"
          orientation="vertical"
          flexItem
        />
      </Box>
    </Box>
  )
}

export default ButtonClose
