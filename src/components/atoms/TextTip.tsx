import React, { memo } from "react"

interface IProps {
  className?: string
  text: string
  color:
    | "default"
    | "success"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning"
    | undefined
  shade?: "main" | "dark" | "light" | "contrastText"
}

const TextTip = ({ className, text, color, shade = "main" }: IProps) => {
  const _color = `${color}-${shade}`
  const _bgColor = `bg-${_color}/20`

  return (
    <div
      className={`${className} w-full rounded-sm border py-2 px-4 normal-case border-${_color} text-${_color} ${_bgColor}`}
    >
      {text}
    </div>
  )
}

export default memo(TextTip)
