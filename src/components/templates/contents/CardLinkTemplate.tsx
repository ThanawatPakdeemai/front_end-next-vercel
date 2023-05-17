import React, { ReactNode } from "react"

const CardLinkTemplate = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 sm:flex-auto">{children}</div>
)

export default CardLinkTemplate
