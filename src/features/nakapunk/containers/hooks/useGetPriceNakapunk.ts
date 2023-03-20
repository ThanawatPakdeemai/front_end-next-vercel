import { useQuery } from "@tanstack/react-query"
import { getPriceNakapunk } from "../services/nakapunk.service"

const useGetPriceNakaPunk = () => {
  const { data: priceNakaPunk } = useQuery({
    queryKey: ["getPriceNakaPunk"],
    queryFn: getPriceNakapunk,
    retry: false,
    staleTime: Infinity
  })

  return { priceNakaPunk }
}

export default useGetPriceNakaPunk
