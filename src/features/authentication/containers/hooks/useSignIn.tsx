import { useMutation } from "@tanstack/react-query"
import { signIn } from "../services/auth.service"

const useSignIn = () => {
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSignIn
  } = useMutation(signIn, {
    mutationKey: ["signIn"],
    retry: false
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
