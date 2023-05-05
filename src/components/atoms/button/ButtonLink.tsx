import { Button, SxProps, Theme } from "@mui/material"
import Link from "next/link"
import React, { ReactNode, useMemo } from "react"
import dynamic from "next/dynamic"

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
  disabledStartIcon?: boolean
  disabledEndIcon?: boolean
  sxCustomStyled?: SxProps<Theme>
  target?: "_blank" | "_self" | "_parent" | "_top"
  stroke?: string
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
  disabled = false,
  disabledStartIcon = false,
  disabledEndIcon = false,
  sxCustomStyled = {},
  target = "_self",
  stroke
}: IButtonLink) => {
  const IconArrowRight = dynamic(
    () => import("@components/icons/arrowRightIcon"),
    {
      suspense: true,
      ssr: false
    }
  )
  const ButtonSelf = useMemo(
    () => (
      <Button
        disabled={disabled}
        variant={variant}
        type={type ?? "button"}
        color={color}
        size={size}
        startIcon={
          !disabledStartIcon && (
            <div
              className={`button-icon animation-arrow my-[5px] ${textColor}`}
            >
              {icon}
            </div>
          )
        }
        className={`${className} button-global`}
        onClick={onClick}
        endIcon={
          !disabledEndIcon && (
            <div className="button-arrow animation-arrow">
              <IconArrowRight
                stroke={stroke}
                className={arrowColor}
              />
            </div>
          )
        }
        sx={sxCustomStyled}
      >
        <span
          className={`animation-button-text flex h-fit items-center xl:mt-0 ${textColor}`}
        >
          {text}
        </span>
      </Button>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      arrowColor,
      className,
      color,
      disabled,
      disabledEndIcon,
      disabledStartIcon,
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
      {href && !onClick ? (
        <Link
          href={href || "/"}
          className="w-auto"
          target={target}
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
