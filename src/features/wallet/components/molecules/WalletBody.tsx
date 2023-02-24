import IStickerSolid from "@components/icons/StickerSolid"
import IVector from "@components/icons/Vector"
import { IBalanceDisplay } from "@hooks/useAllBalances"
import { styled } from "@mui/material"
import { ReactNode } from "react"

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
}

const WalletBody = ({
  tokenSymbol = "NAKA",
  balance,
  className
}: IWalletBodyProps) => (
  <div className="relative mb-2 flex w-full flex-col gap-1 rounded-default bg-black-100 p-8">
    <p className="text-sm uppercase text-neutral-600">
      Your {tokenSymbol} in storage{" "}
    </p>
    <div className="mb-4 flex w-[250px] items-center uppercase">
      {tokenSymbol}
      <p className={`font-digital ml-2 text-2xl uppercase ${className}`}>
        {`${balance && balance.text} ${tokenSymbol}`}
      </p>
    </div>
    <IVector
      width="325"
      height="6"
      className="mb-2"
    />
    <span className="text-xl uppercase text-neutral-600">{tokenSymbol}</span>
    <div className="absolute top-2 right-2">
      <KeyFramesRotate>
        <IStickerSolid
          width="70"
          height="70"
        />
      </KeyFramesRotate>
    </div>
  </div>
)

export default WalletBody
