import { useMutation } from "@tanstack/react-query"
import {
  getArcGameById,
  getMyArcGame,
  getMyForSaleArcGame,
  getMyInstallmentArcGame
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

export const useGetMyInstallmentArcGame = () => {
  const { mutateAsync: mutateGetMyInstallmentArcGame, isLoading } = useMutation(
    getMyInstallmentArcGame,
    {
      mutationKey: ["getMyInstallmentArcGame"],
      retry: false
    }
  )
  return { mutateGetMyInstallmentArcGame, isLoading }
}

export const useGetMyArcGameById = () => {
  const { mutateAsync: mutateGetMyArcGameById, isLoading } = useMutation(
    getArcGameById,
    {
      mutationKey: ["mutateGetMyArcGameById"],
      retry: false
    }
  )
  return { mutateGetMyArcGameById, isLoading }
}
