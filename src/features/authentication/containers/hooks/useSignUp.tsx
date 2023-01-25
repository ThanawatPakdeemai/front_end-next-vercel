import { useMutation } from "@tanstack/react-query"
import { getVerifyCode } from "../services/auth.service"

const useSignUp = () => {
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSignUp
  } = useMutation(getVerifyCode, {
    mutationKey: ["getVerifyCode"],
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
