import React, { useEffect, useState } from "react"
import { Button, SxProps } from "@mui/material"
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
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { iconmotion } from "@components/organisms/Footer"

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

const ButtonStyle: SxProps = {
  "&.Mui-disabled": {
    backgroundColor: "#18181C!important",
    border: "1px solid #232329;"
  }
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
}: IStakingDate) => {
  const [disabledClaimWithdraw, setDisabledClaimWithdraw] =
    useState<boolean>(true)
  const [disabledStake, setDisabledStake] = useState<boolean>(true)

  useEffect(() => {
    if (userStakedInfo) {
      setDisabledClaimWithdraw(true)
      setDisabledStake(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
            disabled={disabledStake}
            onClick={onClickStake}
            sx={ButtonStyle}
          >
            {status === "locked" ? (
              <LockIcon stroke="#4E5057" />
            ) : (
              <IconArrowDownBorder />
            )}
            <p className="ml-5">Stake</p>
          </Button>
          <Button
            color="secondary"
            className="text-md ml-3 w-full font-neue-machina-semi"
            variant="contained"
            size="large"
            type="submit"
            onClick={onClickRedeem}
            disabled={disabledClaimWithdraw}
            sx={ButtonStyle}
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

        <ButtonIcon
          variants={iconmotion}
          whileHover="hover"
          onClick={onRefresh}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 4
          }}
          icon={<ReloadIcon />}
          className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
        />
      </div>
    </div>
  )
}

export default ActionBar
