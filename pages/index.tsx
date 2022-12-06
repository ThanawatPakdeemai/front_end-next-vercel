/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "@components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import TopPlayer from "@feature/ranking/components/topPlayer"

export default function Home() {
  return (
    <article className="h-full w-full">
      <>
        <h3 className="font-neue-machina text-red-to">Nakamoto.games</h3>
        <Image
          src={IMAGES.footerMock.src}
          width={IMAGES.footerMock.width}
          height={IMAGES.footerMock.height}
          alt={IMAGES.footerMock.alt}
        />
        <TopPlayer />
      </>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
