import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import useMarketForSale from "@feature/marketplace/containers/hooks/useMarketForSale"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { TSellingType } from "@feature/marketplace/interfaces/IMarketService"

const MarketPlaceForsaleList = () => {
  const {
    totalCount,
    isLoading,
    limit,
    currentPage,
    setCurrentPage,
    ownerDataForsale
  } = useMarketForSale()

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

  if (ownerDataForsale && ownerDataForsale.length > 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ownerDataForsale.map((_data) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.type}
              id={_data.tokenId}
              itemImage={
                _data.type === "game-item"
                  ? {
                      src: String(_data.image),
                      alt: _data.name,
                      width: _data.name.includes("Bullet") ? 40 : 100
                    }
                  : undefined
              }
              itemVideo={
                _data.type !== "game-item"
                  ? {
                      src: _data.video as string,
                      poster: String(_data.image)
                    }
                  : undefined
              }
              itemName={_data.name}
              itemLevel={_data.level}
              itemSize={_data.size as string}
              itemAmount={_data.amount as number}
              href={`/${router.locale}/marketplace/${_data.type}/${_data.id}`}
              sellingType={{
                title: _data.selling_type,
                color: handleColorSellingType(
                  _data.selling_type as TSellingType
                )
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
      {ownerDataForsale.length === 0 && !isLoading ? (
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

export default MarketPlaceForsaleList
