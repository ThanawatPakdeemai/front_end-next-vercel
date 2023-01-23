import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/containers/components/molecules/GameCard"
import { getAllPartnerGames } from "@feature/game/containers/services/game.service"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React, { memo, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import useGameStore from "@stores/game/index"
import useProfileStore from "@stores/profileStore"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { MESSAGES } from "@constants/messages"
import usePartnerGame from "@feature/game/containers/hooks/usePartnerGame"
import { useToast } from "@feature/toast/containers"

const PartnerGames = () => {
  const search = ""
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { clearGameData } = useGameStore()
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
  } = usePartnerGame({
    _search: search,
    _limit: limit,
    _page: page
  })
  useEffect(() => {
    if (!fetchRef.current && gameData?.info && gameData) {
      fetchRef.current = true
      setTotalCount(gameData.info?.totalCount)
    }
  }, [gameData])

  useEffect(() => {
    if (!isPreviousData && gameData) {
      queryClient.prefetchQuery({
        queryKey: ["partner-games", limit, search, page + 1],
        queryFn: () =>
          getAllPartnerGames({
            _search: search,
            _limit: limit,
            _page: page + 1
          })
      })
    }
    clearGameData()
  }, [clearGameData, gameData, isPreviousData, page, queryClient])

  const onHandleClick = (_gameUrl: string) => {
    if (stateProfile) {
      router.push(`/${_gameUrl}`)
      // onSetGameData(_gameData)
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
        {gameData &&
          gameData.data &&
          gameData.data.map((game) => (
            <GameCard
              key={game.id}
              menu={P2EHeaderMenu}
              partnerdata={game}
              imgPartner={game.image_thumbnail}
              onHandleClick={() => onHandleClick("partner-games/test")}
            />
          ))}
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
export default memo(PartnerGames)
