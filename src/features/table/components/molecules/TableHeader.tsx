import { ITableHeader } from "@feature/table/interface/ITable"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { styled, TableCell, TableHead, TableRow } from "@mui/material"
import React, { memo } from "react"
import { v4 as uuidv4 } from "uuid"

interface IProps {
  thead: Array<ITableHeader>
  // Example: "180px 130px 130px 1fr"
  gridTemplateColumns?: string
}

const TableHeader = ({
  thead,
  gridTemplateColumns = "180px 130px 130px 1fr"
}: IProps) => {
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
    "&.MuiTableCell-root": {
      display: "flex",
      alignItems: "center"
    }
  })

  const CellStyled =
    "flex border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase cursor-pointer"

  return (
    <TableHead
      sx={{
        display: "block"
      }}
      className="px-3.5"
    >
      <TableRowStyle>
        {thead.map((h) => (
          <TableCellStyle
            key={uuidv4()}
            className={CellStyled}
            onClick={h.onClick}
          >
            <div className={h.className ? h.className : "flex items-center"}>
              {h.title} {/* title => string <div className="flex"></div> */}
              {h.arrowIcon ? (
                <div className="ml-1 flex flex-col gap-1">
                  <KeyboardArrowUp
                    className={`!text-sm" h-4 w-4 ${
                      h.keyUp ? "text-neutral-400" : null
                    }`}
                  />
                  <KeyboardArrowDown
                    className={`h-4 w-4 !text-sm  ${
                      h.keyDown ? "text-neutral-400" : null
                    }`}
                  />
                </div>
              ) : null}
              {h.filterIcon ? h.child : null}
            </div>
          </TableCellStyle>
        ))}
      </TableRowStyle>
    </TableHead>
  )
}

export default memo(TableHeader)
