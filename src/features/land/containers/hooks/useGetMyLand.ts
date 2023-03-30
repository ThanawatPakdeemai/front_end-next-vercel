import { useMutation } from "@tanstack/react-query"
import { getMyForSaleLand, getMyLand } from "../services/land.service"

export const useGetMyLand = () => {
  const {
    mutateAsync: mutateGetMyLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getMyLand, {
    mutationKey: ["getMyLand"],
    retry: false,
    cacheTime: Infinity
  })
  return {
    mutateGetMyLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export const useGetMyForSaleLand = () => {
  const {
    mutateAsync: mutateGetMyForSaleLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getMyForSaleLand, {
    mutationKey: ["getMyLandForSale"],
    retry: false,
    cacheTime: Infinity
  })
  return {
    mutateGetMyForSaleLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  }
}
