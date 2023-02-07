import React, { useState } from "react"
import { Button } from "@mui/material"
import ReloadIcon from "@components/icons/ReloadIcon"
import LockIcon from "@components/icons/LockIcon"
import IconArrowDownBorder from "@components/icons/ArrowDownBorderIcon"
import { IMyLockedResponseData } from "@src/types/staking"
import dayjs from "dayjs"

export interface IStakingDate {
  label: string
  redeemDatetime: string
  textColor: "purple" | "red"
  buttonLabelOne?: string
  buttonLabelTwo?: string
  onClickStake?: () => void
  onClickRedeem?: () => void
  className?: string
  stakedData?: IMyLockedResponseData
}

const ActionBar = ({
  label,
  redeemDatetime,
  textColor = "red",
  buttonLabelOne,
  buttonLabelTwo,
  onClickStake = () => {},
  onClickRedeem = () => {},
  className,
  stakedData
}: IStakingDate) => {
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState<boolean>(false)

  // useEffect(() => {
  //   if (stakedData && dayjs(stakedData.endDate).isBefore(dayjs())) {
  //     setDisabled(true)
  //   }
  // }, [])

  return (
    <div className={`${className}`}>
      <div className="flex w-fit flex-row items-center py-6 uppercase">
        <p
          className={`${
            textColor === "purple" ? "text-secondary-main" : "text-red-card"
          }`}
        >
          {label}
          {redeemDatetime && (
            <span className="ml-3 text-neutral-300">{redeemDatetime}</span>
          )}
        </p>

        <div className="mr-3 ml-5 flex items-center">
          <Button
            // sx={{ fontFamily: "neueMachina" }}
            color="error"
            className={`${
              disabled
                ? "!bg-neutral-800 !text-neutral-600"
                : "bg-secondary-main !text-neutral-200"
            } text-md ml-3 w-full font-neue-machina-semi `}
            variant="contained"
            size="large"
            type="submit"
            onClick={onClickStake}
          >
            {disabled ? <LockIcon stroke="#4E5057" /> : <IconArrowDownBorder />}
            <p className="ml-5">
              {disabled ? "Locked" : `${buttonLabelOne || "Stake"}`}
            </p>
          </Button>
          <Button
            // sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className={`${
              disabled
                ? "!bg-neutral-800 !text-neutral-600"
                : "bg-secondary-main !text-neutral-200"
            } text-md ml-3 w-full font-neue-machina-semi`}
            variant="contained"
            size="large"
            type="submit"
            // onClick={() => {
            //   setDisabled(!disabled)
            //   actionButtonTwo()
            // }}
            onClick={onClickRedeem}
          >
            {disabled ? <LockIcon stroke="#4E5057" /> : <IconArrowDownBorder />}
            <p className="ml-5">
              <div className="hidden">
                {disabled ? "Locked" : `${buttonLabelTwo || "Withdraw"}`}
              </div>
              {stakedData &&
              stakedData.comInterest === 0 &&
              dayjs(stakedData.endDate).isBefore(dayjs())
                ? "Withdraw"
                : "Claim"}
            </p>
          </Button>
        </div>

        <div className="h-fit w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3">
          <ReloadIcon />
        </div>
      </div>
    </div>
  )
}

export default ActionBar
