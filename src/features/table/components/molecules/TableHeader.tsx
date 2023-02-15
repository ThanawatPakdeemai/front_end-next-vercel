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
  gridTemplateColumns = "180px 140px 130px 1fr"
}: IProps) => {
  const TableRowStyle = styled(TableRow)({
    ":root": {
      color: "red"
    },
    marginTop: "15px",
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
    "flex border-b-0 pt-0 pb-1 px-0 text-neutral-600 text-start font-neue-machina-bold text-xs uppercase cursor-pointer"

  return (
    <TableHead
      sx={{
        display: "block"
      }}
      className=" px-3.5"
    >
      <TableRowStyle className="">
        {thead.map((h) => (
          <TableCellStyle
            key={uuidv4()}
            className={`${CellStyled} bg-neutral-780`}
            onClick={h.onClick}
          >
            <div
              className={h.className ? h.className : "flex w-full items-center"}
            >
              {h.title} {/* title => string <div className="flex"></div> */}
              {h.arrowIcon ? (
                <div className="ml-1 flex flex-col gap-1">
                  <KeyboardArrowUp
                    className={`mb-[-9px] h-3 w-3 ${
                      h.keyUp ? "text-neutral-400" : null
                    }`}
                  />
                  <KeyboardArrowDown
                    className={`h-3 w-3 ${
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
