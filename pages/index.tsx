/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "@components/template"
import { ReactElement } from "react"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import TopPlayer from "@feature/ranking/components/template/topPlayer"
import { BannerSlide } from "@feature/home/components/organisms/bannerSlide"
import { Button } from "@mui/material"
import { Tagline } from "@components/molecules/tagline"

export default function Home() {
  return (
    <article className="h-full w-full">
      <>
        <h3 className="font-neue-machina text-red-to">Nakamoto.games</h3>
        <BannerSlide />
        <Tagline
          bgColor="bg-purple-01"
          textColor="text-white-default"
          text="Secue. fun. simple. earn $naka AND enjoy"
          src="/assets/icons/logo_master.png"
          alt="logo_master"
          width={24}
          height={11}
        />
        <Image
          src={IMAGES.footerMock.src}
          width={IMAGES.footerMock.width}
          height={IMAGES.footerMock.height}
          alt={IMAGES.footerMock.alt}
        />
        <TopPlayer />
        <Button
          color="secondary"
          variant="contained"
        >
          Test
        </Button>
      </>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
