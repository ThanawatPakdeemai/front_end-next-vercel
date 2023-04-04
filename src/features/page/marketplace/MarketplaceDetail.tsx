import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import CONFIGS from "@configs/index"
import React from "react"
import useCountStore from "@stores/countComponant"
import dynamic from "next/dynamic"
import useMarketDetail from "@feature/marketplace/containers/hooks/useMarketDetail"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"

const ButtonMarket = dynamic(
  () => import("@components/atoms/button/ButtonMarket"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetail = () => {
  const { detailData, marketType, nameNFT, tokenNFT, imageNFT, vdoNFT } =
    useMarketDetail()
  const { count } = useCountStore()

  const handleColorSellingType = (selling_type: TSellingType) => {
    if (selling_type === "fullpayment") {
      return "info"
    }
    if (selling_type === "rental") {
      return "error"
    }
    return "warning"
  }

  return detailData ? (
    <div className="flex w-full flex-col gap-y-[60px] gap-x-[120px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:py-0 sm:px-0">
      <CardContentDetails
        detail={
          detailData.land_data?.details ??
          detailData.building_data?.detail ??
          detailData.item_data?.detail ??
          detailData.material_data?.detail ??
          detailData.nakapunk_data?.description ??
          detailData.game_data?.story
        }
        image={imageNFT}
        video={vdoNFT}
        poster={
          detailData.land_data?.NFT_image ??
          detailData.game_data?.image_nft_arcade_game
        }
        alt={detailData.land_data?.type}
      >
        <div className="grid grid-cols-2 px-8 py-6">
          <CardWriterDetails
            textHead="create by"
            name="nakamoto.games"
            date={String(detailData.created_at)}
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
      <div className="flex h-full w-full flex-col">
        <RightDetailsMarketplace
          type={marketType as TNFTType}
          id={detailData.item_id}
          token={tokenNFT}
          title={
            detailData.land_data?.name ||
            detailData.building_data?.name ||
            (detailData.item_data &&
              `${detailData.item_data.name} ${detailData.item_data.item_size}`) ||
            detailData.nakapunk_data?.name ||
            detailData.material_data?.name ||
            detailData.game_data?.name
          }
          method={detailData.seller_id ? "buy" : "mint"}
          position={detailData.land_data?.position}
          price={detailData.price as number}
          qrCode={detailData.land_data?.qrcode_image}
          count={{
            helperText: `Total supply : ${count}`,
            label: "Supply in market",
            min: 1,
            max: detailData.item_total || 1,
            count: 1
          }}
          sellingType={{
            title: detailData.selling_type,
            color: handleColorSellingType(
              detailData.selling_type as TSellingType
            )
          }}
        >
          <ButtonMarket
            nftType={detailData.type}
            name={nameNFT || ""}
            img={imageNFT}
            vdo={vdoNFT}
            tokenId={tokenNFT}
            marketId={detailData._id}
            itemId={detailData.item_id}
            orderId={detailData.order_id}
            price={detailData.price}
            maxPeriod={detailData.period_amount}
            maxAmount={detailData.item_amount}
            sellerType={detailData.seller_type}
            sellingType={detailData.selling_type}
            sellerId={detailData.seller_id}
            plot={detailData.land_data?.position}
          />
        </RightDetailsMarketplace>
      </div>
    </div>
  ) : null
}

export default MarketplaceDetail
