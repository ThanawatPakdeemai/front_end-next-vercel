import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getAvatarReefById,
  getListAvatarReef,
  getPriceAvatarReef,
  purchaseAvatarReef,
  redeemAvatarReef
} from "@feature/avatarReef/containers/services/avatarReef.service"

const useMutateAvatarReef = () => {
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

  const { mutateAsync: mutateGetNFTAvatarById } = useMutation({
    mutationKey: ["getNFTAvatarById"],
    mutationFn: getAvatarReefById,
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
    mutateRedeemAvatarReef,
    mutateGetNFTAvatarById
  }
}

export default useMutateAvatarReef
