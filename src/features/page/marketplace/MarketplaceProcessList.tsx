import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React, { useCallback } from "react"
import useInventoryPayment from "@feature/inventory/containers/hooks/useInventoryPayment"
import useProfileStore from "@stores/profileStore"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
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

  const handleColor = useCallback((_keyType?: string, _payType?: string) => {
    let _color: "info" | "error" | "secondary" = "info"
    if (_payType && _payType.toLowerCase() === "unpaid") _color = "error"
    if (_keyType && _keyType === "owner") _color = "secondary"
    return _color
  }, [])

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
            key={_data.id}
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
              title: _data.payment_type,
              color: handleColor(_data.keyType, _data.payment_type)
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
