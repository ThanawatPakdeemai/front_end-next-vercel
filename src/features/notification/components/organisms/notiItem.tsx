import React, { memo } from "react"
import { TableRow, TableCell } from "@mui/material"
import dayjs from "dayjs"
import Issue from "../atoms/issue"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification
}

const NotiItem = ({ data }: IProps) => (
  <TableRow className="flex h-14 pt-3 text-neutral-600">
    <TableCell
      sx={{
        p: 0
      }}
      className="flex w-40 flex-initial font-neue-machina "
    >
      <div className="mr-1 mt-1 h-5 w-[78px] rounded border pt-1 pl-0.5 text-[10px] uppercase text-grey-neutral04 ">
        {dayjs(data.createdAt).format("DD MMM YYYY")}
      </div>
      <div className="ml-2 pt-2 text-[10px]">
        {dayjs(data.createdAt).format("hh:mm A")}
      </div>
    </TableCell>
    <TableCell
      sx={{
        p: 0
      }}
      className="w-32 flex-initial font-neue-machina text-[10px]"
    >
      <Issue data={data} />
    </TableCell>
    <TableCell
      sx={{
        p: 0
      }}
      className="w-32 flex-initial font-neue-machina text-[10px] uppercase text-neutral-300"
    >
      {data.game_name}
    </TableCell>
    <TableCell
      sx={{
        p: 0,
        pr: 1
      }}
      className="w-44 flex-initial font-neue-machina text-[10px] uppercase"
    >
      {data.detail}
    </TableCell>
    <TableCell
      sx={{
        borderBottom: 1,
        p: 0,
        pl: "9px",
        pt: "3px"
      }}
      className="mt-1 h-5 w-12 flex-none justify-self-end rounded border  font-neue-machina text-[10px] uppercase text-grey-neutral04 "
    >
      view
    </TableCell>
  </TableRow>
)
export default memo(NotiItem)
