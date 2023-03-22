import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useLandNFT,
  useLandNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"

const useNFTLand = () => {
  const { signer, address } = useWeb3Provider()
  const landContract = useLandNFT(signer, CONFIGS.CONTRACT_ADDRESS.LAND_NFT)
  const landContractNoAcc = useLandNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.LAND_NFT
  )
  const { successToast } = useToast()
  const { setOpen, setClose } = useLoadingStore()
  // check isApprovedForAll
  const isLandApprovedForAll = (_owner: string, _address: string) =>
    new Promise<boolean>((resolve, reject) => {
      landContractNoAcc
        .isApprovedForAll(_owner, _address)
        .then((_response: boolean) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // setApprovalForAll
  const ApprovalLandForAll = (_address: string, _status: boolean) =>
    new Promise((resolve, reject) => {
      landContract
        .setApprovalForAll(_address, _status)
        .then((_response) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCheckApprovalLandForAll = async (
    _owner: string,
    _address: string,
    _status: boolean
  ) => {
    let _isApproved: boolean = false
    _isApproved = await isLandApprovedForAll(_owner, _address)
    if (!_isApproved) {
      await ApprovalLandForAll(_address, _status)
        .then(() => {
          _isApproved = true
          successToast("approval success")
        })
        .catch((error) => console.error(error))
    }
    return { isApproved: _isApproved }
  }

  // get All Land

  // transfer owner
  const transferLand = (_from: string, _to: string, _tokenId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      landContract
        .transferForm(_from, _to, _tokenId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferLand = async (_to: string, _tokenId: string) => {
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await transferLand(address, _to, _tokenId)
        .then(async (response) => {
          const _res = await response.wait()
          // request Backend for api
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  return { onCheckApprovalLandForAll, onTransferLand }
}

export default useNFTLand
