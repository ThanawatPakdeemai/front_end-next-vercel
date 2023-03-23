import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import { setTransferNakapunk } from "../services/nakapunk.service"

const useMutateNFTPunk = () => {
  const { successToast, errorToast } = useToast()
  const { mutateAsync: mutateTransferNFTPunk } = useMutation(
    setTransferNakapunk,
    {
      mutationKey: ["useTransferNFTPunk"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.message)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )
  return { mutateTransferNFTPunk }
}
export default useMutateNFTPunk
