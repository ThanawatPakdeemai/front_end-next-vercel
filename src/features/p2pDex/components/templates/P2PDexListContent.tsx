import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useP2PDexController from "@feature/p2pDex/containers/hooks/useP2PDexController"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const HeaderP2P = dynamic(
  () => import("@feature/p2pDex/components/atoms/HeaderP2P"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
  suspense: true,
  ssr: false
})
const OrderList = dynamic(() => import("../organisms/OrderList"), {
  suspense: true,
  ssr: false
})

const P2PDexList = () => {
  const [type, setType] = useState<"sell" | "buy">("buy")
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [sortName, setSortName] = useState<string>("naka_amount")
  const [sort, setSort] = useState<number>(1)
  const dataSort = {
    sort,
    setSort,
    sortName,
    setSortName
  }
  const dataP2p = useP2PDexController({
    _type: type === "buy" ? "sell" : "buy",
    _limit: limit,
    _page: page,
    _sort: sortName,
    _sort_value: sort
  })
  const { t } = useTranslation()

  const { data: P2PDexOrderList } = dataP2p

  return (
    <>
      <HeaderP2P
        type={type}
        setType={(value) => {
          setType(value)
          setPage(1)
        }}
        dataButton={[
          { title: t("buy"), type: "buy" },
          { title: t("sell"), type: "sell" }
        ]}
      />

      <div className="p2p-dex-content--pageList">
        <OrderList
          {...dataP2p}
          {...dataSort}
          type={type}
        />
        <div className="my-5 flex w-full justify-between">
          <PaginationNaka
            totalCount={P2PDexOrderList ? P2PDexOrderList.info.totalCount : 12}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <DropdownLimit
            defaultValue={limit ?? 12}
            list={[6, 12, 24, 48, 64]}
            onChangeSelect={setLimit}
          />
        </div>
      </div>
    </>
  )
}
export default P2PDexList
