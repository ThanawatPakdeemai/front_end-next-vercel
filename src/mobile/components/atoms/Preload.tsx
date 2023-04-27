import LogoNakaIcon from "@components/icons/LogoNakaIcon"
import INaka from "@components/icons/Naka"
import { useMemo } from "react"

const Preload = () => {
  const load = useMemo(
    () => (
      <div className="flex h-[100vh] flex-col items-center justify-center ">
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
    ),
    []
  )
  return load
}
export default Preload
