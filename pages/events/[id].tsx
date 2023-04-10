import { ReactElement } from "react"
import dynamic from "next/dynamic"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const EventDetailPage = dynamic(
  () => import("@feature/page/events/EventDetailPage"),
  { suspense: true, ssr: false }
)

export default function Event() {
  return <EventDetailPage />
}

Event.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
