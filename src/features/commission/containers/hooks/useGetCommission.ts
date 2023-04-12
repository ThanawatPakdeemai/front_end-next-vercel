import { useQuery } from "@tanstack/react-query"
import { IGetCommission } from "@feature/commission/interfaces/ICommission"
import { getCommission } from "../services/commission.service"

const useGetCommission = ({ _playerId, _limit, _page }: IGetCommission) => {
  const {
    data: commissionHistoryData,
    error: errorCommissionHistory,
    isLoading: isLoadingCommissionHistory,
    isError: isErrorCommissionHistory,
    isSuccess: isSuccessCommissionHistory
  } = useQuery({
    queryKey: ["getCommission"],
    queryFn: () =>
      getCommission({
        _playerId,
        _limit,
        _page
      }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_playerId
  })
  return {
    commissionHistoryData: commissionHistoryData && commissionHistoryData.data,
    errorCommissionHistory,
    isLoadingCommissionHistory,
    isErrorCommissionHistory,
    isSuccessCommissionHistory
  }
}

export default useGetCommission
