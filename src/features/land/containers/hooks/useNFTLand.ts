import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useGetAllLandofAddrs,
  useLandNFT,
  useLandNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import { BigNumberish } from "ethers"
import useMutateNFTLand from "./useMutateNFTLand"

const useNFTLand = () => {
  const { signer, address } = useWeb3Provider()
  const { mutateTransferNFTLand } = useMutateNFTLand()
  const landContract = useLandNFT(signer, CONFIGS.CONTRACT_ADDRESS.LAND_NFT)
  const landContractNoAcc = useLandNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.LAND_NFT
  )
  const landAllContract = useGetAllLandofAddrs(
    CONFIGS.CONTRACT_ADDRESS.GET_LANDOFADDRESS
  )

  const { successToast } = useToast()
  const { setOpen, setClose } = useLoadingStore()

  // check land owner
  const isLandOwner = (_tokenId: string) =>
    new Promise<string>((resolve, reject) => {
      landContractNoAcc
        .ownerOf(_tokenId)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

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
  const transferLand = (_from: string, _to: string, _nftToken: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      landContract
        .transferFrom(_from, _to, _nftToken)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferLand = async (
    _toAddress: string,
    _nftToken: string,
    _tokenId: string
  ) => {
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await transferLand(address, _toAddress, _nftToken)
        .then(async (response) => {
          const _res = await response.wait()
          const data = {
            _id: _tokenId,
            _to: _toAddress,
            _from: address,
            _txHash: _res.transactionHash
          }
          await mutateTransferNFTLand(data)
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  const getLandsOfAddress = async (
    _nftAddress: string,
    _ownerAddress: string
  ) =>
    new Promise<BigNumberish[]>((resolve, reject) => {
      landAllContract
        .getLandsOfAddress(_nftAddress, _ownerAddress)
        .then((_response: BigNumberish[]) => resolve(_response))
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  return {
    onCheckApprovalLandForAll,
    onTransferLand,
    isLandApprovedForAll,
    getLandsOfAddress,
    isLandOwner
  }
}

export default useNFTLand
