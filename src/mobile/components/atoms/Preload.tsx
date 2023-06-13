import LogoNakaIcon from "@components/icons/LogoNakaIcon"
import INaka from "@components/icons/Naka"
import { memo } from "react"

interface IPreloadProps {
  open: boolean
}

const Preload = ({ open }: IPreloadProps) => (
  <div
    className={`duration-300" fixed flex h-[100vh] w-full flex-col items-center justify-center bg-[#121212] pb-[30%] transition-all ${
      open ? "z-[100] opacity-100" : "z-[-1] opacity-0"
    } `}
  >
    <div className="flex h-[60%] items-center">
      <INaka
        width={184}
        height={84}
      />
    </div>
    <div>
      <LogoNakaIcon
        fill="!fill-[#F42728]"
        width={225}
        hover={false}
      />
    </div>
  </div>
)
export default memo(Preload)
