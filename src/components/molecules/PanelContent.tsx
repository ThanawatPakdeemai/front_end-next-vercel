import React from "react"

interface IPanelContentProps {
  children: React.ReactNode
  height?: string
}

const PanelContent = ({ children, height }: IPanelContentProps) => (
  <div className="panel-content relative h-full">
    <div
      className={`custom-scroll h-full min-h-[347px] overflow-y-scroll pr-4 ${height}`}
    >
      {children}
    </div>
    <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-780/0 to-neutral-780" />
  </div>
)

export default PanelContent
