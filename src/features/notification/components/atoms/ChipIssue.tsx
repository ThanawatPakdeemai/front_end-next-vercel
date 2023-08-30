import React, { memo } from "react"
import { INotification } from "@feature/notification/interfaces/INotificationService"

interface IProps {
  data: INotification
}

const ChipIssue = ({ data }: IProps) => (
  <div
    className={`mt-1 h-[20px] w-fit rounded ${
      data.read === false ? "bg-red-card" : "bg-neutral-600"
    } px-2 pt-1 uppercase text-info-contrastText`}
  >
    {data.type}
  </div>
)

export default memo(ChipIssue)
