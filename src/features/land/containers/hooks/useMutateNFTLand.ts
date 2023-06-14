import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { setTransferLand } from "../services/land.service"

const useMutateNFTLand = () => {
  const { successToast, errorToast } = useToast()
  const { mutateAsync: mutateTransferNFTLand } = useMutation(setTransferLand, {
    mutationKey: ["useTranferNFTLand"],
    retry: false,
    onSuccess: (_response) => {
      successToast(_response.message)
    },
    onError: (_response) => {
      errorToast((_response as IMessage)?.message ?? "Transaction fail")
    }
  })
  return { mutateTransferNFTLand }
}

export default useMutateNFTLand
