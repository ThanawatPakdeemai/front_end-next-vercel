import styled from "@emotion/styled"
import { TableCell, TableRow } from "@mui/material"
import React, { memo } from "react"
import NoData from "@components/molecules/NoData"

interface IProps {
  className?: string
}

const TableNoData = ({ className }: IProps) => {
  /**
   * @description This is the table row style
   */
  const TableRowStyle = styled(TableRow)({
    "&.MuiTableRow-root": {
      display: "grid",
      justifyItems: "center"
    }
  })

  const TableCellStyle = styled(TableCell)({
    "&.MuiTableCell-root": {
      display: "flex",
      alignItems: "center"
    }
  })
  return (
    <TableRowStyle className={`${className} bg-neutral-900 px-3.5`}>
      <TableCellStyle className="font-neue-machina-bold uppercase text-neutral-400">
        <NoData />
      </TableCellStyle>
    </TableRowStyle>
  )
}

export default memo(TableNoData)
