import React, { useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import useMarketInfo from "@feature/marketplace/containers/hooks/useMarketInfo"
import { TSellingType } from "@feature/marketplace/interfaces/IMarketService"
import { IGameItemData } from "@feature/gameItem/interfaces/IGameItemService"

const SkeletonItem = dynamic(
  () => import("@feature/marketplace/components/molecules/SkeletonItem"),
  {
    suspense: true,
    ssr: true
  }
)
const SkeletonItemMobile = dynamic(
  () => import("@feature/page/marketplace/mobilescreen/SkeletonItemMobile"),
  {
    suspense: true,
    ssr: true
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const CardListContainer = dynamic(() => import("./CardListContainer"), {
  suspense: true,
  ssr: true
})
const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceP2PCardList = () => {
  const {
    orderData,
    isLoading,
    currentPage,
    totalCount,
    type,
    limit,
    handleImage,
    setCurrentPage
  } = useMarketInfo()
  const { price } = useNakaPriceProvider()
  const router = useRouter()

  const handleColorSellingType = useCallback((selling_type: TSellingType) => {
    if (selling_type === "fullpayment") {
      return "info"
    }
    if (selling_type === "rental") {
      return "error"
    }
    return "warning"
  }, [])

  if (orderData && orderData.data.length > 0 && !isLoading) {
    return (
      <div className="grid justify-items-center">
        <CardListContainer
          totalCount={totalCount}
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="xl:grid-cols-5"
        >
          {orderData &&
            orderData.data.length !== 0 &&
            !isLoading &&
            orderData.data.map((_data, _index) => (
              <CardItemMarketPlace
                key={uuidv4()}
                cardType={type}
                id={
                  _data.land_data?.land_id ||
                  _data.game_data?.NFT_info.NFT_token ||
                  _data.building_data?.NFT_token
                }
                itemAmount={
                  type === "game-item" || type === "material"
                    ? _data.item_amount
                    : undefined
                }
                itemTotal={_data.item_total}
                itemImage={handleImage(_data)}
                itemVideo={
                  _data.land_data && {
                    src: _data.land_data.NFT_video,
                    poster: _data.land_data.NFT_image
                  }
                }
                firstData={
                  orderData.data.find(
                    (e) => e.item_data?.name === "Bullet" && e.item_data.image
                  ) as IGameItemData | undefined
                }
                // firstData={orderData.data.find(
                //   (e) => e.item_data?.name === "Bullet" && e.item_data.image
                // )}
                // firstData={orderData.data[0]}
                itemName={
                  _data.land_data?.name ||
                  _data.building_data?.name ||
                  _data.item_data?.name ||
                  _data.material_data?.name ||
                  _data.nakapunk_data?.name ||
                  _data.game_data?.name
                }
                itemLevel={_data.building_data?.level}
                percentage={
                  _data.building_data?.deteriorate_building
                    ? 100 -
                      Number(
                        _data.building_data?.deteriorate_building
                          ?.rate_deteriorate.percentage
                      )
                    : undefined
                }
                price={_data.price}
                itemSize={_data.item_data?.item_size}
                sellingType={{
                  title: _data.selling_type as string,
                  color: handleColorSellingType(
                    _data.selling_type as TSellingType
                  )
                }}
                nakaPrice={
                  (_data.price * (price ? parseFloat(price.last) : 0)) as number
                }
                href={`/${router.locale}/marketplace/${type}/${_data._id}`}
              />
            ))}
        </CardListContainer>
      </div>
    )
  }
  return orderData?.data.length === 0 && !isLoading ? (
    <div className="flex w-full justify-center">
      <NoData />
    </div>
  ) : (
    <div className="flex w-full justify-center">
      <div className="grid w-fit grid-cols-2 gap-4 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
  )
}

export default MarketplaceP2PCardList
