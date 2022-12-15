import { Typography } from "@mui/material"
import { ReactNode } from "react"

interface IProps {
  icon: ReactNode
  text: string
  className?: string
  /* in case use for future */
  // action: () => void
}

const TabMenu = ({ icon, text, className }: IProps) => (
  <div
    className={`flex h-[50px] cursor-pointer items-center rounded-lg bg-neutral-800 pl-5 ${className}`}
  >
    {/* <button onClick={action}> */}
    <div className="flex flex-1 flex-row items-center">
      {icon}
      <Typography className="pl-[15px] uppercase text-neutral-300">
        {text}
      </Typography>
    </div>
    {/* </button> */}
  </div>
)

export default TabMenu
