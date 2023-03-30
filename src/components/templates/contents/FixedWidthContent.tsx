import React from "react"

const FixedWidthContent = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full lg:w-[770px] xl:w-[890px]">
    {children}
  </div>
)

export default FixedWidthContent
