import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import dynamic from "next/dynamic"
import { TSellingType } from "@feature/marketplace/interfaces/IMarketService"
import useInventoryForSale from "@feature/inventory/containers/hooks/useInventoryForSale"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"

const SkeletonMarketOwnerList = dynamic(
  () => import("./SkeletonMarketOwnerList"),
  {
    suspense: true,
    ssr: true
  }
)
const CardListContainer = dynamic(() => import("./CardListContainer"), {
  suspense: true,
  ssr: true
})
const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true,
    ssr: true
  }
)

const MarketPlaceForsaleList = () => {
  const profile = useProfileStore()
  const {
    totalCount,
    isLoading,
    isItemLoading,
    limit,
    currentPage,
    setCurrentPage,
    inventoryItemForsale
  } = useInventoryForSale()
  const { marketType } = useGlobal()

  const router = useRouter()

  const handleColorSellingType = (selling_type: TSellingType) => {
    if (selling_type === "fullpayment") {
      return "info"
    }
    if (selling_type === "rental") {
      return "error"
    }
    return "warning"
  }

  if (
    inventoryItemForsale &&
    inventoryItemForsale.length > 0 &&
    ((marketType !== "game_item" &&
      marketType !== "nft_material" &&
      !isLoading) ||
      ((marketType === "game_item" || marketType === "nft_material") &&
        !isItemLoading))
  ) {
    return (
      <CardListContainer
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {inventoryItemForsale.map((_data) => (
          <CardItemMarketPlace
            key={uuidv4()}
            cardType={_data.cardType}
            id={_data.tokenId}
            itemImage={
              _data.cardType === "game-item"
                ? {
                    src: String(_data.img),
                    alt: _data.name,
                    width: _data.name.includes("Bullet") ? 40 : 100
                  }
                : undefined
            }
            itemVideo={
              _data.cardType !== "game-item"
                ? {
                    src: _data.vdo as string,
                    poster: String(_data.img)
                  }
                : undefined
            }
            percentage={
              // eslint-disable-next-line no-nested-ternary
              _data.percentage &&
              _data.cardType === "building" &&
              _data.percentage >= 0
                ? 100 - Number(_data.percentage)
                : _data.cardType === "building"
                ? 100
                : undefined
            }
            itemName={_data.name}
            itemLevel={_data.level}
            itemSize={_data.size as string}
            itemAmount={_data.amount as number}
            href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
            sellingType={{
              title: _data.selling || "checking",
              color: handleColorSellingType(_data.selling as TSellingType)
            }}
            price={_data.price}
          />
        ))}
      </CardListContainer>
    )
  }
  return (
    <SkeletonMarketOwnerList
      invenList={inventoryItemForsale}
      isLoading={isLoading}
      isItemLoading={isItemLoading}
      profile={profile}
      limit={limit}
      marketType={marketType}
    />
  )
}

export default MarketPlaceForsaleList
