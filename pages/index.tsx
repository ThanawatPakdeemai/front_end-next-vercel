import { Layout } from "@src/components/template"
import { ReactElement } from "react"
import Image from "@components/atoms/image"
// import Image from "@components/atoms/image"

export default function Home() {
  const imgSrc = "/images/mocks/footer.png"

  return (
    <article className="h-full w-full">
      <>
        <Image
          src={imgSrc}
          alt=""
          width={1023}
          height={452}
        />
      </>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
