import { useMutation } from "@tanstack/react-query"
import { getGamesByCategoryId } from "../services/dropdown.service"

const useFilterGameList = () => {
  // const { setNakaBalance } = useWalletStore()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateGetGamesByCategoryId
  } = useMutation(getGamesByCategoryId, {
    mutationKey: ["filterGameList"],
    retry: 3,
    cacheTime: 1000 * 60 * 60 * 24
  })

  return {
    data,
    isLoading,
    error,
    isError,
    mutateGetGamesByCategoryId
  }
}

export default useFilterGameList
