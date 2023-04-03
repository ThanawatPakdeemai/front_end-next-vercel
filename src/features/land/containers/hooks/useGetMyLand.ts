import { useMutation } from "@tanstack/react-query"
import {
  getLandById,
  getMyForSaleLand,
  getMyInstallmentLand,
  getMyLand
} from "../services/land.service"

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

export const useGetMyInstallmentLand = () => {
  const {
    mutateAsync: mutateGetMyInstallmentLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getMyInstallmentLand, {
    mutationKey: ["getMyInstallmentLand"],
    retry: false,
    cacheTime: Infinity
  })
  return {
    mutateGetMyInstallmentLand,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export const useGetLandById = () => {
  const {
    mutateAsync: mutateGetLandById,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getLandById, {
    mutationKey: ["getLandById"],
    retry: false,
    cacheTime: Infinity
  })
  return {
    mutateGetLandById,
    data,
    error,
    isLoading,
    isError,
    isSuccess
  }
}
