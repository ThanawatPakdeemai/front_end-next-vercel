import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
import { v4 as uuidv4 } from "uuid"
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import useInventoryOwner from "@feature/inventory/containers/hooks/useInventoryOwner"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import SkeletonMarketOwnerList from "./SkeletonMarketOwnerList"
import CardListContainer from "./CardListContainer"

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
      <CardListContainer
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {inventoryItemList.map((_data) => {
          // const stringToSplit = _data.name
          // const [label, value] = stringToSplit.split(" ")

          const text = _data.name
          const splitText = text.split(/\s(?=\d)/)
          const firstSpan = splitText[0]

          // eslint-disable-next-line no-console
          console.log("label", firstSpan)

          return (
            // console.log(
            //   "test",
            //   inventoryItemList.find((e) => e.name)
            // ),

            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.cardType}
              id={_data.tokenId}
              // firstData={_data.find(
              //   (e) => e.item_data?.name === "Bullet" && e.item_data.image
              // )}
              firstData={inventoryItemList.find(
                (e) => firstSpan === "Bullet" && e.img
              )}
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
          )
        })}
      </CardListContainer>
    )
  }
  return (
    <SkeletonMarketOwnerList
      invenList={inventoryItemList}
      isLoading={isLoading}
      isItemLoading={isItemLoading}
      profile={profile}
      marketType={marketType}
      limit={limit}
    />
  )
}

export default MarketplaceOwnerList
