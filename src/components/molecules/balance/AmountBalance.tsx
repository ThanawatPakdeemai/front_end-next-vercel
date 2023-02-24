import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { TokenSupport } from "@feature/wallet/containers/hooks/useWalletContoller"
import { IBalanceDisplay } from "@hooks/useAllBalances"
import ButtonIcon from "../../atoms/button/ButtonIcon"

const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}
interface IDataBalance {
  icon: ReactNode
  balance: string | number | ReactNode | IBalanceDisplay
  link?: TokenSupport
}
const AmountBalance = ({ icon, balance, link }: IDataBalance) => {
  const router = useRouter()
  return (
    <>
      <div className="mb-[5px] flex items-center  justify-between">
        <div className="flex h-[40px] flex-1 items-center rounded-lg bg-neutral-900 px-3">
          {icon}
          <p className="ml-6 text-sm font-bold text-white-primary">
            {(balance as IBalanceDisplay).text || "N/A"}
          </p>
        </div>
        <ButtonIcon
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={
            <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
          }
          className="ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900"
          onClick={() => {
            router.push(link ? `/wallet?token=${link}` : "/wallet?token=NAKA")
          }}
        />
      </div>
    </>
  )
}
export default AmountBalance
