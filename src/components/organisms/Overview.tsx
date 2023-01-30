import PanelHeader, {
  IPanelHeaderProps
} from "@components/molecules/PanelHeader"
import PanelContent from "@components/molecules/PanelContent"
import React from "react"

interface IOverviewProps extends IPanelHeaderProps {
  children: React.ReactNode
}

const Overview = ({ children, ...props }: IOverviewProps) => (
  <div className="panel-overview">
    <PanelHeader
      title={props.title}
      icon={props.icon}
    />
    <PanelContent height="h-[432px]">{children}</PanelContent>
  </div>
)

export default Overview
