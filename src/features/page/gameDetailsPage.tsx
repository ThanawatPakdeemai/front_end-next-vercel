import TimerLobby from "@components/atoms/timer/TimerLobby"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import ShineIcon from "@components/icons/ShineIcon"
import Banner from "@components/molecules/Banner"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import { Divider, TextField } from "@mui/material"
import React, { useState } from "react"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import RoomListBar from "@components/molecules/roomList/RoomListBar"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import Helper from "@utils/helper"

/**
 *
 * @description this page is only mockup for design before use with real api
 */
const GameDetailsPage = () => {
  /* mockup data */
  const [percentageOfLike, setPercentageOfLike] = useState<number>(78.34)
  const time = new Date()
  time.setSeconds(time.getSeconds() + 300) // 5 minutes
  const mockupEmail = Helper.getLocalStorage("email") || "test@example.com"

  const { allGameRooms } = useGetAllGameRooms({
    _gameId: "62d8efdc7714b68ab8b8ca77",
    _email: mockupEmail,
    _itemId: "62e0f49ec6d23a66ae3e1212"
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
              handleClick={() => null}
              startIcon={<PlusIcon />}
              text="Create Room"
              className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
            />
          </div>
        </div>
        <Divider />
        <div className="custom-scroll flex h-[666px] flex-col items-center gap-[27px] overflow-y-scroll bg-room-list bg-contain p-[43px]">
          {allGameRooms && allGameRooms.length > 0
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
                      currentPlayer: data.amount_played,
                      maxPlayer: data.max_players
                    }}
                    roomId={data.room_number}
                    roomName="Goooooood"
                  />
                )
              })
            : "Please Login"}
        </div>
      </div>
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        icon={<ShineIcon />}
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <LikeNoLobby value={percentageOfLike} />
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
