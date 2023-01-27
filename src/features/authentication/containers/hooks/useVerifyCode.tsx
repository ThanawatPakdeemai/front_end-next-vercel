import { useMutation } from "@tanstack/react-query"
import { getVerifyCode } from "../services/auth.service"

const useVerifyCode = () => {
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateVerifyCode
  } = useMutation(getVerifyCode, {
    mutationKey: ["getVerifyCode"],
    retry: false
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateVerifyCode
  }
}

export default useVerifyCode
