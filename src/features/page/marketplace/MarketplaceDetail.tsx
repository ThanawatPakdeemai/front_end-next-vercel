import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useGetMarketOrderById from "@feature/marketplace/hooks/getMarketOrderById"
import { IMarketDetail } from "@feature/marketplace/interfaces/IMarketService"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const MarketplaceDetail = () => {
  const router = useRouter()
  const [detailData, setDetailData] = useState<IMarketDetail>()
  const getPathnameType = router.pathname.split("/")[2]
  const { id } = router.query
  const handleType = () => {
    switch (getPathnameType) {
      case "land":
        return "nft_land"
      case "building":
        return "nft_building"
      case "naka-punk":
        return "nft_naka_punk"
      case "material":
        return "nft_material"
      case "game":
        return "game_item"
      default:
        return "land"
    }
  }

  const { orderData } = useGetMarketOrderById({
    _id: id as string,
    _type: handleType(),
    _isActive: true
  })

  useEffect(() => {
    if (orderData) {
      setDetailData(orderData.data[0])
    }
  }, [orderData])

  return detailData ? (
    <div className="flex w-full gap-x-[120px]">
      <div className="w-1/2">left component</div>
      <RightDetailsMarketplace
        token={
          detailData.land_data?.land_id ||
          detailData.building_data?.building_id_smartcontract ||
          detailData.order_id ||
          detailData.nakapunk_data?.NFT_token
        }
        title={
          detailData.land_data?.name ||
          detailData.building_data?.name ||
          detailData.item_data?.name ||
          detailData.nakapunk_data?.name ||
          detailData.material_data?.name
        }
        method="buy"
        position={detailData.land_data?.position}
        price={detailData.price as number}
      />
    </div>
  ) : null
}

export default MarketplaceDetail
