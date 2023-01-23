/* eslint-disable no-console */
import React from "react"
import { TableCell, TableSortLabel } from "@mui/material"
import SortIcon from "@components/icons/SortIcon"

interface IProps {
  label: string
  className?: string
}

const TransHead = ({ label, className }: IProps) => {
  // interface Data {
  //   calories: number
  //   carbs: number
  //   fat: number
  //   name: string
  //   protein: number
  // }

  // type Order = "asc" | "desc"

  // interface EnhancedTableProps {
  //   numSelected: number
  //   onRequestSort: (
  //     event: React.MouseEvent<unknown>,
  //     property: keyof Data
  //   ) => void
  //   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  //   order: Order
  //   orderBy: string
  //   rowCount: number
  // }

  // function EnhancedTableHead(props: EnhancedTableProps) {
  //   const {
  //     onSelectAllClick,
  //     order,
  //     orderBy,
  //     numSelected,
  //     rowCount,
  //     onRequestSort
  //   } = props
  //   const createSortHandler =
  //     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
  //       onRequestSort(event, property)
  //     }
  // }
  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof Data
  // ) => {
  //   console.log("test-sort", property)
  //   const isAsc = orderBy === property && order === "asc"
  //   console.log("test-isAsc", isAsc)
  //   console.log("test-orderBy", orderBy)
  //   console.log("test-property", property)
  //   console.log("test-order", order)
  // }
  console.log()
  return (
    <>
      <TableCell>
        <TableSortLabel
          active
          direction="asc"
          IconComponent={SortIcon}
        >
          <div className={`flex items-center text-neutral-600 ${className}`}>
            {label}
          </div>
        </TableSortLabel>
      </TableCell>
    </>
  )
}

export default TransHead
