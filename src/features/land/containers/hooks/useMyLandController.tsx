import { ITableHeader } from "@feature/table/interface/ITable"
import { useMemo, useState } from "react"

const useMyLandController = () => {
  const [sortLandId, setSortLandId] = useState<number | undefined>(undefined)
  const [sortBlockPoint, setSortBlockPoint] = useState<number | undefined>(
    undefined
  )
  const landListHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: "land id",
        arrowIcon: true,
        keyUp: sortLandId === 1,
        keyDown: sortLandId === -1,
        onClick: () =>
          setSortLandId((prev: number | undefined) => {
            if (sortBlockPoint !== undefined) {
              setSortBlockPoint(undefined)
            }
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      {
        title: "block point",
        arrowIcon: true,
        keyUp: sortBlockPoint === 1,
        keyDown: sortBlockPoint === -1,
        onClick: () =>
          setSortBlockPoint((prev: number | undefined) => {
            if (sortLandId !== undefined) {
              setSortLandId(undefined)
            }
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      {
        title: "view",
        className: "flex justify-end w-full"
      }
    ],
    [sortBlockPoint, sortLandId]
  )
  return {
    sortLandId,
    sortBlockPoint,
    landListHeader
  }
}

export default useMyLandController
