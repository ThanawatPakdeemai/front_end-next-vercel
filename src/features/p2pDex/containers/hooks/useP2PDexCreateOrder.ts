import { createP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"

const useP2PDexCreateOrder = () => {
  const { errorToast, successToast } = useToast()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateCreateOrder
  } = useMutation(createP2PDexOrder, {
    mutationKey: ["createP2PDexOrder"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.message)
    },
    onError: (_response) => {
      errorToast("error")
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateCreateOrder
  }
}

export default useP2PDexCreateOrder
