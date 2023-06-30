import { useMutation } from "@tanstack/react-query"
import { transferExpToGold } from "../services/golds.service"

const useTransferExpToGold = () => {
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
      // console.log(data)
      // if (profile.data) {
      // onSetProfileData({ ...profile.data, gold: data.gold })
      // }
    },
    onError(_error) {
      // console.log(_error)
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
