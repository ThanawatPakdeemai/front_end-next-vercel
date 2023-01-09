import { Divider, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import useProfileStore from "@stores/profileStore"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import ButtonSticky from "@components/molecules/ButtonSticky"
import ReloadIcon from "@components/icons/ReloadIcon"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameRoomListPage = () => {
  /* mockup data */
  const profile = useProfileStore((state) => state.profile.data)
  const data = useGameStore((state) => state.data)
  const router = useRouter()
  const [stateProfile, setStateProfile] = useState<IProfile>()
  const [gameData, setGameData] = useState<IGame>()

  const { allGameRooms, refetch } = useGetAllGameRooms({
    _gameId: gameData ? gameData.id : "",
    _email: stateProfile ? stateProfile.email : "",
    // mockup wait for lobby
    _itemId: "63072b0dd0be6934c17b5438"
  })

  useEffect(() => {
    if (data) {
      setGameData(data)
    }
  }, [data])

  useEffect(() => {
    if (profile) {
      setStateProfile(profile)
    }
  }, [profile])

  return (
    <>
      <div className="rounded-3xl border border-neutral-700">
        <div className="flex justify-between p-4">
          <h1 className="text-white-defzault self-center uppercase">
            Lobby :{gameData && gameData.name}
            <span className="text-secondary-main">Skull XL</span>
          </h1>
          <div className="flex">
            <Dropdown
              title="All Categories"
              className="w-[174px] rounded-lg"
            />
            <TextField
              className="px-2"
              placeholder="Search Room"
              InputProps={{
                style: {
                  fontSize: "14px",
                  fontFamily: "neueMachina",
                  width: "174px"
                },
                startAdornment: <SearchIcon className="mr-4" />
              }}
            />
            <ButtonToggleIcon
              handleClick={() => router.reload()}
              startIcon={<PlusIcon />}
              text="Create Room"
              className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
            />
          </div>
        </div>
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
                />
              )
            })}
          <ButtonSticky
            icon={<ReloadIcon />}
            className="mt-10"
            multi
            onClick={refetch}
          />
        </div>
      </div>
    </>
  )
}

export default GameRoomListPage
