import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import { ITableHeader } from "@feature/table/interface/ITable"
import { validTypeGames } from "@pages/[typeGame]"
import useNotiStore from "@stores/notification"
import { useRouter } from "next/router"
import { Trans } from "react-i18next"

import { useEffect, useMemo, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useHistory from "./useHistory"

const useHistoryController = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { setNotificationItem, setPlayHistoryItem } = useNotiStore()
  const { getHistoryData, historyIsLoading } = useHistory()
  const router = useRouter()
  const { limit } = useGlobal()

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
    router.push(`/${path}/summary/${room_id}`)
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

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchHistory = async () => {
        if (profile) {
          await getHistoryData({
            player_id: profile && profile.id ? profile.id : "",
            limit,
            skip
          }).then((res) => {
            if (res.data && res.data.length > 0) {
              // res.status === 200 -> ok
              setHxHistory(res.data)
            }
            if (res.info) {
              setTotalCount(res.info.totalCount)
            }
          })
        }
      }
      fetchHistory()
    }

    return () => {
      load = true
    }
  }, [limit, skip, profile, getHistoryData])

  return {
    HistoryTableHead,
    handleClickView,
    isLoadingHistory: historyIsLoading,
    limit,
    setSkip,
    totalCount,
    skip,
    hxHistory,
    historyIsLoading
  }
}

export default useHistoryController
