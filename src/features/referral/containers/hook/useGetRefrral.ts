import { IGetReferrals } from "@feature/referral/interface/IReferralService"
import { useQuery } from "@tanstack/react-query"
import { getReferrals } from "../services/referral.service"

const useGetReferral = ({ player_id, skip, limit }: IGetReferrals) => {
  const {
    data: getReferralsData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ["getReferralsData", player_id],
    queryFn: () => getReferrals({ player_id, skip, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: player_id !== "" && player_id !== undefined
  })
  return {
    getReferralsData,
    error,
    isLoading,
    isPreviousData,
    isError,
    isSuccess
  }
}
export default useGetReferral
