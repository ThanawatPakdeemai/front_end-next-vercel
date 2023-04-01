import { useMutation } from "@tanstack/react-query"
import { shareToEarnActionTracking } from "../services/shareToEarn.service"

const useShareToEarnTracking = () => {
  const {
    data: _shareData,
    error,
    isLoading,
    isError,
    mutateAsync: mutateShareToEarnTracking
  } = useMutation(shareToEarnActionTracking, {
    mutationKey: ["shareToEarnTracking"],
    retry: false
  })

  return {
    _shareData,
    error,
    isLoading,
    isError,
    mutateShareToEarnTracking
  }
}

export default useShareToEarnTracking
