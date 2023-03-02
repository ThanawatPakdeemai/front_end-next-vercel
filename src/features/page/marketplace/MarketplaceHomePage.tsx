import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { IMarketplaceInfoData, MOCK_LAND } from "@constants/mockupMarketplace"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const MarketplaceHomePage = () => {
  const [gameItemData, setGameItemData] = useState<IMarketplaceInfoData[]>([])

  useEffect(() => {
    setGameItemData(MOCK_LAND.data)
  }, [])

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {gameItemData.map((_data, _index) => (
        <CardItemMarketPlace
          key={uuidv4()}
          cardType="land"
          data={_data}
        />
      ))}
    </div>
  )
}

export default MarketplaceHomePage
