import React, { memo, useState } from "react"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import { HeaderMenuSeasonPass } from "@constants/gameSlide"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"

const PleaseLogin = dynamic(() => import("@components/atoms/PleaseLogin"), {
  suspense: true,
  ssr: false
})
const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true,
    ssr: false
  }
)
const GameCarousel = dynamic(
  () => import("@components/molecules/gameSlide/GameCarousel"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const NakaPassStoryMode = dynamic(
  () => import("@feature/nakaPass/components/NakaPassStoryMode"),
  {
    suspense: true,
    ssr: false
  }
)

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
        icon={<Icomoon className="icon-require" />}
        textColor="font-bold text-sm text-neutral-600"
        show={false}
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
