import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import { ReactNode } from "react"

interface IProps {
  name: string | ReactNode
  component?: ReactNode
}
const TitleOutRoom = (props: IProps) => {
  const { name, component } = props
  return (
    <h3
      className="flex items-center gap-4 font-urbanist font-semibold text-white-primary"
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
