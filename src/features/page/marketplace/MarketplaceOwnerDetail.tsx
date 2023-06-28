import React from "react"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import TransferBox from "@feature/marketplace/components/molecules/TransferBox"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import NFTDetailTable from "@feature/marketplace/components/organisms/NFTDetailTable"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import { useInventoryProvider } from "@providers/InventoryProvider"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"

const MarketplaceButton = dynamic(
  () => import("@components/molecules/MarketplaceButton"),
  {
    suspense: true,
    ssr: false
  }
)
const MarketplaceOwnerDetail = () => {
  const { profile } = useProfileStore()
  const { invenItemData, isLoading, invAmount, invPeriod, setInvPeriod } =
    useInventoryProvider()

  const onInvPeriodChange = (_value: number) => {
    if (setInvPeriod) setInvPeriod(_value)
  }

  return invenItemData && !isLoading ? (
    <div className="flex flex-col pb-4">
      <div className="mt-16 flex w-full flex-col justify-center gap-x-[60px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0">
        <div className="hidden sm:block">
          <CardContentDetails
            detail={invenItemData.detail}
            image={invenItemData.img}
            video={invenItemData.vdo}
            poster={invenItemData.img}
            alt={invenItemData.type}
            model={invenItemData.model}
            showDetails
          >
            {profile.data &&
              profile.data.address &&
              invenItemData.wallet_address &&
              profile.data.address === invenItemData.wallet_address &&
              !invenItemData.marketplaces_data &&
              invenItemData.type !== "nft_avatar" && (
                <div className="px-8">
                  <TransferBox
                    _tokenId={invenItemData.id}
                    _nftToken={invenItemData.tokenId}
                    _maxAmount={invenItemData.totalAmount}
                  />
                </div>
              )}
          </CardContentDetails>
        </div>
        <div className="flex h-full w-full flex-col">
          <RightDetailsMarketplace
            type={invenItemData.type}
            id={invenItemData.tokenId}
            token={invenItemData.tokenId}
            title={invenItemData.name}
            position={invenItemData.position}
            qrCode={invenItemData.qrCode}
            price={invenItemData.marketplaces_data?.price}
            count={
              invenItemData.totalAmount
                ? {
                    helperText: `Total supply : ${invenItemData.totalAmount}`,
                    label: "Supply in inventory",
                    min: 1,
                    max: Number(invenItemData.totalAmount),
                    count: 1
                  }
                : undefined
            }
            image={invenItemData.img}
            video={invenItemData.vdo}
            transferBox={
              profile.data &&
              profile.data.address &&
              invenItemData.wallet_address &&
              profile.data.address === invenItemData.wallet_address &&
              !invenItemData.marketplaces_data &&
              invenItemData.type !== "nft_avatar" && (
                <div className="px-8">
                  <TransferBox
                    _tokenId={invenItemData.id}
                    _nftToken={invenItemData.tokenId}
                    _maxAmount={invenItemData.totalAmount}
                  />
                </div>
              )
            }
          >
            {profile.data &&
            !invenItemData.installments_data &&
            (invenItemData.owner_id === profile.data.id ||
              invenItemData.owner_id === profile.data.address) &&
            invenItemData.type !== "nft_avatar" ? (
              <div className="flex w-full items-center justify-between gap-x-2">
                <MarketplaceButton
                  nftType={invenItemData.type}
                  name={invenItemData.name}
                  itemId={invenItemData.id}
                  img={invenItemData.img}
                  tokenId={invenItemData.tokenId}
                  position={invenItemData.position}
                  amount={invAmount || 1}
                  maxAmount={invenItemData.totalAmount}
                  period={invPeriod}
                  setPeriod={onInvPeriodChange}
                  marketplaces_data={invenItemData.marketplaces_data}
                  showRentBtn={
                    !invenItemData.marketplaces_data &&
                    (invenItemData.type === "nft_land" ||
                      invenItemData.type === "nft_building") &&
                    invenItemData.owner_id === profile.data.id &&
                    !invenItemData.rentals_data
                  }
                  isRenting={!!invenItemData.rentals_data}
                />
              </div>
            ) : null}
          </RightDetailsMarketplace>
        </div>
      </div>
      {invenItemData.installments_data || invenItemData.rentals_data ? (
        <NFTDetailTable
          installmentData={
            invenItemData.installments_data
              ? invenItemData.installments_data
              : undefined
          }
          rentalData={
            invenItemData.rentals_data ? invenItemData.rentals_data : undefined
          }
          history={invenItemData.history || []}
          type={invenItemData.type}
        />
      ) : null}
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceOwnerDetail
