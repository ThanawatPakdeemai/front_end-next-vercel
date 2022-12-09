import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  href: string
  icon?: React.ReactNode
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  className?: string
}

const ButtonLink = ({
  text,
  href,
  icon,
  variant,
  color,
  size,
  className
}: IButtonLink) => (
  <Link href={href}>
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={icon}
      className={`${className}`}
    >
      {text}
    </Button>
  </Link>
)

export default ButtonLink
