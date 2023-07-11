import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import { ITableHeader } from "@feature/table/interface/ITable"
import { validTypeGames } from "@pages/[typeGame]"
import useNotiStore from "@stores/notification"
import { useRouter } from "next/router"
import { Trans } from "react-i18next"

import { useCallback, useEffect, useMemo, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useHistorySWR from "./useHistorySWR"
import useHistory from "./useHistory"

const useHistoryController = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { setNotificationItem, setPlayHistoryItem } = useNotiStore()
  const router = useRouter()
  const { limit, page } = useGlobal()
  const { historyData } = useHistorySWR({
    player_id: profile && profile.id ? profile.id : "",
    limit,
    skip: page
  })
  const { historyIsLoading } = useHistory()

  // States
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [hxHistory, setHxHistory] = useState<IHistory[]>([])

  const HistoryTableHead: Array<ITableHeader> = useMemo(
    () => [
      {
        title: <Trans i18nKey="time" />,
        arrowIcon: false
      },
      {
        title: <Trans i18nKey="game" />,
        filterIcon: false
      },
      {
        title: <Trans i18nKey="type" />,
        arrowIcon: false
      },
      { title: <Trans i18nKey="status" /> },
      {
        title: <Trans i18nKey="view" />,
        className: "justify-end flex w-full"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onHandleView = (path: string, room_id: string) => {
    router.push(`${path}/summary/${room_id}`)
  }

  const handleClickView = (_historyItem: IHistory) => {
    // Reset Notification store before set Player History store
    setNotificationItem({} as INotification)
    setPlayHistoryItem(_historyItem)
    onHandleView(
      `/${validTypeGames.find((res) => res.includes(_historyItem.game_mode))}/${
        _historyItem.game_detail.path
      }`,
      _historyItem.room_id
    )
  }

  const fetchHistory = useCallback(() => {
    if (historyData && historyData.info) {
      setHxHistory(historyData.data)
      setTotalCount(historyData.info.totalCount)
    }
  }, [historyData])

  useEffect(() => {
    let load = false

    if (!load) {
      fetchHistory()
    }

    return () => {
      load = true
    }
  }, [limit, profile, fetchHistory])

  return {
    HistoryTableHead,
    handleClickView,
    limit,
    setSkip,
    totalCount,
    skip,
    hxHistory,
    historyIsLoading,
    isLoadingHistory: historyIsLoading
  }
}

export default useHistoryController
