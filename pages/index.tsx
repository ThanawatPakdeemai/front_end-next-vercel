import { Layout } from "@src/components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import Helper from "@utils/helper"

export default function Home() {
  Helper.resetLocalStorage()
  return (
    <article className="h-full w-full">
      <>
        Nakamoto.games
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
