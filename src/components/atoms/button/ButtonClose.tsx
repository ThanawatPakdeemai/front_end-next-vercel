import useGlobal from "@hooks/useGlobal"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  className?: string
  insideClassName?: string
  onClick: () => void
  redTheme?: boolean
}

const ButtonClose = ({
  onClick,
  className,
  insideClassName,
  redTheme = false
}: IProps) => {
  const { isMarketplace } = useGlobal()
  const _redTheme = !!(redTheme || isMarketplace)

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
        <Icomoon className="icon-Minus rotate-[315deg] !text-white-default group-hover:rotate-0" />
      </Box>
    </Box>
  )
}

export default ButtonClose
