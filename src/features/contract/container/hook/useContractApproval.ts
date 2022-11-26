import { CONTRACT_ADDRESS } from "@src/configs/sites"
import { ethers, BigNumber } from "ethers"
import { useERC20 } from "@src/features/contract/container/hook/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@src/providers"

const useVaultApproval = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const erc20Contract = useERC20(signer, CONTRACT_ADDRESS.erc20)

  const handleVaultApprove = () =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        erc20Contract
          .approve(CONTRACT_ADDRESS.erc20, ethers.constants.MaxUint256)
          .then(() => {
            setIsLoading(false)
            resolve("Contract Approved!")
          })
          .catch(() => {
            setIsLoading(false)
            const errMsg =
              "Please try again, Confirm the transaction and make sure you are paying enough gas!"
            reject(errMsg)
          })
      }
    })

  const getVaultApprovalStatus = async (bet: BigNumber, address: string) =>
    new Promise((resolve) => {
      try {
        erc20Contract.allowance(account, address).then((response: string) => {
          const currentAllowance = BigNumber.from(response)

          const valueBetString = BigNumber.from(bet).toString()
          const toCheck = BigNumber.from(valueBetString)
          const _gt = currentAllowance.gte(toCheck)

          resolve(_gt)
        })
      } catch (error) {
        if (error instanceof Error) {
          resolve(false)
        }
      }
    })

  return { handleVaultApprove, getVaultApprovalStatus, isLoading }
}

export default useVaultApproval
