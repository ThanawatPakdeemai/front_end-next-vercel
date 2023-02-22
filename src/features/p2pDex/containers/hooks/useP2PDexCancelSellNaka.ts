import { cancelP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"

const useP2PDexCancelSellNaka = () => {
  const { errorToast, successToast } = useToast()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateCancelP2PDexOrder
  } = useMutation(cancelP2PDexOrder, {
    mutationKey: ["useP2PDexCancelSellNaka"],
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
    mutateCancelP2PDexOrder
  }
}

export default useP2PDexCancelSellNaka
