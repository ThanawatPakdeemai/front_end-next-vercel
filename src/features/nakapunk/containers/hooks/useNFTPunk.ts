import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  usePunkNFT,
  usePunkNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import useMiddlewareWeb3 from "@hooks/useMiddlewareWeb3"
import useMutateNFTPunk from "./useMutateNFTPunk"

const useNFTPunk = () => {
  const { signer } = useWeb3Provider()
  const punkContract = usePunkNFT(signer, CONFIGS.CONTRACT_ADDRESS.NAKAPUNK_NFT)
  const punkContractNoAcc = usePunkNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.NAKAPUNK_NFT
  )
  const { successToast } = useToast()
  const { setOpen, setClose } = useLoadingStore()
  const { mutateTransferNFTPunk } = useMutateNFTPunk()
  const { validationAccount } = useMiddlewareWeb3()

  // check owner naka-punk
  const isPunkOwner = (_tokenId: string) =>
    new Promise<string>((resolve, reject) => {
      punkContractNoAcc
        .ownerOf(_tokenId)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // check isApprovedForAll
  const isPunkApprovedForAll = (_owner: string, _address: string) =>
    new Promise<boolean>((resolve, reject) => {
      punkContractNoAcc
        .isApprovedForAll(_owner, _address)
        .then((_response: boolean) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // setApprovalForAll
  const ApprovalPunkForAll = (_address: string, _status: boolean) =>
    new Promise((resolve, reject) => {
      punkContract
        .setApprovalForAll(_address, _status)
        .then((_response) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCheckApprovalPunkForAll = async (
    _owner: string,
    _address: string,
    _status: boolean
  ) => {
    const _validate = validationAccount()
    let _isApproved: boolean = false
    if (_validate) {
      _isApproved = await isPunkApprovedForAll(_owner, _address)
      if (!_isApproved) {
        await ApprovalPunkForAll(_address, _status)
          .then(() => {
            _isApproved = true
            successToast("approval success")
          })
          .catch((error) => console.error(error))
      }
    }
    return { isApproved: _isApproved }
  }

  // transfer owner
  const transferPunk = (_from: string, _to: string, _nftToken: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      punkContract
        .transferFrom(_from, _to, _nftToken)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferPunk = async (
    _fromAddress: string | undefined,
    _toAddress: string,
    _nftToken: string,
    _tokenId: string
  ) => {
    const _validate = validationAccount()
    let _status: boolean = false
    if (_validate && _fromAddress) {
      setOpen(MESSAGES.transaction_processing_order)
      await transferPunk(_fromAddress, _toAddress, _nftToken)
        .then(async (response) => {
          const _res = await response.wait()
          const data = {
            _id: _tokenId,
            _to: _toAddress,
            _from: _fromAddress,
            _txHash: _res.transactionHash
          }
          await mutateTransferNFTPunk(data)
          _status = true
        })
        .catch((error) => console.error(error))
    }
    setClose()
    return _status
  }

  return {
    isPunkOwner,
    onCheckApprovalPunkForAll,
    onTransferPunk,
    isPunkApprovedForAll
  }
}
export default useNFTPunk
