import BarGraph from "@components/icons/BarGraph"
import BillsIcon from "@components/icons/BillsIcon"
import CreditCardIcon from "@components/icons/CreditCardIcon"
import {
  IInstallData,
  IInstallPeriod,
  IMarketHistory,
  IRentalData
} from "@feature/marketplace/interfaces/IMarketService"
import { Box, Button, Chip, Link, Tab, Tabs } from "@mui/material"
import React, { useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import useMarketNFTInstall from "@feature/marketplace/containers/hooks/useMarketNFTInstall"
import useMarketNFTRent from "@feature/marketplace/containers/hooks/useMarketNFTRent"
import useProfileStore from "@stores/profileStore"
import NFTPeriodTable from "@feature/marketplace/components/molecules/NFTPeriodTable"
import NFTHistoryTable from "@feature/marketplace/components/molecules/NFTHistoryTable"
import BillDetailsText from "@feature/marketplace/components/atoms/BillDetailsText"

interface TabPanelProps {
  children?: React.ReactNode
  index: string
  value: string
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

interface IProps {
  installmentData?: IInstallData
  rentalData?: IRentalData
  history: IMarketHistory[]
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

const NFTDetailTable = ({ installmentData, rentalData, history }: IProps) => {
  let _initValue: string = "history"
  if (installmentData) {
    _initValue = "bill"
  } else if (rentalData) {
    _initValue = "rental"
  }
  const _curDate = new Date()

  const { handleDateTimeFormat } = Helper
  const { onPayBillNFTInstallOrder } = useMarketNFTInstall()
  const { onClaimNFTRentOrder } = useMarketNFTRent()
  const { profile } = useProfileStore()

  const [value, setValue] = useState<string>(_initValue)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const _nextBill = useMemo(() => {
    let _next: IInstallPeriod | undefined
    if (installmentData) {
      _next = installmentData.period.find((p) => !p.history_id)
    }
    return _next
  }, [installmentData])

  const _payBill = useMemo(() => {
    let _status: boolean = false
    let _round: number = -1
    if (_nextBill && dayjs(new Date()) <= dayjs(_nextBill.due_date)) {
      _status = true
      _round = _nextBill.round_no
    }
    return { status: _status, periodNo: _round }
  }, [_nextBill])

  const _total = useMemo(() => {
    let _value = 0
    let _label: string = "Total"
    if (installmentData) {
      _value = installmentData.totalBill
      _label = "Total Bill"
    } else if (rentalData) {
      _value = rentalData.total_price
      _label = "Total Claim"
    }
    return { label: _label, value: _value }
  }, [installmentData, rentalData])

  return (
    <div className="mt-5">
      <Tabs
        value={value}
        onChange={handleChange}
        className="h-[50px] w-fit rounded-[13px] bg-neutral-700 p-[5px] !text-white-primary"
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#00000000" } }}
      >
        {installmentData
          ? [
              <Tab
                key={uuidv4()}
                label="Bill Details"
                icon={<BillsIcon />}
                iconPosition="start"
                className={`${tabClassName} mr-[5px]`}
                sx={tabSx}
                value="bill"
              />,
              <Tab
                key={uuidv4()}
                label="Payment"
                icon={<CreditCardIcon />}
                iconPosition="start"
                className={`${tabClassName} mr-[5px]`}
                sx={tabSx}
                value="payment"
              />
            ].map((i) => i)
          : null}
        {rentalData
          ? [
              <Tab
                key={uuidv4()}
                label="Rental Details"
                icon={<BillsIcon />}
                iconPosition="start"
                className={`${tabClassName} mr-[5px]`}
                sx={tabSx}
                value="rental"
              />,
              <Tab
                key={uuidv4()}
                label="Claim"
                icon={<CreditCardIcon />}
                iconPosition="start"
                className={`${tabClassName} mr-[5px]`}
                sx={tabSx}
                value="claim"
              />
            ].map((r) => r)
          : null}
        <Tab
          label="History"
          icon={<BarGraph />}
          iconPosition="start"
          className={`${tabClassName}`}
          sx={tabSx}
          value="history"
        />
      </Tabs>
      {installmentData ? (
        <>
          {/* -- bill details -- */}
          <TabPanel
            value={value}
            index="bill"
          >
            <Box
              component="div"
              className="mt-5 rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px]"
            >
              <BillDetailsText
                title="Date Created"
                value={handleDateTimeFormat(installmentData.created_at, "date")}
                time={handleDateTimeFormat(installmentData.created_at, "time")}
                className="border-b border-neutral-800 pb-3"
              />
              <BillDetailsText
                title="Due Date"
                value={handleDateTimeFormat(
                  _nextBill ? _nextBill.due_date : _curDate,
                  "date"
                )}
                time={handleDateTimeFormat(
                  _nextBill ? _nextBill.due_date : _curDate,
                  "time"
                )}
                className="border-b border-neutral-800 py-3"
                textColor="#F42728"
              />
              <BillDetailsText
                title="Bill Id"
                value={installmentData.bill_id}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Seller"
                value={installmentData.seller_address}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Buyer"
                value={installmentData.buyer_address}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Period"
                value={installmentData.periodTotal}
                className="border-b border-neutral-800 py-3"
                unit="Months"
              />
              <BillDetailsText
                title="Period left"
                value={installmentData.periodBalance}
                className="border-b border-neutral-800 py-3"
                unit={installmentData.periodBalance === 1 ? "Month" : "Months"}
              />
              <BillDetailsText
                title="Monthly payment"
                value={installmentData.payByperiod.toFixed(4)}
                className="border-b border-neutral-800 py-3"
                unit="Naka"
              />
              <BillDetailsText
                title="Prepaid"
                value={installmentData.prePay.toFixed(4)}
                className="border-b border-neutral-800 py-3"
                unit="Naka"
              />
              <BillDetailsText
                title="Bill Balance"
                value={installmentData.billBalance.toFixed(4)}
                className="py-3"
                unit="Naka"
              />
            </Box>
          </TabPanel>
          {/* -- bill details -- */}
          {/* -- bill payment -- */}
          <TabPanel
            value={value}
            index="payment"
          >
            <NFTPeriodTable periodHistory={installmentData.period} />
          </TabPanel>
          {/* -- bill payment -- */}
        </>
      ) : null}
      {rentalData ? (
        <>
          <TabPanel
            value={value}
            index="rental"
          >
            <Box
              component="div"
              className="mt-5 rounded-3xl border border-neutral-800 !bg-neutral-780 px-10 py-[30px]"
            >
              <BillDetailsText
                title="Date Created"
                value={handleDateTimeFormat(rentalData.rent_start, "date")}
                time={handleDateTimeFormat(rentalData.rent_start, "time")}
                className="border-b border-neutral-800 pb-3"
              />
              <BillDetailsText
                title="Due Date"
                value={handleDateTimeFormat(rentalData.rent_end, "date")}
                time={handleDateTimeFormat(rentalData.rent_end, "time")}
                className="border-b border-neutral-800 py-3"
                textColor="#F42728"
              />
              <BillDetailsText
                title="Rent Id"
                value={rentalData.order_id}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Owner"
                value={rentalData.seller_address}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Renter"
                value={rentalData.buyer_address}
                className="border-b border-neutral-800 py-3"
                copy
                shortString
              />
              <BillDetailsText
                title="Period"
                value={rentalData.period_total}
                className="border-b border-neutral-800 py-3"
                unit="Days"
              />
              <BillDetailsText
                title="Claimed"
                value={`${
                  rentalData.period.filter((p) => !p.claim_status).length
                }`}
                className="border-b border-neutral-800 py-3"
              />
              <BillDetailsText
                title="Daily Claim"
                value={rentalData.period[0].price.toFixed(4)}
                className="border-b border-neutral-800 py-3"
                unit="Naka"
              />
            </Box>
          </TabPanel>
          <TabPanel
            value={value}
            index="claim"
          >
            <NFTPeriodTable periodHistory={rentalData.period} />
          </TabPanel>
        </>
      ) : null}
      <TabPanel
        value={value}
        index="history"
      >
        <NFTHistoryTable history={history} />
      </TabPanel>

      <>
        <Box
          component="div"
          className="mt-5 flex !h-[54px] flex-row items-center justify-between rounded-[14px] border border-neutral-800 !bg-neutral-780 px-10"
        >
          <span className="font-bold uppercase text-neutral-600">
            {_total.label}
          </span>
          <span className="font-bold uppercase text-secondary-main">
            {_total.value} NAKA
          </span>
        </Box>
        {installmentData ? (
          <Box
            component="div"
            className="mt-5 flex !h-[54px] flex-row items-center justify-between rounded-[14px] border border-neutral-800 !bg-neutral-780 px-10"
          >
            <div className="flex items-center gap-x-[14px]">
              <span className="font-bold uppercase text-neutral-600">
                {!_payBill.status ? "Current Bill" : "Next Bill"}
              </span>
              <Chip
                label={`${handleDateTimeFormat(
                  _nextBill ? _nextBill.due_date : _curDate,
                  "date"
                )}`}
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: "#010101 !important",
                  textTransform: "uppercase",
                  color: !_payBill.status
                    ? "#F42728 !important"
                    : "#3DCD95 !important"
                }}
              />
              <span className="text-xs font-bold uppercase text-error-main">
                {handleDateTimeFormat(
                  _nextBill ? _nextBill.due_date : _curDate,
                  "time"
                )}
              </span>
            </div>
            <span className="font-bold uppercase text-error-main">
              {installmentData.payByperiod.toFixed(5)} NAKA
            </span>
          </Box>
        ) : null}
      </>
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
        {installmentData &&
        profile.data &&
        profile.data.address === installmentData.buyer_address ? (
          <Button
            // disabled={
            //   dayjs().isAfter(dayjs(_nextBill?.due_date).add(7, "days")) ||
            //   _payBill.status
            // }
            variant="contained"
            color="secondary"
            sx={{
              height: "40px",
              fontSize: "12px"
            }}
            onClick={() =>
              onPayBillNFTInstallOrder(
                installmentData.bill_id,
                installmentData.buyer_address,
                _payBill.periodNo,
                installmentData.payByperiod,
                1
              )
            }
          >
            Pay Current Bill
          </Button>
        ) : null}
        {rentalData &&
        profile.data &&
        profile.data.address === rentalData.seller_address ? (
          <Button
            disabled={
              !rentalData.period.some((p) => dayjs().isAfter(dayjs(p.due_date)))
            }
            variant="contained"
            color="secondary"
            sx={{
              height: "40px",
              fontSize: "12px"
            }}
            onClick={() => {
              onClaimNFTRentOrder(rentalData.order_id)
            }}
          >
            Claim Rental
          </Button>
        ) : null}
      </Box>
    </div>
  )
}

export default NFTDetailTable
