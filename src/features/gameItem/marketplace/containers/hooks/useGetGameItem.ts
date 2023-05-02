import { useQuery } from "@tanstack/react-query"
// import { useRouter } from "next/router"
import { getTypesGameItem } from "../services/gameItem.service"

const useGetGameItems = () => {
  // const { pathname } = useRouter()
  const { data: gameItemTypes } = useQuery({
    queryKey: ["gameItemTypes"],
    queryFn: getTypesGameItem,
    retry: false,
    staleTime: Infinity
    // enabled: pathname.includes("inventory")
  })

  return {
    gameItemTypes: gameItemTypes?.data
  }
}

export default useGetGameItems
