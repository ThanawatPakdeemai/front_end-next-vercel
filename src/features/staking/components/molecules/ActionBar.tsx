import React, { useEffect, useState } from "react"
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
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { useTranslation } from "react-i18next"
import useProfileStore from "@stores/profileStore"
import { useWeb3Provider } from "@providers/Web3Provider"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

export interface IStakingDate {
  buttonLabelOne?: string
  buttonLabelTwo?: string
  onClickRedeem?: () => void
  onRefresh?: () => void
  className?: string
  type: TStaking
  status: TStakingStatus
  userStakedInfo?: IUserStakedInfo
  basicStakeInfo?: IStakingBasicData
  handleOpen?: () => void
}

const ActionBar = ({
  onClickRedeem = () => {},
  onRefresh = () => {},
  className,
  type,
  status,
  userStakedInfo,
  basicStakeInfo,
  handleOpen
}: IStakingDate) => {
  // const { hydrated } = useGlobal()
  const { t } = useTranslation()
  const profile = useProfileStore((state) => state.profile.data)
  const { address, handleConnectWithMetamask } = useWeb3Provider()

  const [disabledClaim, setDisabledClaim] = useState<boolean>(true)
  const [disabledWithdraw, setDisabledWithdraw] = useState<boolean>(true)
  const [disabledStake, setDisabledStake] = useState<boolean>(true)

  const startIconButton =
    status === "locked" ? (
      <LockIcon stroke={`${disabledStake ? "#F1F4F4" : "#4E5057"}`} />
    ) : (
      <IconArrowDownBorder
        stroke={`${disabledStake ? "#F1F4F4" : "#4E5057"}`}
      />
    )

  const stakeEnded = dayjs() > dayjs(basicStakeInfo && basicStakeInfo.startDate)
  const interestEqualToZero = userStakedInfo && userStakedInfo.comInterest === 0
  const stakeAmountGreaterThanZero =
    userStakedInfo && userStakedInfo.stakeAmount > 0
  const stakeStarted =
    dayjs() > dayjs(basicStakeInfo && basicStakeInfo.startDate)
  const interestGreaterThanZero =
    userStakedInfo && userStakedInfo.comInterest > 0

  const buttonStake = () => {
    if (profile && profile.address === address) {
      if (stakeEnded && interestEqualToZero && stakeAmountGreaterThanZero) {
        return (
          <ButtonToggleIcon
            startIcon={startIconButton}
            text={t("withdraw")}
            type="button"
            className="ml-3 h-[40px] w-[134px] bg-green-card p-0 font-neue-machina-semi text-sm text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600"
            handleClick={onClickRedeem}
            disabled={disabledWithdraw}
          />
        )
      }
      if (stakeStarted && interestGreaterThanZero) {
        return (
          <ButtonToggleIcon
            startIcon={startIconButton}
            text={t("claim")}
            type="button"
            className={`h-[40px] w-[134px] p-0 text-sm text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 ${
              type === "fixed" ? "bg-red-card" : "bg-secondary-main"
            } ml-3 w-full font-neue-machina-semi`}
            handleClick={onClickRedeem}
            disabled={disabledClaim}
          />
        )
      }
    } else {
      return (
        <ButtonLink
          onClick={handleConnectWithMetamask}
          text={t("Connect Wallet")}
          icon={<AccountBalanceWalletIcon />}
          size="medium"
          color="secondary"
          variant="contained"
          className="w-full"
        />
      )
    }
    return null
  }

  const messageLabel = () => {
    if (
      dayjs() > dayjs(basicStakeInfo && basicStakeInfo.startDate) &&
      userStakedInfo &&
      userStakedInfo.comInterest !== 0 &&
      userStakedInfo.stakeAmount !== 0
    ) {
      return t("stake_ended_please_redeem")
    }
    if (
      userStakedInfo &&
      userStakedInfo.comInterest === 0 &&
      userStakedInfo.stakeAmount > 0
    ) {
      return t("stake_ended_please_redeem")
    }
    if (
      userStakedInfo &&
      userStakedInfo.comInterest > 0 &&
      userStakedInfo.stakeAmount > 0
    ) {
      return t("stake_ended_please_redeem")
    }
    if (dayjs() < dayjs(basicStakeInfo && basicStakeInfo.startDate)) {
      return (
        <div className="flex items-center">
          {t("open_until")}
          <span className="ml-3 text-neutral-300">
            {basicStakeInfo && basicStakeInfo.startDate}
          </span>
        </div>
      )
    }
    return t("stake_ended")
  }

  useEffect(() => {
    // มีเงินต้นให้รับ
    if (
      userStakedInfo &&
      userStakedInfo.comInterest === 0 &&
      userStakedInfo.stakeAmount > 0
    ) {
      setDisabledWithdraw(false)
    }
    // มีดอกเบี้ยและเงินต้นให้รับ
    if (
      dayjs() > dayjs(basicStakeInfo && basicStakeInfo.startDate) &&
      userStakedInfo &&
      userStakedInfo.comInterest > 0 &&
      userStakedInfo.stakeAmount > 0
    ) {
      setDisabledClaim(false)
    }
    if (dayjs() < dayjs(basicStakeInfo && basicStakeInfo.startDate)) {
      setDisabledStake(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStakedInfo, basicStakeInfo])
  // userStakedInfo, basicStakeInfo

  return (
    <div className={`${className}`}>
      <div className="flex w-fit flex-row items-center py-6 uppercase">
        <div
          className={`${
            type === "fixed" ? "text-red-card" : "text-secondary-main"
          }`}
        >
          {messageLabel()}
        </div>

        <div className="mr-3 ml-5 flex items-center">
          {dayjs() < dayjs(basicStakeInfo && basicStakeInfo.startDate) && (
            <ButtonToggleIcon
              startIcon={startIconButton}
              text={t("stake")}
              type="button"
              className={`h-[40px] w-[134px] p-0 text-sm text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 ${
                type === "fixed" ? "bg-red-card" : "bg-secondary-main"
              } ml-3 w-full font-neue-machina-semi`}
              handleClick={handleOpen}
              disabled={disabledStake}
            />
          )}
          {buttonStake()}
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
