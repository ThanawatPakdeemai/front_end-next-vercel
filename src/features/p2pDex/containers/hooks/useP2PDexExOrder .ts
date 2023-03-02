import { execP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"

const useP2PDexExOrder = () => {
  const { errorToast, successToast } = useToast()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateExOrder
  } = useMutation(execP2PDexOrder, {
    mutationKey: ["execP2PDexOrder"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.message)
    },
    onError: (_response) => {
      errorToast((_response as IMessage).message)
    }
  })

  return {
    data,
    error,
    isLoading,
    isError,
    mutateExOrder
  }
}

export default useP2PDexExOrder
