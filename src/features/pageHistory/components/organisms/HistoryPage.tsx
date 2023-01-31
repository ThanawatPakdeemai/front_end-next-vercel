import React from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
// import { useTranslation } from "react-i18next"

const HistoryPage = () => {
  // const { t } = useTranslation()
  function createData(
    status: string,
    game: string,
    date: string,
    time: string,
    view: string
  ) {
    return { status, game, date, time, view }
  }

  const rows = [
    createData("Done", "Bubble Shooter", "18 NOV 2022", "05:09 PM", "View")
  ]
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Game Name</TableCell>
            <TableCell align="center">Date / Time</TableCell>
            <TableCell align="center">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.status}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {row.status}
              </TableCell>
              <TableCell align="center">{row.game}</TableCell>
              <TableCell align="center">
                {row.date}&nbsp;{row.time}
              </TableCell>
              <TableCell align="center">{row.view}</TableCell>
              {/* <Button href="#text-buttons">Link</Button> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HistoryPage
