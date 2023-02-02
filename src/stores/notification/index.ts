import { INotification } from "@feature/notification/interfaces/INotificationService"
import configZustandDevTools from "@utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

interface INotiStore {
  count: number
  notification: INotification | null
  readAll: boolean
  notificationAll: INotification[]
  getAllNotification: () => INotification[]
  setNotificationAll: (_notiList: INotification[]) => void
  setNotificationItem: (_noti: INotification) => void
  setNotificationCount: (_count: number) => void
  setNotificationReadAll: (_status: boolean) => void
}

const useNotiStore = create<INotiStore>()(
  devtools(
    (set, get) => ({
      count: 0,
      notification: null,
      readAll: false,
      notificationAll: [],
      getAllNotification: () => get().notificationAll,
      setNotificationAll: (_notiList) => {
        set(
          () => ({ notificationAll: _notiList }),
          false,
          "Notification/setNotificationAll"
        )
      },
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
      }
    }),
    configZustandDevTools("Notification-Store")
  )
)

export default useNotiStore
