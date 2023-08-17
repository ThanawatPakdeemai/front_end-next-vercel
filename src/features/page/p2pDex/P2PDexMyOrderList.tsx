import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const P2PDexListMyOrderContent = dynamic(
  () => import("@feature/p2pDex/components/templates/P2PDexListMyOrderContent"),
  {
    suspense: true,
    ssr: true
  }
)
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: true
  }
)
const PageHeader = dynamic(
  () => import("@feature/table/components/molecules/PageHeader"),
  {
    suspense: true,
    ssr: true
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: true
})

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
              endIcon={<Icomoon className="icon-Full-Arrow-Left" />}
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
