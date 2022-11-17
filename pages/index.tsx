import { Layout } from "@src/components/template"
import { ReactElement } from "react"

export default function Home() {
  return (
    <article className="h-full w-full">
      <></>
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
