import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import { HeaderMenuSeasonPass } from "@constants/gameSlide"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { v4 as uuid } from "uuid"
import React, { memo, useState } from "react"
import ShapeIcon from "@components/icons/ShapeIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import NakaPassStoryMode from "@feature/nakaPass/components/NakaPassStoryMode"

const NakaPassPage = () => {
  const [f2pCurType, setF2PCurType] = useState<IGetType>("story-mode")
  const [page] = useState<number>(1)

  const { data: storyGame, isFetching } = useGamesByTypes({
    _type: f2pCurType,
    _limit: 10,
    _page: page
  })
  return (
    <>
      <NakaPassStoryMode />
      <Tagline
        bgColor="bg-neutral-700"
        textColor="text-neutral-500  font-bold"
        text="Continue playing story mode to earn rewards."
        icon={<ShapeIcon className="text-neutral-500" />}
      />
      <div className="my-20  h-full w-full max-w-[1158px]">
        <div>
          {storyGame && !isFetching ? (
            <GameCarousel
              menu={HeaderMenuSeasonPass}
              list={storyGame.data}
              curType={f2pCurType}
              setCurType={setF2PCurType}
              showSlideCurrent={5}
              checkTimer
            />
          ) : (
            <div className="flex gap-x-3">
              {[...Array(5)].map(() => (
                <SkeletonCard key={uuid()} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(NakaPassPage)
