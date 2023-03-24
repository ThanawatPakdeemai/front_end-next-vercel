import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface INotiStore {
  count: number
  notification: INotification | null
  playHistory: IHistory | null
  readAll: boolean
  notificationAll: INotification[]
  getAllNotification: () => INotification[]
  getPlayHistoryItem: () => IHistory | null
  getNotificationItem: () => INotification | null
  setNotificationAll: (_notiList: INotification[]) => void
  setNotificationItem: (_noti: INotification) => void
  setPlayHistoryItem: (_history: IHistory) => void
  setNotificationCount: (_count: number) => void
  setNotificationReadAll: (_status: boolean) => void
}

const useNotiStore = create<INotiStore>()(
  devtools(
    persist(
      (set, get) => ({
        count: 0,
        notification: null,
        readAll: false,
        notificationAll: [],
        playHistory: null,
        getAllNotification: () => get().notificationAll,
        setNotificationAll: (_notiList) => {
          set(
            () => ({ notificationAll: _notiList }),
            false,
            "Notification/setNotificationAll"
          )
        },
        getNotificationItem: () => get().notification,
        setNotificationItem: (_noti) => {
          set(
            () => ({ notification: _noti }),
            false,
            "Notification/setNotificationItem"
          )
        },
        setNotificationCount: (_count) => {
          set(
            () => ({ count: _count }),
            false,
            "Notification/setNotificationCount"
          )
        },
        setNotificationReadAll: (_status) => {
          set(
            () => ({ readAll: _status }),
            false,
            "Notification/setNotificationReadAll"
          )
        },
        getPlayHistoryItem: () => get().playHistory,
        setPlayHistoryItem: (_history) => {
          set(
            () => ({ playHistory: _history }),
            false,
            "Notification/setPlayHistoryItem"
          )
        }
      }),
      configZustandDevTools("Notification-Store")
    )
  )
)

export default useNotiStore
