import React, { useCallback } from "react"
import CardDetailSkeleton from "@feature/marketplace/components/molecules/CardDetailSkeleton"
import TransferBox from "@feature/marketplace/components/molecules/TransferBox"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import NFTDetailTable from "@feature/marketplace/components/organisms/NFTDetailTable"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import { useInventoryProvider } from "@providers/InventoryProvider"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { Chip, Typography } from "@mui/material"
import CopyButton from "@components/atoms/CopyButton"
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
  const { invenItemData, isLoading, invAmount } = useInventoryProvider()

  const router = useRouter()
  const isInventory = router.asPath.includes("inventory")

  const handleRouter = useCallback(() => {
    if (router.asPath.includes("inventory")) {
      router.push("/marketplace/inventory")
    } else {
      router.back()
    }
  }, [router])

  return invenItemData && !isLoading ? (
    <div className="flex flex-col">
      <div
        className={`mt-16 flex w-full flex-col justify-center gap-x-[60px] gap-y-[60px] px-10 py-4 ${
          isInventory ? `lg:flex-row` : `sm:flex-row`
        }  sm:gap-y-0 sm:px-0 sm:py-0`}
      >
        <div className="grid sm:hidden">
          {invenItemData.tokenId && (
            <div className="flex w-fit items-center justify-between">
              <ButtonClose
                onClick={handleRouter}
                insideClassName="!bg-error-main hover:bg-error-main"
              />
              <div className="flex gap-[6px]">
                <Chip
                  label={`TOKEN ID : ${String(invenItemData.tokenId)}`}
                  size="small"
                  variant="outlined"
                />
                <CopyButton
                  text={invenItemData.tokenId as string}
                  className="!bg-neutral-780"
                />
              </div>
            </div>
          )}
          <Typography className="ml-12 mt-2 text-[46px] font-bold uppercase text-neutral-300">
            {invenItemData.name}
          </Typography>
        </div>

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
            !invenItemData.marketplaces_data && (
              <div className="px-8">
                <TransferBox
                  _tokenId={invenItemData.id}
                  _nftToken={invenItemData.tokenId}
                  _maxAmount={invenItemData.totalAmount}
                />
              </div>
            )}
        </CardContentDetails>
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
          >
            {!invenItemData.installments_data &&
            invenItemData.owner_id === invenItemData.player_id ? (
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
                  marketplaces_data={invenItemData.marketplaces_data}
                  showRentBtn={
                    !invenItemData.marketplaces_data &&
                    (invenItemData.type === "nft_land" ||
                      invenItemData.type === "nft_building")
                  }
                />
              </div>
            ) : null}
          </RightDetailsMarketplace>
        </div>
      </div>
      {invenItemData.history &&
      (invenItemData.installments_data || invenItemData.rentals_data) ? (
        <NFTDetailTable
          installmentData={
            invenItemData.installments_data
              ? invenItemData.installments_data
              : undefined
          }
          rentalData={
            invenItemData.rentals_data ? invenItemData.rentals_data : undefined
          }
          history={invenItemData.history}
        />
      ) : null}
    </div>
  ) : (
    <CardDetailSkeleton />
  )
}

export default MarketplaceOwnerDetail
