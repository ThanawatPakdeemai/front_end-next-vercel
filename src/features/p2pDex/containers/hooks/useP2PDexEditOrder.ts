import { updateP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"

const useP2PDexEditOrder = () => {
  const { errorToast, successToast } = useToast()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateEditOrder
  } = useMutation(updateP2PDexOrder, {
    mutationKey: ["useP2PDexEditOrder"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.message)
    },
    onError: (_response) => {
      errorToast("error")
    }
  })

  return {
    data,
    error,
    isLoading,
    isError,
    mutateEditOrder
  }
}

export default useP2PDexEditOrder
