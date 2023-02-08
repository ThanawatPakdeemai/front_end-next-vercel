import { IStakingBasicData, IUserStakedInfo } from "@src/types/staking"
import { ethers } from "ethers"

export const DEFAULT_USER_STAKED_INFO: IUserStakedInfo = {
  stakeAmount: 0,
  comInterest: 0,
  stakeAmountBN: ethers.BigNumber.from(0),
  comInterestBN: ethers.BigNumber.from(0)
}

export const DEFAULT_STAKING_BASIC_DATA: IStakingBasicData = {
  option_title: "",
  period: 0,
  addressContract: "",
  startDate: "",
  endDate: "",
  APR: 0,
  totalStake: 0,
  totalReward: 0,
  poolLimit: 0,
  stakeType: "fixed"
}
