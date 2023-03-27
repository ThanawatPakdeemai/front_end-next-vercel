import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import useMartketOwner from "@feature/marketplace/containers/hooks/useMarketOwner"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { useRouter } from "next/router"

const MarketplaceOwnerList = () => {
  const {
    totalCount,
    isLoading,
    limit,
    currentPage,
    setCurrentPage,
    ownerData
  } = useMartketOwner()

  const router = useRouter()

  if (ownerData && ownerData.length > 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ownerData.map((_data) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.type}
              id={_data.tokenId}
              itemImage={
                _data.type === "game-item"
                  ? {
                      src: _data.image,
                      alt: _data.name,
                      width: _data.name.includes("Bullet") ? 40 : 100
                    }
                  : undefined
              }
              itemVideo={
                _data.type !== "game-item"
                  ? {
                      src: _data.video as string,
                      poster: _data.image
                    }
                  : undefined
              }
              itemName={_data.name}
              itemLevel={_data.level}
              itemSize={_data.size as string}
              itemAmount={_data.amount as number}
              href={`/${router.locale}/marketplace/inventory/${_data.type}/${_data.id}`}
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
      {ownerData.length === 0 && !isLoading ? (
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
