import React from "react"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { IMetaDate } from "@feature/blog/interfaces/IMeta"

const MetaDate = ({ date, dateTitle = "RELEASE DATE" }: IMetaDate) => {
  const { t } = useTranslation()
  return (
    <div className="date-wrapper flex h-full w-full grid-rows-2 flex-col justify-center gap-2 pl-10">
      {dateTitle && (
        <div className="date-wrapper--title font-neue-machina text-sm text-white-default">
          {t(`${dateTitle}`)}
        </div>
      )}
      <div className="date-wrapper--text">
        <div className="text-default text-neutral-500">
          {dayjs(date).format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  )
}

export default MetaDate
