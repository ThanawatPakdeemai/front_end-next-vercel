import ButtonMarket from "@components/atoms/button/ButtonMarket"
import ButtonRentOut from "@components/atoms/button/ButtonRentOut"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import BillDetailSection from "@feature/marketplace/components/organisms/BillDetailSection"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import { useInventoryProvider } from "@providers/InventoryProvider"
import useCountStore from "@stores/countComponant"
import React from "react"

const MarketplaceOwnerDetail = () => {
  const { invenItemData } = useInventoryProvider()
  const { count } = useCountStore()

  return invenItemData ? (
    <div className="flex flex-col">
      <div className="mt-5 flex w-full flex-col gap-x-[120px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0">
        <CardContentDetails
          detail={invenItemData.detail}
          image={invenItemData.img}
          video={invenItemData.vdo}
          poster={invenItemData.img}
          alt={invenItemData.type}
          model={invenItemData.model}
        >
          <div className="grid grid-cols-2 px-8 py-6">{/* transfer */}</div>
        </CardContentDetails>
        <div className="flex h-full w-full flex-col">
          <RightDetailsMarketplace
            type={invenItemData.type}
            id={invenItemData.tokenId}
            token={invenItemData.tokenId}
            title={invenItemData.name}
            position={invenItemData.position}
            qrCode={invenItemData.qrCode}
            count={
              invenItemData.totalAmoumt
                ? {
                    helperText: `Total supply : ${invenItemData.totalAmoumt}`,
                    label: "Supply in inventory",
                    min: 1,
                    max: Number(invenItemData.totalAmoumt),
                    count: 1
                  }
                : undefined
            }
          >
            <ButtonMarket
              nftType={invenItemData.type}
              img={invenItemData.img}
              tokenId={invenItemData.tokenId}
              marketId={invenItemData.id}
              itemId={invenItemData.id}
              orderId={invenItemData.id}
              amount={count || 1}
              maxAmount={invenItemData.totalAmoumt}
              plot={invenItemData.position}
              name={invenItemData.name}
              marketplaces_data={invenItemData.marketplaces_data}
            />

            {invenItemData.type === "nft_land" ||
            invenItemData.type === "nft_building" ? (
              <ButtonRentOut
                nftType={invenItemData.type}
                name={invenItemData.name}
                img={invenItemData.img}
                tokenId={invenItemData.tokenId}
                marketId={invenItemData.id}
                itemId={invenItemData.id}
                orderId={invenItemData.id}
                amount={count || 1}
                maxAmount={invenItemData.totalAmoumt}
                sellingType="rental"
                plot={invenItemData.position}
              />
            ) : null}
          </RightDetailsMarketplace>
        </div>
      </div>
      {invenItemData.installments_data && invenItemData.history && (
        <BillDetailSection
          insData={invenItemData.installments_data[0]}
          history={invenItemData.history}
        />
      )}
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceOwnerDetail
