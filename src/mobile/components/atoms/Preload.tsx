import LogoNakaIcon from "@components/icons/LogoNakaIcon"
import INaka from "@components/icons/Naka"

const Preload = () => (
  <>
    <div className="flex h-[80vh] flex-row items-center justify-center ">
      <INaka
        width={184}
        height={84}
      />
    </div>
    <div className="flex flex-row items-center justify-center ">
      <LogoNakaIcon
        fill="!fill-neutral-700"
        width={225}
        hover={false}
      />
    </div>
  </>
)
export default Preload
