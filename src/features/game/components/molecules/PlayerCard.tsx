import React, { memo } from "react"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import AvatarProfile from "@components/atoms/avatar/AvatarProfile"
import { Box, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
  OnPlayGame: () => void
}

const PlayerCard = ({ players, OnPlayGame }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <>
      {players.map((item, index) => (
        <Box key={Number(index)}>
          {item ? (
            <>
              <Box>
                <AvatarProfile
                  key={Number(index)}
                  borderColor={
                    profile?.id === item.player_id
                      ? "border-purple-primary border-pink-rainbow "
                      : "border-error-main border-lemon-rainbow"
                  }
                  src={item.avatar}
                  imageBadge={`/images/gamePage/rank/${item.rank}.svg`}
                />
                <Box className="w-[92px] py-3">
                  <Typography className="text-center font-neue-machina text-sm uppercase text-[700] text-neutral-300">
                    {item.username}
                  </Typography>
                  {profile?.id === item.player_id ? (
                    <Typography className=" text-center font-neue-machina text-xs uppercase text-purple-primary">
                      owner
                    </Typography>
                  ) : (
                    <Typography className=" text-center font-neue-machina text-xs uppercase text-error-main">
                      player
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box className="  rounded-3xl">
                <AvatarProfile
                  image={{
                    width: "!w-[82px] p-3 !bg-neutral-800 rounded-xl",
                    height: "!h-auto"
                  }}
                  key={Number(index)}
                  borderColor=" border-neutral-800"
                  src="/images/home/logoNakaMaster.svg"
                />
                <Box className="h-[57px] py-3" />
              </Box>
            </>
          )}
        </Box>
      ))}
    </>
  )
}

export default memo(PlayerCard)
