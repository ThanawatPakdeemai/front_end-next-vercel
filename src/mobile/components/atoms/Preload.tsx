import LogoNakaIcon from "@components/icons/LogoNakaIcon"
import INaka from "@components/icons/Naka"
import useLoadingStore from "@stores/loading"
import { memo } from "react"

const Preload = () => {
  const { open } = useLoadingStore()
  return (
    <div
      className={`fixed flex h-[100vh] w-full flex-col items-center justify-center bg-[#121212] ${
        open ? "z-[100] opacity-100" : "z-[-1] opacity-0"
      } duration-300" transition-all`}
    >
      <div className="flex h-[60%] items-center">
        <INaka
          width={184}
          height={84}
        />
      </div>
      <div>
        <LogoNakaIcon
          fill="!fill-neutral-700"
          width={225}
          hover={false}
        />
      </div>
    </div>
  )
}
export default memo(Preload)
