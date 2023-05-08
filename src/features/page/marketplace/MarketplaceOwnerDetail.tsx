import ButtonMarket from "@components/atoms/button/ButtonMarket"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import BillDetailSection from "@feature/marketplace/components/organisms/BillDetailSection"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useMarketOwnerDetail from "@feature/marketplace/containers/hooks/useMarketOwnerDetail"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import useCountStore from "@stores/countComponant"
import React from "react"

const MarketplaceOwnerDetail = () => {
  const { ownerDetail, marketType } = useMarketOwnerDetail()
  const { count } = useCountStore()

  return ownerDetail ? (
    <div className="flex flex-col">
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
            token={ownerDetail.tokenId}
            title={ownerDetail.name}
            position={ownerDetail.pos}
            qrCode={ownerDetail.qrcode}
            count={{
              helperText: `Total supply : ${ownerDetail.amount}`,
              label: "Supply in inventory",
              min: 1,
              max: Number(ownerDetail.amount),
              count: 1
            }}
          >
            {/* mockup fullpayment only */}
            {!ownerDetail.installments_data && (
              <ButtonMarket
                nftType={marketType as TNFTType}
                img={ownerDetail.image as string}
                tokenId={ownerDetail.tokenId}
                marketId={ownerDetail.id}
                itemId={ownerDetail.id}
                orderId={ownerDetail.id}
                price={100}
                amount={count || 1}
                maxAmount={Number(ownerDetail.amount)}
                sellingType="fullpayment"
                plot={ownerDetail.pos}
                name={ownerDetail.name}
              />
            )}
          </RightDetailsMarketplace>
        </div>
      </div>
      {ownerDetail.installments_data && (
        <BillDetailSection insData={ownerDetail.installments_data} />
      )}
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceOwnerDetail
