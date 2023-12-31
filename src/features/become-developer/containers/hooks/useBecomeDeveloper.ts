import { IInfo } from "@interfaces/IHelper"
import { useQuery } from "@tanstack/react-query"
import { getWebBecomeDeveloper } from "../services/becomeDeveloper.service"

const useBecomeDeveloper = () => {
  const {
    data: becomeDeveloper,
    isError: isErrorGameFavourite,
    isLoading: isLoadingGameFavourite,
    error: errorGameFavourite,
    refetch: refetchGameFavourite
  } = useQuery({
    queryKey: ["getWebBecomeDeveloper"],
    queryFn: () => getWebBecomeDeveloper(),
    keepPreviousData: true,
    staleTime: Infinity
  })
  return {
    becomeDeveloperData: becomeDeveloper?.data,
    becomeDeveloperInfo: becomeDeveloper?.info || ({} as IInfo),
    isErrorGameFavourite,
    isLoadingGameFavourite,
    errorGameFavourite,
    refetchGameFavourite
  }
}

export default useBecomeDeveloper
