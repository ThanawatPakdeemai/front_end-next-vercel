import { useMutation } from "@tanstack/react-query"
import { getTransWallet } from "../services/transaction.service"

const useGetTransWallet = () => {
  const {
    mutateAsync: getTransHistory,
    data: transHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getTransWallet, {
    mutationKey: ["getTransWallet"],
    retry: false
  })
  return {
    getTransHistory,
    transHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetTransWallet
