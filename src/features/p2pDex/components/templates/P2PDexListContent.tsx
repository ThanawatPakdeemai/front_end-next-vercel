// import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import React, { useState } from "react"
import useP2PDexController from "@feature/p2pDex/containers/hooks/useP2PDexController"
import { PaginationNaka } from "@components/atoms/pagination"
import DropdownLimit from "@feature/transaction/components/atoms/DropdownLimit"
import HeaderP2P from "@feature/table/components/atoms/HeaderP2P"
import OrderList from "../organisms/OrderList"

const P2PDexList = () => {
  const [type, setType] = useState<"sell" | "buy">("buy")
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)

  const dataP2p = useP2PDexController({
    _type: type === "sell" ? "buy" : "sell",
    _limit: limit,
    _page: page
  })

  const { data: P2PDexOrderList } = dataP2p

  return (
    <>
      <HeaderP2P
        type={type}
        setType={(value) => setType(value)}
      />

      <div className="p2p-dex-content--pageList">
        <OrderList
          {...dataP2p}
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
