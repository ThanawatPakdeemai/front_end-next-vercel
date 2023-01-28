import PanelHeader, {
  IPanelHeaderProps
} from "@components/molecules/PanelHeader"
import PanelContent from "@components/molecules/PanelContent"
import React from "react"

interface IOverviewProps extends IPanelHeaderProps {
  description: string
}

const Overview = ({ description, ...props }: IOverviewProps) => (
  <div>
    <PanelHeader
      title={props.title}
      icon={props.icon}
    />
    <PanelContent height="h-[432px]">
      <p
        className="px-6 py-2 text-start text-sm text-neutral-500"
        dangerouslySetInnerHTML={{
          __html: description
        }}
      />
    </PanelContent>
  </div>
)

export default Overview
