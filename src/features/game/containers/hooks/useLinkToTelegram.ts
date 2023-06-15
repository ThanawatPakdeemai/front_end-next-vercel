import { useQuery } from "@tanstack/react-query"
import { linkToTelegram } from "../services/game.service"

const useLinkToTelegram = ({ player_id, telegram_id }: any) => {
  const {
    data: linkTelegramData,
    error,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["linkTelegram", { player_id, telegram_id }],
    queryFn: () => linkToTelegram({ player_id, telegram_id }),
    staleTime: Infinity,
    enabled: !!telegram_id
  })
  return {
    linkTelegramData,
    error,
    isLoading,
    isError,
    isFetching
  }
}

export default useLinkToTelegram
