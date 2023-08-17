import React from "react"
import dynamic from "next/dynamic"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProps {
  children: React.ReactNode
  className?: string
  totalCount: number
  limit: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const CardListContainer = ({
  children,
  totalCount,
  className,
  limit,
  currentPage,
  setCurrentPage
}: IProps) => (
  <div className="flex w-fit flex-col gap-y-7">
    <div
      className={`grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
    <PaginationNaka
      totalCount={totalCount}
      limit={limit}
      page={currentPage}
      setPage={setCurrentPage}
    />
  </div>
)

export default CardListContainer
