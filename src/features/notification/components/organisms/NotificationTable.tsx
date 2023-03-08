import React, { memo, useEffect, useState } from "react"
import {
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell
} from "@mui/material"
import { useTranslation } from "next-i18next"
import { INotification } from "../../interfaces/INotificationService"
import NotificationItem from "./NotificationItem"
import VectorTop from "../atoms/icons/VectorTop"
import VectorBottom from "../atoms/icons/VectorBottom"

interface IProps {
  page: number
  limit: number
  data: INotification[]
  sortBy: string
  onHandleSortBy: (_text: string) => void
  onHandleView: (_data: INotification) => void
}
const NotificationsTable = ({
  page,
  limit,
  data,
  sortBy,
  onHandleSortBy,
  onHandleView
}: IProps) => {
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)
  const { t } = useTranslation()

  useEffect(() => {
    setStart((page - 1) * limit)
    setEnd(page * limit)
  }, [page, limit])

  const handleKeyword = (_text: string) => {
    onHandleSortBy(_text)
  }
  return (
    <TableContainer
      sx={{
        borderRadius: "14px"
      }}
      className="mb-10 bg-neutral-800 p-2"
    >
      <Table className="w-full flex-col bg-neutral-800 p-2 text-[10px]">
        <TableHead className="h-10 pl-2 uppercase text-neutral-600">
          <TableRow className="flex">
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-40 flex-initial pt-3 font-neue-machina"
            >
              {t("time")}
              <div className="grid">
                <IconButton
                  size="small"
                  onClick={() => {
                    handleKeyword("dateDESC")
                  }}
                >
                  <VectorTop
                    color={sortBy === "dateDESC" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    pt: 0
                  }}
                  size="small"
                  onClick={() => {
                    handleKeyword("dateASC")
                  }}
                >
                  <VectorBottom
                    color={sortBy === "dateASC" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
              </div>
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="relative flex w-32 flex-initial pt-3 font-neue-machina"
            >
              {t("issue")}
              <div className="absolute right-12 grid">
                <IconButton
                  size="small"
                  onClick={() => {
                    handleKeyword("read")
                  }}
                >
                  <VectorTop
                    color={sortBy === "read" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    pt: 0
                  }}
                  size="small"
                  onClick={() => {
                    handleKeyword("unread")
                  }}
                >
                  <VectorBottom
                    color={sortBy === "unread" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
              </div>
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="relative flex w-32 flex-initial pt-3 font-neue-machina"
            >
              {t("Games")}
              <div className="absolute right-12 grid">
                <IconButton
                  size="small"
                  onClick={() => {
                    handleKeyword("nameASC")
                  }}
                >
                  <VectorTop
                    color={sortBy === "nameASC" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    pt: 0
                  }}
                  size="small"
                  onClick={() => {
                    handleKeyword("nameDESC")
                  }}
                >
                  <VectorBottom
                    color={sortBy === "nameDESC" ? "#A6A9AE" : "#4E5057"}
                  />
                </IconButton>
              </div>
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-44 flex-initial pt-3 font-neue-machina"
            >
              {t("details")}
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-fit pt-3 text-end font-neue-machina"
            >
              {t("view")}
            </TableCell>
          </TableRow>
        </TableHead>
        <div className="divide-y divide-neutral-800 rounded-lg bg-neutral-900 px-3">
          {data &&
            data.slice(start, end).map((el) => (
              <NotificationItem
                key={el._id}
                data={el}
                onHandleView={onHandleView}
              />
            ))}
        </div>
      </Table>
    </TableContainer>
  )
}

export default memo(NotificationsTable)
