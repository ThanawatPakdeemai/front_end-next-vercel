import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../services/profile.service"

const useUpdateProfile = () => {
  const onSetProfileData = useProfileStore((state) => state.onSetProfileData)
  const {
    mutateAsync: mutateUpdateProfile,
    data: updateProfileData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(updateProfile, {
    mutationKey: ["upDateProfile"],
    retry: false,
    onSuccess(data) {
      onSetProfileData(data)
    }
  })
  return {
    mutateUpdateProfile,
    updateProfileData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useUpdateProfile
