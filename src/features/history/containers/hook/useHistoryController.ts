import { IHistory } from "@feature/history/interfaces/IHistoryService"
import { ITableHeader } from "@feature/table/interface/ITable"
import { useRouter } from "next/router"

import { useMemo } from "react"

const useHistoryController = () => {
  const router = useRouter()
  const HistoryTableHead: Array<ITableHeader> = useMemo(
    () => [
      {
        title: "time",
        arrowIcon: true
      },
      {
        title: "GAME",
        filterIcon: true
      },
      {
        title: "TYPE",
        arrowIcon: true
      },
      { title: "STATUS" },
      { title: "VIEW", className: "justify-end flex w-full" }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onHandleView = (e: IHistory) => {
    router.push(`/${e.path}/summary/${e.room_id}`)
  }

  return {
    HistoryTableHead,
    onHandleView
  }
}

export default useHistoryController
