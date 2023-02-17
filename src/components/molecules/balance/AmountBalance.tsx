import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { Card, SxProps, Theme } from "@mui/material"
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
  balance: string | number
}
interface IProps {
  dataBalance: IDataBalance[]
  sx?: SxProps<Theme> | undefined
}
const AmountBalance = ({ dataBalance, sx }: IProps) => {
  const router = useRouter()
  return (
    <>
      <Card
        className=" m-auto flex-row gap-y-3  rounded-[13px] bg-neutral-800  px-[5px] py-[5px] "
        sx={sx}
      >
        {dataBalance &&
          dataBalance.map((balance, index) => (
            <div
              key={Number(index)}
              className="mb-[5px] flex items-center  justify-between last:mb-0"
            >
              <div className="flex h-[40px] flex-1 items-center rounded-lg bg-neutral-900 px-3">
                {balance.icon}
                <p className="ml-6 text-sm font-bold text-white-primary">
                  {balance.balance}
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
                  router.push("/wallet")
                }}
              />
            </div>
          ))}
      </Card>
    </>
  )
}
export default AmountBalance
