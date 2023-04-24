import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useMarketOwnerDetail from "@feature/marketplace/containers/hooks/useMarketOwnerDetail"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import React from "react"

const MarketplaceOwnerDetail = () => {
  const { ownerDetail, marketType } = useMarketOwnerDetail()

  return ownerDetail ? (
    <div className="mt-5 flex w-full flex-col gap-x-[120px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0">
      <CardContentDetails
        detail={ownerDetail.desc}
        image={ownerDetail.image}
        video={ownerDetail.video}
        poster={ownerDetail.image}
        alt={ownerDetail.type}
        model={ownerDetail.model}
      >
        <div className="grid grid-cols-2 px-8 py-6">{/* transfer */}</div>
      </CardContentDetails>
      <div className="flex h-full w-full flex-col">
        <RightDetailsMarketplace
          type={marketType as TNFTType}
          id={ownerDetail.tokenId}
          // token={tokenNFT}
          title={ownerDetail.name}
          position={ownerDetail.pos}
          qrCode={ownerDetail.qrcode}
          // count={{
          //   // helperText: `Total supply : ${count}`,
          //   label: "Supply in market",
          //   min: 1,
          //   max: ownerDetail.item_total || 1,
          //   count: 1
          // }}
        >
          {/* <ButtonMarket
            nftType={ownerDetail.type}
            // name={""}
            img={ownerDetail.NFT_image}
            // vdo={"1111"}
            tokenId={ownerDetail.land_id}
            marketId={ownerDetail._id}
            itemId={ownerDetail._id}
            orderId={ownerDetail.order_id}
            price={ownerDetail.price}
            maxPeriod={ownerDetail.period_amount}
            maxAmount={ownerDetail.item_amount}
            sellerType={ownerDetail.seller_type}
            sellingType={ownerDetail.selling_type}
            sellerId={ownerDetail.owner_id}
            plot={ownerDetail.position}
          /> */}
        </RightDetailsMarketplace>
      </div>
    </div>
  ) : null
}

export default MarketplaceOwnerDetail
