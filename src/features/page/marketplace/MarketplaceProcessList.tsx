import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import useInventoryPayment from "@feature/inventory/containers/hooks/useInventoryPayment"
import useProfileStore from "@stores/profileStore"
import SkeletonMarketOwnerList from "./SkeletonMarketOwnerList"
import CardListContainer from "./CardListContainer"

const MarketplaceProcessList = () => {
  const profile = useProfileStore()
  const {
    totalCount,
    isLoading,
    limit,
    currentPage,
    setCurrentPage,
    inventoryItemPayment
  } = useInventoryPayment()

  const router = useRouter()

  if (inventoryItemPayment && inventoryItemPayment.length > 0 && !isLoading) {
    return (
      <CardListContainer
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {inventoryItemPayment.map((_data) => (
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
            itemName={_data.name}
            itemLevel={_data.level}
            itemSize={_data.size as string}
            itemAmount={_data.amount as number}
            href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
            sellingType={{
              title: _data.payment_type,
              color: _data.payment_type === "unpaid" ? "error" : "info"
            }}
            price={_data.price}
          />
        ))}
      </CardListContainer>
    )
  }
  return (
    <SkeletonMarketOwnerList
      invenList={inventoryItemPayment}
      isLoading={isLoading}
      isItemLoading={isLoading}
      profile={profile}
      limit={limit}
    />
  )
}

export default MarketplaceProcessList
