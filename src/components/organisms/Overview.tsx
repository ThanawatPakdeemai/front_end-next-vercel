import PanelHeader, {
  IPanelHeaderProps
} from "@components/molecules/PanelHeader"
import PanelContent from "@components/molecules/PanelContent"
import React from "react"
import DOMPurify from "dompurify"

interface IOverviewProps extends IPanelHeaderProps {
  description: string
}

const Overview = ({ description, ...props }: IOverviewProps) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(description)
  })
  return (
    <div>
      <PanelHeader
        title={props.title}
        icon={props.icon}
      />
      <PanelContent height="h-[432px]">
        <p
          className="px-6 py-2 text-start text-sm text-neutral-500"
          dangerouslySetInnerHTML={sanitizedData()}
        />
      </PanelContent>
    </div>
  )
}

export default Overview
