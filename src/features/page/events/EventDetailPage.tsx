import React, { useEffect } from "react"
import { Typography } from "@mui/material"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import useGetEventDetail from "@feature/event/containers/hooks/useGetEventDetail"
import useLoadingStore from "@stores/loading"
import { v4 as uuid } from "uuid"
import {
  IResponseLeaderBoardData,
  IResponseTopScoreSummaryDataData
} from "@feature/event/interface/IEventsService"
import Breadcrumb from "@components/molecules/Breadcrumb"
import EventsShareToPlay from "@feature/event/components/EventsShareAndPlay"
import EventsTopScore from "@feature/event/components/EventsTopScore"
import useGetEventTopScore from "@feature/event/containers/hooks/useGetEventTopScore"
import useGetEventLeaderBoard from "@feature/event/containers/hooks/useGetEventLeaderBoard"

interface IEventDetailProps {
  _eventId: string
}

const EventDetailPage = ({ _eventId }: IEventDetailProps) => {
  const { eventDetailData, isLoading } = useGetEventDetail(_eventId)
  const { setOpen, setClose } = useLoadingStore()
  const { topScoreData } = useGetEventTopScore(
    _eventId,
    eventDetailData?.data[0].event_type === "top_score_championship"
  )

  const { leaderBoardData } = useGetEventLeaderBoard(
    _eventId,
    eventDetailData?.data[0].event_type === "share_and_play"
  )
  useEffect(() => {
    if (isLoading) {
      setOpen()
    } else {
      setClose()
    }
  }, [isLoading, setOpen, setClose])

  return (
    <>
      <Breadcrumb />
      <RightSidebarContentEffect
        content={<StoryLobby key={uuid()} />}
        aside={eventDetailData?.data[0].event_detail}
      />
      <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2 md:w-4/6 md:py-8 md:px-16 md:text-center md:text-base">
        {`
          COMMENT AND HASHTAG #YOUR_USERNAME #NAKARUNNER IN YOUR TWITTER SHARING
          NAKA RUNNER CHALLENGE POST TO MAKE SURE YOU ATTEND THE EVENT [FIRST 102 PEOPLE TO SCORE OVER 250,000 WILL WIN THE REWARD]
          `}
      </div>
      <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2 md:w-4/6 md:py-8 md:px-16 md:text-center md:text-base">
        <Typography className="font-dogicapixel-bold text-center  uppercase">
          Weekly Price Pool
        </Typography>
        <Typography className=" text-green-default font-dogicapixel-bold text-center text-[15px] uppercase">
          {eventDetailData?.data[0].reward}
        </Typography>
      </div>
      {eventDetailData?.data[0] &&
      eventDetailData?.data[0].event_type === "share_and_play" ? (
        <EventsShareToPlay
          users={leaderBoardData?.data as IResponseLeaderBoardData}
        />
      ) : (
        <EventsTopScore
          users={topScoreData?.data.data as IResponseTopScoreSummaryDataData}
        />
      )}
    </>
  )
}

export default EventDetailPage
