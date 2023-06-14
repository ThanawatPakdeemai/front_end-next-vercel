import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import CONFIGS from "@configs/index"
import React from "react"
import dynamic from "next/dynamic"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"

const ButtonMarket = dynamic(
  () => import("@components/atoms/button/ButtonMarket"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetailMobile = () => {
  const { marketOrder, nameNFT, tokenNFT, imageNFT, vdoNFT } =
    useMarketplaceProvider()
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
        >
          <ButtonMarket
            nftType={marketOrder.type}
            name={nameNFT || ""}
            img={imageNFT || ""}
            vdo={vdoNFT}
            tokenId={tokenNFT}
            marketId={marketOrder._id}
            itemId={marketOrder.item_id}
            orderId={marketOrder.order_id}
            orderPrice={marketOrder.price}
            maxPeriod={marketOrder.period_amount}
            maxAmount={marketOrder.item_amount}
            sellerType={marketOrder.seller_type}
            sellingType={marketOrder.selling_type}
            sellerId={marketOrder.seller_id}
            plot={marketOrder.land_data?.position}
          />
        </RightDetailsMarketplace>
      </div>
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceDetailMobile
