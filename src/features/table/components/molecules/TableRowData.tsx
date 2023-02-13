import styled from "@emotion/styled"
import { TableCell, TableRow } from "@mui/material"
import React, { memo, ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"

interface ITableRowDataProps {
  // Example: [<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>]
  child: ReactNode[]
  // Example: "180px 130px 130px 1fr"
  gridTemplateColumns?: string
}

const RefactorTableBody = ({
  child,
  gridTemplateColumns = "180px 140px 130px 1fr"
}: ITableRowDataProps) => {
  /**
   * @description This is the table row style
   */
  const TableRowStyle = styled(TableRow)({
    ":root": {
      color: "red"
    },
    "&.MuiTableRow-root": {
      display: "grid",
      gridTemplateColumns
    }
  })

  const TableCellStyle = styled(TableCell)({
    ":root": {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      textOverflow: "ellipsis",
      text: "uppercase"
    },
    "&.MuiTableCell-root": {
      display: "flex",
      alignItems: "center"
    }
  })
  return (
    <TableRowStyle className="bg-neutral-900 px-3.5">
      {child.map((c) => (
        <TableCellStyle
          className="border-b-neutral-800 px-0"
          key={uuidv4()}
        >
          {c}
        </TableCellStyle>
      ))}
    </TableRowStyle>
  )
}

export default memo(RefactorTableBody)
