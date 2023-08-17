import React from "react"
import dynamic from "next/dynamic"
import { IPanelHeaderProps } from "@components/molecules/PanelHeader"

const PanelHeader = dynamic(() => import("@components/molecules/PanelHeader"), {
  suspense: true,
  ssr: false
})

interface IOverviewProps extends IPanelHeaderProps {
  children: React.ReactNode
  className?: string
}

const AsideLayout = ({ children, className, ...props }: IOverviewProps) => (
  <div className={`panel-overview ${className}`}>
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
