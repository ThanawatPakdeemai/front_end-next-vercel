import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "../services/auth.service"

const useResetPassword = () => {
  const {
    data: _forgotPassword,
    error,
    isLoading,
    isError,
    mutateAsync: mutateForgotPassword
  } = useMutation(forgotPassword, {
    mutationKey: ["forgotPassword"],
    retry: false
    // onSuccess(res) {
    //   onSetProfileData(res)
    //   onSetProfileAddress(res.address)
    //   onSetProfileJWT(res.jwtToken)
    //   getNaka(res.address).then((_res) => {
    //     if (_res && _res.data) {
    //       setVaultBalance(Number(_res.data))
    //     }
    //   })
    // }
  })

  return {
    _forgotPassword,
    error,
    isLoading,
    isError,
    mutateForgotPassword
  }
}

export default useResetPassword
