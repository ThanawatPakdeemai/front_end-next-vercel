import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"

export interface IButtonLink extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  href: string
  icon?: React.ReactNode
}

const ButtonLink = ({ text = "Text", href, icon }: IButtonLink) => (
  <Link
    className="slide-item--link w-[calc(100%-80px)]"
    href={href}
  >
    <Button
      variant="contained"
      color="primary"
      sx={{
        minWidth: "auto",
        width: "100%"
      }}
      startIcon={icon}
    >
      {text}
    </Button>
  </Link>
)

export default ButtonLink
