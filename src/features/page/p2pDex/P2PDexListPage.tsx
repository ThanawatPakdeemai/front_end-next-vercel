import AddIcon from "@mui/icons-material/Add"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import React from "react"
import { useRouter } from "next/router"
import P2PDexListContent from "@feature/p2pDex/components/templates/P2PDexListContent"
import ReorderIcon from "@mui/icons-material/Reorder"

const P2PDexListPage = () => {
  const router = useRouter()

  /**
   * @description Handle click button
   */
  const onClickButton = () => {
    router.push("/p2p-dex/create")
  }

  return (
    <div className="p2p-dex-page">
      <PageHeader
        title="CONNECT AND TRADE IN OUR P2P MARKETPLACE. NO INTERMEDIARY FEES."
        button={
          <div className="">
            <ButtonToggleIcon
              startIcon={<AddIcon />}
              text="Create Order"
              handleClick={onClickButton}
              className="mb-2 flex h-[40px] w-36 items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
              type="button"
            />
            <ButtonToggleIcon
              startIcon={<ReorderIcon />}
              text="My Order"
              handleClick={() => router.push("/p2p-dex/my-order")}
              className="flex h-[40px] w-36 items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
              type="button"
            />
          </div>
        }
      />
      <P2PDexListContent />
    </div>
  )
}

export default P2PDexListPage
