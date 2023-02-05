import { BigNumber, ethers } from "ethers"
import dayjs from "dayjs"
import { useWeb3Provider } from "@providers/index"
import Helper from "@utils/helper"
import { IMyLockedResponseData } from "@src/types/staking"
import {
  getFlexibleStakingContract,
  getStakingContract
} from "../contractHelpers"

const useContractStaking = (_stakingProps: string, _stakingTypes: string) => {
  const { signer } = useWeb3Provider()
  // const [isLoading, setIsLoading] = useState(false)
  // const stakingAddress = _stakingProps.split(",")

  const getContractProvider = (_contractAddress: string) =>
    _stakingTypes && _stakingTypes === "flexible"
      ? getFlexibleStakingContract(_contractAddress, signer)
      : getStakingContract(_contractAddress, signer)

  // const getStakeByAddr = (_contractAddress: string) =>
  //   // eslint-disable-next-line no-async-promise-executor
  //   new Promise(async (resolve) => {
  //     try {
  //       const stake = getContractProvider(_contractAddress)
  //       const durationPromise = stake.duration()
  //       const startStakeTimePromise = stake.startStakeTime()
  //       const endStakeTimePromise = stake.endStakeTime()

  //       const [duration, startStakeTime, endStakeTime] = await Promise.all([
  //         durationPromise,
  //         startStakeTimePromise,
  //         endStakeTimePromise
  //       ])

  //       const durationBN = Helper.BNToNumber(duration)
  //       const startStakeTimeBN = Helper.BNToNumber(startStakeTime)
  //       const endStakeTimeBN = Helper.BNToNumber(endStakeTime)

  //       resolve({
  //         status: true,
  //         option_title: `${duration} Days`,
  //         period: durationBN,
  //         addressContract: _contractAddress,
  //         startDate: dayjs.unix(startStakeTimeBN).format("YYYY-MM-DD HH:mm"),
  //         endDate: dayjs.unix(endStakeTimeBN).format("YYYY-MM-DD HH:mm")
  //         // APR: _poolStakeTotal === 0 || _poolReward === 0 ?
  //         // 0 : (((_poolReward / _poolStakeTotal) * 100) / BigNum(duration)) * 365
  //       })
  //     } catch (err) {
  //       resolve({
  //         status: false,
  //         addressContract: _contractAddress,
  //         err
  //       })
  //     }
  //   })

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

  const getMyLocked = (_contractAddress: string, _address: string) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<IMyLockedResponseData>(async (resolve) => {
      try {
        const stake = getContractProvider(_contractAddress)
        const amountPromise = stake.getUserStakeAmount(_address)
        const durationPromise = stake.duration()
        const startStakeTimePromise = stake.startStakeTime()
        const endStakeTimePromise = stake.endStakeTime()
        const totalStakePromise = stake.poolStakeTotal()
        const totalRewardPromise = stake.poolReward()
        let resUnClaim = ethers.BigNumber.from(0)

        const [
          amount,
          duration,
          startStakeTime,
          endStakeTime,
          totalStake,
          totalReward
        ] = await Promise.all([
          amountPromise,
          durationPromise,
          startStakeTimePromise,
          endStakeTimePromise,
          totalStakePromise,
          totalRewardPromise
        ])

        await stake.getUserUnclaimAmount(_address).then((_res: BigNumber) => {
          resUnClaim = _res
        })

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
          stakeAmount: Helper.WeiToNumber(amount),
          comInterest: Number(
            Helper.WeiToNumber(resUnClaim.toString()).toFixed(4)
          ),
          APR: handleAPR(Helper.BNToNumber(duration)),
          totalStake: Number(Helper.WeiToNumber(totalStake).toFixed(4)),
          totalReward: Number(Helper.WeiToNumber(totalReward).toFixed(4))
        })
      } catch (err) {
        resolve({
          option_title: "",
          period: 0,
          addressContract: "",
          startDate: "",
          endDate: "",
          stakeAmount: 0,
          comInterest: 0,
          APR: 0,
          totalStake: 0,
          totalReward: 0
        })
      }
    })

  // const getOptionPeriod = async () =>
  //   // eslint-disable-next-line no-async-promise-executor
  //   new Promise(async (resolve) => {
  //     try {
  //       setIsLoading(true)
  //       let data: IPeriodOptions[] = []
  //       const allContractPromise: any = []
  //       stakingAddress.forEach(async (stakeAddress) => {
  //         allContractPromise.push(getStakeByAddr(stakeAddress))
  //       })

  //       await Promise.all(allContractPromise).then((values) => {
  //         data = values
  //       })

  //       if (data.length > 0) {
  //         data.forEach((option) => {
  //           if (option.status === false) {
  //             return {
  //               status: false
  //             }
  //           }
  //         })
  //       }

  //       setIsLoading(false)
  //       resolve({
  //         status: true,
  //         data
  //       })
  //     } catch (error) {
  //       setIsLoading(false)
  //       resolve({
  //         status: false,
  //         error
  //       })
  //     }
  //   })

  // const getMyLocked = async (_contractAddress: string, _address: string) =>
  //   new Promise<IMyLockedResponse>(async (resolve) => {
  //     try {
  //       // setIsLoading(true)
  //       // let data: IPeriodOptions[] = []
  //       const result = await getMyLockedFromContract(_contractAddress, _address)
  //       console.log("result", result)
  //       // const allContractPromise: any = []
  //       // stakingAddress.forEach(async (stakeAddress) => {
  //       //   allContractPromise.push(
  //       //     getMyLockedFromContract(stakeAddress, _address)
  //       //   )
  //       // })
  //       // await Promise(allContractPromise).then((values) => {
  //       //   data = values
  //       // })
  //       // if (data.length > 0) {
  //       //   data.forEach((option) => {
  //       //     if (option.status === false) {
  //       //       return {
  //       //         status: false,
  //       //         error: "error"
  //       //       }
  //       //     }
  //       //   })
  //       // }
  //       // setIsLoading(false)
  //       resolve({
  //         status: true,
  //         data: data
  //       })
  //     } catch (error) {
  //       // setIsLoading(false)
  //       // resolve({
  //       //   status: false,
  //       //   data: []
  //       // })
  //     }
  //   })

  // const stakeNaka = async (
  //   _address: string,
  //   _stakeAmount: string,
  //   _contractAddress: string
  // ) =>
  //   new Promise((resolve, reject) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .stakeNaka(_stakeAmount)
  //       .send({
  //         from: _address
  //       })
  //       .then((response: any) => {
  //         setIsLoading(false)
  //         resolve(response)
  //       })
  //       .catch((error: Error) => {
  //         setIsLoading(false)
  //         reject(error)
  //       })
  //   })

  // const claimReward = (
  //   _address: string,
  //   _claimAmount: string,
  //   _contractAddress: string
  // ) =>
  //   new Promise<ITransactionResponse>((resolve, reject) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .claimReward(_claimAmount)
  //       .send({
  //         from: _address
  //       })
  //       .then((response: any) => {
  //         setIsLoading(false)
  //         resolve(response)
  //       })
  //       .catch((error: Error) => {
  //         setIsLoading(false)
  //         reject(error)
  //       })
  //   })

  // const withdrawNaka = (_address: string, _contractAddress: string) =>
  //   new Promise<ITransactionResponse>((resolve, reject) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .withdrawNaka()
  //       .send({
  //         from: _address
  //       })
  //       .then((response: any) => {
  //         setIsLoading(false)
  //         resolve(response)
  //       })
  //       .catch((error: Error) => {
  //         setIsLoading(false)
  //         reject(error)
  //       })
  //   })

  // const getPoolStakeLimit = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .poolStakeLimit()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getPoolReward = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .poolReward()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getPoolStakeTotal = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .poolStakeTotal()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: 0
  //         })
  //       })
  //   })

  // const getUserStakeLimit = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .userStakeLimit()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: 0
  //         })
  //       })
  //   })

  // const getUserStakeAmount = (_address: string, _contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .getUserStakeAmount(_address)
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getUserClaimedAmount = (_address: string, _contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .getUserClaimedAmount(_address)
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Helper.WeiToNumber(_response._hex.toString())
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getUserUnclaimedAmount = (_address: string, _contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .getUserUnclaimAmount(_address)
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: parseFloat(ethers.utils.formatUnits(_response, 18)),
  //           dataUint: _response
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0, dataUint: 0 })
  //       })
  //   })

  // const startStakeTime = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .startStakeTime()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Number(_response) * 1000
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const endStakeTime = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .endStakeTime()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Number(_response) * 1000
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getOnceDuration = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .duration()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({
  //           status: true,
  //           data: Number(_response)
  //         })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  // const getOnceAPR = (_contractAddress: string) =>
  //   new Promise((resolve) => {
  //     setIsLoading(true)
  //     const stake = getContractProvider(_contractAddress)
  //     stake
  //       .getCurrentAPR()
  //       .then((_response) => {
  //         setIsLoading(false)
  //         resolve({ status: true, data: Number(_response) / 100 })
  //       })
  //       .catch((_error) => {
  //         setIsLoading(false)
  //         resolve({ status: false, data: 0 })
  //       })
  //   })

  return {
    // getOptionPeriod,
    handleAPR,
    getMyLocked
    // stakeNaka,
    // claimReward,
    // withdrawNaka,
    // getPoolStakeLimit,
    // getPoolReward,
    // getPoolStakeTotal,
    // getUserStakeLimit,
    // getUserStakeAmount,
    // getUserClaimedAmount,
    // getUserUnclaimedAmount,
    // startStakeTime,
    // endStakeTime,
    // getOnceDuration,
    // getOnceAPR,
    // isLoading
  }
}

export default useContractStaking
