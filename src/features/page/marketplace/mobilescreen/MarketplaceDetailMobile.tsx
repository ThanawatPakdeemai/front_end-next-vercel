import React from "react"
import dynamic from "next/dynamic"
import CONFIGS from "@configs/index"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"

const CardDetailSkeleton = dynamic(
  () => import("@feature/marketplace/components/molecules/CardDetailSkeleton")
)
const CardWriterDetails = dynamic(
  () => import("@components/molecules/Inventory/CardWriterDetails")
)
const CardContentDetails = dynamic(
  () => import("@feature/marketplace/components/organisms/CardContentDetails")
)
const RightDetailsMarketplace = dynamic(
  () =>
    import("@feature/marketplace/components/organisms/RightDetailsMarketplace")
)

const MarketplaceButton = dynamic(
  () => import("@components/molecules/MarketplaceButton"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetailMobile = () => {
  const {
    marketOrder,
    nameNFT,
    tokenNFT,
    imageNFT,
    vdoNFT,
    marketAmount,
    marketPeriod
  } = useMarketplaceProvider()
  const { marketType } = useGlobal()

  const handleColorSellingType = (selling_type: TSellingType) => {
    if (selling_type === "fullpayment") {
      return "info"
    }
    if (selling_type === "rental") {
      return "error"
    }
    return "warning"
  }

  return marketOrder ? (
    <div className="flex w-full flex-col gap-x-[120px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0">
      <CardContentDetails
        detail={
          marketOrder.land_data?.details ??
          marketOrder.building_data?.detail ??
          marketOrder.item_data?.detail ??
          marketOrder.material_data?.detail ??
          marketOrder.nakapunk_data?.description ??
          marketOrder.game_data?.story
        }
        image={imageNFT}
        video={vdoNFT}
        model={marketOrder.building_data?.model_3d}
        poster={
          marketOrder.land_data?.NFT_image ??
          marketOrder.game_data?.image_nft_arcade_game ??
          marketOrder.building_data?.NFT_image
        }
        alt={marketOrder.land_data?.type}
        nameItem={marketOrder.item_data?.name}
      >
        <div className="grid grid-cols-2 px-8 py-6">
          <CardWriterDetails
            textHead="create by"
            name="nakamoto.games"
            date={String(marketOrder.created_at)}
            link={CONFIGS.CONTRACT_ADDRESS.NAKA}
          />
          {marketOrder.seller_id && (
            <CardWriterDetails
              textHead="Owned by"
              name={marketOrder.land_data?.name}
              date={String(marketOrder.created_at)}
              link={marketOrder.seller_id}
              image={marketOrder.land_data?.image}
              alt={marketOrder.land_data?.type}
            />
          )}
        </div>
      </CardContentDetails>
      <div className="flex h-full w-full flex-col">
        <RightDetailsMarketplace
          type={marketType as TNFTType}
          id={marketOrder.item_id}
          token={tokenNFT}
          title={nameNFT}
          method={marketOrder.seller_id ? "buy" : "mint"}
          position={marketOrder.land_data?.position}
          price={marketOrder.price}
          qrCode={marketOrder.land_data?.qrcode_image}
          count={{
            helperText: `Total supply : ${marketOrder.item_amount}`,
            label: "Supply in market",
            min: 1,
            max: marketOrder.item_amount || 1,
            count: 1
          }}
          sellingType={
            marketOrder.selling_type
              ? {
                  title: marketOrder.selling_type,
                  color: handleColorSellingType(marketOrder.selling_type)
                }
              : undefined
          }
          redemption={!marketOrder.seller_id}
          image={
            marketOrder.land_data?.NFT_image ??
            marketOrder.game_data?.image_nft_arcade_game ??
            marketOrder.building_data?.NFT_image
          }
          video={vdoNFT}
        >
          <MarketplaceButton
            nftType={marketOrder.type}
            name={nameNFT || ""}
            itemId={marketOrder.item_id}
            img={imageNFT || ""}
            tokenId={tokenNFT || ""}
            position={marketOrder.land_data?.position}
            amount={marketAmount || 1}
            maxAmount={marketOrder.item_amount}
            period={marketPeriod}
            maxPeriod={marketOrder.period_amount}
            marketplaces_data={{
              item_amount: marketOrder.item_amount,
              order_id: marketOrder.order_id,
              seller_id: marketOrder.seller_id,
              seller_type: marketOrder.seller_type,
              selling_type: marketOrder.selling_type,
              item_total: marketOrder.item_total,
              is_active: marketOrder.is_active,
              type: marketOrder.type,
              item_id: marketOrder.item_id,
              _id: marketOrder._id,
              price: marketOrder.price,
              real_land: false,
              buyer_details: [],
              updated_at: marketOrder.created_at,
              current_time: marketOrder.created_at,
              created_at: marketOrder.created_at
            }}
          />
        </RightDetailsMarketplace>
      </div>
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceDetailMobile
