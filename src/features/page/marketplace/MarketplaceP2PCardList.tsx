import React from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import useMarketInfo from "@feature/marketplace/containers/hooks/useMarketInfo"
import { useRouter } from "next/router"
import { TSellingType } from "@feature/marketplace/interfaces/IMarketService"

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

  const handleColorSellingType = (selling_type: TSellingType) => {
    if (selling_type === "fullpayment") {
      return "info"
    }
    if (selling_type === "rental") {
      return "error"
    }
    return "warning"
  }

  if (orderData && orderData.data.length > 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {orderData &&
            orderData.data.length !== 0 &&
            !isLoading &&
            orderData.data.map((_data, _index) => (
              <CardItemMarketPlace
                key={uuidv4()}
                cardType={type}
                id={_data.land_data?.land_id}
                itemAmount={
                  type === "game-item" ? _data.item_amount : undefined
                }
                itemTotal={_data.item_total}
                itemImage={handleImage(_data)}
                itemVideo={
                  _data.land_data && {
                    src: _data.land_data.NFT_video,
                    poster: _data.land_data.NFT_image
                  }
                }
                itemName={
                  _data.land_data?.name ||
                  _data.building_data?.name ||
                  _data.item_data?.name ||
                  _data.material_data?.name ||
                  _data.nakapunk_data?.name
                }
                itemLevel={_data.building_data?.level}
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
        </div>
        {isLoading &&
          [...Array(limit)].map(() => <SkeletonItem key={uuidv4()} />)}
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
      {orderData?.data.length === 0 && !isLoading ? (
        <div>No data</div>
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

export default MarketplaceP2PCardList
