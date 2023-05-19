/* eslint-disable no-nested-ternary */
import { Box, Divider } from "@mui/material"
import React from "react"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import {
  IGameCurrentPlayer,
  IGameRoomDetail
} from "@feature/game/interfaces/IGameService"
import ButtonSticky from "@components/molecules/ButtonSticky"
import ReloadIcon from "@components/icons/ReloadIcon"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import useGetAllGameRoomsById from "@feature/game/containers/hooks/useGetAllGameRoomsById"
import useGlobal from "@hooks/useGlobal"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGameGlobal from "@hooks/useGameGlobal"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomList = () => {
  /* mockup data */
  const { getTypeGamePathFolder } = useGlobal()
  const profile = useProfileStore((state) => state.profile.data)
  // const { data } = useGameStore()
  const router = useRouter()
  const { errorToast } = useToast()
  // const [gameData, setGameData] = useState<IGame>()
  const { balanceofItem } = useBuyGameItemController()
  const {
    item,
    conditionGameFree,
    // conditionPlayToEarn,
    itemSizeId,
    itemSelected,
    gameData: data
  } = useGameGlobal()
  const gameData = data

  // const item = useMemo(() => {
  //   if (data) {
  //     if (data.game_mode !== "play-to-earn" || data.tournament) {
  //       return data.item[0]._id
  //     }
  //     if (itemSelected) {
  //       return itemSelected._id
  //     }
  //     if (itemSizeId) {
  //       return itemSizeId
  //     }
  //   } else {
  //     return ""
  //   }
  // }, [data, itemSelected, itemSizeId])

  const { allGameRooms } = useGetAllGameRooms({
    _gameId: data ? data._id : "",
    _email: profile ? profile.email : "",
    _itemId: itemSizeId || (item ?? "")
  })

  const { allGameRoomsById } = useGetAllGameRoomsById({
    _gameId: !profile && data ? data._id : ""
  })

  const intoRoomGame = (
    data_player_me: IGameCurrentPlayer,
    _roomId: string
  ) => {
    if (data_player_me) {
      if (data_player_me && data_player_me.status !== "played") {
        router.push(`${router.asPath}/${_roomId}`)
      } else if (data && data_player_me && data_player_me.status === "played") {
        router.push(
          `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
        )
        errorToast(MESSAGES["you-played"])
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else if (router.asPath.includes("?id=")) {
      router.push(`${router.asPath.split("?id=")[0]}/${_roomId}`)
    } else {
      router.push(`${router.asPath}/${_roomId}`)
    }
  }

  const handleJoinRoom = (_dataRoom: IGameRoomDetail) => {
    const data_player_me = _dataRoom.current_player.find((ele) => {
      if (profile) {
        return ele.player_id === profile.id
      }
      return undefined
    })
    const _roomId = _dataRoom._id
    if (profile) {
      if (
        itemSelected &&
        itemSelected.qty > 0 &&
        balanceofItem &&
        balanceofItem?.data > 0 &&
        new Date() <= new Date(_dataRoom.end_time) &&
        _dataRoom.amount_current_player < _dataRoom.max_players
      ) {
        intoRoomGame(data_player_me as IGameCurrentPlayer, _roomId)
      } else if (new Date() > new Date(_dataRoom.end_time)) {
        errorToast(MESSAGES["room-timeout"])
      } else if (conditionGameFree) {
        intoRoomGame(data_player_me as IGameCurrentPlayer, _roomId)
      } else if (_dataRoom.amount_current_player >= _dataRoom.max_players) {
        if (data && data_player_me && data_player_me.status === "played") {
          router.push(
            `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
          )
        } else {
          errorToast(MESSAGES["room-full"])
        }
      } else if (
        (balanceofItem && balanceofItem?.data < 1) ||
        balanceofItem === undefined
      ) {
        if (data && data_player_me && data_player_me.status === "played") {
          router.push(
            `/${router?.query?.typeGame}/${data.path}/summary/${_roomId}`
          )
        } else {
          errorToast(MESSAGES["you-don't-have-item"])
        }
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else {
      errorToast(MESSAGES["please_login"])
    }
  }

  const renderRoomName = (): string => {
    if (!gameData) return "Room"
    if (gameData && getTypeGamePathFolder(gameData) === "play-to-earn-games") {
      return `Room ${itemSelected?.item_size}`
    }
    return "Room"
  }

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     if (data) {
  //       unstable_batchedUpdates(() => {
  //         setGameData(data)
  //       })
  //     }
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [allGameRooms, data])

  return (
    <Box
      component="div"
      className="w-full gap-3 lg:flex"
    >
      <div className="relative w-full rounded-3xl border border-neutral-700">
        {gameData && <HeaderRoomList lobby={gameData.name} />}
        <Divider />
        <div className="custom-scroll md:0 m-4 flex h-96 flex-col gap-[27px] overflow-y-scroll bg-room-list bg-contain md:h-[666px] md:items-center md:p-6 lg:p-[43px]">
          {profile
            ? allGameRooms &&
              allGameRooms.length > 0 &&
              allGameRooms.map((_data) => {
                const initEndTime = new Date(_data.end_time)
                return (
                  <RoomListBar
                    key={_data.id}
                    timer={{
                      time: initEndTime,
                      onExpire: () => null
                    }}
                    player={{
                      currentPlayer: _data.amount_current_player,
                      maxPlayer: _data.max_players
                    }}
                    roomId={_data.room_number}
                    roomName={renderRoomName()}
                    onClick={() => handleJoinRoom(_data)}
                    btnText={
                      _data?.current_player?.find(
                        (ele) => ele.player_id === profile?.id
                      )?.status === "played"
                        ? "played"
                        : _data?.amount_current_player >= _data.max_players
                        ? "full"
                        : "join"
                    }
                    path={gameData?.path}
                    dataGoalRush={_data.data_play}
                  />
                )
              })
            : allGameRoomsById &&
              allGameRoomsById.length > 0 &&
              allGameRoomsById.map((_data) => {
                const initEndTime = new Date(_data.end_time)
                return (
                  <RoomListBar
                    key={_data.id}
                    timer={{
                      time: initEndTime,
                      onExpire: () => null
                    }}
                    player={{
                      currentPlayer: _data.amount_current_player,
                      maxPlayer: _data.max_players
                    }}
                    roomId={_data.room_number}
                    roomName={renderRoomName()}
                    onClick={() => handleJoinRoom(_data)}
                  />
                )
              })}
          <ButtonSticky
            icon={<ReloadIcon />}
            className="mt-10"
            multi
          />
        </div>
      </div>
    </Box>
  )
}

export default GameRoomList
