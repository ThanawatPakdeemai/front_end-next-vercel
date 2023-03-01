import { useMutation } from "@tanstack/react-query"
import { createNewPassword } from "../services/auth.service"

const useCreateNewPassword = () => {
  const {
    data: response,
    error,
    isLoading,
    isError,
    mutateAsync: mutateCreateNewPassword
  } = useMutation(createNewPassword, {
    mutationKey: ["createNewPassword"]
  })

  return {
    response,
    error,
    isLoading,
    isError,
    mutateCreateNewPassword
  }
}

export default useCreateNewPassword
