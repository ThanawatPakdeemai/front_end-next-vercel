import { useMutation } from "@tanstack/react-query"
import { getMyLand } from "../services/land.service"

const useGetMyLand = () => {
  const {
    mutateAsync: getMyLandHistory,
    data: myLandHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getMyLand, {
    mutationKey: ["getMyLand"],
    retry: false
  })
  return {
    getMyLandHistory,
    myLandHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetMyLand
