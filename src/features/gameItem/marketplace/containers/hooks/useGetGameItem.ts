import { useQuery } from "@tanstack/react-query"
import { getTypesGameItem } from "../services/gameItem.service"

const useGetGameItems = () => {
  const { data: gameItemTypes } = useQuery({
    queryKey: ["gameItemTypes"],
    queryFn: getTypesGameItem,
    retry: false
  })

  return {
    gameItemTypes: gameItemTypes?.data
  }
}

export default useGetGameItems
