import { useMutation } from "@tanstack/react-query"
import { shareToEarnAction } from "../services/shareToEarn.service"

const useShareToEarn = () => {
  const {
    data: _shareData,
    error,
    isLoading,
    isError,
    mutateAsync: mutateShareToEarn
  } = useMutation(shareToEarnAction, {
    mutationKey: ["shareToEarn"],
    retry: false
  })

  return {
    _shareData,
    error,
    isLoading,
    isError,
    mutateShareToEarn
  }
}

export default useShareToEarn
