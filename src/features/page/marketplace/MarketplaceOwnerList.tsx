import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { v4 as uuidv4 } from "uuid"
import React from "react"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { useRouter } from "next/router"
import useInventoryOwner from "@feature/inventory/containers/hooks/useInventoryOwner"
import NoData from "@components/molecules/NoData"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import SkeletonItemMobile from "./mobilescreen/SkeletonItemMobile"

const MarketplaceOwnerList = () => {
  const profile = useProfileStore()
  const {
    inventoryItemList,
    isLoading,
    isItemLoading,
    limit,
    totalCount,
    currentPage,
    setCurrentPage
  } = useInventoryOwner()
  const { marketType } = useGlobal()

  const router = useRouter()

  if (
    inventoryItemList &&
    inventoryItemList.length > 0 &&
    ((marketType !== "game_item" &&
      marketType !== "nft_material" &&
      !isLoading) ||
      ((marketType === "game_item" || marketType === "nft_material") &&
        !isItemLoading))
  ) {
    return (
      <div className="flex w-fit flex-col gap-y-7 self-center">
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
    <div className="flex justify-center">
      {(inventoryItemList &&
        inventoryItemList.length <= 0 &&
        !isLoading &&
        !isItemLoading) ||
      !profile.isLogin ? (
        <NoData />
      ) : (
        <div className="grid  w-fit grid-cols-2 gap-4 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(limit)].map(() => (
            <>
              <div className="hidden sm:block">
                <SkeletonItem key={uuidv4()} />
              </div>
              <div className="block sm:hidden">
                <SkeletonItemMobile key={uuidv4()} />
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default MarketplaceOwnerList
