import React from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import useMarketInfo from "@feature/marketplace/containers/hooks/useMarketInfo"

const SkeletonItem = dynamic(
  () => import("@feature/marketplace/components/molecules/SkeletonItem"),
  {
    suspense: true,
    ssr: true
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const SkeletonItemMobile = dynamic(
  () => import("./mobilescreen/SkeletonItemMobile")
)
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

const MarketplaceCardList = () => {
  const { price } = useNakaPriceProvider()
  const {
    orderData,
    isLoading,
    currentPage,
    totalCount,
    type,
    limit,
    setCurrentPage
  } = useMarketInfo()
  const router = useRouter()

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
                id={_data.land_data?.land_id}
                itemAmount={_data.building_data ? _data.item_amount : undefined}
                itemTotal={_data.building_data ? _data.item_total : undefined}
                itemImage={
                  _data.building_data && {
                    src: _data.building_data.NFT_image,
                    alt: _data.building_data.name,
                    width: 300,
                    height: 300
                  }
                }
                itemVideo={
                  _data.land_data && {
                    src: _data.land_data.NFT_video,
                    poster: _data.land_data.NFT_image
                  }
                }
                itemName={_data.land_data?.name || _data.building_data?.name}
                itemLevel={_data.building_data?.level}
                price={
                  (_data.price / (price ? parseFloat(price.last) : 0)) as number
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

export default MarketplaceCardList
