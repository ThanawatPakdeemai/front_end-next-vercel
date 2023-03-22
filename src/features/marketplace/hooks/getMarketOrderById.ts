import { useQuery } from "@tanstack/react-query"
import { getMarketOrderById } from "../containers/services/marketplace.service"
import { TNFTType } from "../interfaces/IMarketService"

const useGetMarketOrderById = ({
  _id,
  _type,
  _isActive
}: {
  _id: string
  _type: TNFTType | undefined
  _isActive: boolean
}) => {
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["getMarketOrderById", _id],
    queryFn: () => getMarketOrderById({ _id, _type, _isActive }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_id
  })

  return {
    orderData,
    isLoading
  }
}

export default useGetMarketOrderById
