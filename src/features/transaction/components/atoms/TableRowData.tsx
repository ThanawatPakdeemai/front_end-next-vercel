import styled from "@emotion/styled"
import { TableCell, TableRow } from "@mui/material"
import React, { memo, ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"

interface IProps {
  child: ReactNode[] // -> [<div></div>, <span></span>, <></>]
}

const RefactorTableBody = ({ child }: IProps) => {
  const TableRowStyle = styled(TableRow)({
    "&.MuiTableRow-root": {
      display: "grid",
      gridTemplateColumns: "180px 130px 130px 1fr"
    }
  })

  const TableCellStyle = styled(TableCell)({
    "&.MuiTableCell-root": {
      display: "flex",
      alignItems: "center"
    }
  })
  return (
    <TableRowStyle>
      {child.map((c) => (
        <TableCellStyle key={uuidv4()}>{c}</TableCellStyle>
      ))}
    </TableRowStyle>
  )
}

export default memo(RefactorTableBody)
