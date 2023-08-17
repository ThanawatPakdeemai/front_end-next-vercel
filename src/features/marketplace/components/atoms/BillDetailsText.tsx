import React from "react"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"

const CopyButton = dynamic(() => import("@components/atoms/CopyButton"), {
  suspense: true,
  ssr: false
})
const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})

interface IProps {
  title: string
  value: string | number
  unit?: string
  className?: string
  copy?: boolean
  shortString?: boolean
  time?: string
  textColor?: string
}

const BillDetailsText = ({
  title,
  value,
  className,
  unit,
  copy,
  shortString,
  time,
  textColor
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
            textTransform: "uppercase",
            color: textColor ? `${textColor} !important` : "#A6A9AE"
          }}
        />
        {time && (
          <Typography
            className="ml-3 !text-sm font-bold"
            sx={{
              color: textColor ? `${textColor} !important` : "#4E5057"
            }}
          >
            {time}
          </Typography>
        )}
        {copy && <CopyButton text={value.toString()} />}
      </div>
    </div>
  )
}

export default BillDetailsText
