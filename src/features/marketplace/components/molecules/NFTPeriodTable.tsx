import {
  IInstallPeriod,
  IRentalPeriod
} from "@feature/marketplace/interfaces/IMarketService"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import { Chip, Table, TableBody, TableContainer } from "@mui/material"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import React from "react"
import { Trans } from "react-i18next"
import { v4 as uuidv4 } from "uuid"

interface IProps {
  periodHistory: IInstallPeriod[] | IRentalPeriod[]
}

const TABLE_HEADER = [
  {
    title: <Trans i18nKey="time" />
  },
  {
    title: <Trans i18nKey="price" />
  },
  {
    title: <Trans i18nKey="status" />
  }
]

const NFTPeriodTable = ({ periodHistory }: IProps) => {
  const { handleDateTimeFormat } = Helper

  function isRental(
    period: IInstallPeriod | IRentalPeriod
  ): period is IRentalPeriod {
    return "claim_status" in period
  }

  const handlePeriodBill = (
    _dueDate: Date,
    _period: IInstallPeriod | IRentalPeriod
  ) => {
    let _label: string = ""
    let _color: string = ""
    let _text: string = ""
    if (isRental(_period)) {
      if (_period.claim_status) {
        _label = "claimed"
        _color = "#70727B"
        _text = "#010101 !important"
      } else {
        _label = "claim"
        _color = "#27F1EC"
        _text = "#010101 !important"
      }
    } else if (_period.history_id) {
      _label = "paid"
      _color = "#3DCD95"
      _text = "#010101 !important"
    } else if (
      !_period.history_id &&
      dayjs(new Date()) > dayjs(_dueDate).add(7, "days")
    ) {
      _label = "unpaid"
      _color = "#F42728"
      _text = "#010101 !important"
    } else {
      _label = "pending"
      _color = "#010101"
      _text = "#E1E2E2 !important"
    }
    return { label: _label, color: _color, text: _text }
  }

  return (
    <TableContainer className="mt-5 rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
      <Table>
        <TableHeader
          thead={TABLE_HEADER}
          gridTemplateColumns="1fr 1fr 1fr"
        />
        <TableBody
          sx={{
            display: "block",
            borderRadius: "9px",
            overflow: "hidden",
            "tr:last-of-type td": { borderBottom: 0 }
          }}
        >
          {periodHistory && periodHistory.length > 0 ? (
            periodHistory.map((p) => (
              <TableRowData
                key={uuidv4()}
                gridTemplateColumns="1fr 1fr 1fr"
                child={[
                  <div key={p._id}>
                    <Chip
                      label={handleDateTimeFormat(p.due_date, "date")}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        backgroundColor: "#010101 !important",
                        textTransform: "uppercase"
                      }}
                    />
                    <span className="ml-3 text-xs font-bold text-neutral-600">
                      {handleDateTimeFormat(p.due_date, "time")}
                    </span>
                  </div>,
                  <div key={p._id}>
                    <span className="px-3 font-neue-machina-bold text-sm text-neutral-300">
                      {p.price.toFixed(4)}
                    </span>
                  </div>,
                  <div key={p._id}>
                    <Chip
                      label={handlePeriodBill(p.due_date, p).label}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        backgroundColor: `${
                          handlePeriodBill(p.due_date, p).color
                        } !important`,
                        textTransform: "uppercase",
                        color: handlePeriodBill(p.due_date, p).text
                      }}
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

export default NFTPeriodTable
