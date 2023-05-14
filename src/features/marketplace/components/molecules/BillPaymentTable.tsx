import { IInstallData } from "@feature/marketplace/interfaces/IMarketService"
import React, { useMemo } from "react"
import { Chip, Table, TableBody, TableContainer } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import { Trans } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import Helper from "@utils/helper"
import dayjs from "dayjs"

interface IProps {
  insData: IInstallData
}

const BillPaymentTable = ({ insData }: IProps) => {
  const { handleDateTimeFormat } = Helper

  const paymentTableHeader = useMemo(
    () => [
      {
        title: <Trans i18nKey="time" />
      },
      {
        title: <Trans i18nKey="price" />
      },
      {
        title: <Trans i18nKey="status" />
      }
    ],
    []
  )

  const handlePeriodBill = (_dueDate: Date, _historyId: string | null) => {
    if (_historyId !== null) {
      return {
        label: "paid",
        color: "#3DCD95",
        text: "#010101 !important"
      }
    }
    if (
      _historyId === null &&
      dayjs(new Date()) > dayjs(_dueDate).add(7, "days")
    ) {
      return {
        label: "unpaid",
        color: "#F42728",
        text: "#010101 !important"
      }
    }
    return {
      label: "pending",
      color: "#010101",
      text: "#E1E2E2 !important"
    }
  }

  return (
    <TableContainer className="mt-5 rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
      <Table>
        <TableHeader
          thead={paymentTableHeader}
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
          {insData && insData.period.length > 0 ? (
            insData.period.map((item) => (
              <TableRowData
                key={uuidv4()}
                gridTemplateColumns="1fr 1fr 1fr"
                child={[
                  <div key={item._id}>
                    <Chip
                      label={handleDateTimeFormat(item.due_date, "date")}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        backgroundColor: "#010101 !important",
                        textTransform: "uppercase"
                      }}
                    />
                    <span className="ml-3 text-xs font-bold text-neutral-600">
                      {handleDateTimeFormat(item.due_date, "time")}
                    </span>
                  </div>,
                  <div key={item._id}>
                    <span className="px-3 font-neue-machina-bold text-sm text-neutral-300">
                      {item.price.toFixed(4)}
                    </span>
                  </div>,
                  <div key={item._id}>
                    <Chip
                      label={
                        handlePeriodBill(item.due_date, item.history_id).label
                      }
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        backgroundColor: `${
                          handlePeriodBill(item.due_date, item.history_id).color
                        } !important`,
                        textTransform: "uppercase",
                        color: handlePeriodBill(item.due_date, item.history_id)
                          .text
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

export default BillPaymentTable
