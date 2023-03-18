import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import {
  cancelMarketOrder,
  createMarketOrder,
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

  return {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateMarketPurcOrder
  }
}

export default useMutateMarketplace
