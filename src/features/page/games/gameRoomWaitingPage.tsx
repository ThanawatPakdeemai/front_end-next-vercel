import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import WaitingRoom from "@feature/game/components/templates/singlePlayer/WaitingRoom"
import useGetCurrentPlayerGameSingle from "@feature/game/containers/hooks/useGetCurrentPlayerGameSingle"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import { Box, Typography } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import React, { useEffect, useMemo } from "react"
import { unstable_batchedUpdates } from "react-dom"

interface IProp {
  _roomId: string
}

const GameRoomWaitingPage = ({ _roomId }: IProp) => {
  // const { gameRoomById } = useGetGameRoomById(_roomId)
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)

  const { isLoading, playerGameSingle, fetchPlayerGameSingle } =
    useGetCurrentPlayerGameSingle()

  useEffect(() => {
    let load = true
    if (load)
      if (gameData && profile && _roomId && fetchPlayerGameSingle) {
        unstable_batchedUpdates(() => {
          fetchPlayerGameSingle({
            _roomId,
            _playerId: profile.id,
            _type: "in"
          })
        })
      }
    return () => {
      load = false
    }
  }, [_roomId, gameData, fetchPlayerGameSingle, profile])

  const playersMap = useMemo(() => {
    const player_in = playerGameSingle?.current_player ?? []
    const uniquePlayerIn = player_in.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => t.player_id === thing.player_id)
    )
    const player_blank = Array(
      (playerGameSingle?.max_players ?? 8) - uniquePlayerIn.length
    ).map((ele) => ele)
    const itemPlayer = [...uniquePlayerIn, ...player_blank]
    return itemPlayer
  }, [playerGameSingle])

  return (
    <>
      <Box className="gpa-5 xs:block gap-2 md:grid md:grid-flow-col">
        {_roomId &&
          (playerGameSingle && gameData ? (
            <>
              <Box className="rounded-3xl border border-neutral-700">
                <HeaderWaitingRoom
                  roomId={_roomId}
                  roomTag={playerGameSingle?.room_number}
                  roomName={`#${gameData?.name} ${playerGameSingle?.room_number}`}
                  timer={{
                    time: new Date(playerGameSingle?.end_time)
                  }}
                  player={{
                    currentPlayer: playerGameSingle?.current_player.length ?? 0,
                    maxPlayer: playerGameSingle?.max_players ?? 8
                  }}
                />
                {!isLoading && (
                  <WaitingRoom
                    _roomId={_roomId}
                    _playerGameSingle={playersMap}
                  />
                )}
              </Box>
            </>
          ) : (
            <>Loading...</>
          ))}
        <Box className="h-[238px] rounded-3xl border border-neutral-700">
          <Typography className="m-3">Right Tab</Typography>
        </Box>
      </Box>
    </>
  )
}

export default GameRoomWaitingPage
