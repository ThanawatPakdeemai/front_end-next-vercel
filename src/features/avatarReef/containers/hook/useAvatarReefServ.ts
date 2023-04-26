import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getListAvatarReef,
  getPriceAvatarReef,
  purchaseAvatarReef,
  redeemAvatarReef
} from "../services/avatarReef.service"

const useAvatarReefServ = () => {
  const {
    mutateAsync: mutateGetMyAvatarReef,
    isLoading: isGetMyAvatarReefLoading
  } = useMutation({
    mutationKey: ["getAvatarReef"],
    mutationFn: getListAvatarReef,
    retry: false,
    cacheTime: Infinity
  })

  const { data: priceAvatarReef } = useQuery({
    queryKey: ["getPriceAvatarReef"],
    queryFn: getPriceAvatarReef,
    retry: false,
    staleTime: Infinity
  })

  const {
    data: purchAvatarReefData,
    isLoading: isPurAvatarReefLoading,
    mutateAsync: mutatePurchaseAvatarReef
  } = useMutation({
    mutationKey: ["purchaseAvatarReef"],
    mutationFn: purchaseAvatarReef,
    retry: false
  })

  const {
    data: redeemAvatarReefData,
    isLoading: isRedeemAvatarReefLoading,
    mutateAsync: mutateRedeemAvatarReef
  } = useMutation({
    mutationKey: ["redeemAvatarReef"],
    mutationFn: redeemAvatarReef,
    retry: false
  })

  return {
    mutateGetMyAvatarReef,
    isGetMyAvatarReefLoading,
    priceAvatarReef,
    purchAvatarReefData,
    isPurAvatarReefLoading,
    mutatePurchaseAvatarReef,
    redeemAvatarReefData,
    isRedeemAvatarReefLoading,
    mutateRedeemAvatarReef
  }
}

export default useAvatarReefServ
