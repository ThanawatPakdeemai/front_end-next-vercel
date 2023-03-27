import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import useNotiStore from "@stores/notification"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { validTypeGames } from "@pages/[typeGame]"
import { useCallback, useEffect, useState } from "react"
import useProfileStore from "@stores/profileStore"
import useGetNotification from "./useGetNotification"
import useNotificationReadAll from "./useNotificationReadAll"

const useNotificationController = () => {
  const router = useRouter()
  const { errorToast } = useToast()

  // State
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("dateDESC")
  const [limit, setLimit] = useState<number>(24)
  const [buttonStatus, setButtonStatus] = useState<boolean>(false)

  // Store
  const profile = useProfileStore((state) => state.profile.data)
  const {
    setNotificationItem,
    setPlayHistoryItem,
    setNotificationAll,
    setNotificationCount,
    count
  } = useNotiStore()
  const { isLoadingNotification, dataNotification } = useGetNotification({
    player_id: profile?.id || ""
  })
  const {
    mutateUpdateAllNotiStatus,
    isLoadingUpdateAllNotiStatus,
    isErrorUpdateAllNotiStatus
  } = useNotificationReadAll(profile?.id || "")

  const fetchNotification = useCallback(() => {
    if (dataNotification && dataNotification.length > 0) {
      setTotalCount(dataNotification.length)
      const result = dataNotification.filter((item) => !item.read)
      // Set values to store
      setNotificationAll(dataNotification)
      setNotificationCount(result.length)
    }
  }, [dataNotification, setNotificationAll, setNotificationCount])

  useEffect(() => {
    if (isLoadingNotification) return
    fetchNotification()
  }, [
    dataNotification,
    isLoadingNotification,
    fetchNotification,
    profile,
    setNotificationAll,
    setNotificationCount
  ])

  const onHandleView = (notification: INotification, playerId: string) => {
    if (playerId) {
      setPlayHistoryItem({} as IHistory)
      setNotificationItem(notification)
      // TODO: Ask backend to return game_mode as well
      router.push(
        `/${validTypeGames.find((res) =>
          res.includes(notification.game_mode || "play-to-earn-games")
        )}/${notification.path}/${notification.type
          .toLocaleLowerCase()
          .replaceAll("_", "-")}/${notification._id}`
      )
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  const handleLimit = (_limit: number) => {
    setLimit(_limit)
  }
  const onHandleClick = () => {
    if (count !== 0) {
      setButtonStatus(true)
      mutateUpdateAllNotiStatus()
        .then(() => {
          setButtonStatus(isLoadingUpdateAllNotiStatus)
        })
        .catch(() => {
          setButtonStatus(isErrorUpdateAllNotiStatus)
        })
    }
  }
  const onHandleSortBy = (_sort: string) => {
    setSortBy(_sort)
  }
  const onClickView = (_notificationItem: INotification) => {
    onHandleView(_notificationItem, profile?.id || "")
  }

  // Check if count is 0, then disabled button
  useEffect(() => {
    if (count === 0) {
      setButtonStatus(true)
    }
  }, [count])

  return {
    onHandleView,
    onHandleSortBy,
    page,
    setPage,
    totalCount,
    sortBy,
    limit,
    onHandleClick,
    handleLimit,
    onClickView,
    isLoadingNotification,
    unread: count,
    buttonStatus
  }
}

export default useNotificationController
