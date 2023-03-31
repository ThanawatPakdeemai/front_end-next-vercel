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
    <div className="right-sidebar__content relative mb-3 min-h-[400px] w-full flex-1 rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-4/6">
      {content}
    </div>
    <div className="right-sidebar__aside mb-3 flex-1 rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-2/6 md:max-w-[333px]">
      {aside}
    </div>
  </div>
)

export default RightSidebarContent
