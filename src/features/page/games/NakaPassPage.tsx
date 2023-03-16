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
import useProfileStore from "@stores/profileStore"
import PleaseLogin from "@components/atoms/PleaseLogin"
import useGlobal from "@hooks/useGlobal"

const NakaPassPage = () => {
  const [f2pCurType, setF2PCurType] = useState<IGetType>("story-mode")
  const [page] = useState<number>(1)
  const profile = useProfileStore((state) => state.profile.data)
  const { hydrated } = useGlobal()

  const { data: storyGame, isFetching } = useGamesByTypes({
    _type: f2pCurType,
    _limit: 10,
    _page: page
  })

  return hydrated ? (
    <>
      {profile ? <NakaPassStoryMode /> : <PleaseLogin />}
      <Tagline
        text="Continue playing story mode to earn rewards."
        bgColor="bg-neutral-800"
        icon={<ShapeIcon fill="#4E5057" />}
        textColor="font-bold text-sm text-neutral-600"
      />
      <div className="my-4 h-full w-full lg:my-20 lg:max-w-[1158px]">
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
  ) : (
    <></>
  )
}

export default memo(NakaPassPage)
