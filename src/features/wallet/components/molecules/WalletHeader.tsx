import IBattery from "@components/icons/Battery"
import ISignalTube from "@components/icons/SignalTube"

interface IWalletHeaderProps {
  tokenName: string
  percent?: number
}

/**
 * @description Display percentage of wallet balance
 */
const WalletHeader = ({ tokenName = "NAKA", percent }: IWalletHeaderProps) => (
  <div className="mb-2 flex w-full flex-row items-center justify-between gap-1 whitespace-nowrap rounded-default bg-black-100 py-4">
    <div className="ml-2 flex flex-row items-center text-red-card">
      <IBattery
        width={25}
        className={percent?.toString()}
        height={25}
      />
      <p className="mx-2 text-sm uppercase">{`${tokenName} hardware wallet`}</p>
    </div>
    <div className="flex h-[10px] w-[140px] flex-row items-center text-neutral-700">
      <p>signal</p>
      <ISignalTube
        width={70}
        height={10}
      />
    </div>
  </div>
)

export default WalletHeader
