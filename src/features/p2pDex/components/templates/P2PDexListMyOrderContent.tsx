import React, { useState } from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import HeaderP2P from "@feature/p2pDex/components/atoms/HeaderP2P"
import DropdownLimit from "@components/atoms/DropdownLimit"
import { useWeb3Provider } from "@providers/Web3Provider"
import useP2PDexMyOrder from "@feature/p2pDex/containers/hooks/useP2PDexMyOrder"
import MyOrderList from "@feature/p2pDex/components/organisms/MyOrderList"

const P2PDexListMyOrder = () => {
  const [type, setType] = useState<"sell" | "buy">("buy")
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const { address } = useWeb3Provider()

  const dataP2p = useP2PDexMyOrder({
    _address: address ?? "",
    _limit: limit,
    _page: page
  })

  const { data: P2PDexMyOrder } = dataP2p

  return (
    <>
      <HeaderP2P
        type={type}
        setType={(value) => {
          setType(value)
          setPage(1)
        }}
        dataButton={[
          { title: "Buy", type: "buy" },
          { title: "Sell", type: "sell" }
        ]}
      />

      <div className="p2p-dex-content--pageList">
        <MyOrderList
          {...dataP2p}
          type={type}
        />
        <div className="my-5 flex w-full justify-between">
          <PaginationNaka
            totalCount={P2PDexMyOrder ? P2PDexMyOrder.info.totalCount : 12}
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
export default P2PDexListMyOrder
