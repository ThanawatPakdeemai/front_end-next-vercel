import { useMutation } from "@tanstack/react-query"
import { purchaseNakapunk } from "../services/nakapunk.service"

const usePurchaseNakapunk = () => {
  const {
    data: resNakapunk,
    isLoading: isNakapunkLoading,
    mutateAsync: mutatePurchaseNakapunk
  } = useMutation({
    mutationKey: ["purchaseNakapunk"],
    mutationFn: purchaseNakapunk,
    retry: false
  })

  return { resNakapunk, isNakapunkLoading, mutatePurchaseNakapunk }
}

export default usePurchaseNakapunk
