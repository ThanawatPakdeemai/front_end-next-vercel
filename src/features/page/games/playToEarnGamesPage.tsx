import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React, { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import useGameStore from "@stores/game/index"
import { IGame } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { MESSAGES } from "@constants/messages"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { useToast } from "@feature/toast/containers"
import GameCard from "@feature/game/containers/components/molecules/GameCard"

const PlayToEarnGamesPage = () => {
  const type = "play-to-earn"
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { onSetGameData, clearGameData } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const { errorToast } = useToast()
  useEffect(() => {
    setStateProfile(profile)
  }, [profile])

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
    // totalCount
    if (!fetchRef.current && gameData) {
      fetchRef.current = true
      setTotalCount(gameData.info.totalCount)
    }
  }, [gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["games", type, page + 1],
        queryFn: () =>
          getGameByTypes({ _type: type, _limit: limit, _page: page + 1 })
      })
    }
    clearGameData()
  }, [clearGameData, gameData, isPreviousData, page, queryClient])

  const onHandleClick = async (_gameUrl: string, _gameData: IGame) => {
    if (stateProfile) {
      await onSetGameData(_gameData)
      await router.push(`/${_gameUrl}`)
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
                menu={P2EHeaderMenu}
                data={game}
                onHandleClick={() => onHandleClick(game.path, game)}
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

export default memo(PlayToEarnGamesPage)
