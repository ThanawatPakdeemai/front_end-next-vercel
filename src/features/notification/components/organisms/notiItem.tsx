import React, { memo } from "react"
import { Button, TableRow, TableCell, Chip } from "@mui/material"
import dayjs from "dayjs"
import { useTranslation } from "next-i18next"
import Issue from "../atoms/issue"

import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification
  onHandleView: (_data: INotification) => void
}

const NotiItem = ({ data, onHandleView }: IProps) => {
  const { t } = useTranslation()

  return (
    <TableRow className="flex h-14 pt-3 text-neutral-600">
      <TableCell
        sx={{
          p: 0
        }}
        className="flex w-40 flex-initial font-neue-machina "
      >
        <Chip
          label={dayjs(data.createdAt).format("DD MMM YYYY")}
          variant="outlined"
          size="small"
          className="mr-1 mt-1 rounded pt-1 pl-0.5 text-[10px] uppercase text-grey-neutral04"
        />
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
      <Button
        variant="outlined"
        sx={{
          paddingX: "10px !important",
          marginTop: "4px !important",
          minWidth: "10px !important",
          borderRadius: "5px !important"
        }}
        className="h-6 flex-none justify-self-end font-neue-machina text-[10px] uppercase text-grey-neutral04"
        onClick={() => {
          onHandleView(data)
        }}
      >
        {t("view")}
      </Button>
    </TableRow>
  )
}
export default memo(NotiItem)
