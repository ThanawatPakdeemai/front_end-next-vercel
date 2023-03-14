import { cancelP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"

const useP2PDexCancel = () => {
  const { errorToast, successToast } = useToast()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateCancelP2PDexOrder
  } = useMutation(cancelP2PDexOrder, {
    mutationKey: ["useP2PDexCancel"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.message)
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "error")
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

export default useP2PDexCancel
