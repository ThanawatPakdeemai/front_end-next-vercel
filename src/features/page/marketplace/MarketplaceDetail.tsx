import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import CONFIGS from "@configs/index"
import React from "react"
import useMarketplace from "@hooks/useMarketplace"
import dynamic from "next/dynamic"

const ButtonMarket = dynamic(
  () => import("@components/atoms/button/ButtonMarket"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetail = () => {
  const { detailData, type, tokenNFT, nameNFT } = useMarketplace()

  return detailData ? (
    <div className="flex w-full gap-x-[120px]">
      <CardContentDetails
        detail={
          detailData.land_data?.details ??
          detailData.building_data?.detail ??
          detailData.item_data?.detail ??
          detailData.material_data?.detail ??
          detailData.nakapunk_data?.description ??
          detailData.game_data?.story
        }
        image={
          detailData.building_data?.NFT_image ??
          detailData.item_data?.image ??
          detailData.material_data?.image ??
          detailData.nakapunk_data?.image
        }
        video={
          detailData.land_data?.NFT_video ??
          detailData.game_data?.animation_nft_arcade_game
        }
        poster={
          detailData.land_data?.NFT_image ??
          detailData.game_data?.image_nft_arcade_game
        }
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
      <div className="flex h-full w-full flex-col">
        <RightDetailsMarketplace
          type={type}
          id={detailData.item_id}
          token={
            detailData.land_data?.land_id ||
            detailData.building_data?.building_id_smartcontract ||
            detailData.order_id ||
            detailData.nakapunk_data?.NFT_token
          }
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
          itemAmount={detailData.item_amount}
          qrCode={detailData.land_data?.qrcode_image}
        />
        <ButtonMarket
          nftType={detailData.type}
          name={nameNFT}
          tokenId={tokenNFT}
          price={detailData.price}
          // period={detailData.period_amount}
          sellerType={detailData.seller_type}
          sellingType={detailData.selling_type}
          sellerId={detailData.seller_id}
        />
      </div>
    </div>
  ) : null
}

export default MarketplaceDetail
