import { useMutation } from "@tanstack/react-query"
// import useWalletStore from "@stores/wallet"
import { buyItems, buyItemsBSC } from "../services/buyItem.service"

const useBuyGameItems = () => {
  // const { setNakaBalance } = useWalletStore()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateBuyItems
  } = useMutation(buyItems, {
    mutationKey: ["buyItems"],
    retry: false
  })

  const {
    data: dataBSC,
    error: errorBSC,
    isLoading: isLoadingBSC,
    isError: isErrorBSC,
    mutateAsync: mutateBuyItemsBSC
  } = useMutation(buyItemsBSC, {
    mutationKey: ["buyItemsBSC"],
    retry: false
  })

  return {
    data,
    isLoading,
    mutateBuyItems,
    error,
    isError,
    dataBSC,
    isLoadingBSC,
    mutateBuyItemsBSC,
    errorBSC,
    isErrorBSC
  }
}

export default useBuyGameItems
