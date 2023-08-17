import { Box } from "@mui/material"
import React, { ComponentPropsWithoutRef } from "react"
import dynamic from "next/dynamic"

const LogoIcon = dynamic(() => import("@components/atoms/svg/LogoIcon"), {
  suspense: true,
  ssr: false
})

export interface IPropsTag extends ComponentPropsWithoutRef<"div"> {
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info"
  icon?: React.ReactNode
}

const TagCircle = ({
  color = "primary",
  icon,
  // animation = true,
  ...props
}: IPropsTag) => {
  const hasColor = {
    primary: "bg-neutral-900",
    secondary: "bg-purple-primary"
  }
  return (
    <Box
      component="div"
      role="status"
      aria-label=""
      className={`${hasColor[color]} relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white-default`}
      {...props}
    >
      {/* Remove this because CPU usage is too high */}
      {/* ${animation ? "animate-rotating" : ""} */}
      <span className="icon--outside">{icon}</span>
      <span className="icon--inside absolute">
        <LogoIcon
          className={`${
            hasColor[color] !== "primary"
          } ? "text-white-default" : ""`}
        />
      </span>
    </Box>
  )
}

export default TagCircle
