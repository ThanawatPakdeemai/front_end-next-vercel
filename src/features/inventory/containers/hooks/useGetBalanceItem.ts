import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import useGetBalanceOf from "./useGetBalanceOf"

const useGetBalanceItem = () => {
  const { data, itemSelected } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { isFreeToPlayGame } = useGlobal()

  const { balanceofItem, refetch: refetchBalanceofItem } = useGetBalanceOf({
    _address: profile?.address ?? "",
    _item_id: isFreeToPlayGame(data as IGame)
      ? 0
      : itemSelected?.item_id_smartcontract ?? 0
  })

  return { balanceofItem, refetchBalanceofItem }
}

export default useGetBalanceItem
