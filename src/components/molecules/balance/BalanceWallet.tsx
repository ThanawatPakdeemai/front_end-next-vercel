import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IBalanceWalletProps {
  balance: string
  tokenName: string | undefined
}

const BalanceWallet = ({ balance, tokenName }: IBalanceWalletProps) => (
  <div className="box-metamask-shadow m-[2px] min-h-[50px] rounded-[13px] bg-neutral-700 p-[5px]">
    <div className="flex h-full items-center rounded-lg bg-neutral-900 p-1">
      <div className="flex h-full items-center rounded bg-neutral-800 p-1">
        <Icomoon className="icon-Naka text-[#4E5057]" />
      </div>
      <div className="ml-3 flex w-full flex-wrap items-center justify-between">
        <span className="whitespace-pre-wrap text-xs uppercase text-neutral-600">
          {tokenName} in{"\n"}metamask
        </span>
        <span className="whitespace-nowrap font-digital-7 text-[26px] leading-3 text-neutral-600">
          {balance} {tokenName}
        </span>
      </div>
    </div>
  </div>
)

export default BalanceWallet
