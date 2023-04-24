/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import React, { memo, useEffect, useState } from "react"
import { Table, TableContainer } from "@mui/material"
import { useTranslation } from "next-i18next"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import ListNotification from "@components/icons/ListNotification"
import VerifiediconNotification from "@components/icons/VerifiediconNotification"
import dayjs from "dayjs"

interface IProps {
  page: number
  limit: number
  data: INotification[]
  sortBy: string
  onHandleSortBy: (_text: string) => void
  onHandleView: (_data: INotification) => void
}
const NotificationsTableMobile = ({
  page,
  limit,
  data,
  sortBy,
  onHandleSortBy,
  onHandleView
}: IProps) => {
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)

  useEffect(() => {
    let load = false

    if (!load) {
      setStart((page - 1) * limit)
      setEnd(page * limit)
    }

    return () => {
      load = true
    }
  }, [page, limit])

  return (
    <TableContainer
      sx={{
        borderRadius: "14px"
      }}
      className="mb-10 bg-black-100 p-2"
    >
      <Table className="w-full flex-col">
        {data &&
          data.slice(start, end).map((el) => (
            <div
              className={`flex border-b-2 border-neutral-800 py-4  ${
                el.read && "brightness-50"
              } `}
              onClick={() => {
                onHandleView(el)
              }}
            >
              <div className="relative">
                <ListNotification />
                {!el.read && (
                  <div className="absolute right-2 top-2 h-[10px] w-[10px] rounded-full bg-error-main" />
                )}
              </div>
              <div className="ml-2  flex w-full flex-col content-center items-start justify-center">
                <div className="flex w-full justify-between">
                  <div className="flex">
                    <p className="mr-2 text-white-default">{el.game_name}</p>
                    <VerifiediconNotification />
                  </div>
                  <p className="text-sm text-neutral-600">
                    {dayjs(el.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
                <p className="text-neutral-600">{el.detail}</p>
              </div>
            </div>
          ))}
      </Table>
    </TableContainer>
  )
}

export default memo(NotificationsTableMobile)
