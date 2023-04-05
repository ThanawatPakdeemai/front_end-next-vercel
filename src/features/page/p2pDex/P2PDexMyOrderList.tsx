import PageHeader from "@feature/table/components/molecules/PageHeader"
import React from "react"
import { useRouter } from "next/router"
import P2PDexListMyOrderContent from "@feature/p2pDex/components/templates/P2PDexListMyOrderContent"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { useTranslation } from "react-i18next"

const P2PDexMyOrderList = () => {
  const router = useRouter()

  const { t } = useTranslation()

  /**
   * @description Handle click button
   */
  const onClickButton = () => {
    router.push("/p2p-dex")
  }

  return (
    <div className="p2p-dex-page">
      <PageHeader
        title={t("connect_p2p")}
        button={
          <div className="">
            <ButtonToggleIcon
              startIcon=""
              endIcon={<ArrowBackIcon />}
              text="Back"
              handleClick={onClickButton}
              className="flex h-[40px] !w-[100px] items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
              type="button"
            />
          </div>
        }
      />
      <P2PDexListMyOrderContent />
    </div>
  )
}

export default P2PDexMyOrderList
