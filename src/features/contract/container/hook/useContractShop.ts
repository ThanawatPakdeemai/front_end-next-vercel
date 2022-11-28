import { ethers, BigNumber } from "ethers"
import { useShop } from "@features/contract/container/hook/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import { ITransactionResponse } from "@interfaces/ITransaction"
import CONFIGS from "@configs/index"

const useVaultApproval = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const shopContract = useShop(signer, CONFIGS.CONTRACT_ADDRESS.SHOP)

  // Buy items -- SHOP
  const AddBullets = async (
    _item: number,
    _number: number,
    _nakaAmount: string,
    _address: string
  ) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      shopContract.methods
        .buyItems(_address, _item, _number, _nakaAmount)
        .send({
          from: _address
        })
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const IsApproved = (address: string) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      shopContract.methods
        .isApprovedForAll(address, CONFIGS.CONTRACT_ADDRESS.OWNER)
        .call({ from: address })
        .then((response: boolean) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })
  return {
    AddBullets,
    IsApproved,
    isLoading
  }
}

export default useVaultApproval
