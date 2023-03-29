import { Button } from "@mui/material"
import React from "react"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavouriteColorIcon from "@components/icons/HowToPlayIcon/FavouriteColorIcon"

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
  icon = <FavoriteBorderIcon />,
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
      variant={variant}
      color={color}
      className={`${className} ${typeButton[type]}`}
      onClick={handleClick}
    >
      {favouriteStatus ? <FavouriteColorIcon /> : icon}
    </Button>
  )
}

export default ButtonFavourite
