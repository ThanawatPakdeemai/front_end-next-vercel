import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const IBattery = dynamic(() => import("@components/atoms/svg/Battery"), {
  suspense: true,
  ssr: true
})
const ISignalTube = dynamic(() => import("@components/atoms/svg/SignalTube"), {
  suspense: true,
  ssr: true
})

interface IWalletHeaderProps {
  tokenName: string
  percent?: number
}

/**
 * @description Display percentage of wallet balance
 */
const WalletHeader = ({ tokenName = "NAKA", percent }: IWalletHeaderProps) => {
  const { t } = useTranslation()
  return (
    <div className="mb-2 flex w-full flex-col items-center justify-between gap-1 whitespace-nowrap rounded-default bg-black-100 py-4 text-xs uppercase lg:flex-row">
      <div className="ml-2 flex flex-row items-center text-red-card">
        <IBattery
          width={25}
          className={percent?.toString()}
          height={25}
        />
        <p className="mx-2 uppercase">
          {`${tokenName} ${t("hardware_wallet")}`}
        </p>
      </div>
      <div className="flex h-[10px] w-[140px] flex-row items-center text-neutral-700">
        <p className="my-0 mr-2">{t("signal")}</p>
        <ISignalTube
          width={70}
          height={10}
        />
      </div>
    </div>
  )
}

export default WalletHeader
