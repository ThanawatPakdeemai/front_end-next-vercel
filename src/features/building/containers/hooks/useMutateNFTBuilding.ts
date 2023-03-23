import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import { setTransferBuilding } from "../services/building.services"

const useMutateNFTBuilding = () => {
  const { successToast, errorToast } = useToast()
  const { mutateAsync: mutateTransferNFTBuilding } = useMutation(
    setTransferBuilding,
    {
      mutationKey: ["useTransferNFTBuilding"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.message)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )
  return { mutateTransferNFTBuilding }
}
export default useMutateNFTBuilding
