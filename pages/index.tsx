import { Layout } from "@components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import CardTitle from "@components/organisms/cardTitle"

export default function Home() {
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
      <div>
        <CardTitle />
      </div>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
