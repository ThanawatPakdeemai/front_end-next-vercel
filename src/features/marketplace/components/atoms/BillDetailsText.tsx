import CopyButton from "@components/atoms/CopyButton"
import Helper from "@utils/helper"
import React from "react"

interface IProps {
  title: string
  value: string | number
  unit?: string
  className?: string
  copy?: boolean
  shortString?: boolean
}

const BillDetailsText = ({
  title,
  value,
  className,
  unit,
  copy,
  shortString
}: IProps) => {
  const _t = 1
  const { shortenString } = Helper

  return (
    <div className={`grid grid-cols-2 !text-sm ${className}`}>
      <span>{title}</span>
      <div className="flex items-center">
        <span>
          {shortString ? shortenString(value.toString()) : value} {unit && unit}
        </span>
        {copy && <CopyButton text={value.toString()} />}
      </div>
    </div>
  )
}

export default BillDetailsText
