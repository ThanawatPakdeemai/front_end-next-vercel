import { useMutation } from "@tanstack/react-query"
import { getGameAllFilter } from "../services/dropdown.service"

const useFilterGameList = () => {
  // const { setNakaBalance } = useWalletStore()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateGetGameAllFilter
  } = useMutation(getGameAllFilter, {
    mutationKey: ["filterGameList"],
    retry: 3,
    cacheTime: 1000 * 60 * 60 * 24
  })

  return {
    data,
    isLoading,
    error,
    isError,
    mutateGetGameAllFilter
  }
}

export default useFilterGameList
