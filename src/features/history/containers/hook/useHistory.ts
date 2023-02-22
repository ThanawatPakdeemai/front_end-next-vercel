import { useMutation } from "@tanstack/react-query"
import { getHistory } from "../services/history.service"

const useHistory = () => {
  const {
    mutateAsync: getHistoryData,
    data: historyData,
    error: historyError,
    isLoading: historyIsLoading,
    isError: historyIsError,
    isSuccess: historyIsSuccess
  } = useMutation(getHistory, {
    mutationKey: ["getHistory"],
    retry: false
  })
  return {
    getHistoryData,
    historyData,
    historyError,
    historyIsLoading,
    historyIsError,
    historyIsSuccess
  }
}

export default useHistory
