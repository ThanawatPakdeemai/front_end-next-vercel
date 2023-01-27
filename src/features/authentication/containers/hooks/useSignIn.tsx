import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "../services/auth.service"

const useSignIn = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSignIn
  } = useMutation(signIn, {
    mutationKey: ["signIn"],
    retry: false,
    onSuccess(res) {
      onSetProfileData(res)
      onSetProfileAddress(res.address)
      onSetProfileJWT(res.jwtToken)
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateSignIn
  }
}

export default useSignIn
