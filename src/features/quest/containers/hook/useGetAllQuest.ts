import { useQuery } from "@tanstack/react-query"
import { getAllQuest } from "../services/quest.service"

const useGetAllQuest = (_playerId: string) => {
  const {
    data: dataAllQuest,
    error,
    isLoading,
    isError,
    refetch: refetchAllQuest
  } = useQuery({
    queryKey: ["getAllQuest", _playerId],
    queryFn: () => getAllQuest(_playerId).then((res) => res),
    enabled: !!_playerId,
    refetchOnWindowFocus: false,
    keepPreviousData: false
  })

  return {
    dataAllQuest,
    error,
    isLoading,
    isError,
    refetchAllQuest
  }
}

export default useGetAllQuest
