import { ITableHeader } from "@feature/table/interface/ITable"
import { useMemo } from "react"

const useHistoryController = () => {
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

  return {
    HistoryTableHead
  }
}

export default useHistoryController
