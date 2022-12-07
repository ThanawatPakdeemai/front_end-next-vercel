import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  href: string
  icon?: React.ReactNode
  color?: "primary" | "secondary" | "inherit" | "success" | "error"
}

const ButtonLink = ({
  text = "Text",
  href,
  icon,
  color = "primary"
}: IButtonLink) => (
  <Link
    href={href}
    data-testid="button-link"
  >
    <Button
      className="button-global"
      variant="contained"
      color={color}
      sx={{
        minWidth: "auto",
        width: "100%"
      }}
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
