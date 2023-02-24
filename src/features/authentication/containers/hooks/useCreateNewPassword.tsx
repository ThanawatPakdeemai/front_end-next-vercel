import { useMutation } from "@tanstack/react-query"
import { createNewPassword } from "../services/auth.service"

const useCreateNewPassword = () => {
  const { data: response, mutateAsync: mutateCreateNewPassword } = useMutation(
    createNewPassword,
    {
      mutationKey: ["createNewPassword"]
    }
  )

  return {
    response,
    mutateCreateNewPassword
  }
}

export default useCreateNewPassword
