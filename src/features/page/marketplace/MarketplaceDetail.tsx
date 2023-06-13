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
import { Chip, Typography } from "@mui/material"
import { useRouter } from "next/router"
import CopyButton from "@components/atoms/CopyButton"
import ButtonClose from "@components/atoms/button/ButtonClose"
import RedemptionCode from "@components/molecules/RedemptionCode"
import Breadcrumb from "@components/molecules/Breadcrumb"

const ButtonMarket = dynamic(
  () => import("@components/atoms/button/ButtonMarket"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceDetail = () => {
  const { marketOrder, nameNFT, tokenNFT, imageNFT, vdoNFT } =
    useMarketplaceProvider()
  const { marketType } = useGlobal()

  const router = useRouter()
  const handleRouter = () => {
    if (router.asPath.includes("inventory")) {
      router.push("/marketplace/inventory")
    } else {
      router.back()
    }
  }

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
      <div className="hidden sm:block">
        <Breadcrumb />
        <div className="flex w-full flex-col gap-x-[30px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0 md:gap-x-[60px] lg:gap-x-[120px]">
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
      </div>
      <div className="m-4 mt-16 block sm:hidden">
        {tokenNFT && (
          <div className="flex w-fit items-center justify-between">
            <ButtonClose
              onClick={handleRouter}
              insideClassName="!bg-error-main hover:bg-error-main"
            />
            {/* button mobile */}
            <div className="flex gap-[6px]">
              <Chip
                label={`TOKEN ID : ${String(tokenNFT)}`}
                size="small"
                variant="outlined"
              />
              <CopyButton
                text={tokenNFT as string}
                className="!bg-neutral-780"
              />
            </div>
          </div>
        )}
        <Typography className="ml-12 mt-2 text-[46px] font-bold uppercase text-neutral-300">
          {nameNFT}
        </Typography>
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
        </CardContentDetails>
        {marketOrder.seller_type !== "user" ? <RedemptionCode /> : null}
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
    </>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceDetail
