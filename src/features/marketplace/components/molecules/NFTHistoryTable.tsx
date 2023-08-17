import React, { useMemo } from "react"
import { Trans } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { IMarketHistory } from "@feature/marketplace/interfaces/IMarketService"

const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const Table = dynamic(() => import("@mui/material/Table"), {
  suspense: true,
  ssr: false
})
const TableBody = dynamic(() => import("@mui/material/TableBody"), {
  suspense: true,
  ssr: false
})
const TableContainer = dynamic(() => import("@mui/material/TableContainer"), {
  suspense: true,
  ssr: false
})
const TableHeader = dynamic(
  () => import("@feature/table/components/molecules/TableHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const TableNodata = dynamic(
  () => import("@feature/transaction/components/atoms/TableNodata"),
  {
    suspense: true,
    ssr: false
  }
)
const TableRowData = dynamic(
  () => import("@feature/table/components/molecules/TableRowData"),
  {
    suspense: true,
    ssr: false
  }
)
const CopyButton = dynamic(() => import("@components/atoms/CopyButton"), {
  suspense: true,
  ssr: false
})

interface IProp {
  history: IMarketHistory[]
}

const NFTHistoryTable = ({ history }: IProp) => {
  const { handleDateTimeFormat, shortenString } = Helper

  const historyTableHeader = useMemo(
    () => [
      {
        title: <Trans i18nKey="time" />
      },
      {
        title: <Trans i18nKey="transfer" />
      },
      {
        title: <Trans i18nKey="price" />
      },
      {
        title: <Trans i18nKey="event" />
      }
    ],
    []
  )

  const handleEventColor = (_event: string) => {
    switch (_event) {
      case "installment":
        return "secondary"
      case "sell":
        return "error"
      case "buy":
        return "success"
      case "mint":
        return "info"
      case "rental":
        return "warning"
      default:
        return "primary"
    }
  }

  return (
    <TableContainer className="mt-5 rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
      <Table>
        <TableHeader
          thead={historyTableHeader}
          gridTemplateColumns="1fr 2fr 1fr 1fr"
        />
        <TableBody
          sx={{
            display: "block",
            borderRadius: "9px",
            overflow: "hidden",
            "tr:last-of-type td": { borderBottom: 0 }
          }}
        >
          {history && history.length > 0 ? (
            history.map((item) => (
              <TableRowData
                key={uuidv4()}
                gridTemplateColumns="1fr 2fr 1fr 1fr"
                child={[
                  <div
                    key={item._id}
                    className="flex flex-col justify-start gap-y-4"
                  >
                    <Chip
                      label={handleDateTimeFormat(item.timestamp, "date")}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        backgroundColor: "#010101 !important",
                        textTransform: "uppercase"
                      }}
                    />
                    <span className="text-xs font-bold text-neutral-600">
                      {handleDateTimeFormat(item.timestamp, "time")}
                    </span>
                  </div>,
                  <div
                    className="flex flex-col gap-y-2"
                    key={item._id}
                  >
                    <div className="flex items-center">
                      <span className="w-16 px-3 font-neue-machina-bold text-sm text-neutral-600">
                        FROM{" "}
                      </span>
                      <Chip
                        label={
                          item.seller === "nakamoto.games"
                            ? item.seller
                            : shortenString(item.seller)
                        }
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{
                          backgroundColor: "#010101 !important",
                          textTransform: "uppercase"
                        }}
                      />
                      <CopyButton text={item.seller} />
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 px-3 font-neue-machina-bold text-sm text-neutral-600">
                        TO{" "}
                      </span>
                      <Chip
                        label={shortenString(item.buyer)}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{
                          backgroundColor: "#010101 !important",
                          textTransform: "uppercase"
                        }}
                      />
                      <CopyButton text={item.buyer} />
                    </div>
                  </div>,
                  <span
                    className="px-3 font-neue-machina-bold text-sm text-neutral-300"
                    key={item._id}
                  >
                    {item.price.toFixed(4)}
                  </span>,
                  <div key={item._id}>
                    <Chip
                      label={item.event.toLocaleUpperCase()}
                      variant="filled"
                      color={handleEventColor(item.event.toLowerCase())}
                      size="small"
                    />
                  </div>
                ]}
              />
            ))
          ) : (
            <TableNodata />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default NFTHistoryTable
