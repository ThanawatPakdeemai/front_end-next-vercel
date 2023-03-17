import React from "react"

export interface IViewCountProps {
  count: number
  icon?: React.ReactNode
}

const ViewCount = ({ count, icon }: IViewCountProps) => (
  <div className="flex items-center gap-2">
    <div className="scale-75">{icon}</div>
    <div className="text-sm text-neutral-100">{count}</div>
  </div>
)

export default ViewCount
