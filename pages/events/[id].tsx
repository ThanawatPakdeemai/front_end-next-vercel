import { ReactElement } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// const EventDetailLayout = dynamic(
//   () => import("@components/templates/EventDetailLayout"),
//   { suspense: true, ssr: false }
// )
const EventDetailPage = dynamic(
  () => import("@feature/page/events/EventDetailPage"),
  { suspense: true, ssr: false }
)

export default function Event() {
  const router = useRouter()
  const { id } = router.query

  return <EventDetailPage _eventId={id as string} />
}

Event.getLayout = function getLayout(page: ReactElement) {
  // return <EventDetailLayout>{page}</EventDetailLayout>
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
