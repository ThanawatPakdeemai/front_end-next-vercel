import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  href: string
  icon?: React.ReactNode
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  className?: string
  textColor?: string
  arrowColor?: string
}

const ButtonLink = ({
  text,
  href,
  icon,
  variant,
  color,
  size,
  className,
  textColor,
  arrowColor
}: IButtonLink) => (
  <Link href={href}>
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={<div className="button-icon animation-arrow">{icon}</div>}
      className={`${className} button-global`}
      endIcon={
        <div className="button-arrow animation-arrow">
          <ArrowForwardIcon className={arrowColor} />
        </div>
      }
    >
      <span className={`animation-button-text ${textColor}`}>{text}</span>
    </Button>
  </Link>
)

export default ButtonLink
