import { useMutation } from "@tanstack/react-query"
import {
  getMyForSaleNakapunk,
  getMyNakapunk,
  getNakapunkById
} from "../services/nakapunk.service"

export const useGetMyNakaPunk = () => {
  const { mutateAsync: mutateGetMyNakaPunk, isLoading } = useMutation({
    mutationKey: ["getMyNakapunk"],
    mutationFn: getMyNakapunk,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetMyNakaPunk, isLoading }
}

export const useGetMyForSaleNakaPunk = () => {
  const { mutateAsync: mutateGetMyForsaleNakaPunk, isLoading } = useMutation({
    mutationKey: ["getMyForSaleNakapunk"],
    mutationFn: getMyForSaleNakapunk,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetMyForsaleNakaPunk, isLoading }
}

export const useGetNakPunkById = () => {
  const { mutateAsync: mutateGetNakapunkById, isLoading } = useMutation({
    mutationKey: ["getNakapunkById"],
    mutationFn: getNakapunkById,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetNakapunkById, isLoading }
}
