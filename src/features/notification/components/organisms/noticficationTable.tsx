import React, { memo } from "react"
import VectorTop from "src/features/notification/components/atoms/icon/vectorTop"
import VectorBottom from "src/features/notification/components/atoms/icon/vectorBottom"
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material"
import NoticItem from "./noticItem"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  data: INotification[]
  onHandleSortBy: (_text: string) => void
}
const NoticficationsTable = ({ data, onHandleSortBy }: IProps) => {
  const handleKeyword = (_text: string) => {
    onHandleSortBy(_text)
  }
  return (
    <TableContainer
      sx={{
        borderRadius: "14px"
      }}
      className="mb-10 bg-neutral-800 p-2"
    >
      <Table className="w-full bg-neutral-800 p-2 text-[10px]">
        <TableHead className="h-10 pl-2 uppercase text-neutral-600">
          <TableRow className="flex">
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-40 flex-initial font-neue-machina"
            >
              time
              <div>
                <Button
                  onClick={() => {
                    handleKeyword("dateDESC")
                  }}
                >
                  <VectorTop color="#4E5057" />
                </Button>
                <VectorBottom color="#4E5057" />
              </div>
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-32 flex-initial font-neue-machina"
            >
              issue
              <VectorTop color="#4E5057" />
              <VectorBottom color="#4E5057" />
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-32 flex-initial font-neue-machina"
            >
              game
              <VectorTop color="#4E5057" />
              <VectorBottom color="#4E5057" />
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-44 flex-initial font-neue-machina"
            >
              details
            </TableCell>
            <TableCell
              sx={{
                border: 0,
                py: 0
              }}
              className="flex w-fit text-end font-neue-machina"
            >
              view
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            borderRadius: "9px"
          }}
          className="divide-y divide-neutral-800 rounded-2xl bg-neutral-900 px-3"
        >
          {data &&
            data.map((el) => (
              <NoticItem
                key={el._id}
                data={el}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default memo(NoticficationsTable)
