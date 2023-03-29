import { useMutation } from "@tanstack/react-query"
import {
  getMyBuilding,
  getMyForSaleBuilding
} from "../services/building.services"

export const useGetMyBuilding = () => {
  const { mutateAsync: mutateGetOwnerBuilding, isLoading } = useMutation({
    mutationKey: ["getMyBuilding"],
    mutationFn: getMyBuilding,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetOwnerBuilding, isLoading }
}

export const useGetMyForSaleBuilding = () => {
  const { mutateAsync: mutateGetMyForSaleBuilding, isLoading } = useMutation({
    mutationKey: ["getMyForsaleBuilding"],
    mutationFn: getMyForSaleBuilding,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetMyForSaleBuilding, isLoading }
}
