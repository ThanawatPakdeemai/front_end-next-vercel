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
    className={`${className} w-full rounded-sm border py-2 px-4 normal-case ${textColor} ${bgColor} ${borderColor}`}
  >
    {text}
  </div>
)

export default memo(TextTip)
