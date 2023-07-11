import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import useNotiStore from "@stores/notification"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { useCallback, useEffect, useState } from "react"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import useGetNotificationSWR from "./useGetNotificationSWR"
import useNotificationReadAll from "./useNotificationReadAll"

const useNotificationController = () => {
  const router = useRouter()
  const { errorToast } = useToast()
  const { page, limit, pager, setTotalCount, setLimit, totalCount, setPage } =
    useGlobal()

  // State
  const [sortBy, setSortBy] = useState<string>("dateDESC")
  const [buttonStatus, setButtonStatus] = useState<boolean>(false)
  const [notificationList, setNotificationList] = useState<INotification[]>([])

  // Store
  const profile = useProfileStore((state) => state.profile.data)
  const isLogin = useProfileStore((state) => state.isLogin)

  const {
    setNotificationItem,
    setPlayHistoryItem,
    setNotificationAll,
    setNotificationCount,
    count,
    onResetNotification
  } = useNotiStore()
  const { isLoadingNotification, dataNotification } = useGetNotificationSWR({
    player_id: profile?.id || "",
    limit,
    skip: page
  })
  const {
    mutateUpdateAllNotiStatus,
    isLoadingUpdateAllNotiStatus,
    isErrorUpdateAllNotiStatus
  } = useNotificationReadAll(profile?.id || "")

  const fetchNotification = useCallback(() => {
    if (dataNotification && dataNotification.data.length > 0) {
      setTotalCount(dataNotification.data.length)
      const result = dataNotification.data.filter((item) => !item.read)
      // Set values to store
      // TODO: Refactor this to no use store
      setNotificationList(dataNotification.data)
      setNotificationAll(dataNotification.data)
      setNotificationCount(result.length)
    }
  }, [
    dataNotification,
    setNotificationAll,
    setNotificationCount,
    setTotalCount
  ])

  useEffect(() => {
    let load = false

    if (isLoadingNotification) return
    if (!load) fetchNotification()

    return () => {
      load = true
    }
  }, [
    dataNotification,
    isLoadingNotification,
    fetchNotification,
    profile,
    setNotificationAll,
    setNotificationCount,
    setTotalCount,
    setLimit
  ])

  const onHandleView = (notification: INotification, playerId: string) => {
    if (playerId) {
      setPlayHistoryItem({} as IHistory)
      setNotificationItem(notification)
      router.push(
        `/${notification.game_mode || "play-to-earn"}/${
          notification.path
        }/${notification.type.toLocaleLowerCase().replaceAll("_", "-")}/${
          notification._id
        }`
      )
    } else {
      errorToast(MESSAGES.please_login)
    }
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
    let load = false

    if (!load) {
      if (count === 0) {
        setButtonStatus(true)
      }
    }

    return () => {
      load = true
    }
  }, [count])

  // Check if is not login and click logout in Notification page, then reset notification store
  useEffect(() => {
    let load = false

    if (!load) {
      if (!isLogin) {
        onResetNotification()
      }
    }

    return () => {
      load = true
    }
  }, [isLogin, onResetNotification])

  return {
    onHandleView,
    onHandleSortBy,
    sortBy,
    onHandleClick,
    onClickView,
    isLoadingNotification,
    unread: count,
    buttonStatus,
    limit,
    page,
    pager,
    setLimit,
    totalCount,
    setPage,
    notificationList
  }
}

export default useNotificationController
