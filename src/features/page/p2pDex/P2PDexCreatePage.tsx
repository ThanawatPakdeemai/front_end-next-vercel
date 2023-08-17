import React from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const PageHeader = dynamic(
  () => import("@feature/table/components/molecules/PageHeader")
)
const P2PDexCreateContent = dynamic(
  () => import("@feature/p2pDex/components/templates/P2PDexCreateContent")
)
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon")
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: true
})

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
            endIcon={<Icomoon className="icon-Full-Arrow-Left" />}
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
