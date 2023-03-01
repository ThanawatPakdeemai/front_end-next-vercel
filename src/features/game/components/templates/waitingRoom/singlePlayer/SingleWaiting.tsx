import HeaderWaitingRoom from "@components/organisms/HeaderWaitingRoom"
import SeatPlayersSingle from "@feature/game/components/organisms/SeatPlayerSingle"
import useGetCurrentPlayerGameSingle from "@feature/game/containers/hooks/useGetCurrentPlayerGameSingle"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"

import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo } from "react"
import { unstable_batchedUpdates } from "react-dom"

export interface IPropWaitingSingle {
  _roomId: string
}

const GameSinglePlayer = ({ _roomId }: IPropWaitingSingle) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data } = useGameStore()
  const router = useRouter()
  const { isLoading, playerGameSingle, fetchPlayerGameSingle } =
    useGetCurrentPlayerGameSingle()

  const fetchPlayers = useCallback(
    (_type: "in" | "out") => {
      if (data && profile && _roomId && fetchPlayerGameSingle) {
        unstable_batchedUpdates(() => {
          fetchPlayerGameSingle({
            _roomId,
            _playerId: profile.id,
            _type
          })
        })
      }
    },
    [_roomId, fetchPlayerGameSingle, data, profile]
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
    if (playerMeIndex !== 0) {
      uniquePlayerIn.splice(playerMeIndex, 1)
      if (playerMe) uniquePlayerIn.splice(0, 0, playerMe)
    }

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

  const outRoom = async () => {
    if (_roomId && profile && data) {
      await fetchPlayerGameSingle({
        _roomId,
        _playerId: profile.id,
        _type: "out"
      })
      await router.push(`/${data.path}/roomlist`)
    }
  }

  return (
    <>
      <Box className="block gap-3 lg:flex ">
        {_roomId &&
          (data ? (
            <>
              <Box className="relative w-full rounded-3xl border border-neutral-700 lg:w-[1020px]">
                {playerGameSingle && (
                  <HeaderWaitingRoom
                    roomTag={playerGameSingle.room_number}
                    roomName={`#${data.name} ${playerGameSingle.room_number}`}
                    timer={{
                      time: new Date(playerGameSingle.end_time)
                    }}
                    player={{
                      currentPlayer:
                        playersMap.filter((ele) => ele).length ?? 0,
                      maxPlayer: playerGameSingle.max_players ?? 8
                    }}
                    onOutRoom={outRoom}
                  />
                )}

                {!isLoading && (
                  <>
                    <SeatPlayersSingle
                      players={playersMap}
                      room_id={_roomId}
                    />
                  </>
                )}
              </Box>
            </>
          ) : (
            <>Loading...</>
          ))}
        {(!data?.play_to_earn || !data.tournament) && (
          <Box className="rounded-3xl lg:w-[333px]">
            <CardBuyItem />
          </Box>
        )}
      </Box>
    </>
  )
}

export default GameSinglePlayer
