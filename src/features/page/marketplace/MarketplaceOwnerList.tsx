import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { useRouter } from "next/router"
import useInventoryOwner from "@feature/inventory/containers/hooks/useInventoryOwner"

const MarketplaceOwnerList = () => {
  const {
    inventoryItemList,
    isLoading,
    limit,
    totalCount,
    currentPage,
    setCurrentPage
  } = useInventoryOwner()

  const router = useRouter()

  if (inventoryItemList && inventoryItemList.length > 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {inventoryItemList.map((_data) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.cardType}
              id={_data.tokenId}
              itemImage={
                // eslint-disable-next-line no-nested-ternary
                _data.cardType === "game-item"
                  ? {
                      src: String(_data.img),
                      alt: _data.name,
                      width: _data.name.includes("Bullet") ? 40 : 100
                    }
                  : _data.cardType !== "land"
                  ? {
                      src: String(_data.img),
                      alt: _data.name,
                      width: 200,
                      height: 200
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
              itemName={_data.name}
              itemLevel={_data.level}
              itemSize={_data.size as string}
              itemAmount={_data.amount as number}
              href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
            />
          ))}
        </div>
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    )
  }
  return (
    <>
      {inventoryItemList && inventoryItemList.length === 0 && !isLoading ? (
        <div>No Data</div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(limit)].map(() => (
            <SkeletonItem key={uuidv4()} />
          ))}
        </div>
      )}
    </>
  )
}

export default MarketplaceOwnerList
