import LogoIcon from "@components/icons/LogoIcon"
import { Box } from "@mui/material"
import React, { ComponentPropsWithoutRef } from "react"

export interface IPropsTag extends ComponentPropsWithoutRef<"div"> {
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info"
  icon?: React.ReactNode
  animation?: boolean
}

const TagCircle = ({
  color = "primary",
  icon,
  animation = true,
  ...props
}: IPropsTag) => {
  const hasColor = {
    primary: "bg-[#010101]",
    secondary: "bg-[#7B5BE6]"
  }
  return (
    <Box
      role="status"
      aria-label=""
      className={`${hasColor[color]} relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#ffffff]`}
      {...props}
    >
      <span className={`icon--outside ${animation ? "animate-rotating" : ""}`}>
        {icon}
      </span>
      <span className="icon--inside absolute">
        <LogoIcon
          className={`${hasColor[color] !== "primary"} ? "text-[#ffffff]" : ""`}
        />
      </span>
    </Box>
  )
}

export default TagCircle
