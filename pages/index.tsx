/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "@components/template"
import { ReactElement } from "react"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import TopPlayer from "@feature/ranking/components/template/topPlayer"
import { BannerSlide } from "@feature/home/components/organisms/bannerSlide"
import {
  mockF2PGame,
  F2PHeaderMenu,
  mockP2EGame,
  P2EHeaderMenu
} from "@constants/gameSlide"
import IconFree from "@components/icons/freeIcon"
import IconNakaWorld from "@components/icons/nakaWorldIcon"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"

export default function Home() {
  return (
    <article className="h-full w-full">
      <>
        <h3 className="font-neue-machina text-red-to">Nakamoto.games</h3>
        <BannerSlide />
        <Image
          src={IMAGES.footerMock.src}
          width={IMAGES.footerMock.width}
          height={IMAGES.footerMock.height}
          alt={IMAGES.footerMock.alt}
        />
        <TopPlayer />
        <div className="my-20 h-full w-full">
          <GameCarousel
            list={mockF2PGame}
            tag={F2PHeaderMenu.title}
            headerMenu={F2PHeaderMenu.menuList}
            theme={F2PHeaderMenu.theme}
            checkTimer
            headerIcon={
              <IconFree
                width={200}
                height={100}
              />
            }
          />
        </div>
        <div className="my-20 h-full w-full">
          <GameCarousel
            list={mockP2EGame}
            showNo
            tag={P2EHeaderMenu.title}
            headerMenu={P2EHeaderMenu.menuList}
            theme={P2EHeaderMenu.theme}
            headerIcon={
              <IconNakaWorld
                width={180}
                height={125}
              />
            }
          />
        </div>
      </>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
