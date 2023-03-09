import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const EventLayout = dynamic(() => import("@components/templates/EventLayout"), {
  suspense: true
})

export default function Events() {
  return (
    <>
      <article className="h-full w-full">
        <h1>Events page</h1>
      </article>
    </>
  )
}

Events.getLayout = function getLayout(page: ReactElement) {
  return <EventLayout>{page}</EventLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
