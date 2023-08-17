import { Button } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface IButtonFavourite {
  type?: "square" | "circle"
  icon?: React.ReactNode
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  className?: string
  handleClick?: () => void
  favouriteStatus?: boolean
}

const ButtonFavourite = ({
  type = "circle",
  icon = <Icomoon className="icon-Heart" />,
  variant = "contained",
  color = "primary",
  className,
  handleClick,
  favouriteStatus
}: IButtonFavourite) => {
  const typeButton = {
    "circle": "!min-w-0 w-auto h-auto rounded-full !p-4",
    "square": "!min-w-0"
  }

  return (
    <Button
      aria-label="Favorite"
      variant={variant}
      color={color}
      className={`${className} ${typeButton[type]}`}
      onClick={handleClick}
    >
      {favouriteStatus ? <Icomoon className="icon-Heart" /> : icon}
    </Button>
  )
}

export default ButtonFavourite
