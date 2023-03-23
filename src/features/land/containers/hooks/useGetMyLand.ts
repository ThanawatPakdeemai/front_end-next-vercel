import { useMutation } from "@tanstack/react-query"
import { getMyLand } from "../services/land.service"

const useGetMyLand = () => {
  const {
    mutateAsync: mutateGetMyLand,
    data: myLandHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getMyLand, {
    mutationKey: ["getMyLand"],
    retry: false,
    cacheTime: Infinity
  })
  return {
    mutateGetMyLand,
    myLandHistoryData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetMyLand
