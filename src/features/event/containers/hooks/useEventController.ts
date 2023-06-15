import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { ITableHeader } from "@feature/table/interface/ITable"
import useGlobal from "@hooks/useGlobal"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import useLoadingStore from "@stores/loading"
import {
  IFixedReward,
  IGetEventResponseData,
  IResponseLeaderBoardData,
  IResponseTopScoreSummaryDataData
} from "@feature/event/interface/IEventsService"
import useGetEventDetail from "./useGetEventDetail"
import useGetEventTopScore from "./useGetEventTopScore"
import useGetEventLeaderBoard from "./useGetEventLeaderBoard"

interface IRewardEventByRank {
  id: string
  rank: string
  reward: number
}

const useEventController = () => {
  const { t } = useTranslation()

  const MOCKUP_REWARD: IRewardEventByRank[] = [
    {
      id: "1",
      rank: "1st",
      reward: 300
    },
    {
      id: "2",
      rank: "2nd",
      reward: 150
    },
    {
      id: "3",
      rank: "3rd",
      reward: 75
    },
    {
      id: "4",
      rank: "4th-10th",
      reward: 50
    },
    {
      id: "5",
      rank: "11th - 20th",
      reward: 40
    },
    {
      id: "6",
      rank: "21st - 30th",
      reward: 30
    },
    {
      id: "7",
      rank: "31st - 40th",
      reward: 20
    },
    {
      id: "8",
      rank: "41st - 50th",
      reward: 15
    }
  ]

  // State
  const [sortTime, setSortTime] = useState<number | undefined>(undefined)
  const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)
  const [currentEventData, setCurrentEventData] =
    useState<IGetEventResponseData>()
  const [fixedRewardState, setFixedRewardState] = useState<IFixedReward[]>([])
  const [topScoreDataState, setTopScoreDataState] =
    useState<IResponseTopScoreSummaryDataData>()
  const [leaderBoardDataState, setLeaderBardDataState] =
    useState<IResponseLeaderBoardData>()

  const { limit, getGameMode, isRedirectRoomlist } = useGlobal()
  const { onSetGameStore } = useGamePageListController()
  const { setOpen, setClose } = useLoadingStore()
  const router = useRouter()
  const { id } = router.query
  const eventId = id as string
  const newFixedRewardArray: IFixedReward[] = []

  const { eventDetailData, eventDetailIsLoading } = useGetEventDetail(eventId)
  const { topScoreData, topScoreIsLoading } = useGetEventTopScore(
    eventId,
    currentEventData?.event_type === "share_and_play"
  )
  const { leaderBoardData, leaderBoardIsLoading } = useGetEventLeaderBoard(
    eventId,
    currentEventData?.event_type === "top_score_championship"
  )

  useEffect(
    () => {
      let load = false
      if (!load) {
        setOpen()
        if (eventDetailData) {
          setCurrentEventData(eventDetailData)
          if (
            eventDetailData.fixed_rewards &&
            eventDetailData.fixed_rewards.length > 0
          ) {
            eventDetailData.fixed_rewards.forEach((item) => {
              if (item.rank.includes("-")) {
                const rank = item.rank.split("-")
                const start = Number(rank[0])
                const end = Number(rank[1])
                const arr: IFixedReward[] = []
                for (let i = start; i <= end; i += 1) {
                  arr.push({
                    ...item,
                    rank: i.toString()
                  })
                }
                newFixedRewardArray.push(...arr)
              } else {
                newFixedRewardArray.push({
                  ...item,
                  rank: item.rank
                })
              }
            })
            setFixedRewardState(newFixedRewardArray)
          }

          if (
            eventDetailData &&
            eventDetailData.event_type === "share_and_play" &&
            topScoreData
          ) {
            setTopScoreDataState(topScoreData)
            setClose()
          } else if (
            eventDetailData &&
            eventDetailData.event_type === "top_score_championship" &&
            leaderBoardData
          ) {
            setLeaderBardDataState(leaderBoardData)
            setClose()
          } else {
            setClose()
          }
        } else {
          setClose()
        }
      }
      return () => {
        load = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topScoreData, leaderBoardData, eventDetailData]
  )

  // topScoreData, leaderBoardData,

  const EventTableHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: t("rank"),
        arrowIcon: true,
        keyUp: sortTime === 1,
        keyDown: sortTime === -1,
        onClick: () =>
          setSortTime((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },

      {
        title: "amount",
        arrowIcon: true,
        keyUp: sortAmount === 1,
        keyDown: sortAmount === -1,
        onClick: () =>
          setSortAmount((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      {
        title: "best_score",
        className: "flex justify-end w-full"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortTime, sortAmount]
  )

  return {
    sortTime,
    sortAmount,
    EventTableHeader,
    currentEventData,
    limit,
    getGameMode,
    isRedirectRoomlist,
    onSetGameStore,
    setOpen,
    setClose,
    topScoreDataState,
    leaderBoardDataState,
    topScoreIsLoading,
    leaderBoardIsLoading,
    eventDetailIsLoading,
    eventId,
    MOCKUP_REWARD,
    fixedRewardState,
  }
}

export default useEventController
