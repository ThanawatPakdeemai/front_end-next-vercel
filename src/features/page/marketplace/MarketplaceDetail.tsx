import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useGetMarketOrderById from "@feature/marketplace/hooks/getMarketOrderById"
import CONFIGS from "@configs/index"
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
      <CardContentDetails
        detail={
          detailData.land_data?.details ??
          detailData.building_data?.detail ??
          detailData.item_data?.detail ??
          detailData.material_data?.detail ??
          detailData.nakapunk_data?.description
        }
        image={
          detailData.building_data?.NFT_image ??
          detailData.item_data?.image ??
          detailData.material_data?.image ??
          detailData.nakapunk_data?.image
        }
        video={detailData.land_data?.NFT_video}
        poster={detailData.land_data?.NFT_image}
        alt={detailData.land_data?.type}
      >
        <div className="grid grid-cols-2 px-8 py-6">
          <CardWriterDetails
            textHead="creat by"
            name="nakamoto.game"
            date="2022-06-22T07:39:13.280Z"
            link={CONFIGS.CONTRACT_ADDRESS.NAKA}
          />
          {detailData.seller_id && (
            <CardWriterDetails
              textHead="Owned by"
              name="XXXXXXXXXXXXX"
              date={String(detailData.created_at)}
              link={detailData.seller_id}
              image={detailData.land_data?.image}
              alt={detailData.land_data?.type}
            />
          )}
        </div>
      </CardContentDetails>
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
        method={detailData.seller_id ? "buy" : "mint"}
        position={detailData.land_data?.position}
        price={detailData.price as number}
      />
    </div>
  ) : null
}

export default MarketplaceDetail
