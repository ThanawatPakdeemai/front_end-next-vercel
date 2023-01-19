import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { F2PHeaderMenu } from "@constants/gameSlide"
import { MESSAGES } from "@constants/messages"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { useToast } from "@feature/toast/containers"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"

const FreeToPlayGamesPage = () => {
  const type = "free-to-play"
  const limit = 30
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const [page, setPage] = useState<number>(1)
  const [cooldown, setCooldown] = useState<boolean>(true)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { onSetGameData, clearGameData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { errorToast } = useToast()

  const {
    isLoading,
    isPreviousData,
    data: gameData
  } = useGamesByTypes({
    _type: type,
    _limit: limit,
    _page: page
  })

  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

  useEffect(() => {
    // totalCount
    if (!fetchRef.current && gameData) {
      fetchRef.current = true
      setTotalCount(gameData.info.totalCount)
    }
    clearGameData()
  }, [clearGameData, gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["games", type, page + 1],
        queryFn: () =>
          getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
      })
    }
  }, [gameData, isPreviousData, page, queryClient])

  const onHandleClick = (_gameUrl: string, _gameData: IGame) => {
    if (stateProfile) {
      router.push(`/${_gameUrl}`)
      onSetGameData(_gameData)
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 grid grid-cols-5 gap-y-4 gap-x-2">
        {isLoading
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : null}
        {gameData
          ? gameData.data.map((game) => (
              <GameCard
                key={game.id}
                menu={F2PHeaderMenu}
                data={game}
                checkTimer
                staminaRecovery={staminaRecovery}
                cooldown={cooldown}
                setCooldown={setCooldown}
                onHandleClick={() => onHandleClick(game.game_url, game)}
              />
            ))
          : null}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default memo(FreeToPlayGamesPage)
