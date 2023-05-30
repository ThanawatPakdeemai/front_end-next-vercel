import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import useInventoryRental from "@feature/inventory/containers/hooks/useInventoryRental"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"

const MarketplaceRentalList = () => {
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
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {inventoryItemRental.map((_data) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.cardType}
              id={_data.id}
              itemImage={undefined}
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
              itemAmount={_data.amount}
              href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
              keyType={_data.keyType}
              rental={_data.rental}
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
      {inventoryItemRental.length === 0 && !isLoading ? (
        <div className="flex h-20 w-full items-center justify-center font-neue-machina uppercase">
          no data
        </div>
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

export default MarketplaceRentalList
