import React, { memo } from "react"
import NoticItem from "./noticItem"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification[]
}

const NoticficationsTable = ({ data }: IProps) => (
  <div className="mb-10 w-full rounded-2xl bg-[#101013] p-2 text-[10px]">
    <div className="flex h-10 pl-3 pt-5 uppercase text-[#4E5057]">
      <div className="w-40 flex-initial">time</div>
      <div className="w-32 flex-initial ">issue</div>
      <div className="w-32 flex-initial">game</div>
      <div className="w-44 flex-initial">details</div>
      <div className="w-fit text-end">view</div>
    </div>
    <div className="divide-y divide-[#18181C] rounded-lg bg-[#010101] px-3 ">
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

export default memo(NoticficationsTable)
