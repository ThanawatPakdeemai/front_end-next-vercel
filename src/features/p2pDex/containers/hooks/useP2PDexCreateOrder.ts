import { createP2PDexOrder } from "@feature/multichain/containers/services/multichain.service"
import { useToast } from "@feature/toast/containers"
import useLoadingStore from "@stores/loading"

import { useMutation } from "@tanstack/react-query"

const useP2PDexCreateOrder = () => {
  const { errorToast, successToast } = useToast()
  const { setClose, setOpen } = useLoadingStore()
  setOpen("Processing Save data...")
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
      setClose()
    },
    onError: (_response) => {
      errorToast("error")
      setClose()
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
