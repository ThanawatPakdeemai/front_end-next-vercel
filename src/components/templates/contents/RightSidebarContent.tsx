import { IContentTemplateProps } from "@interfaces/IContentTemplate"
import React from "react"

const RightSidebarContent = ({
  content,
  aside,
  className
}: IContentTemplateProps) => (
  <div
    className={`right-sidebar__wrapper flex-row gap-3 md:flex ${className?.toString()}`}
  >
    <div className="mb-2 min-h-[400px] w-full flex-auto rounded-md bg-primary-main sm:mb-0 md:w-4/6">
      {content}
    </div>
    <div className="h-full flex-auto rounded-md md:w-2/6 md:max-w-[333px]">
      {aside}
    </div>
  </div>
)

export default RightSidebarContent
