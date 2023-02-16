import React from "react"

const FixedWidthContent = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full md:w-[890px]">{children}</div>
)

export default FixedWidthContent
