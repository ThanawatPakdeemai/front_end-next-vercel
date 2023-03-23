import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import { ITableHeader } from "@feature/table/interface/ITable"
import { validTypeGames } from "@pages/[typeGame]"
import useNotiStore from "@stores/notification"
import { useRouter } from "next/router"

import { useMemo } from "react"

const useHistoryController = () => {
  const { setNotificationItem, setPlayHistoryItem } = useNotiStore()
  const router = useRouter()

  const HistoryTableHead: Array<ITableHeader> = useMemo(
    () => [
      {
        title: "time",
        arrowIcon: false
      },
      {
        title: "GAME",
        filterIcon: false
      },
      {
        title: "TYPE",
        arrowIcon: false
      },
      { title: "STATUS" },
      { title: "VIEW", className: "justify-end flex w-full" }
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
        _historyItem.path
      }`,
      _historyItem.room_id
    )
  }

  return {
    HistoryTableHead,
    handleClickView
  }
}

export default useHistoryController
