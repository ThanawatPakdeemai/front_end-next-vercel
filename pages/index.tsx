/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "@components/template"
import { ReactElement } from "react"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import HomePage from "@feature/page/homePage"

export default function Home() {
  return (
    <article className="h-full w-full">
      <HomePage />
      <Image
        src={IMAGES.footerMock.src}
        width={IMAGES.footerMock.width}
        height={IMAGES.footerMock.height}
        alt={IMAGES.footerMock.alt}
      />
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
