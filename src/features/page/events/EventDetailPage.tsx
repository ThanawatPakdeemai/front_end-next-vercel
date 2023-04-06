import React, { useEffect, useState } from "react"
import { Box, Chip, Divider, Typography } from "@mui/material"
import useGetEventDetail from "@feature/event/containers/hooks/useGetEventDetail"
import useLoadingStore from "@stores/loading"
import {
  IGetEventResponseData,
  IResponseLeaderBoardData,
  IResponseTopScoreSummaryDataData
} from "@feature/event/interface/IEventsService"
import EventsShareToPlay from "@feature/event/components/EventsShareAndPlay"
import EventsTopScore from "@feature/event/components/EventsTopScore"
import useGetEventTopScore from "@feature/event/containers/hooks/useGetEventTopScore"
import useGetEventLeaderBoard from "@feature/event/containers/hooks/useGetEventLeaderBoard"
import dayjs from "dayjs"
import useCrumbStore from "@stores/crumb"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { P2EHeaderMenu } from "@constants/gameSlide"
import GameCard from "@feature/game/components/molecules/GameCard"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import AsideLayout from "@components/templates/contents/AsideLayout"
import OverviewIcon from "@components/icons/OverviewIcon"
import PanelContent from "@components/molecules/PanelContent"
import TagSingular from "@components/molecules/TagSingular"

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
const FullWidthContent = dynamic(
  () => import("@components/templates/contents/FullWidthContent"),
  {
    suspense: true,
    ssr: false
  }
)

interface IEventDetailProps {
  _eventId: string
}

const EventDetailPage = ({ _eventId }: IEventDetailProps) => {
  const { limit, getTypeGamePathFolder } = useGlobal()
  const { onSetGameStore } = useGamePageListController()
  const { eventDetailData, eventDetailIsLoading } = useGetEventDetail(_eventId)
  const { setOpen, setClose } = useLoadingStore()
  const { setCrumbData } = useCrumbStore()
  const router = useRouter()
  const { id } = router.query
  const currentEventId = id as string

  // State
  const [currentEvent, setCurrentEvent] = useState<IGetEventResponseData>()

  const { topScoreData, topScoreIsLoading } = useGetEventTopScore(
    _eventId,
    eventDetailData?.data[0].event_type === "top_score_championship"
  )

  const { leaderBoardData, leaderBoardIsLoading } = useGetEventLeaderBoard(
    _eventId,
    eventDetailData?.data[0].event_type === "share_and_play"
  )

  // TODO: Refactor later
  const renderPlayerContent = () => {
    if (
      eventDetailData?.data[0] &&
      eventDetailData?.data[0].event_type === "share_and_play"
    ) {
      return (
        <EventsShareToPlay
          users={leaderBoardData?.data as IResponseLeaderBoardData}
        />
      )
    }
    if (
      topScoreData?.data &&
      topScoreData?.data.data &&
      topScoreData?.data.data.data &&
      topScoreData?.data.data.data.length > 0
    ) {
      return (
        <EventsTopScore
          users={topScoreData?.data.data as IResponseTopScoreSummaryDataData}
        />
      )
    }
    return <></>
  }

  useEffect(
    () => {
      let load = false
      if (!load) {
        if (
          eventDetailIsLoading &&
          (topScoreIsLoading || leaderBoardIsLoading)
        ) {
          setOpen()
        } else {
          setCrumbData({ _id: _eventId, title: eventDetailData?.data[0].name })
          setClose()
        }

        const _currentEvent = eventDetailData?.data.find(
          (event) => event._id === currentEventId
        )

        if (_currentEvent) {
          setCurrentEvent(_currentEvent)
        }
      }
      return () => {
        load = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // topScoreData,
      // topScoreIsLoading
      // _eventId,
      eventDetailData?.data
      // eventDetailIsLoading,
      // leaderBoardIsLoading,
      // topScoreIsLoading,
      // currentEventId
    ]
  )

  return (
    <>
      {eventDetailData ? (
        <EventDetailLayout
          bannerImage={eventDetailData?.data[0].banner_image}
          bannerAlt={eventDetailData?.data[0].name}
          // breadcrumbs={EVENT_CRUMB()}
          component={
            <RightSidebarContentEffect
              className="mb-24"
              content={
                <>
                  <div className="relative z-[1] w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 uppercase text-neutral-300">
                    <div className="flex items-center gap-3">
                      <Chip
                        label="Events"
                        size="small"
                        color="success"
                      />
                      <h2>{eventDetailData?.data[0].name}</h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {!eventDetailData
                      ? [...Array(limit)].map(() => (
                          <SkeletonCard key={uuid()} />
                        ))
                      : currentEvent &&
                        currentEvent.games_to_play &&
                        currentEvent.games_to_play.map((game) => (
                          <GameCard
                            key={game.id}
                            menu={P2EHeaderMenu}
                            data={game}
                            href={`/${getTypeGamePathFolder(game)}/${
                              game.path
                            }`}
                            onHandleClick={() => onSetGameStore(game)}
                            gameType={getTypeGamePathFolder(game)}
                          />
                        ))}
                  </div>
                </>
              }
              aside={
                <Box
                  component="div"
                  className="aside-wrapper flex flex-col justify-between gap-4 lg:h-full"
                  sx={{
                    ".panel-content": {
                      maxHeight: "500px",
                      ".custom-scroll": {
                        overflow: "hidden"
                      }
                    },
                    ".like-no_score": {
                      margin: "0"
                    }
                  }}
                >
                  <div className="relative my-2 flex flex-col overflow-hidden rounded-2xl bg-neutral-780 p-2 sm:m-0 md:min-w-[330px]">
                    <AsideLayout
                      icon={<OverviewIcon />}
                      title="Event Details"
                    >
                      <PanelContent height="h-[500px]">
                        <div className="text-start text-sm text-neutral-500 lg:pl-6 lg:pr-3 lg:pt-3">
                          <TagSingular
                            title="Rules"
                            label={
                              <p
                                dangerouslySetInnerHTML={{
                                  __html:
                                    eventDetailData?.data[0].event_detail || ""
                                }}
                              />
                            }
                          />
                          <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                          <TagSingular
                            title="Date"
                            label={`${dayjs(
                              eventDetailData?.data[0].date_start
                            ).format("DD MMM YYYY")} - ${dayjs(
                              eventDetailData?.data[0].date_end
                            ).format("DD MMM YYYY")}`}
                            link="-"
                          />
                          <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                          <TagSingular
                            title="Status"
                            label={
                              eventDetailData?.data[0].is_active ? (
                                <span className="text-green-card">
                                  {eventDetailData?.data[0].status}
                                </span>
                              ) : (
                                <span className="text-red-default">
                                  {eventDetailData?.data[0].status}
                                </span>
                              )
                            }
                          />
                        </div>
                      </PanelContent>
                    </AsideLayout>
                  </div>
                </Box>
              }
            />
          }
          component2={
            <FullWidthContent
              sxCustomStyled={{
                "&.container": {
                  maxWidth: "100%!important"
                }
              }}
            >
              <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2 md:w-4/6 md:px-16 md:py-8 md:text-center md:text-base">
                COMMENT AND HASHTAG #YOUR_USERNAME #NAKARUNNER IN YOUR TWITTER
                SHARING NAKA RUNNER CHALLENGE POST TO MAKE SURE YOU ATTEND THE
                EVENT [FIRST 102 PEOPLE TO SCORE OVER 250,000 WILL WIN THE
                REWARD]
              </div>
              <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2 md:w-4/6 md:px-16 md:py-8 md:text-center md:text-base">
                <Typography className="font-dogicapixel-bold text-center  uppercase">
                  Weekly Price Pool
                </Typography>
                <Typography className=" text-green-default font-dogicapixel-bold text-center text-[15px] uppercase">
                  {eventDetailData?.data[0].reward}
                </Typography>
              </div>
              {renderPlayerContent()}
            </FullWidthContent>
          }
        />
      ) : (
        <EventDetailLayout component={<SkeletonBanner />} />
      )}
    </>
  )
}

export default EventDetailPage
