import React from "react"
import { TableRow, TableCell, Chip, Divider } from "@mui/material"
import IconArrowTop from "@components/icons/arrowTopIcon"

interface IProps {
  date?: string
  time?: string
  type?: string
  amount?: number
  fee?: number
}

const TransBody = ({ date, time, type, amount, fee }: IProps) => (
  <TableRow
    sx={{
      "& .MuiTableCell-root": {
        pl: "14px",
        py: "18px"
      }
    }}
    className="border-b-[1px] border-neutral-700"
  >
    {/* <Divider className="w-1" /> */}
    {/* <hr className="w-100" /> */}
    <TableCell className="font-neue-machina-bold text-sm">
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
          ? "font-neue-machina-bold text-sm text-varidian-default"
          : "font-neue-machina-bold text-sm text-red-card"
      }`}
    >
      <div className="pr-[8.35px]">
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
      className="font-neue-machina-bold text-sm"
    >
      - {fee?.toFixed(4)}
    </TableCell>
  </TableRow>
)
export default TransBody
