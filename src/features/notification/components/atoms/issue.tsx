import React, { memo } from "react"
import { INotification } from "@feature/notification/interfaces/INotificationService"

interface IProps {
  data: INotification
}

const issue = ({ data }: IProps) => (
  <>
    <div
      className={`mt-1 w-fit rounded ${
        data.read === false ? "bg-[#F42728]" : "bg-[#4E5057]"
      } px-2 pt-1 uppercase text-[#010101]`}
    >
      {data.type}
    </div>
  </>
)

export default memo(issue)
