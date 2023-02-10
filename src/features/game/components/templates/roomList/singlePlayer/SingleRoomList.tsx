import { Box, Divider } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import { IGame, IGameRoomDetail } from "@feature/game/interfaces/IGameService"
import ButtonSticky from "@components/molecules/ButtonSticky"
import ReloadIcon from "@components/icons/ReloadIcon"
import { unstable_batchedUpdates } from "react-dom"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomList = () => {
  /* mockup data */
  const profile = useProfileStore((state) => state.profile.data)
  const { data, itemSelected } = useGameStore()
  const router = useRouter()
  const { errorToast } = useToast()
  const [gameData, setGameData] = useState<IGame>()

  const { balanceofItem } = useGetBalanceOf({
    _address: profile?.address ?? "",
    _item_id: itemSelected?.item_id_smartcontract ?? 0
  })

  const item = useMemo(() => {
    if (data) {
      if (data.play_to_earn || data.tournament) {
        return data.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
    } else {
      return ""
    }
  }, [data, itemSelected])

  const { allGameRooms } = useGetAllGameRooms({
    _gameId: data ? data._id : "",
    _email: profile ? profile.email : "",
    _itemId: item ?? ""
  })

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
        data_player_me &&
        data_player_me.status !== "played"
      ) {
        router.push(`${router.asPath}/${_roomId}`)
      } else if (data && (data.play_to_earn || data.tournament)) {
        router.push(`${router.asPath}/${_roomId}`)
      } else if (data_player_me && data_player_me.status === "played" && data) {
        router.push(`/${data.path}/summary/${_roomId}`)
      } else if (
        (balanceofItem && balanceofItem?.data < 1) ||
        balanceofItem === undefined
      ) {
        errorToast(MESSAGES["you-don't-have-item"])
      } else {
        errorToast(MESSAGES["please_item"])
      }
    } else {
      errorToast(MESSAGES["please_login"])
    }
  }

  useEffect(() => {
    if (data) {
      unstable_batchedUpdates(() => {
        setGameData(data)
      })
    }
  }, [allGameRooms, data])

  return (
    <>
      <Box className=" block w-full gap-3 lg:flex ">
        <div className="w-full rounded-3xl border border-neutral-700">
          {gameData && <HeaderRoomList lobby={gameData.name} />}
          <Divider />
          <div className="custom-scroll flex h-[666px] flex-col items-center gap-[27px] overflow-y-scroll bg-room-list bg-contain p-[43px]">
            {profile &&
              allGameRooms &&
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
                    roomName="Room NAKA"
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
        {gameData && (!gameData?.play_to_earn || !gameData.tournament) && (
          <Box className=" w-[333px] flex-none gap-2">
            <CardBuyItem />
          </Box>
        )}
      </Box>
    </>
  )
}

export default GameRoomList
