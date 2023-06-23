import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import CONFIGS from "@configs/index"
import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"
import { Typography } from "@mui/material"
import Breadcrumb from "@components/molecules/Breadcrumb"
import useMarketCategTypes from "@stores/marketCategTypes"

const MarketplaceButton = dynamic(
  () => import("@components/molecules/MarketplaceButton"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetail = () => {
  const { marketOrder, nameNFT, tokenNFT, imageNFT, vdoNFT, marketAmount } =
    useMarketplaceProvider()
  const { marketType } = useGlobal()
  const { NFTMintAble, fetchStatus } = useMarketCategTypes()

  const _hiddenMarketbtn = useMemo(() => {
    let _disable: boolean = false
    if (marketOrder && marketOrder.seller_type === "system" && fetchStatus) {
      if (marketType === "nft_land" && !NFTMintAble.nft_land) {
        _disable = true
      } else if (marketType === "nft_building" && !NFTMintAble.nft_building) {
        _disable = true
      }
    }
    return _disable
  }, [
    NFTMintAble.nft_building,
    NFTMintAble.nft_land,
    fetchStatus,
    marketOrder,
    marketType
  ])

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
    <>
      <div className="block">
        <Breadcrumb />
        <div className="flex w-full flex-col gap-x-[30px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0 md:gap-x-[60px] lg:gap-x-[120px]">
          <div className="hidden sm:block">
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
              seller_type={marketOrder.seller_type}
              nameItem={marketOrder.item_data?.name}
              showDetails
            >
              <div className="grid grid-cols-1 px-8 py-6 lg:grid-cols-2">
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
          </div>
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
                marketOrder.selling_type && marketOrder.seller_type !== "system"
                  ? {
                      title: marketOrder.selling_type,
                      color: handleColorSellingType(marketOrder.selling_type)
                    }
                  : undefined
              }
              redemption={!marketOrder.seller_id}
              checkRedreemMobile={!marketOrder.seller_id}
              image={imageNFT}
              video={vdoNFT}
            >
              {_hiddenMarketbtn ? null : (
                <MarketplaceButton
                  nftType={marketOrder.type}
                  name={nameNFT || ""}
                  itemId={marketOrder.item_id}
                  img={imageNFT || ""}
                  tokenId={tokenNFT || ""}
                  position={marketOrder.land_data?.position}
                  amount={marketAmount || 1}
                  maxAmount={marketOrder.item_amount}
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
              )}
            </RightDetailsMarketplace>
          </div>
          <div className="block sm:hidden">
            <div className="my-4 grid gap-6 rounded-[24px] border-[1px] border-neutral-800 bg-neutral-780 px-8 py-6 ">
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
            <div className="my-4 grid gap-6 rounded-[24px] border-[1px] border-neutral-800 bg-neutral-780 px-8 py-6">
              <Typography className="text-sm uppercase text-black-default">
                details
              </Typography>
              <Typography className="text-sm uppercase text-neutral-600">
                {marketOrder.land_data?.details ??
                  marketOrder.building_data?.detail ??
                  marketOrder.item_data?.detail ??
                  marketOrder.material_data?.detail ??
                  marketOrder.nakapunk_data?.description ??
                  marketOrder.game_data?.story}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceDetail
