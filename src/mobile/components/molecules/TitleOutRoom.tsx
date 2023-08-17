import { ReactNode } from "react"
import dynamic from "next/dynamic"

const LogoNakaBigIcon = dynamic(
  () => import("@components/atoms/svg/LogoNakaBigIcon")
)

interface IProps {
  name: string | ReactNode
  component?: ReactNode
}
const TitleOutRoom = (props: IProps) => {
  const { name, component } = props
  return (
    <h3
      className="flex gap-4 font-urbanist font-semibold text-white-primary"
      aria-hidden="true"
    >
      <LogoNakaBigIcon
        width={30}
        height={14}
      />
      {name}
      <div className="chat-wrapper">{component}</div>
    </h3>
  )
}
export default TitleOutRoom
