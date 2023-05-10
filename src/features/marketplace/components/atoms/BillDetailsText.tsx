import CopyButton from "@components/atoms/CopyButton"
import { Chip } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProps {
  title: string
  value: string | number
  unit?: string
  className?: string
  copy?: boolean
  shortString?: boolean
  time?: string
}

const BillDetailsText = ({
  title,
  value,
  className,
  unit,
  copy,
  shortString,
  time
}: IProps) => {
  const { shortenString } = Helper

  return (
    <div className={`grid grid-cols-2 !text-sm ${className}`}>
      <span className="font-bold uppercase text-neutral-600">{title}</span>
      <div className="flex items-center">
        <Chip
          label={`${shortString ? shortenString(value.toString()) : value} ${
            unit || ""
          }`}
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            backgroundColor: "#010101 !important",
            textTransform: "uppercase"
          }}
        />
        {time && (
          <span className="ml-3 font-bold text-neutral-600">{time}</span>
        )}
        {copy && <CopyButton text={value.toString()} />}
      </div>
    </div>
  )
}

export default BillDetailsText
