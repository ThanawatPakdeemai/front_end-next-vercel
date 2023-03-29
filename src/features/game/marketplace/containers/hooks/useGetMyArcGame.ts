import { useMutation } from "@tanstack/react-query"
import {
  getMyArcGame,
  getMyForSaleArcGame
} from "../services/arcadeGame.service"

export const useGetMyArcGame = () => {
  const { mutateAsync: mutateGeyMyArcGame, isLoading } = useMutation(
    getMyArcGame,
    {
      mutationKey: ["getMyArcGame"],
      retry: false
    }
  )
  return { mutateGeyMyArcGame, isLoading }
}

export const useGetForSaleArcGame = () => {
  const { mutateAsync: mutateGetForsaleArcGame, isLoading } = useMutation(
    getMyForSaleArcGame,
    {
      mutationKey: ["getMyForSaleArcGame"],
      retry: false
    }
  )
  return { mutateGetForsaleArcGame, isLoading }
}
