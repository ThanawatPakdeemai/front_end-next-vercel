import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useArcGameNFT,
  useArcGameNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import useMutateNFTArcGame from "./useMutateNFTArcGame"

const useNFTArcGame = () => {
  const { signer, address } = useWeb3Provider()
  const arcadeGameContract = useArcGameNFT(
    signer,
    CONFIGS.CONTRACT_ADDRESS.ARCADEGAME_NFT
  )
  const arcadeGameContractNoAcc = useArcGameNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.ARCADEGAME_NFT
  )
  const { successToast } = useToast()
  const { setOpen, setClose } = useLoadingStore()
  const { mutateTransferNFTArcGame } = useMutateNFTArcGame()

  // check owner naka-punk
  const isArcGameOwner = (_tokenId: string) =>
    new Promise<string>((resolve, reject) => {
      arcadeGameContractNoAcc
        .ownerOf(_tokenId)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // check isApprovedForAll
  const isArcGameApprovedForAll = (_owner: string, _address: string) =>
    new Promise<boolean>((resolve, reject) => {
      arcadeGameContractNoAcc
        .isApprovedForAll(_owner, _address)
        .then((_response: boolean) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // setApprovalForAll
  const ApprovalArcGameForAll = (_address: string, _status: boolean) =>
    new Promise((resolve, reject) => {
      arcadeGameContract
        .setApprovalForAll(_address, _status)
        .then((_response) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCheckApprovalArcGameForAll = async (
    _owner: string,
    _address: string,
    _status: boolean
  ) => {
    let _isApproved: boolean = false
    _isApproved = await isArcGameApprovedForAll(_owner, _address)
    if (!_isApproved) {
      await ApprovalArcGameForAll(_address, _status)
        .then(() => {
          _isApproved = true
          successToast("approval success")
        })
        .catch((error) => console.error(error))
    }
    return { isApproved: _isApproved }
  }

  // transfer owner
  const transferArcGame = (_from: string, _to: string, _nftToken: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      arcadeGameContract
        .transferFrom(_from, _to, _nftToken)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferArcGame = async (
    _toAddrs: string,
    _nftToken: string,
    _tokenId: string
  ) => {
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await transferArcGame(address, _toAddrs, _nftToken)
        .then(async (response) => {
          const _res = await response.wait()
          const data = {
            _id: _tokenId,
            _to: _toAddrs,
            _from: address,
            _txHash: _res.transactionHash
          }
          await mutateTransferNFTArcGame(data)
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  return {
    isArcGameOwner,
    onCheckApprovalArcGameForAll,
    onTransferArcGame,
    isArcGameApprovedForAll
  }
}

export default useNFTArcGame
