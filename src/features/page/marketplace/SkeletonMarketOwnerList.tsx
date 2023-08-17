import React from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"

const SkeletonItem = dynamic(
  () => import("@feature/marketplace/components/molecules/SkeletonItem")
)
const SkeletonItemMobile = dynamic(
  () => import("./mobilescreen/SkeletonItemMobile")
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})

interface IProps {
  invenList: IInventoryItemList[]
  marketType?: TNFTType
  isLoading: boolean
  isItemLoading: boolean
  profile: any
  limit: number
}

const SkeletonMarketOwnerList = ({
  invenList,
  marketType,
  isLoading,
  isItemLoading,
  profile,
  limit
}: IProps) => (
  <>
    {(invenList &&
      invenList.length <= 0 &&
      ((marketType !== "game_item" &&
        marketType !== "nft_material" &&
        !isLoading) ||
        ((marketType === "game_item" || marketType === "nft_material") &&
          !isItemLoading))) ||
    !profile.isLogin ? (
      <div className="flex w-full justify-center">
        <NoData />
      </div>
    ) : (
      <div className="flex w-fit justify-center">
        <div className="grid w-fit grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </div>
    )}
  </>
)

export default SkeletonMarketOwnerList
