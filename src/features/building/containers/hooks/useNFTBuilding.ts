import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useBuildingNFT,
  useBuildingNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import useMutateNFTBuilding from "./useMutateNFTBuilding"

const useNFTBuilding = () => {
  const { signer, address } = useWeb3Provider()
  const { successToast } = useToast()
  const buildingContract = useBuildingNFT(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BUILDING_NFT
  )
  const buildingContractNoAcc = useBuildingNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.BUILDING_NFT
  )
  const { setOpen, setClose } = useLoadingStore()
  const { mutateTransferNFTBuilding } = useMutateNFTBuilding()

  // check isApprovedForAll
  const isBuildingApprovedForAll = (_owner: string, _address: string) =>
    new Promise<boolean>((resolve, reject) => {
      buildingContractNoAcc
        .isApprovedForAll(_owner, _address)
        .then((_response: boolean) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // setApprovalForAll
  const ApprovalBuildingForAll = (_address: string, _status: boolean) =>
    new Promise((resolve, reject) => {
      buildingContract
        .setApprovalForAll(_address, _status)
        .then((_response) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCheckApprovalBuildingForAll = async (
    _owner: string,
    _address: string,
    _status: boolean
  ) => {
    let _isApproved: boolean = false
    _isApproved = await isBuildingApprovedForAll(_owner, _address)
    if (!_isApproved) {
      await ApprovalBuildingForAll(_address, _status)
        .then(() => {
          _isApproved = true
          successToast("approval success")
        })
        .catch((error) => console.error(error))
    }
    return { isApproved: _isApproved }
  }

  // transfer owner
  const transferฺBuilding = (_from: string, _to: string, _tokenId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      buildingContract
        .transferFrom(_from, _to, _tokenId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferBuilding = async (_toAddrs: string, _tokenId: string) => {
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await transferฺBuilding(address, _toAddrs, _tokenId)
        .then(async (response) => {
          const _res = await response.wait()
          const data = {
            _token: _tokenId,
            _to: _toAddrs,
            _from: address,
            _txHash: _res.transactionHash
          }
          await mutateTransferNFTBuilding(data)
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  return {
    onCheckApprovalBuildingForAll,
    onTransferBuilding,
    isBuildingApprovedForAll
  }
}
export default useNFTBuilding
