import { Layout } from "@components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import { BannerSlide } from "@feature/home/components/organisms/bannerSlide"
import useGetGames from "@feature/home/containers/hook/useGetGames"

export default function Home() {
  /**
   * @description get slide games
   */
  const { slideGames } = useGetGames()
  return (
    <article className="h-full w-full">
      <>
        <h3 className="font-neue-machina text-red-to">Nakamoto.games</h3>
        {slideGames && <BannerSlide slides={slideGames} />}
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
