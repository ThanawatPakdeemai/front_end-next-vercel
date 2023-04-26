import React, { ReactNode } from "react"

const CardLinkTemplate = ({ children }: { children: ReactNode }) => (
  <div
    // item
    // xs={12}
    // sm={12}
    // md={4}
    className="flex-1 sm:flex-auto"
  >
    {children}
  </div>
)

export default CardLinkTemplate
