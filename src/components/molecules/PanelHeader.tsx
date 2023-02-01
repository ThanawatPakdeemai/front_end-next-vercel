import React from "react"

export interface IPanelHeaderProps {
  title: string
  icon?: React.ReactNode
  adornmentButton?: React.ReactNode
}

const PanelHeader = ({ title, icon, adornmentButton }: IPanelHeaderProps) => (
  <div className="mb-4 flex items-center justify-between rounded-2xl border-[1px] border-neutral-700 bg-neutral-780">
    <div className="flex items-center p-3 font-neue-machina-semi text-sm uppercase text-neutral-400">
      {icon}
      <span className="ml-2">{title}</span>
    </div>
    {adornmentButton}
  </div>
)

export default PanelHeader
