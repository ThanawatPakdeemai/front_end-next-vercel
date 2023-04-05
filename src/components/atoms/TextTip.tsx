import React, { memo } from "react"

interface IProps {
  className?: string
  text: string
  textColor: string
  bgColor: string
  borderColor: string
}

const TextTip = ({
  className,
  text,
  textColor,
  bgColor,
  borderColor
}: IProps) => (
  <div
    className={`${className} w-full rounded-sm border px-4 py-2 normal-case ${textColor} ${bgColor} ${borderColor}`}
  >
    {text}
  </div>
)

export default memo(TextTip)
