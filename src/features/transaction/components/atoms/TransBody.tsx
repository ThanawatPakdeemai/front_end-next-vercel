import React from "react"
import { TableRow, TableCell, Chip } from "@mui/material"
import IconArrowTop from "@components/icons/arrowTopIcon"

interface IProps {
  date?: string
  time?: string
  type?: string
  amount?: number
  fee?: number
}

const TransBody = ({ date, time, type, amount, fee }: IProps) => (
  <TableRow>
    <TableCell className="font-neue-machina text-sm">
      <span className="rounded-less border-2 border-neutral-700 p-1">
        {date}
      </span>
      <span className="p-4">{time}</span>
    </TableCell>
    <TableCell align="left">
      <Chip
        label={type}
        size="small"
        className={`${
          type && type === "DepositNaka"
            ? "!bg-varidian-default font-neue-machina-bold !text-neutral-900"
            : "!bg-red-card font-neue-machina-bold !text-neutral-900"
        }`}
      />
    </TableCell>
    <TableCell
      align="left"
      className={`flex ${
        type && type === "DepositNaka"
          ? "font-neue-machina-bold text-varidian-default"
          : "font-neue-machina-bold text-red-card"
      }`}
    >
      <div>
        {type && type === "DepositNaka" ? (
          <IconArrowTop className="rotate-180" />
        ) : (
          <IconArrowTop />
        )}
      </div>
      <div>{amount?.toFixed(2)}</div>
    </TableCell>
    <TableCell
      align="right"
      className="font-neue-machina"
    >
      - {fee?.toFixed(4)}
    </TableCell>
  </TableRow>
)
export default TransBody
