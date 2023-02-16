import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
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
interface IProps {
  icon: ReactNode
  balance: string | number
}
const AmountBalance = ({ icon, balance }: IProps) => {
  const router = useRouter()
  return (
    <>
      <div className="mb-[5px] flex items-center  justify-between">
        <div className="flex h-[40px] flex-1 items-center rounded-lg bg-neutral-900 px-3">
          {icon}
          <p className="ml-6 text-sm font-bold text-white-primary">{balance}</p>
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
            router.push("/wallet")
          }}
        />
      </div>
    </>
  )
}
export default AmountBalance
