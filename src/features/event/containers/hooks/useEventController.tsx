import { ITableHeader } from "@feature/table/interface/ITable"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const useEventController = () => {
  const { t } = useTranslation()
  const [sortTime, setSortTime] = useState<number | undefined>(undefined)
  const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)

  const EventTableHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: t("rank"),
        arrowIcon: true,
        keyUp: sortTime === 1,
        keyDown: sortTime === -1,
        onClick: () =>
          setSortTime((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },

      {
        title: "amount",
        arrowIcon: true,
        keyUp: sortAmount === 1,
        keyDown: sortAmount === -1,
        onClick: () =>
          setSortAmount((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      {
        title: "best_score",
        className: "flex justify-end w-full"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortTime, sortAmount]
  )
  return {
    sortTime,
    sortAmount,
    EventTableHeader
  }
}

export default useEventController
