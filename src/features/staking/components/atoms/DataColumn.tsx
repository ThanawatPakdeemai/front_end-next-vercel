import React from "react"

export interface IDataColumn {
  title: string
  value: string
  valueColor?: string
  className?: string
}

const DataColumn = ({
  title,
  value,
  valueColor = "text-varidian-default",
  className
}: IDataColumn) => (
  <div
    className={`border-b-solid flex w-full items-center justify-between border-b border-b-neutral-800 py-3 font-neue-machina-semi text-sm uppercase ${className}`}
  >
    <p className="max-w-[50@media  () {}%] text-neutral-500">{title}</p>
    <p className={`${valueColor}`}>{value}</p>
  </div>
)

export default DataColumn
