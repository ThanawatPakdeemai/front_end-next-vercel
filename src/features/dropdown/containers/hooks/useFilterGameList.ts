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
    retry: false
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
