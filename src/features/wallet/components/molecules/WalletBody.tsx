import IStickerSolid from "@components/icons/StickerSolid"
import { IBalanceDisplay } from "@hooks/useAllBalances"
import { styled } from "@mui/material"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import WalletAddress from "../atoms/WalletAddress"

export const KeyFramesRotate = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(359deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

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
        <p className={`font-digital ml-2 text-2xl uppercase ${className}`}>
          {`${balance && balance.digit} ${tokenSymbol}`}
        </p>
      </div>
      <div className="h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
      <div className="flex items-center">
        <span className="text-xl uppercase text-neutral-600">
          {tokenSymbol}
        </span>
        <WalletAddress contractAddress={contractAddress || ""} />
      </div>
      <div className="absolute right-2 top-2">
        <KeyFramesRotate>
          <IStickerSolid
            width="70"
            height="70"
          />
        </KeyFramesRotate>
      </div>
    </div>
  )
}

export default WalletBody
