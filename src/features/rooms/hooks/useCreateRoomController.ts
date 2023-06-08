import { useEffect, useState } from "react"
import { useSocketProviderRoom } from "@providers/SocketProviderRoom"
import useCountStore from "@stores/countComponant"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { unstable_batchedUpdates } from "react-dom"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGameGlobal from "@hooks/useGameGlobal"
import { MESSAGES } from "@constants/messages"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useCreateRoom from "@feature/rooms/hooks/useCreateRoom"
import { useToast } from "@feature/toast/containers"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"

interface ICreateRoomControllerProp {
  gameData: IGame
}

interface IPropMessage {
  status: boolean
  message: string
}

const useCreateRoomController = ({ gameData }: ICreateRoomControllerProp) => {
  const [maps, setMaps] = useState<IGameMap[]>([])
  const [map, setMap] = useState<number>(1)
  const [itemUse, setItemUse] = useState<number>(1)
  const [isPublicRoom, setIsPublicRoom] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [profile, setProfile] = useState<IProfile>()

  const router = useRouter()
  const { successToast, errorToast } = useToast()
  const { fetchRoom } = useSocketProviderRoom()
  const profileStore = useProfileStore((state) => state.profile)
  const { itemSelected, setQtyItemOfRoom } = useGameStore()
  const count = useCountStore((state) => state.count)
  const setCount = useCountStore((state) => state.setCount)
  const setMin = useCountStore((state) => state.setMin)
  const setMax = useCountStore((state) => state.setMax)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { conditionGameFree, conditionPlayToEarn } = useGameGlobal()

  const { mutateCreateRoom, isLoading } = useCreateRoom()
  const { gameItemList, balanceofItem } = useBuyGameItemController()
  // const { gameItemList } = useGamesByGameId({
  //   _playerId: profile ? profile.id : "",
  //   _gameId: gameData ? gameData._id : ""
  // })

  const handleSetIsCurrent = (status: boolean) => {
    setIsPublicRoom(status)
  }

  const getItemId = (): string => {
    if (conditionGameFree) {
      return gameItemList?.[0]?._id || ""
    }
    if (itemSelected) {
      return itemSelected?._id
    }
    return ""
  }

  const handleSubmit = () => {
    if (
      gameItemList &&
      balanceofItem &&
      balanceofItem.data > 0 &&
      balanceofItem.data >= itemUse
    ) {
      const gameItem = gameItemList.find((ele) => ele._id === itemSelected?._id)
      if (conditionGameFree || (gameItem && gameItem.qty >= itemUse)) {
        if (conditionPlayToEarn) {
          setItemUse(0)
        }

        if (profile) {
          mutateCreateRoom({
            _gameId: gameData.id,
            _playerId: profile ? profile.id : "",
            _walletAddress: profile ? profile.address : "",
            _itemId: getItemId(),
            _maxPlayer: count,
            _numberItem: itemUse,
            _mapId: map,
            _publicRoom: isPublicRoom
          })
            .then(async (_res) => {
              if (_res) {
                await setOpen(false)
                fetchRoom()
                setQtyItemOfRoom(itemUse)
                setCount(gameData.min_player || 2)
                successToast(MESSAGES["create-room-success"])
                await router.push(`${router.asPath}/${_res?.data.room_id}`)
              }
            })
            .catch((error) => {
              if ((error as IPropMessage)?.message?.length > 0) {
                errorToast(
                  (error as IPropMessage)?.message?.[0]?.["msg"] ?? "Error"
                )
              } else {
                errorToast((error as IPropMessage)?.message ?? "Error")
              }
            })
        }
      } else {
        errorToast(MESSAGES["you-not-enough"])
      }
    } else {
      errorToast(MESSAGES["you-not-enough"])
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (profileStore && profileStore.data) {
        setProfile(profileStore.data)
      }
    }

    return () => {
      load = true
    }
  }, [profileStore])

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) {
        if (gameData.map && gameData.type_code === "multi_02") {
          setMaps(gameData.map)
        }
        unstable_batchedUpdates(() => {
          setCount(gameData.min_player || 2)
          setMin(gameData.min_player || 2)
          setMax(gameData.max_players || 8)
        })
      }
    }

    return () => {
      load = true
    }
  }, [gameData, setCount, setMax, setMin])

  return {
    handleOpen,
    open,
    handleClose,
    map,
    maps,
    setMap,
    handleSetIsCurrent,
    isPublicRoom,
    setIsPublicRoom,
    isLoading,
    handleSubmit
  }
}

export default useCreateRoomController
