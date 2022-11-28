import { ethers, BigNumber } from "ethers"
import { useState } from "react"
import dayjs from "dayjs"
import { useWeb3Provider } from "@providers/index"
import FlexibleStaking from "@configs/abi/FlexibleStaking.json"
import Staking from "@configs/abi/Staking.json"
import { IPeriodOptions } from "../../interfaces/IStakingHook"
import {
  getFlexibleStakingContract,
  getStakingContract
} from "../contractHelpers"

const useContractStaking = (_stakingProps: string, _stakingTypes: string) => {
  const { signer } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const stakingAddress = _stakingProps.split(",")

  const BNToNumber = (_bn: string) => Number(BigNumber.from(_bn).toString())

  const getStakeByAddr = (_address: string) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        // const stake = new ethers.Contract(
        //   _address,
        //   _stakingTypes && _stakingTypes === "flexible"
        //     ? FlexibleStaking.abi
        //     : Staking.abi,
        //   signer
        // )
        const stake =
          _stakingTypes && _stakingTypes === "flexible"
            ? getFlexibleStakingContract(_address, signer)
            : getStakingContract(_address, signer)
        const durationPromise = stake.duration()
        const startStakeTimePromise = stake.startStakeTime()
        const endStakeTimePromise = stake.endStakeTime()

        const [duration, startStakeTime, endStakeTime] = await Promise.all([
          durationPromise,
          startStakeTimePromise,
          endStakeTimePromise
        ])

        const durationBN = BNToNumber(duration)
        const startStakeTimeBN = BNToNumber(startStakeTime)
        const endStakeTimeBN = BNToNumber(endStakeTime)

        resolve({
          status: true,
          option_title: `${duration} Days`,
          period: durationBN,
          addressContract: _address,
          startDate: dayjs.unix(startStakeTimeBN).format("YYYY-MM-DD HH:mm"),
          endDate: dayjs.unix(endStakeTimeBN).format("YYYY-MM-DD HH:mm")
          // APR: _poolStakeTotal === 0 || _poolReward === 0 ?
          // 0 : (((_poolReward / _poolStakeTotal) * 100) / BigNum(duration)) * 365
        })
      } catch (err) {
        resolve({
          status: false,
          addressContract: _address,
          err
        })
      }
    })

  const checkAPR = (period: number) => {
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

  const getMyLockedFromContract = async (
    _contractAddress: string,
    _address: string
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        // const stake = new ethers.Contract(
        //   _contractAddress,
        //   _stakingTypes && _stakingTypes === "flexible"
        //     ? FlexibleStaking.abi
        //     : Staking.abi,
        //   signer
        // )
        const stake =
          _stakingTypes && _stakingTypes === "flexible"
            ? getFlexibleStakingContract(_address, signer)
            : getStakingContract(_address, signer)
        const amountPromise = stake.getUserStakeAmount(_address)
        const durationPromise = stake.duration()
        const startStakeTimePromise = stake.startStakeTime()
        const endStakeTimePromise = stake.endStakeTime()
        let resUnClaim = 0

        const [amount, duration, startStakeTime, endStakeTime] =
          await Promise.all([
            amountPromise,
            durationPromise,
            startStakeTimePromise,
            endStakeTimePromise
          ])

        try {
          resUnClaim = await stake.getUserUnclaimAmount(_address)
          // eslint-disable-next-line no-empty
        } catch (error) {}

        resolve({
          status: true,
          option_title: `${duration} Days`,
          period: BNToNumber(duration),
          addressContract: _contractAddress,
          startDate: dayjs
            .unix(BNToNumber(startStakeTime))
            .format("YYYY-MM-DD HH:mm"),
          endDate: dayjs
            .unix(BNToNumber(endStakeTime))
            .format("YYYY-MM-DD HH:mm"),
          stakeAmount: amount,
          comInterest: resUnClaim,
          APR: checkAPR(BNToNumber(duration))
        })
      } catch (err) {
        resolve({
          status: false,
          addressContract: _contractAddress,
          err
        })
      }
    })

  const getOptionPeriod = async () => {
    try {
      setIsLoading(true)
      let data: IPeriodOptions[] = []
      const allContractPromise: any = []
      stakingAddress.forEach(async (stakeAddress) => {
        allContractPromise.push(getStakeByAddr(stakeAddress))
      })

      await Promise.all(allContractPromise).then((values) => {
        data = values
      })

      if (data.length > 0) {
        data.forEach((option) => {
          if (option.status === false) {
            return {
              status: false
            }
          }
        })
      }

      setIsLoading(false)
      return {
        status: true,
        data
      }
    } catch (error) {
      setIsLoading(false)
      return {
        status: false,
        error
      }
    }
  }

  const getMyLocked = async (_address: string) => {
    try {
      let data: IPeriodOptions[] = []

      const allContractPromise: any = []
      stakingAddress.forEach(async (stakeAddress) => {
        allContractPromise.push(getMyLockedFromContract(stakeAddress, _address))
      })

      await Promise.all(allContractPromise).then((values) => {
        data = values
      })

      if (data.length > 0) {
        data.forEach((option) => {
          if (option.status === false) {
            return {
              status: false,
              error: "error"
            }
          }
        })
      }

      return {
        status: true,
        data
      }
    } catch (error) {
      return {
        status: false,
        error
      }
    }
  }

  const stakeNaka = async (
    _address: string,
    _stakeAmount: string,
    _contractAddress: string
  ) => {
    // const _staking = new web3.eth.Contract(
    //   stakingTypes && stakingTypes === "flexible"
    //     ? (FlexibleStaking.abi as AbiItem[])
    //     : (StakingAbi.abi as AbiItem[]),
    //   contractAddress
    // )
    const stake =
      _stakingTypes && _stakingTypes === "flexible"
        ? getFlexibleStakingContract(_address, signer)
        : getStakingContract(_address, signer)

    return new Promise((resolve, reject) => {
      stake.methods
        .stakeNaka(_stakeAmount)
        .send({
          from: _address
        })
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  return {
    getOptionPeriod,
    getMyLocked,
    stakeNaka,
    isLoading
  }
}

export default useContractStaking
