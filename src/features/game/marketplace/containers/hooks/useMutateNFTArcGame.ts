import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"
import { useMutation } from "@tanstack/react-query"
import { setTransferArcGame } from "../services/arcadeGame.service"

const useMutateNFTArcGame = () => {
  const { successToast, errorToast } = useToast()
  const { mutateAsync: mutateTransferNFTArcGame } = useMutation(
    setTransferArcGame,
    {
      mutationKey: ["useTransferNFTArcGame"],
      retry: false,
      onSuccess: (_response) => {
        successToast(_response.message)
      },
      onError: (_response) => {
        errorToast((_response as IMessage)?.message ?? "Transaction fail")
      }
    }
  )
  return { mutateTransferNFTArcGame }
}
export default useMutateNFTArcGame
