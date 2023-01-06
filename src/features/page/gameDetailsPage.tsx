import ShineIcon from "@components/icons/ShineIcon"
import Banner from "@components/molecules/Banner"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
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

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameDetailsPage = () => {
  /* mockup data */
  const profile = useProfileStore((state) => state.profile.data)
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const router = useRouter()

  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

  const { allGameRooms } = useGetAllGameRooms({
    _gameId: "62907d05eb767c39ff09e2a6",
    _email: stateProfile ? stateProfile.email : "",
    _itemId: "61976479dffe844091ab8df1"
  })

  return (
    <>
      <Banner data={GAME_DETAILS_BANNER} />
      <div className="rounded-3xl border border-neutral-700">
        <div className="flex justify-between p-4">
          <h1 className="self-center uppercase text-white-default">
            Lobby :{" Nakamoto wars "}
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
          {profile && allGameRooms && allGameRooms.length > 0
            ? allGameRooms.map((data) => {
                const initEndTime = new Date(data.end_time)
                return (
                  <RoomListBar
                    key={data.id}
                    timer={{
                      time: initEndTime,
                      onExpire: () => null
                    }}
                    player={{
                      currentPlayer: data.amount_current_player,
                      maxPlayer: data.max_players
                    }}
                    roomId={data.room_number}
                    roomName="Room Name"
                  />
                )
              })
            : "Empty"}
        </div>
      </div>
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <LikeNoLobby value={78.34} />
        <StatisticGameDetail />
        <TopPlayer
          element="select"
          subtitle
          background="neutral"
          note
          elevation={0}
          className="!h-[424px] !w-[550px] !bg-primary-main"
          rank
        />
      </div>
    </>
  )
}

export default GameDetailsPage
