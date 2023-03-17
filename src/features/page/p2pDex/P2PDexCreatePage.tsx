import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import React from "react"
import { useRouter } from "next/router"
import P2PDexCreateContent from "@feature/p2pDex/components/templates/P2PDexCreateContent"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"

const P2PDexCreatePage = () => {
  const router = useRouter()

  /**
   * @description Handle click button
   */
  const onClickButton = () => {
    router.push("/p2p-dex")
  }
  return (
    <div className="p2p-dex-page">
      <PageHeader
        title="Create Order Streamline your P2P payments, create orders with ease."
        button={
          <ButtonToggleIcon
            startIcon=""
            endIcon={<ArrowBackIcon />}
            text="Back"
            handleClick={onClickButton}
            className="flex h-[40px] !w-[100px] items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
            type="button"
          />
        }
      />
      <P2PDexCreateContent />
    </div>
  )
}

export default P2PDexCreatePage
