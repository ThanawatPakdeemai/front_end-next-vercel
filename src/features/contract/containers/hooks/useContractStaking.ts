import dayjs from "dayjs"
// import { useWeb3Provider } from "@providers/index"
import Helper from "@utils/helper"
import {
  IStakingBasicData,
  IUserStakedInfo,
  TStaking
} from "@src/types/staking"
import { ethers } from "ethers"
import FlexibleStakingAbi from "@configs/abi/FlexibleStaking.json"
import StakingAbi from "@configs/abi/Staking.json"
import {
  DEFAULT_STAKING_BASIC_DATA,
  DEFAULT_USER_STAKED_INFO
} from "@constants/staking"
import { useWeb3Provider } from "@providers/Web3Provider"
import { TransactionResponse } from "@ethersproject/providers"
import {
  getFlexibleStakingContract,
  getStakingContract
} from "../contractHelpers"

const useContractStaking = () => {
  const { signer } = useWeb3Provider()

  const getContractProvider = (
    _contractAddress: string,
    _stakingTypes: TStaking
  ) =>
    _stakingTypes === "flexible"
      ? getFlexibleStakingContract(_contractAddress, signer)
      : getStakingContract(_contractAddress, signer)

  const handleAPR = (period: number) => {
    switch (period) {
      case 30:
        return 15
      case 60:
        return 20
      case 90:
        return 25
      default:
        return 0
    }
  }

  const getBasicStakingData = async (
    _contractAddress: string,
    _stakingTypes: TStaking
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<IStakingBasicData>(async (resolve) => {
      try {
        const { ethereum }: any = window
        const _web3 = new ethers.providers.Web3Provider(ethereum)
        const stake = new ethers.Contract(
          _contractAddress,
          _stakingTypes === "fixed" ? StakingAbi.abi : FlexibleStakingAbi.abi,
          _web3
        )
        const durationPromise = await stake.duration()
        const startStakeTimePromise = await stake.startStakeTime()
        const endStakeTimePromise = await stake.endStakeTime()
        const totalStakePromise = await stake.poolStakeTotal()
        const totalRewardPromise = await stake.poolReward()
        const poolLimitPromise = await stake.poolStakeLimit()

        const [
          duration,
          startStakeTime,
          endStakeTime,
          totalStake,
          totalReward,
          poolLimit
        ] = await Promise.all([
          durationPromise,
          startStakeTimePromise,
          endStakeTimePromise,
          totalStakePromise,
          totalRewardPromise,
          poolLimitPromise
        ])

        resolve({
          option_title: `${duration} Days`,
          period: Helper.BNToNumber(duration),
          addressContract: _contractAddress,
          startDate: dayjs
            .unix(Helper.BNToNumber(startStakeTime))
            .format("DD MMM YYYY h:mm A"),
          endDate: dayjs
            .unix(Helper.BNToNumber(endStakeTime))
            .format("DD MMM YYYY h:mm A"),
          APR:
            _stakingTypes === "fixed"
              ? handleAPR(Helper.BNToNumber(duration))
              : Helper.BNToNumber(await stake.getCurrentAPR()) / 100,
          totalStake: Number(Helper.WeiToNumber(totalStake).toFixed(4)),
          totalReward: Number(Helper.WeiToNumber(totalReward).toFixed(4)),
          poolLimit: Number(Helper.WeiToNumber(poolLimit).toFixed(4)),
          stakeType: _stakingTypes
        })
      } catch (err) {
        resolve(DEFAULT_STAKING_BASIC_DATA)
      }
    })

  const getUserStakedInfo = (
    _contractAddress: string,
    _address: string,
    _stakingTypes: TStaking
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<IUserStakedInfo>(async (resolve) => {
      try {
        const { ethereum }: any = window
        const _web3 = new ethers.providers.Web3Provider(ethereum)
        const stake = new ethers.Contract(
          _contractAddress,
          _stakingTypes === "fixed" ? StakingAbi.abi : FlexibleStakingAbi.abi,
          _web3
        )
        const amountPromise = await stake.getUserStakeAmount(_address)
        const userUnclaimPromise = await stake.getUserUnclaimAmount(_address)

        const [amount, userUnclaim] = await Promise.all([
          amountPromise,
          userUnclaimPromise
        ])

        resolve({
          stakeAmount: Helper.WeiToNumber(amount),
          comInterest: Number(
            Helper.WeiToNumber(userUnclaim.toString()).toFixed(4)
          ),
          stakeAmountBN: amount,
          comInterestBN: userUnclaim
        })
      } catch (err) {
        resolve(DEFAULT_USER_STAKED_INFO)
      }
    })

  const claimReward = (
    _claimAmount: string,
    _contractAddress: string,
    _stakingTypes: TStaking
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      const contract = getContractProvider(_contractAddress, _stakingTypes)
      // const { ethereum }: any = window
      // const provider = new ethers.providers.Web3Provider(ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(
      //   _contractAddress,
      //   _stakingTypes === "fixed" ? StakingAbi.abi : FlexibleStakingAbi.abi,
      //   signer
      // )
      contract
        .claimReward(_claimAmount)
        .then((response: TransactionResponse) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  const withdrawNaka = (_contractAddress: string, _stakingTypes: TStaking) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      const contract = getContractProvider(_contractAddress, _stakingTypes)
      // const { ethereum }: any = window
      // const provider = new ethers.providers.Web3Provider(ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(
      //   _contractAddress,
      //   _stakingTypes === "fixed" ? StakingAbi.abi : FlexibleStakingAbi.abi,
      //   signer
      // )
      contract
        .withdrawNaka()
        .then((response: TransactionResponse) => {
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })

  return {
    handleAPR,
    getBasicStakingData,
    getUserStakedInfo,
    claimReward,
    withdrawNaka
    // stakeNaka,
  }
}

export default useContractStaking
