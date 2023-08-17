import React, { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { IBalanceDisplay } from "@hooks/useAllBalances"

const WalletAddress = dynamic(() => import("../atoms/WalletAddress"), {
  suspense: true,
  ssr: false
})
const IcomoonSticker = dynamic(
  () => import("@components/atoms/icomoon/IcomoonSticker"),
  {
    suspense: true,
    ssr: false
  }
)

interface IWalletBodyProps {
  tokenSymbol: ReactNode | string
  balance: IBalanceDisplay
  className: string
  contractAddress?: string
}

const WalletBody = ({
  tokenSymbol = "NAKA",
  balance,
  className,
  contractAddress
}: IWalletBodyProps) => {
  const { t } = useTranslation()
  return (
    <div className="relative mb-2 flex w-full flex-col gap-1 rounded-default bg-black-100 p-4 sm:p-8">
      <p className="text-sm uppercase text-neutral-600">
        {`${t("your")} ${tokenSymbol} ${t("in_storage")}${" "}`}
      </p>
      <div className="mb-4 flex w-[250px] items-center uppercase">
        {tokenSymbol}
        <p
          className={`font-digital ml-2 whitespace-nowrap text-2xl uppercase ${className}`}
        >
          {`${balance && balance.text}`}
          {/* ${tokenSymbol} */}
        </p>
      </div>
      <div className="h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
      <div className="flex items-center">
        <span className="font-neue-machina-semi text-sm uppercase text-neutral-600">
          {`Contract `}
          {/* {`${tokenSymbol}`} */}
        </span>
        <WalletAddress contractAddress={contractAddress || ""} />
      </div>
      <div className="absolute right-2 top-2">
        <IcomoonSticker className="icon-Circle-sphere-pink" />
        {/* <KeyFramesRotate></KeyFramesRotate> */}
      </div>
    </div>
  )
}

export default WalletBody
