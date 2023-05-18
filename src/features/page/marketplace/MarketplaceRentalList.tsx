import { PaginationNaka } from "@components/atoms/pagination"
import CardItemMarketPlace from "@components/molecules/cards/CardItemMarketPlace"
// import { useGetMyRentalBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyRentalLand } from "@feature/land/containers/hooks/useGetMyLand"
import SkeletonItem from "@feature/marketplace/components/molecules/SkeletonItem"
import { TType } from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface IDataList {
  id: string
  cardType: TType
  name: string
  img: string
  vdo?: string
  model?: string
  amount?: number
  size?: string
  level?: string | number
  percentage?: number
  price?: number
  href?: string
  keyType?: string // "owner"
  rental?: {
    totalPeriod: number
    totalBalancePeriod: number
    totalPrice: number
    exp: Date
    owner?: string
    buyer?: string
  }
}

const MarketplaceRentalList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const [totalCount, setTotalCount] = useState<number>(0)
  const limit = 15
  const [rentalList, setRentalList] = useState<Array<IDataList>>([])

  const router: NextRouter = useRouter()

  const { convertNFTTypeToUrl, convertNFTTypeToTType } = Helper

  const { marketType } = useGlobal()
  const { mutateGetMyRentalLand } = useGetMyRentalLand()
  // const { mutateGetMyRentalBuilding } = useGetMyRentalBuilding()

  const fetchNFTRentalList = async () => {
    const _cardType = convertNFTTypeToTType(marketType || "nft_land") || "land"
    setIsLoading(true)
    switch (marketType) {
      case "nft_land":
        mutateGetMyRentalLand({
          _urlNFT: convertNFTTypeToUrl(marketType),
          _limit: limit,
          _page: currentPage,
          _search: {}
        })
          .then((_res) => {
            if (_res.data && _res.data.length > 0) {
              const _data: IDataList[] = _res.data.map((r) => ({
                id: r._id,
                cardType: _cardType,
                name: r.name,
                img: r.NFT_image,
                // vdo: r.NFT_video,
                keyType: r.key_type,
                rental:
                  r.rentals_data && r.rentals_data[0]
                    ? {
                        totalPeriod: r.rentals_data[0].period_total,
                        totalBalancePeriod: r.rentals_data[0].period_balance,
                        totalPrice: r.rentals_data[0].total_price,
                        exp: r.rentals_data[0].rent_end,
                        owner: r.rentals_data[0].seller_address,
                        buyer: r.rentals_data[0].buyer_address
                      }
                    : undefined
              }))
              setRentalList(_data)
            }
          })
          .finally(() => setTimeout(() => setIsLoading(false), 1000))
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchNFTRentalList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  if (rentalList && rentalList.length > 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-y-7">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {rentalList.map((_data) => (
            <CardItemMarketPlace
              key={uuidv4()}
              cardType={_data.cardType}
              id={_data.id}
              itemImage={undefined}
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
              itemSize={_data.size}
              itemAmount={_data.amount}
              href={`/${router.locale}/marketplace/inventory/${_data.cardType}/${_data.id}`}
            />
          ))}
        </div>
        <PaginationNaka
          totalCount={0}
          limit={limit}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    )
  }
  return (
    <>
      {rentalList.length === 0 && !isLoading ? (
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

export default MarketplaceRentalList
