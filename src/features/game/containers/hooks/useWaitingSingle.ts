import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"

const useWaitingSingle = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data, itemSelected } = useGameStore()
  const router = useRouter()
  const { id } = router.query
  const itemSizeId = id as string
  // const { errorToast } = useToast()
  const { balanceofItem } = useBuyGameItemController()

  return {
    balanceofItem,
    itemSizeId,
    profile,
    gameData: data,
    itemSelected
  }
}

export default useWaitingSingle
