import { ITableHeader } from "@feature/table/interface/ITable"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

const useTournamentController = () => {
  const { t } = useTranslation()

  // const [sortTime, setSortTime] = useState<number | undefined>(undefined) // 1 || -1
  // const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)

  const TournamentTableHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: t("finished"),
        arrowIcon: true
        // keyUp: sortTime === 1,
        // keyDown: sortTime === -1,
        // onClick: () =>
        //   setSortTime((prev: number | undefined) => {
        //     if (prev) {
        //       return prev * -1
        //     }
        //     return -1
        //   })
      },
      {
        title: t("game"),
        arrowIcon: true
        // onClick: () =>
        //   setSortTime((prev: number | undefined) => {
        //     if (prev) {
        //       return prev * -1
        //     }
        //     return -1
        //   })
      },
      {
        title: t("total prize"),
        arrowIcon: true
        // keyUp: sortAmount === 1,
        // keyDown: sortAmount === -1,
        // onClick: () =>
        //   setSortAmount((prev: number | undefined) => {
        //     if (prev) {
        //       return prev * -1
        //     }
        //     return -1
        //   })
      },
      {
        title: t("winner 1st")
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return {
    TournamentTableHeader
  }
}

export default useTournamentController
