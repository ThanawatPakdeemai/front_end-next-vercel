import React from "react"
import { Box, Typography } from "@mui/material"
import { IResponseSummaryData } from "@feature/event/interface/IEventsService"
import EventsShareToPlay from "@feature/event/components/EventsShareAndPlay"
import EventsTopScore from "@feature/event/components/EventsTopScore"
import dynamic from "next/dynamic"
import useEventController from "@feature/event/containers/hooks/useEventController"
import EventContent from "@feature/event/components/organisms/EventContent"
import EventSidebar from "@feature/event/components/organisms/EventSidebar"
import { EVENT_CRUMB } from "@configs/crumb"
import EventMessages from "@feature/event/components/molecules/EventMessages"

const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner"),
  {
    suspense: true,
    ssr: false
  }
)
const EventDetailLayout = dynamic(
  () => import("@components/templates/EventDetailLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
  {
    suspense: true,
    ssr: false
  }
)

const EventDetailPage = () => {
  const { currentEventData, topScoreDataState, leaderBoardDataState, eventId } =
    useEventController()

  const renderPlayerContent = () => {
    if (
      topScoreDataState &&
      currentEventData &&
      currentEventData.event_type === "share_and_play"
    ) {
      return (
        <EventsTopScore
          users={topScoreDataState.data as IResponseSummaryData[]}
          playerCount={topScoreDataState.player_count}
          transactionCount={topScoreDataState.transaction_count}
        />
      )
    }
    if (
      leaderBoardDataState &&
      currentEventData &&
      currentEventData.event_type === "top_score_championship"
    ) {
      return (
        <EventsShareToPlay
          users={leaderBoardDataState.new_data_player_score}
          playerCount={leaderBoardDataState.player_count}
          transactionCount={leaderBoardDataState.transaction_count}
        />
      )
    }
    return <></>
  }

  /**
   * @description Render messages by event type
   */
  const renderMessages = () => {
    if (currentEventData && currentEventData.event_type === "share_and_play") {
      return (
        <EventMessages messages="Tweet a short video (20-40 seconds) of your gameplay with the hashtag #FunWheels on Twitter." />
      )
    }
    return (
      <EventMessages
        messages={`Comment and hashtag #your_username #NakaRunner in your twitter sharing NAKA Runner challenge post
              to make sure you attend the event [First 102 people to score over 250,000 will win the
              reward]`}
      />
    )
  }

  return (
    <>
      {currentEventData ? (
        <EventDetailLayout
          bannerImage={currentEventData.banner_image}
          bannerAlt={currentEventData.name}
          breadcrumbs={EVENT_CRUMB({
            title: currentEventData.name ?? "",
            id: eventId
          })}
          component={
            <RightSidebarContentEffect
              className="mb-24"
              content={<EventContent />}
              aside={<EventSidebar />}
            />
          }
          component2={
            <Box
              sx={{
                "&.container": {
                  maxWidth: "100%!important"
                }
              }}
            >
              {renderMessages()}
              <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2  md:px-16 md:py-8 md:text-center md:text-base">
                <Typography className="font-dogicapixel-bold text-center  uppercase">
                  Reward Pool
                </Typography>
                <Typography className=" text-green-default font-dogicapixel-bold text-center text-[15px] uppercase">
                  {currentEventData.reward}
                </Typography>
              </div>
              {renderPlayerContent()}
            </Box>
          }
        />
      ) : (
        <EventDetailLayout component={<SkeletonBanner />} />
      )}
    </>
  )
}

export default EventDetailPage
