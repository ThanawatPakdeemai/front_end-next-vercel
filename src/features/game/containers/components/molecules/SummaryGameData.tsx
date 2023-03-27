import Helper from "@utils/helper"
import React from "react"
import SummaryGameDetail from "./SummaryGameDetail"

export interface ISummaryGameDataProps {
  gameName?: string
  itemName?: string
  gameRaward?: number
}

const SummaryGameData = ({
  gameName,
  itemName,
  gameRaward
}: ISummaryGameDataProps) => (
  <div className="flex w-full flex-col items-center justify-center rounded border border-neutral-800 px-[26px] py-5 text-sm">
    {gameName && (
      <SummaryGameDetail
        title="game:"
        value={gameName}
      />
    )}
    {itemName && (
      <SummaryGameDetail
        title="asset:"
        value={itemName}
      />
    )}
    {gameRaward && gameRaward !== 0 ? (
      <SummaryGameDetail
        title="game reward:"
        value={`${Helper.formatNumber(gameRaward, {
          maximumFractionDigits: 4
        })} Naka`}
      />
    ) : null}
  </div>
)

export default SummaryGameData
