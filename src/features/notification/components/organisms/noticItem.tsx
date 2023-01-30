import React, { memo } from "react"
import dayjs from "dayjs"
import Issue from "../atoms/issue"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification
}

const NoticItem = ({ data }: IProps) => (
  <div className="flex h-14 pt-3 text-[#4E5057]">
    <div className="flex w-40 flex-initial ">
      <div className="mr-1 mt-1 h-5 w-[78px] rounded border p-1 uppercase text-[#A6A9AE] ">
        {dayjs(data.createdAt).format("DD MM YYYY")}
      </div>
      <div className="ml-2 pt-2">{dayjs(data.createdAt).format("hh:mm A")}</div>
    </div>
    <div className="w-32 flex-initial">
      <Issue data={data} />
    </div>
    <div className="w-32 flex-initial uppercase text-[#E1E2E2]">
      {data.game_name}
    </div>
    <div className="w-44 flex-initial uppercase">{data.detail}</div>
    <div className="mt-1 h-5 w-12 flex-none justify-self-end rounded border px-2 py-0.5 uppercase text-[#A6A9AE] ">
      view
    </div>
  </div>
)
export default memo(NoticItem)
