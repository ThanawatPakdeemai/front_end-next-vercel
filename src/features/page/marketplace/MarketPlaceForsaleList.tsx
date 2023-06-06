import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { TSellingType } from "@feature/marketplace/interfaces/IMarketService"
import useInventoryForSale from "@feature/inventory/containers/hooks/useInventoryForSale"
import NoData from "@components/molecules/NoData"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import SkeletonItemMobile from "./mobilescreen/SkeletonItemMobile"

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
      <div className="flex w-fit flex-col gap-y-7  self-center">
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
              itemName={_data.name}
              itemLevel={_data.level}
              itemSize={_data.size as string}
              itemAmount={_data.amount as number}
              href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
              sellingType={{
                title: _data.selling,
                color: handleColorSellingType(_data.selling as TSellingType)
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
    <div className="flex justify-center">
      {(inventoryItemForsale &&
        inventoryItemForsale.length <= 0 &&
        ((marketType !== "game_item" &&
          marketType !== "nft_material" &&
          !isLoading) ||
          ((marketType === "game_item" || marketType === "nft_material") &&
            !isItemLoading))) ||
      !profile.isLogin ? (
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

export default MarketPlaceForsaleList
