import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { purchaseNakapunk } from "@feature/nakapunk/containers/services/nakapunk.service"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import {
  cancelMarketOrder,
  claimRent,
  createMarketOrder,
  getMarketOrderById,
  getMarketplaceAllTypes,
  mintNFT,
  payBillInstallNFT,
  payInstallment,
  payRental,
  purchaseOrderFullpayment
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

  // new
  const { mutateAsync: mutatePayInstallment } = useMutation(payInstallment, {
    mutationKey: ["useMarkPayInstallment"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.data)
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "Transaction fail")
    }
  })

  const { mutateAsync: mutatePayRetal } = useMutation(payRental, {
    mutationKey: ["useMarKPayRental"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.data)
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "Transaction fail")
    }
  })

  const { mutateAsync: mutateMintNFT } = useMutation(mintNFT, {
    mutationKey: ["mintNFT"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.data)
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "Transaction fail")
    }
  })

  const { mutateAsync: mutateFullPayment } = useMutation(
    purchaseOrderFullpayment,
    {
      mutationKey: ["mintNFT"],
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

  // get all marketplace types for filter
  const { mutateAsync: mutateMarketTypes } = useMutation(
    getMarketplaceAllTypes,
    {
      mutationKey: ["useMarketTypes"],
      retry: false
    }
  )

  const { mutateAsync: mutateMarketOrderById } = useMutation(
    getMarketOrderById,
    {
      mutationKey: ["useMarketOrderByyId"],
      retry: false,
      onError: (_response) => {
        // errorToast((_response as IMessage)?.message ?? "Order not found!.")
        errorToast("This order has been purchased or has been cancelled.")
      }
    }
  )

  return {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutatePayInstallment,
    mutatePayRetal,
    mutateMintNFT,
    mutateFullPayment,
    mutateMarketPurcPunkOrder,
    mutatePayBillInstallNFT,
    mutateClaimRentNFT,
    mutateMarketTypes,
    mutateMarketOrderById
  }
}

export default useMutateMarketplace
