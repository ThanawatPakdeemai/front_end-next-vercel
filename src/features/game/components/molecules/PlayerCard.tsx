/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { memo, useEffect, useMemo } from "react"
import {
  CurrentPlayer,
  IGameCurrentPlayer
} from "@feature/game/interfaces/IGameService"
import AvatarProfile from "@components/atoms/avatar/AvatarProfile"
import { Box, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import { ICurrentPlayer } from "@feature/profile/interfaces/IProfileService"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
}

const PlayerCard = ({ players }: IProps) => {
  const propsSocket = useSocketProviderWaiting()
  const { kickRoom } = propsSocket
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)
  const router = useRouter()
  const { errorToast } = useToast()

  const checkText = (item: CurrentPlayer) => {
    if (gameData?.game_type === "multiplayer") {
      if ("owner" in item && item.owner) {
        return "OWNER"
      }
      if ("owner" in item && !item.owner && item.player_id !== profile?.id) {
        return (
          <button
            role="button"
            className="cursor-pointer"
            onClick={() => {
              if (item.player_id && kickRoom) {
                kickRoom(item.player_id)
              }
            }}
          >
            KICK
          </button>
        )
      }
    }
    if (profile?.id === item.player_id) {
      return "ME"
    }

    return "Player"
  }

  return (
    <>
      <Box className="custom-scroll mb-5 overflow-y-auto">
        <Box
          className={`xs:grid-cols-2 m-auto mt-10  grid h-[345px] w-max grid-cols-3  gap-3  px-4 sm:w-[520px] sm:grid-cols-3 sm:px-0
          md:grid-cols-4  ${players[0] && "pt-4"}`}
        >
          {players.map((item, index) =>
            item ? (
              <Box
                className="w-fit"
                key={item._id}
              >
                <AvatarProfile
                  key={Number(index)}
                  borderColor={
                    profile?.id === item.player_id
                      ? "border-purple-primary border-pink-rainbow m-auto"
                      : "border-error-main border-lemon-rainbow"
                  }
                  src={item.avatar}
                  imageBadge={
                    item.rank ? `/images/gamePage/rank/${item.rank}.svg` : ""
                  }
                  badgeCenter={{
                    status: item.status,
                    name: item.status ?? "Ready"
                  }}
                />
                <Box className="m-auto w-[92px] py-3">
                  <Typography className="text-center font-neue-machina text-sm uppercase text-[700] text-neutral-300">
                    {item.username}
                  </Typography>
                  <Typography
                    className={` text-center font-neue-machina text-xs uppercase ${
                      profile?.id === item.player_id
                        ? "text-purple-primary"
                        : "  text-error-main"
                    }`}
                  >
                    {checkText(item)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <>
                <Box className="  rounded-3xl">
                  <AvatarProfile
                    image={{
                      width: "!w-[82px] p-2 !bg-neutral-800 rounded-xl",
                      height: "!h-auto"
                    }}
                    key={Number(index)}
                    borderColor=" border-neutral-800"
                    src="/images/home/logoNakaMaster.svg"
                  />
                  <Box className="h-[57px] py-3" />
                </Box>
              </>
            )
          )}
        </Box>
      </Box>
    </>
  )
}

export default memo(PlayerCard)
