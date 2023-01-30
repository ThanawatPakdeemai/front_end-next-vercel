import { useMutation } from "@tanstack/react-query"
import { redeemCode } from "../services/coupon.service"

const useGetCoupon = () => {
  // (coupon_code: string)

  // const {
  //   data: useGetCouponRedeem,
  //   error,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   refetch
  // } = useQuery({
  //   queryKey: ["getCouponRedeem", coupon_code],
  //   queryFn: () => redeemCode(coupon_code),
  //   keepPreviousData: true,
  //   staleTime: Infinity,
  //   // enabled: coupon_code !== "" && coupon_code !== undefined
  //   enabled: false
  // })
  // return {
  //   useGetCouponRedeem,
  //   error,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   refetch
  // }
  const {
    mutateAsync: getRedeemCode,
    data: getCouponData,
    error,
    isLoading,
    isError,
    isSuccess
  } = useMutation(redeemCode, {
    mutationKey: ["getCouponData"],
    retry: false
  })
  return {
    getRedeemCode,
    getCouponData,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetCoupon
