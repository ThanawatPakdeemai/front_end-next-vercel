import React from "react"

export interface IViewCountProps {
  count: number
  icon?: React.ReactNode
}

const ViewCount = ({ count, icon }: IViewCountProps) => (
  <div className="absolute bottom-0 flex h-auto w-full border-2 border-neutral-780 bg-primary-main">
    <div className="mx-12 grid h-[70px] w-full grid-cols-2 items-center gap-4 md:w-max">
      <div className="items-center gap-3 md:flex">
        {icon}
        <div className="text-sm text-neutral-100">{count}</div>
      </div>
    </div>
  </div>
)

export default ViewCount
