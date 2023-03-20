import React, { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import { PaginationNaka } from "@components/atoms/pagination"
import useLoadingStore from "@stores/loading"
import useMarketplace from "@hooks/useMarketplace"

const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true
  }
)

const MarketplaceCardList = () => {
  const { setOpen, setClose } = useLoadingStore()
  const { price } = useNakaPriceProvider()
  const {
    orderData,
    isLoading,
    currentPage,
    totalCount,
    type,
    limit,
    setCurrentPage
  } = useMarketplace()

  // mockup for skeleton
  useEffect(() => {
    if (isLoading) {
      setOpen()
    } else {
      setClose()
    }
  }, [isLoading, setClose, setOpen])

  return (
    <div className="flex flex-col gap-y-7">
      <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {orderData &&
          orderData.data.map((_data, _index) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={type}
              id={_data.land_data?.land_id}
              idLink={_data._id}
              itemAmount={_data.building_data ? _data.item_amount : undefined}
              itemTotal={_data.building_data ? _data.item_total : undefined}
              itemImage={
                _data.building_data && {
                  src: _data.building_data.image,
                  alt: _data.building_data.name,
                  width: 250,
                  height: 250
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

export default MarketplaceCardList
