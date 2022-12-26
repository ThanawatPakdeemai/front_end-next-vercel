import { Button } from "@mui/material"
import Link from "next/link"
import React, { useMemo } from "react"
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
  onClick?: () => void
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
  arrowColor,
  onClick
}: IButtonLink) => {
  const ButtonSelf = useMemo(
    () => (
      <Button
        variant={variant}
        color={color}
        size={size}
        startIcon={<div className="button-icon animation-arrow">{icon}</div>}
        className={`${className} button-global`}
        onClick={() => {
          if (onClick) onClick()
        }}
        endIcon={
          <div className="button-arrow animation-arrow">
            <ArrowForwardIcon className={arrowColor} />
          </div>
        }
      >
        <span className={`animation-button-text ${textColor}`}>{text}</span>
      </Button>
    ),
    [
      arrowColor,
      className,
      color,
      icon,
      onClick,
      size,
      text,
      textColor,
      variant
    ]
  )

  return <>{!onClick ? <Link href={href}>{ButtonSelf}</Link> : ButtonSelf}</>
}

export default ButtonLink
