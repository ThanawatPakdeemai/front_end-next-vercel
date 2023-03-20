import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import CONFIGS from "@configs/index"
import React from "react"
import useMarketplace from "@hooks/useMarketplace"
import useCountStore from "@stores/countComponant"

const MarketplaceDetail = () => {
  const { detailData, type } = useMarketplace()
  const { count } = useCountStore()

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
        qrCode={detailData.land_data?.qrcode_image}
        count={{
          helperText: `Total supply : ${count}`,
          label: "Supply in market",
          min: 1,
          max: detailData.item_amount,
          count: 1
        }}
      />
    </div>
  ) : null
}

export default MarketplaceDetail