import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import useInventoryRental from "@feature/inventory/containers/hooks/useInventoryRental"
import useProfileStore from "@stores/profileStore"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import CardListContainer from "./CardListContainer"
import SkeletonMarketOwnerList from "./SkeletonMarketOwnerList"

const MarketplaceRentalList = () => {
  const profile = useProfileStore()
  const {
    inventoryItemRental,
    isLoading,
    totalCount,
    currentPage,
    limit,
    setCurrentPage
  } = useInventoryRental()

  const router: NextRouter = useRouter()

  if (inventoryItemRental && inventoryItemRental.length > 0 && !isLoading) {
    return (
      <CardListContainer
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {inventoryItemRental.map((_data) => (
          <CardItemMarketPlace
            key={uuidv4()}
            cardType={_data.cardType}
            id={_data.tokenId}
            itemImage={
              _data.cardType === "building"
                ? {
                    src: String(_data.img),
                    alt: _data.name
                    // width: _data.name.includes("Bullet") ? 40 : 100
                  }
                : undefined
            }
            itemVideo={
              _data.cardType === "land"
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
            itemAmount={_data.amount}
            href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
            keyType={_data.keyType}
            sellingType={{
              title: _data.keyType,
              color: _data.keyType === "owner" ? "secondary" : "error"
            }}
            rental={_data.rental}
          />
        ))}
      </CardListContainer>
    )
  }
  return (
    <SkeletonMarketOwnerList
      invenList={inventoryItemRental}
      isLoading={isLoading}
      isItemLoading={isLoading}
      profile={profile}
      limit={limit}
    />
  )
}

export default MarketplaceRentalList
