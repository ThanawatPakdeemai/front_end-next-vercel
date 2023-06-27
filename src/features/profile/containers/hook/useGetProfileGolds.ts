import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import { getGolds } from "../services/golds.service"

const useGetProfileGolds = () => {
  const { onSetProfileData, profile } = useProfileStore()

  const {
    mutateAsync: mutateGetProfileGolds,
    data: profileGolds,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getGolds, {
    mutationKey: ["GetProfileGolds"],
    retry: false,
    onSuccess(data) {
      if (profile.data) {
        onSetProfileData({ ...profile.data, gold: data.gold })
      }
    }
  })
  return {
    profileGolds,
    mutateGetProfileGolds,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetProfileGolds
