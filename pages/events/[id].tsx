import { ReactElement } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const EventDetailLayout = dynamic(
  () => import("@components/templates/EventDetailLayout"),
  { suspense: true }
)
const EventDetailPage = dynamic(
  () => import("@feature/page/events/EventDetailPage"),
  { suspense: true }
)

export default function Event() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <EventDetailPage _eventId={id as string} />
    </>
  )
}

Event.getLayout = function getLayout(page: ReactElement) {
  return <EventDetailLayout>{page}</EventDetailLayout>
}
