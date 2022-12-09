import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  href: string
  icon?: React.ReactNode
  color?: "primary" | "secondary" | "inherit" | "success" | "error"
  size?: "small" | "medium" | "large"
  classBg?: string
}

const ButtonLink = ({
  text = "Text",
  href,
  icon,
  color = "primary",
  size = "medium",
  classBg
}: IButtonLink) => (
  <Link
    className="slide-item--link w-[calc(100%-80px)]"
    href={href}
  >
    <Button
      className={`button-global ${classBg}`}
      variant="contained"
      color={color}
      sx={{
        minWidth: "auto",
        width: "100%"
      }}
      size={size}
      startIcon={<div className="button-icon">{icon}</div>}
      endIcon={
        <div className="button-arrow hidden">
          <ArrowForwardIcon />
        </div>
      }
    >
      {text}
    </Button>
  </Link>
)

export default ButtonLink
