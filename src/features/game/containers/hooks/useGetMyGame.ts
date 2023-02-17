import useGlobal from "@hooks/useGlobal"
import { useQuery } from "@tanstack/react-query"
import { getMyGameNFT } from "../services/game.service"

const useGetMyGame = () => {
  const { defaultBody } = useGlobal()
  const {
    data: myGamesData,
    isLoading: myGamesIsLoading,
    isFetching: myGamesIsFetching,
    isPreviousData: myGamesIsPreviousData,
    isError: myGamesIsError,
    error: myGamesError
  } = useQuery({
    queryKey: ["getMyGameNFT", defaultBody],
    queryFn: () =>
      getMyGameNFT({
        ...defaultBody,
        nftgame: true
      }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    myGamesData,
    myGamesIsLoading,
    myGamesIsFetching,
    myGamesIsPreviousData,
    myGamesIsError,
    myGamesError
  }
}

export default useGetMyGame
