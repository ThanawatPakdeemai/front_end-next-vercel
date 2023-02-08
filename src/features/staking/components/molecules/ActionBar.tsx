import React from "react"
import { Button } from "@mui/material"
import ReloadIcon from "@components/icons/ReloadIcon"
import LockIcon from "@components/icons/LockIcon"
import IconArrowDownBorder from "@components/icons/ArrowDownBorderIcon"
import {
  IStakingBasicData,
  IUserStakedInfo,
  TStaking,
  TStakingStatus
} from "@src/types/staking"
import dayjs from "dayjs"

export interface IStakingDate {
  label: string
  redeemDatetime: string
  buttonLabelOne?: string
  buttonLabelTwo?: string
  onClickStake?: () => void
  onClickRedeem?: () => void
  onRefresh?: () => void
  className?: string
  type: TStaking
  status: TStakingStatus
  userStakedInfo?: IUserStakedInfo
  basicStakeInfo?: IStakingBasicData
}

const ActionBar = ({
  label,
  redeemDatetime,
  onClickStake = () => {},
  onClickRedeem = () => {},
  onRefresh = () => {},
  className,
  type,
  status,
  userStakedInfo,
  basicStakeInfo
}: IStakingDate) => (
  <div className={`${className}`}>
    <div className="flex w-fit flex-row items-center py-6 uppercase">
      <p
        className={`${
          type === "fixed" ? "text-secondary-main" : "text-red-card"
        }`}
      >
        {label}
        {redeemDatetime && (
          <span className="ml-3 text-neutral-300">{redeemDatetime}</span>
        )}
      </p>

      <div className="mr-3 ml-5 flex items-center">
        <Button
          color="error"
          className={`${
            type === "fixed"
              ? "!bg-neutral-800 !text-neutral-600"
              : "bg-secondary-main !text-neutral-200"
          } text-md ml-3 w-full font-neue-machina-semi `}
          variant="contained"
          size="large"
          type="submit"
          onClick={onClickStake}
        >
          {status === "locked" ? (
            <LockIcon stroke="#4E5057" />
          ) : (
            <IconArrowDownBorder />
          )}
          <p className="ml-5">Stake</p>
        </Button>
        {/* $
          {disabled
            ? "!bg-neutral-800 !text-neutral-600"
            : "bg-secondary-main !text-neutral-200"} */}
        <Button
          color="secondary"
          className="text-md ml-3 w-full font-neue-machina-semi"
          variant="contained"
          size="large"
          type="submit"
          onClick={onClickRedeem}
        >
          {status === "locked" ? (
            <LockIcon stroke="#4E5057" />
          ) : (
            <IconArrowDownBorder />
          )}
          <div className="ml-5">
            {userStakedInfo &&
            basicStakeInfo &&
            userStakedInfo.comInterest === 0 &&
            dayjs(basicStakeInfo.endDate).isBefore(dayjs())
              ? "Withdraw"
              : "Claim"}
          </div>
        </Button>
      </div>

      <Button
        onClick={onRefresh}
        className="h-fit w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3"
      >
        <ReloadIcon />
      </Button>
    </div>
  </div>
)

export default ActionBar
