import { useMutation } from "@tanstack/react-query"
import { getMyArcGame } from "../services/arcadeGame.service"

const useGetMyArcGame = () => {
  const { mutateAsync: mutateGeyMyArcGame, isLoading } = useMutation(
    getMyArcGame,
    {
      mutationKey: ["useTransferNFTArcGame"],
      retry: false
    }
  )
  return { mutateGeyMyArcGame, isLoading }
}
export default useGetMyArcGame
