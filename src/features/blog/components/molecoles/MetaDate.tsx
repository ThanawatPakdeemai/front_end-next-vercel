import React from "react"
import dayjs from "dayjs"

export interface IMetaDate {
  date: string
  dateTitle?: string
}

const MetaDate = ({ date, dateTitle = "RELEASE DATE" }: IMetaDate) => (
  <div className="date-wrapper grid grid-rows-2">
    {dateTitle && (
      <div className="date-wrapper--title items-middle flex px-6 pt-4 font-neue-machina text-sm text-white-default">
        {dateTitle}
      </div>
    )}

    <div className="date-wrapper--text px-6 pt-4 pb-2">
      <div className="text-default text-neutral-500">
        {dayjs(date).format("DD MMMM YYYY")}
      </div>
    </div>
  </div>
  // <div className=" max-h-32 w-full border-t-2 border-r-2 border-neutral-780 lg:w-2/12">
  //     <div className=" px-6 pt-4 font-neue-machina text-sm text-white-default">
  //       DATE
  //     </div>
  //     <div className="border-l-2 border-neutral-780 px-6 pt-4 pb-2">
  //       <span className="text-default text-neutral-500">
  //         {dayjs(getBlogDetails.data?.date_released).format("DD MMM YYYY")}
  //       </span>
  //     </div>
  //   </div>
)

export default MetaDate
