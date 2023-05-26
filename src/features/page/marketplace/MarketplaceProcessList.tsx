import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import useInventoryPayment from "@feature/inventory/containers/hooks/useInventoryPayment"

const MarketplaceProcessList = () => {
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
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      {inventoryItemPayment.length === 0 && !isLoading ? (
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

export default MarketplaceProcessList
