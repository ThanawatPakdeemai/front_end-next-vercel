import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../services/profile.service"

const useUpdateProfile = () => {
  const {
    mutateAsync: mutateUpdateProfile,
    data: updateProfileData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(updateProfile, {
    mutationKey: ["upDateProfile"],
    retry: false
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
