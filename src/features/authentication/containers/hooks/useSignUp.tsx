import { useMutation } from "@tanstack/react-query"
import { signUp } from "../services/auth.service"

const useSignUp = () => {
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSignUp
  } = useMutation(signUp, {
    mutationKey: ["signUp"],
    retry: false
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateSignUp
  }
}

export default useSignUp
