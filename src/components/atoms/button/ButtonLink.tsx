import { Button } from "@mui/material"
import Link from "next/link"
import React, { ReactNode, useMemo } from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string | ReactNode
  href?: string
  icon?: React.ReactNode
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  className?: string
  textColor?: string
  arrowColor?: string
  onClick?: () => void
  type?: "submit" | "button"
  disabled?: boolean
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
  onClick,
  type,
  disabled = false
}: IButtonLink) => {
  const ButtonSelf = useMemo(
    () => (
      <Button
        disabled={disabled}
        variant={variant}
        type={type ?? "button"}
        color={color}
        size={size}
        startIcon={
          <div className={`button-icon animation-arrow ${textColor}`}>
            {icon}
          </div>
        }
        className={`${className} button-global`}
        onClick={onClick}
        endIcon={
          <div className="button-arrow animation-arrow">
            <ArrowForwardIcon className={arrowColor} />
          </div>
        }
      >
        <span
          className={`animation-button-text flex items-center ${textColor}`}
        >
          {text}
        </span>
      </Button>
    ),
    [
      arrowColor,
      className,
      color,
      disabled,
      icon,
      onClick,
      size,
      text,
      textColor,
      type,
      variant
    ]
  )

  return (
    <>
      {!onClick ? (
        <Link
          href={href || "/"}
          className="w-auto"
        >
          {ButtonSelf}
        </Link>
      ) : (
        ButtonSelf
      )}
    </>
  )
}

export default ButtonLink
