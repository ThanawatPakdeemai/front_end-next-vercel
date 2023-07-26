/* eslint-disable no-nested-ternary */
import { Box, Divider } from "@mui/material"
import React from "react"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"

import ButtonSticky from "@components/molecules/ButtonSticky"
import ReloadIcon from "@components/icons/ReloadIcon"
import HeaderRoomList from "@components/organisms/HeaderRoomList"
import useGetAllGameRoomsById from "@feature/game/containers/hooks/useGetAllGameRoomsById"
import useGlobal from "@hooks/useGlobal"
import useGameGlobal from "@hooks/useGameGlobal"
import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomList = () => {
  const { getGameMode } = useGlobal()
  const { getRoomStatus } = useRoomSingle()
  const profile = useProfileStore((state) => state.profile.data)
  const { item, itemSizeId, itemSelected, gameData: data } = useGameGlobal()
  const gameData = data

  const { handleJoinRoom } = useRoomSingle()

  const { allGameRooms } = useGetAllGameRooms({
    _gameId: data ? data._id : "",
    _email: profile ? profile.email : "",
    _itemId: (itemSizeId as string) || ((item as string) ?? "")
  })

  const { allGameRoomsById } = useGetAllGameRoomsById({
    _gameId: !profile && data ? data._id : ""
  })

  const renderRoomName = (): string => {
    if (!gameData) return "Room"
    if (gameData && getGameMode(gameData) === "play-to-earn") {
      return `Room ${itemSelected?.item_size}`
    }
    return "Room"
  }

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
                      currentPlayer:
                        // _data.amount_current_player,
                        _data.amount_current_player <= _data.max_players
                          ? _data.amount_current_player
                          : _data.max_players,
                      maxPlayer: _data.max_players
                    }}
                    roomId={_data.room_number}
                    roomName={renderRoomName()}
                    onClick={() => handleJoinRoom(_data)}
                    btnText={getRoomStatus(_data)}
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
