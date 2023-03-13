import { Typography } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

interface IProps {
  icon: ReactNode
  text: string
  className?: string
  link: string
  selected?: boolean
  /* in case use for future */
  // action: () => void
}

const TabMenu = ({ icon, text, className, link, selected = false }: IProps) => (
  <Link href={link}>
    <div
      className={`flex h-[50px] cursor-pointer items-center rounded-lg bg-neutral-800 pl-5 ${className} ${
        selected ? "border-[1px] border-purple-primary" : ""
      }`}
    >
      <div className="relative flex flex-1 flex-row items-center">
        {icon}
        <Typography className="pl-[15px] uppercase text-neutral-300">
          {text}
        </Typography>
        {selected && (
          <Typography className="absolute right-2 text-xs uppercase text-purple-primary">
            selected
          </Typography>
        )}
      </div>
    </div>
  </Link>
)

export default TabMenu
