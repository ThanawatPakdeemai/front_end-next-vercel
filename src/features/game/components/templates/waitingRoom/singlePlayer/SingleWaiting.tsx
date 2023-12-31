import React from "react"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"
import { IGameItem } from "@feature/gameItem/interfaces/IGameItemService"
import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"

const TopPlayerFreeToEarn = dynamic(
  () => import("@feature/ranking/components/template/TopPlayerFreeToEarn")
)
const CardBuyItem = dynamic(
  () => import("@feature/gameItem/components/molecules/CardBuyItem")
)
const SkeletonCardPlayers = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCardPlayers")
)
const HeaderWaitingRoom = dynamic(
  () => import("@components/organisms/HeaderWaitingRoom")
)
const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent")
)
const SeatPlayersSingle = dynamic(
  () => import("@feature/game/components/organisms/SeatPlayerSingle")
)

export interface IPropWaitingSingle {
  _roomId: string
}

const GameSinglePlayer = ({ _roomId }: IPropWaitingSingle) => {
  const { data } = useGameStore()
  // const { isLoading, playerGameSingle, fetchPlayerGameSingle } =
  //   useGetCurrentPlayerGameSingle()
  const { getGameMode, isFreeToEarnGame } = useGlobal()
  const {
    onPlayGame,
    playerGameSingle,
    loadingPlayer: isLoading,
    playersMap,
    outRoom
  } = useWaitingSingle()

  // const fetchPlayers = useCallback(
  //   (_type: "in" | "out") => {
  //     if (data && profile && _roomId && fetchPlayerGameSingle) {
  //       unstable_batchedUpdates(() => {
  //         fetchPlayerGameSingle({
  //           _roomId,
  //           _playerId: profile.id,
  //           _type
  //         })
  //       })
  //     }
  //   },
  //   [_roomId, fetchPlayerGameSingle, data, profile]
  // )

  // useEffect(() => {
  //   let load = false

  //   if (!load) fetchPlayers("in")

  //   return () => {
  //     load = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     router.beforePopState(({ as }) => {
  //       if (as !== router.asPath) {
  //         // Will run when leaving the current page; on back/forward actions
  //         // out room this game
  //         fetchPlayers("out")
  //       }
  //       return true
  //     })
  //   }

  //   return () => {
  //     load = true
  //     router.beforePopState(() => true)
  //   }
  // }, [fetchPlayers, router])
  // console.log(playerGameSingle)

  // const playersMap = useMemo(() => {
  //   const player_in = playerGameSingle?.current_player ?? []
  //   const uniquePlayerIn = player_in.filter(
  //     (thing, index, self) =>
  //       index === self.findIndex((t) => t.player_id === thing.player_id)
  //   )

  //   const playerMe = uniquePlayerIn.find((ele) => ele.player_id === profile?.id)

  //   const playerMeIndex = uniquePlayerIn.findIndex(
  //     (ele) => ele.player_id === profile?.id
  //   )
  //   if (playerMeIndex !== 0) {
  //     uniquePlayerIn.splice(playerMeIndex, 1)
  //     if (playerMe) uniquePlayerIn.splice(0, 0, playerMe)
  //   }

  //   const player_blank = Array(
  //     (playerGameSingle?.max_players ?? 8) - uniquePlayerIn.length
  //   ).map((ele) => ele)
  //   const itemPlayer = [...uniquePlayerIn, ...player_blank]
  //   return itemPlayer
  // }, [
  //   playerGameSingle?.current_player,
  //   playerGameSingle?.max_players,
  //   profile?.id
  // ])

  // const playersMe = useMemo(() => {
  //   if (playersMap)
  //     return playersMap?.find((ele) => ele?.player_id === profile?.id)
  // }, [playersMap, profile?.id])

  // const outRoomLink = useCallback(() => {
  //   if (data) router.push(`/${router.query.typeGame}/${data.path}/roomlist`)
  // }, [data, router])

  // const outRoom = async () => {
  //   if (_roomId && profile) {
  //     outRoomLink()
  //     fetchPlayerGameSingle({
  //       _roomId,
  //       _playerId: profile.id,
  //       _type: "out"
  //     })
  //   }
  // }

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     if (playersMe) {
  //       if (playersMe.status === "played") {
  //         outRoomLink()
  //       }
  //     }
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [outRoomLink, playersMe])

  return (
    <>
      <Box
        component="div"
        className="block w-full gap-3 lg:flex"
      >
        {_roomId &&
          (data ? (
            <>
              <Box
                component="div"
                className="relative w-full rounded-3xl border border-neutral-700"
              >
                {isLoading && (
                  <HeaderWaitingRoom
                    roomTag={playerGameSingle?.room_number ?? ""}
                    roomName={`#${data.name} ${
                      playerGameSingle?.room_number ?? ""
                    }`}
                    timer={{
                      time: playerGameSingle
                        ? new Date(playerGameSingle?.end_time)
                        : new Date()
                    }}
                    player={{
                      currentPlayer:
                        playersMap?.filter((ele) => ele).length ?? 0,
                      maxPlayer: playerGameSingle?.max_players ?? 8
                    }}
                    onOutRoom={outRoom}
                  />
                )}

                {!isLoading ? (
                  <>
                    <HeaderWaitingRoom
                      roomTag={playerGameSingle?.room_number ?? ""}
                      roomName={`#${data.name} ${
                        playerGameSingle?.room_number ?? ""
                      }`}
                      timer={{
                        time: playerGameSingle
                          ? new Date(playerGameSingle?.end_time)
                          : new Date()
                      }}
                      player={{
                        currentPlayer:
                          playersMap?.filter((ele) => ele).length ?? 0,
                        maxPlayer: playerGameSingle?.max_players ?? 8
                      }}
                      onOutRoom={outRoom}
                    />
                    <SeatPlayersSingle
                      players={playersMap}
                      onPlayGame={onPlayGame}
                    />
                  </>
                ) : (
                  <>
                    <SkeletonCardPlayers />
                  </>
                )}
              </Box>
            </>
          ) : (
            <>Loading...</>
          ))}
        {data && (
          <Box
            component="div"
            className="flex flex-col gap-3 rounded-3xl lg:w-[333px]"
            sx={{
              ".panel-content": {
                maxHeight: "200px",
                ".custom-scroll": {
                  overflow: "hidden"
                }
              },
              ".like-no_score": {
                margin: "0"
              }
            }}
          >
            <OverviewContent
              gameId={data.id}
              gameType={getGameMode(data)}
            />
            {isFreeToEarnGame(data) && (
              <TopPlayerFreeToEarn
                gameId={data.id}
                total={10}
                gameItem={data.item[0] || ({} as IGameItem)}
              />
            )}
            {data.game_mode === "play-to-earn" && !data.tournament && (
              <CardBuyItem gameObject={data} />
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

export default GameSinglePlayer
