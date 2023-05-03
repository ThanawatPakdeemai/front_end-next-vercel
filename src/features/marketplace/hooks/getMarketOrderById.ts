import { useQuery } from "@tanstack/react-query"
import { getMarketOrderById } from "../containers/services/marketplace.service"
import { TUrlNFT } from "../interfaces/IMarketService"

const useGetMarketOrderById = ({
  _id,
  _urlNFT
}: {
  _id: string
  _urlNFT: TUrlNFT
}) => {
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["getMarketOrderById", _id, _urlNFT],
    queryFn: () => getMarketOrderById({ _id, _urlNFT }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_id && !!_urlNFT
  })

  return {
    orderData,
    isLoading
  }
}

export default useGetMarketOrderById
