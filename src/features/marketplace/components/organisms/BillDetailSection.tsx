import { IInstallData } from "@feature/marketplace/interfaces/IMarketService"
import { Box, Tab, Tabs } from "@mui/material"
import dayjs from "dayjs"
import React from "react"
import BillDetailsText from "../atoms/BillDetailsText"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className?: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box
          component="div"
          className={`rounded-b-2xl bg-neutral-800 p-5 ${
            className && className
          }`}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

interface IProp {
  insData: IInstallData
}

const BillDetailSection = ({ insData }: IProp) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleDateFormat = (date: Date) =>
    dayjs(date).format("YYYY-MMM-DD HH:mm A")

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className="rounded-t-2xl bg-neutral-780 !text-white-primary"
        textColor="inherit"
      >
        <Tab
          label="Bill Details"
          className="!text-lg"
        />
        <Tab
          label="Payment"
          className="!text-lg"
        />
        <Tab
          label="History"
          className="!text-lg"
        />
      </Tabs>
      {/* bill details */}
      <TabPanel
        value={value}
        index={0}
        className="flex flex-col gap-y-5"
      >
        <BillDetailsText
          title="Date Created"
          value={handleDateFormat(insData.created_at)}
        />
        <BillDetailsText
          title="Due Date"
          value={handleDateFormat(insData.created_at)}
        />
        <BillDetailsText
          title="Bill Id"
          value={insData.bill_id}
          copy
          shortString
        />
        <BillDetailsText
          title="Seller"
          value={insData.seller_address}
          copy
          shortString
        />
        <BillDetailsText
          title="Buyer"
          value={insData.buyer_address}
          copy
          shortString
        />
        <BillDetailsText
          title="Period"
          value={insData.periodTotal}
          unit="Months"
        />
        <BillDetailsText
          title="Period left"
          value={insData.periodBalance}
          unit="Months"
        />
        <BillDetailsText
          title="Monthly payment"
          value={insData.payByperiod.toFixed(4)}
          unit="Naka"
        />
        <BillDetailsText
          title="Prepaid"
          value={insData.prePay.toFixed(4)}
          unit="Naka"
        />
        <BillDetailsText
          title="Bill Balance"
          value={insData.billBalance.toFixed(4)}
          unit="Naka"
        />
        {/* total */}
        <BillDetailsText
          title="Total Bill"
          value={insData.totalBill}
          unit="Naka"
          className="border-t-2 pt-5 !text-lg font-bold"
        />
        <BillDetailsText
          title="Current Bill"
          value={handleDateFormat(insData.current_time)}
          className="pb-5 !text-lg font-bold"
        />
      </TabPanel>
      {/* payment */}
      <TabPanel
        value={value}
        index={1}
      >
        Item Two
      </TabPanel>
      {/* history */}
      <TabPanel
        value={value}
        index={2}
      >
        Item Three
      </TabPanel>
    </>
  )
}

export default BillDetailSection
