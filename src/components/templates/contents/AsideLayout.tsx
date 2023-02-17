import PanelHeader, {
  IPanelHeaderProps
} from "@components/molecules/PanelHeader"
import React from "react"

interface IOverviewProps extends IPanelHeaderProps {
  children: React.ReactNode
}

const AsideLayout = ({ children, ...props }: IOverviewProps) => (
  <div className="panel-overview">
    <PanelHeader
      title={props.title}
      icon={props.icon}
      adornmentButton={props.adornmentButton}
      average={props.average}
    />
    {children}
  </div>
)

export default AsideLayout
