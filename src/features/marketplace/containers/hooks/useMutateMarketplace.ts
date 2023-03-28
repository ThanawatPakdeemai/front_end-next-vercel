import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { purchaseNakapunk } from "@feature/nakapunk/containers/services/nakapunk.service"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import {
  cancelMarketOrder,
  claimRent,
  createMarketOrder,
  payBillInstallNFT,
  purchaseMarketOrder
} from "../services/marketplace.service"

const useMutateMarketplace = () => {
  const { errorToast, successToast } = useToast()
  const { mutateAsync: mutateMarketCreateOrder } = useMutation(
    createMarketOrder,
    {
      mutationKey: ["useMarKCreateOrder"],
      retry: false,
      onSuccess: (_response) => {
        successToast("Transaction success")
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )

  const { mutateAsync: mutateMarketCancelOrder } = useMutation(
    cancelMarketOrder,
    {
      mutationKey: ["useMarKCancelOrder"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.data)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )

  const { mutateAsync: mutateMarketPurcOrder } = useMutation(
    purchaseMarketOrder,
    {
      mutationKey: ["useMarKPurchOrder"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.data)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )

  const { mutateAsync: mutateMarketPurcPunkOrder } = useMutation(
    purchaseNakapunk,
    {
      mutationKey: ["useMarKPurchPunkOrder"],
      retry: false,
      onSuccess: (_response) => {
        successToast("Transaction success")
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )

  // payBillInstallMarketOrder
  const { mutateAsync: mutatePayBillInstallNFT } = useMutation(
    payBillInstallNFT,
    {
      mutationKey: ["useMarKPayBillInstallNFT"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.message)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )

  // claimRent
  const { mutateAsync: mutateClaimRentNFT } = useMutation(claimRent, {
    mutationKey: ["useMarKClaimRentNFT"],
    retry: false,
    onSuccess: (_response) => {
      successToast("Transaction success")
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "Transaction fail")
    }
  })

  return {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateMarketPurcOrder,
    mutateMarketPurcPunkOrder,
    mutatePayBillInstallNFT,
    mutateClaimRentNFT
  }
}

export default useMutateMarketplace