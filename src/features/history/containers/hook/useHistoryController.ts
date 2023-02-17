import { ITableHeader } from "@feature/table/interface/ITable"
import { useRouter } from "next/router"

import { useMemo } from "react"

const useHistoryController = () => {
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

  return {
    HistoryTableHead,
    onHandleView
  }
}

export default useHistoryController
