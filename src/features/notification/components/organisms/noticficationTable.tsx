import React, { memo } from "react"
import VectorTop from "src/features/notification/components/atoms/icon/vectorTop"
import VectorBottom from "src/features/notification/components/atoms/icon/vectorBottom"
import { Button } from "@mui/material"
import NoticItem from "./noticItem"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification[]
  onHandleSortBy: (_text: string) => void
}

const NoticficationsTable = ({ data, onHandleSortBy }: IProps) => {
  const handleKeyword = (_text: string) => {
    onHandleSortBy(_text)
  }
  return (
    <div className="mb-10 w-full rounded-2xl bg-neutral-800 p-2 text-[10px]">
      <div className="flex h-10 pl-3 pt-5 uppercase text-neutral-600">
        <div className="flex w-40 flex-initial">
          time
          <div className="pl-1">
            <Button
              variant="outlined"
              onClick={() => handleKeyword("dateDESC")}
            >
              <VectorTop color="#4E5057" />
            </Button>
            <VectorBottom color="#4E5057" />
          </div>
        </div>
        <div className="flex w-32 flex-initial ">
          issue
          <div className="pt-0.5 pl-1">
            <VectorTop color="#4E5057" />
            <VectorBottom color="#4E5057" />
          </div>
        </div>
        <div className="flex w-32 flex-initial">
          game
          <div className="pt-0.5 pl-1">
            <VectorTop color="#4E5057" />
            <VectorBottom color="#4E5057" />
          </div>
        </div>
        <div className="w-44 flex-initial">details</div>
        <div className="w-fit text-end">view</div>
      </div>
      <div className="divide-y divide-neutral-800 rounded-lg bg-neutral-900 px-3 ">
        {data &&
          data.map((el) => (
            <NoticItem
              key={el._id}
              data={el}
            />
          ))}
      </div>
    </div>
  )
}

export default memo(NoticficationsTable)
