import React from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import useMarketInfo from "@feature/marketplace/containers/hooks/useMarketInfo"
import { useRouter } from "next/router"
import SkeletonItemMobile from "./mobilescreen/SkeletonItemMobile"

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
        <div className="flex w-fit flex-col gap-y-7">
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {orderData &&
              orderData.data.length !== 0 &&
              !isLoading &&
              orderData.data.map((_data, _index) => (
                <CardItemMarketPlace
                  key={uuidv4()}
                  cardType={type}
                  id={_data.land_data?.land_id}
                  itemAmount={
                    _data.building_data ? _data.item_amount : undefined
                  }
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
                    (_data.price /
                      (price ? parseFloat(price.last) : 0)) as number
                  }
                  href={`/${router.locale}/marketplace/${type}/${_data._id}`}
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
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      {orderData?.data.length === 0 && !isLoading ? (
        <div>No data</div>
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

export default MarketplaceCardList
