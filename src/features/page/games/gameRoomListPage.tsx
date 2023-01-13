import { Divider } from "@mui/material"
import React, { useEffect, useState } from "react"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import ButtonSticky from "@components/molecules/ButtonSticky"
import ReloadIcon from "@components/icons/ReloadIcon"
import { unstable_batchedUpdates } from "react-dom"
import HeaderRoomList from "@components/organisms/HeaderRoomList"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomListPage = () => {
  /* mockup data */
  const profile = useProfileStore((state) => state.profile.data)
  const data = useGameStore((state) => state.data)
  const router = useRouter()
  const [gameData, setGameData] = useState<IGame>()

  const { allGameRooms, fetchAllGameRoom } = useGetAllGameRooms()

  const handleJoinRoom = (_roomId: string) => {
    router.push(`${router.asPath}/${_roomId}`)
  }

  useEffect(() => {
    if (data && profile && fetchAllGameRoom) {
      unstable_batchedUpdates(() => {
        setGameData(data)
        fetchAllGameRoom({
          _gameId: data._id,
          _email: profile.email,
          // mock for waiting price of items
          _itemId: "63072b0dd0be6934c17b5438"
        })
      })
    }
  }, [data, fetchAllGameRoom, profile])

  return (
    <>
      <div className="rounded-3xl border border-neutral-700">
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
                  roomName="Room Name"
                  onClick={() => handleJoinRoom(_data.id)}
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
    </>
  )
}

export default GameRoomListPage
