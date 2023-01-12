import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import WaitingRoom from "@feature/game/components/templates/singlePlayer/WaitingRoom"
import useGetCurrentPlayerGameSingle from "@feature/game/containers/hooks/useGetCurrentPlayerGameSingle"

import { Box, Typography } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo } from "react"
import { unstable_batchedUpdates } from "react-dom"

interface IProp {
  _roomId: string
}

const GameRoomWaitingPage = ({ _roomId }: IProp) => {
  // const { gameRoomById } = useGetGameRoomById(_roomId)
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)
  const router = useRouter()
  const { isLoading, playerGameSingle, fetchPlayerGameSingle } =
    useGetCurrentPlayerGameSingle()

  const fetchPlayers = useCallback(
    (_type: "in" | "out") => {
      if (gameData && profile && _roomId && fetchPlayerGameSingle) {
        unstable_batchedUpdates(() => {
          fetchPlayerGameSingle({
            _roomId,
            _playerId: profile.id,
            _type
          })
        })
      }
    },
    [_roomId, fetchPlayerGameSingle, gameData, profile]
  )

  useEffect(() => {
    let load = true
    if (load) fetchPlayers("in")
    return () => {
      load = false
    }
  }, [fetchPlayers])

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // out room this game
        fetchPlayers("out")
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [fetchPlayers, router])

  const playersMap = useMemo(() => {
    const player_in = playerGameSingle?.current_player ?? []
    const uniquePlayerIn = player_in.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => t.player_id === thing.player_id)
    )

    const playerMe = uniquePlayerIn.find((ele) => ele.player_id === profile?.id)
    const playerMeIndex = uniquePlayerIn.findIndex(
      (ele) => ele.player_id === profile?.id
    )
    uniquePlayerIn.splice(playerMeIndex, 1)
    if (playerMe) uniquePlayerIn.splice(0, 1, playerMe)
    const player_blank = Array(
      (playerGameSingle?.max_players ?? 8) - uniquePlayerIn.length
    ).map((ele) => ele)
    const itemPlayer = [...uniquePlayerIn, ...player_blank]
    return itemPlayer
  }, [
    playerGameSingle?.current_player,
    playerGameSingle?.max_players,
    profile?.id
  ])

  return (
    <>
      <Box className="block gap-3 lg:grid lg:grid-flow-col">
        {_roomId &&
          (playerGameSingle && gameData ? (
            <>
              <Box className=" rounded-3xl border border-neutral-700">
                <HeaderWaitingRoom
                  roomId={_roomId}
                  roomTag={playerGameSingle?.room_number}
                  roomName={`#${gameData?.name} ${playerGameSingle?.room_number}`}
                  timer={{
                    time: new Date(playerGameSingle?.end_time)
                  }}
                  player={{
                    currentPlayer: playersMap.filter((ele) => ele).length ?? 0,
                    maxPlayer: playerGameSingle?.max_players ?? 8
                  }}
                />
                {!isLoading && <WaitingRoom _playerGameSingle={playersMap} />}
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
