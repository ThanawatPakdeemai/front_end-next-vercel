import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import { loginProvider } from "../services/auth.service"

const useLoginProvider = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateLoginProvider
  } = useMutation(loginProvider, {
    mutationKey: ["LoginProvider"],
    retry: false,
    onSuccess(res) {
      onSetProfileData(res)
      onSetProfileAddress("")
      onSetProfileJWT(res.jwtToken)
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateLoginProvider
  }
}

export default useLoginProvider
