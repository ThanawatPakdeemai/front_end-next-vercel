import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import NoData from "@components/molecules/NoData"
import useInventoryRental from "@feature/inventory/containers/hooks/useInventoryRental"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import SkeletonItemMobile from "./mobilescreen/SkeletonItemMobile"

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
      <div className="flex w-fit flex-col gap-y-7  self-center">
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
    <div className="flex justify-center">
      {inventoryItemRental.length === 0 && !isLoading ? (
        <NoData />
      ) : (
        <div className="grid  w-fit grid-cols-2 gap-4 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(limit)].map(() => (
            <div key={uuidv4()}>
              <div className="hidden sm:block">
                <SkeletonItem />
              </div>
              <div className="block sm:hidden">
                <SkeletonItemMobile />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MarketplaceRentalList
