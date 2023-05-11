import {
  IInstallData,
  IInstallPeriod
} from "@feature/marketplace/interfaces/IMarketService"
import { Box, Button, Chip, Tab, Tabs } from "@mui/material"
import React, { useMemo, useState } from "react"
import Link from "next/link"
import { IHistory } from "@feature/land/interfaces/ILandService"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import BillsIcon from "@components/icons/BillsIcon"
import CreditCardIcon from "@components/icons/CreditCardIcon"
import BarGraph from "@components/icons/BarGraph"
import TextTip from "@components/atoms/TextTip"
import useMarketNFTInstall from "@feature/marketplace/containers/hooks/useMarketNFTInstall"
import BillDetailsText from "../atoms/BillDetailsText"
import BillPaymentTable from "../molecules/BillPaymentTable"
import BillHistoryTable from "../molecules/BillHistoryTable"

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
  history: IHistory[]
}

const BillDetailSection = ({ insData, history }: IProp) => {
  const [value, setValue] = useState(0)
  const [billDueDate, setBillDueDate] = useState<IInstallPeriod>()
  const [paid, setPaid] = useState<boolean>(true)
  const [period, setPeriod] = useState<number>(0)

  const { handleDateTimeFormat } = Helper
  const { onPayBillNFTInstallOrder } = useMarketNFTInstall()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const currentDate = new Date()

  const tabSx = {
    minHeight: "40px",
    height: "40px",
    "&.Mui-selected": {
      backgroundColor: "#010101",
      color: "#E1E2E2"
    }
  }

  useMemo(() => {
    if (insData) {
      const currentOrderInstallment = insData
      const _nextBill = currentOrderInstallment.period.find(
        (item) => item.history_id === null
      )
      if (_nextBill) {
        setBillDueDate(_nextBill)
        if (dayjs(new Date()) > dayjs(_nextBill.due_date)) {
          setPaid(false)
          setPeriod(_nextBill.round_no)
          //   setBillId(currentOrderInstallment.installments_data[0].bill_id)
        }
      }
    }
  }, [insData])

  const tabClassName =
    "!min-h-10 !rounded-lg bg-neutral-800 !text-sm !capitalize text-neutral-500 !opacity-100"

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
          icon={<BillsIcon />}
          iconPosition="start"
          className={`${tabClassName} mr-[5px]`}
          sx={tabSx}
        />
        <Tab
          label="Payment"
          icon={<CreditCardIcon />}
          iconPosition="start"
          className={`${tabClassName} mr-[5px]`}
          sx={tabSx}
        />
        <Tab
          label="History"
          icon={<BarGraph />}
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
            value={handleDateTimeFormat(insData.created_at, "date")}
            time={handleDateTimeFormat(insData.created_at, "time")}
            className="border-b border-neutral-800 pb-3"
          />
          <BillDetailsText
            title="Due Date"
            value={handleDateTimeFormat(
              billDueDate ? billDueDate.due_date : currentDate,
              "date"
            )}
            time={handleDateTimeFormat(
              billDueDate ? billDueDate.due_date : currentDate,
              "time"
            )}
            className="border-b border-neutral-800 py-3"
            textColor="#F42728"
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
        </Box>
      </TabPanel>
      {/* payment */}
      <TabPanel
        value={value}
        index={1}
      >
        <BillPaymentTable insData={insData} />
      </TabPanel>
      {/* history */}
      <TabPanel
        value={value}
        index={2}
      >
        <BillHistoryTable history={history} />
      </TabPanel>
      {/* bottom detail */}
      <Box
        component="div"
        className="mt-5 flex !h-[54px] flex-row items-center justify-between rounded-[14px] border border-neutral-800 !bg-neutral-780 px-10"
      >
        <div className="flex items-center gap-x-[14px]">
          <span className="font-bold uppercase text-neutral-600">
            {!paid ? "Current Bill" : "Next Bill"}
          </span>
          <Chip
            label={`${handleDateTimeFormat(
              billDueDate ? billDueDate.due_date : currentDate,
              "date"
            )}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#010101 !important",
              textTransform: "uppercase",
              color: !paid ? "#F42728 !important" : "#3DCD95 !important"
            }}
          />
          <span className="text-xs font-bold uppercase text-error-main">
            {handleDateTimeFormat(
              billDueDate ? billDueDate.due_date : currentDate,
              "time"
            )}
          </span>
        </div>
        <span className="font-bold uppercase text-error-main">
          {insData.payByperiod.toFixed(5)} NAKA
        </span>
      </Box>
      <Box
        component="div"
        className="mt-5 flex !h-[54px] flex-row items-center justify-between rounded-[14px] border border-neutral-800 !bg-neutral-780 px-10"
      >
        <span className="font-bold uppercase text-neutral-600">Total Bill</span>
        <span className="font-bold uppercase text-secondary-main">
          {insData.totalBill} NAKA
        </span>
      </Box>
      <Box
        component="div"
        className="mt-5 flex flex-row justify-end gap-5"
      >
        <Link
          href="https://t.me/NakamotoGames"
          target="_blank"
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              height: "40px",
              fontSize: "12px"
            }}
          >
            Contact Support
          </Button>
        </Link>
        <Button
          disabled={
            dayjs().isAfter(dayjs(billDueDate?.due_date).add(7, "days")) || paid
          }
          variant="contained"
          color="secondary"
          sx={{
            height: "40px",
            fontSize: "12px"
          }}
          onClick={() => onPayBillNFTInstallOrder(insData.bill_id, period, 1)}
        >
          Pay Current Bill
        </Button>
      </Box>
      {!paid &&
      dayjs(new Date()) > dayjs(billDueDate?.due_date).add(7, "days") ? (
        <TextTip
          text="Land payment overdue. please contact support."
          textColor="text-warning-dark"
          bgColor="bg-warning-dark/20"
          borderColor="border-warning-dark"
          className="mt-6"
        />
      ) : (
        !paid &&
        dayjs(new Date()) < dayjs(billDueDate?.due_date).add(7, "days") && (
          <TextTip
            text={`Please pay the bill before ${dayjs(billDueDate?.due_date)}`}
            textColor="text-warning-dark"
            bgColor="bg-warning-dark/20"
            borderColor="border-warning-dark"
            className="mt-6"
          />
        )
      )}
    </>
  )
}

export default BillDetailSection
