import Helper from "@utils/helper"
import React from "react"
import { BrowserView, MobileView } from "react-device-detect"
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
  <>
    <BrowserView>
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
    </BrowserView>
    <MobileView>
      <div className="flex w-full flex-col items-center justify-center rounded border border-neutral-800 px-[26px]  text-sm">
        {gameName && (
          <div className="w-full px-[10px]">
            <SummaryGameDetail
              title="game:"
              value={gameName}
            />
          </div>
        )}
        {itemName && (
          <div className="w-full px-[10px]">
            <SummaryGameDetail
              title="asset:"
              value={itemName}
            />
          </div>
        )}
        {gameRaward && gameRaward !== 0 ? (
          <div className="w-full px-[10px]">
            <SummaryGameDetail
              title="game reward:"
              value={`${Helper.formatNumber(gameRaward, {
                maximumFractionDigits: 4
              })} Naka`}
            />
          </div>
        ) : null}
      </div>
    </MobileView>
  </>
)

export default SummaryGameData
