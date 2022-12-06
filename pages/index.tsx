import { Layout } from "@components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import { BannerSlide } from "@feature/home/components/organisms/bannerSlide"

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
      </>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
