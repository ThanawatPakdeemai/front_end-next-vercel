import { useMutation } from "@tanstack/react-query"
import useProfileStore from "@stores/profileStore"
import { transferExpToGold } from "../services/golds.service"

const useTransferExpToGold = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onSetProfileData } = useProfileStore()
  const {
    mutateAsync: mutateTransferExpToGold,
    data: transferExpToGoldData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(transferExpToGold, {
    mutationKey: ["transferExpToGold"],
    retry: false,
    onSuccess(_data) {
      if (profile) {
        onSetProfileData({ ...profile, gold: _data?.data?.gold })
      }
    },
    onError(_error) {
      console.error(_error)
    }
  })
  return {
    transferExpToGoldData,
    mutateTransferExpToGold,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useTransferExpToGold
