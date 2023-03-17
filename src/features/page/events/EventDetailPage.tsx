import React, { useEffect } from "react"
import { Typography } from "@mui/material"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import useGetEventDetail from "@feature/event/containers/hooks/useGetEventDetail"
import useLoadingStore from "@stores/loading"
import useGameStore from "@stores/game"
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
import BannerSingle from "@components/molecules/BannerSingle"
import Banners from "@components/molecules/Banners"
import { IGame } from "@src/features/game/interfaces/IGameService"
import dayjs from "dayjs"
import useEventStore from "@stores/events"
import { EVENT_CRUMB } from "@configs/crumb"

interface IEventDetailProps {
  _eventId: string
}

const EventDetailPage = ({ _eventId }: IEventDetailProps) => {
  const { eventDetailData, eventDetailIsFetched } = useGetEventDetail(_eventId)
  const { setOpen, setClose } = useLoadingStore()
  const { onSetGameData } = useGameStore()
  const { setEventData } = useEventStore()

  const { topScoreData, topScoreIsLoading } = useGetEventTopScore(
    _eventId,
    eventDetailData?.data[0].event_type === "top_score_championship"
  )

  const { leaderBoardData, leaderBoardIsLoading } = useGetEventLeaderBoard(
    _eventId,
    eventDetailData?.data[0].event_type === "share_and_play"
  )

  useEffect(() => {
    if (eventDetailIsFetched && (topScoreIsLoading || leaderBoardIsLoading)) {
      setOpen()
    } else {
      setEventData({ _id: _eventId, name: eventDetailData?.data[0].name })
      onSetGameData(eventDetailData?.data[0].games_to_play[0] as IGame)
      setClose()
    }
  }, [
    _eventId,
    eventDetailData?.data,
    eventDetailIsFetched,
    leaderBoardIsLoading,
    onSetGameData,
    setClose,
    setEventData,
    setOpen,
    topScoreIsLoading
  ])

  return (
    <>
      <Breadcrumb
        className="mb-4"
        isCustom
        _breadcrumbs={EVENT_CRUMB()}
      />
      {eventDetailData?.data[0].banner_image ? (
        <BannerSingle
          src={eventDetailData?.data[0].banner_image}
          alt={eventDetailData?.data[0].name}
        />
      ) : (
        <Banners />
      )}
      <div className="flex items-center justify-between rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:mb-4 md:w-full md:py-8 md:px-16  md:text-base">
        <Typography className="uppercase">
          {`Event start : ${dayjs(eventDetailData?.data[0].date_start).format(
            "DD MMM YYYY"
          )} - ${dayjs(eventDetailData?.data[0].date_end).format(
            "DD MMM YYYY"
          )}`}
        </Typography>
        <Typography className="text-[15px] uppercase">
          status :{" "}
          <span className="text-red-default">
            {eventDetailData?.data[0].status}
          </span>
        </Typography>
      </div>
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
