import { ReactElement } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const EventDetailLayout = dynamic(
  () => import("@components/templates/EventDetailLayout"),
  { suspense: true }
)
const EventDetailContent = dynamic(
  () => import("@feature/page/events/EventDetailContent"),
  { suspense: true }
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
  { suspense: true }
)
const StoryLobby = dynamic(
  () => import("@feature/game/components/templates/lobby/StoryLobby"),
  { suspense: true }
)

export default function Event() {
  const router = useRouter()
  const { event_id } = router.query

  return (
    <>
      <article className="h-full w-full">
        <RightSidebarContentEffect
          content={<StoryLobby />}
          aside={`${event_id}`}
        />
        <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2 md:w-4/6 md:py-8 md:px-16 md:text-center md:text-base">
          {`
          COMMENT AND HASHTAG #YOUR_USERNAME #NAKARUNNER IN YOUR TWITTER SHARING
          NAKA RUNNER CHALLENGE POST TO MAKE SURE YOU ATTEND THE EVENT [FIRST 102 PEOPLE TO SCORE OVER 250,000 WILL WIN THE REWARD]
          `}
        </div>
        <EventDetailContent />
      </article>
    </>
  )
}

Event.getLayout = function getLayout(page: ReactElement) {
  return <EventDetailLayout>{page}</EventDetailLayout>
}
