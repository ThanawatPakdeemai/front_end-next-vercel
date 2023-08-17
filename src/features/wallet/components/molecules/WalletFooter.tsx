import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const IcomoonWallet = dynamic(
  () => import("@components/atoms/icomoon/IcomoonWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IWalletFooterProps {
  address?: string
}
const WalletFooter = ({ address }: IWalletFooterProps) => {
  const borderBox =
    "flex h-[25px] w-[25px] items-center justify-center rounded-[5px] bg-neutral-800 px-0.5 py-2 border-1"
  const { t } = useTranslation()
  return (
    <div className="mt-6 hidden w-full grid-cols-12 gap-2 sm:grid">
      <div className="col-span-7 rounded-xl border-2 border-black-800 text-center ">
        <p className="pt-1 uppercase text-neutral-600">
          {t("NAKA_storage_model_S")}
        </p>
      </div>
      <div className="col-span-5 flex  h-[35px] content-center items-center justify-between rounded-[6px] bg-black-100 px-0.5 py-2 ">
        <div className={`mr-1 ${borderBox}`}>
          <Icomoon className="icon-Naka text-error-main" />
        </div>
        <div className="">
          {address ? (
            <div
              className="wavy-line wavy-line-green"
              data-text="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''"
            />
          ) : (
            <div
              className="wavy-line-DS wavy-line-DS"
              data-text="''''''''''''''''''''''''''''''''''''''''''''"
            />
          )}
        </div>
        <div className={`mr-l ${borderBox}`}>
          {address ? (
            <IcomoonWallet className="icon-Metamask" />
          ) : (
            <Image
              src={IMAGES.MetaMaskds.src}
              alt=""
              width={35}
              height={35}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletFooter
