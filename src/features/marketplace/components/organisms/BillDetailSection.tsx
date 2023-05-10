import { IInstallData } from "@feature/marketplace/interfaces/IMarketService"
import {
  Box,
  Chip,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs
} from "@mui/material"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import { Trans } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import BillDetailsText from "../atoms/BillDetailsText"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className?: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {children}
    </div>
  )
}

interface IProp {
  insData: IInstallData
}

//  <Box
//    component="div"
//    className={`mt-5 rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px] ${1}`}
//  >
//    <span className="font-bold uppercase text-neutral-600">Total bill</span>
//  </Box>

const BillDetailSection = ({ insData }: IProp) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleDateTime = (date: Date, type: "date" | "time") => {
    if (type === "date") {
      return dayjs(date).format("DD MMM YYYY")
    }
    return dayjs(date).format("HH:mm A")
  }

  const handlePeriodBill = (dueDate: Date, historyId: string | null) => {
    if (historyId !== null) {
      return {
        label: "paid",
        color: "#3DCD95",
        text: "#010101 !important"
      }
    }
    if (
      historyId === null &&
      dayjs(new Date()) > dayjs(dueDate).add(7, "days")
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

  const tabSx = {
    minHeight: "40px",
    height: "40px",
    "&.Mui-selected": {
      backgroundColor: "#010101",
      color: "#E1E2E2"
    }
  }

  const tabClassName =
    "!min-h-10 !rounded-lg bg-neutral-800 !text-sm !capitalize text-neutral-500 !opacity-100"

  const billTableHeader = useMemo(
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

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className="h-[50px] w-fit rounded-[13px] bg-neutral-700 p-[5px] !text-white-primary"
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#00000000" } }}
      >
        <Tab
          label="Bill Details"
          icon={<FavoriteIcon />}
          iconPosition="start"
          className={`${tabClassName} mr-[5px]`}
          sx={tabSx}
        />
        <Tab
          label="Payment"
          icon={<FavoriteIcon />}
          iconPosition="start"
          className={`${tabClassName} mr-[5px]`}
          sx={tabSx}
        />
        <Tab
          label="Bill Details"
          icon={<FavoriteIcon />}
          iconPosition="start"
          className={`${tabClassName}`}
          sx={tabSx}
        />
      </Tabs>
      {/* bill details */}
      <TabPanel
        value={value}
        index={0}
      >
        <Box
          component="div"
          className="mt-5 rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px]"
        >
          <BillDetailsText
            title="Date Created"
            value={handleDateTime(insData.created_at, "date")}
            time={handleDateTime(insData.created_at, "time")}
            className="border-b border-neutral-800 pb-3"
          />
          <BillDetailsText
            title="Due Date"
            value={handleDateTime(insData.created_at, "date")}
            time={handleDateTime(insData.created_at, "time")}
            className="border-b border-neutral-800 py-3"
          />
          <BillDetailsText
            title="Bill Id"
            value={insData.bill_id}
            className="border-b border-neutral-800 py-3"
            copy
            shortString
          />
          <BillDetailsText
            title="Seller"
            value={insData.seller_address}
            className="border-b border-neutral-800 py-3"
            copy
            shortString
          />
          <BillDetailsText
            title="Buyer"
            value={insData.buyer_address}
            className="border-b border-neutral-800 py-3"
            copy
            shortString
          />
          <BillDetailsText
            title="Period"
            value={insData.periodTotal}
            className="border-b border-neutral-800 py-3"
            unit="Months"
          />
          <BillDetailsText
            title="Period left"
            value={insData.periodBalance}
            className="border-b border-neutral-800 py-3"
            unit={insData.periodBalance === 1 ? "Month" : "Months"}
          />
          <BillDetailsText
            title="Monthly payment"
            value={insData.payByperiod.toFixed(4)}
            className="border-b border-neutral-800 py-3"
            unit="Naka"
          />
          <BillDetailsText
            title="Prepaid"
            value={insData.prePay.toFixed(4)}
            className="border-b border-neutral-800 py-3"
            unit="Naka"
          />
          <BillDetailsText
            title="Bill Balance"
            value={insData.billBalance.toFixed(4)}
            className="py-3"
            unit="Naka"
          />
          {/* total
        <BillDetailsText
          title="Total Bill"
          value={insData.totalBill}
          unit="Naka"
          className="border-t-2 pt-5 !text-lg font-bold"
        />
        <BillDetailsText
          title="Current Bill"
          value={handleDateTime(insData.current_time)}
          className="pb-5 !text-lg font-bold"
        /> */}
        </Box>
      </TabPanel>
      {/* payment */}
      <TabPanel
        value={value}
        index={1}
      >
        <TableContainer className="mt-5 rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
          <Table>
            <TableHeader
              thead={billTableHeader}
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
                          label={handleDateTime(item.due_date, "date")}
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: "#010101 !important",
                            textTransform: "uppercase"
                          }}
                        />
                        <span className="ml-3 text-xs font-bold text-neutral-600">
                          {handleDateTime(item.due_date, "time")}
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
                            handlePeriodBill(item.due_date, item.history_id)
                              .label
                          }
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: `${
                              handlePeriodBill(item.due_date, item.history_id)
                                .color
                            } !important`,
                            textTransform: "uppercase",
                            color: handlePeriodBill(
                              item.due_date,
                              item.history_id
                            ).text
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
      </TabPanel>
      {/* history */}
      <TabPanel
        value={value}
        index={2}
      >
        Item Three
      </TabPanel>
      <Box
        component="div"
        className="mt-5 flex flex-row justify-between rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px]"
      >
        <div className="flex items-center gap-x-[14px]">
          <span className="font-bold uppercase text-neutral-600">
            Current Bill
          </span>
          <Chip
            label={`${handleDateTime(insData.current_time, "date")}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#010101 !important",
              textTransform: "uppercase",
              color: "rgb(244 39 40) !important"
            }}
          />
          <span className="text-xs font-bold uppercase text-error-main">
            {handleDateTime(insData.current_time, "time")}
          </span>
        </div>
        <span className="font-bold uppercase text-error-main">
          {insData.payByperiod.toFixed(5)} NAKA
        </span>
      </Box>
      <Box
        component="div"
        className="mt-5 flex flex-row justify-between rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px]"
      >
        <span className="font-bold uppercase text-neutral-600">Total Bill</span>
        <span className="font-bold uppercase text-secondary-main">
          {insData.totalBill} NAKA
        </span>
      </Box>
    </>
  )
}

export default BillDetailSection
