import { useMutation } from "@tanstack/react-query"
import { getCommission } from "../services/commission.service"

const useGetCommission = () => {
  const {
    mutateAsync: getCommissionHistory,
    data: commissionHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getCommission, {
    mutationKey: ["getCommission"],
    retry: false
  })
  return {
    getCommissionHistory,
    commissionHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetCommission
