import { IContentTemplateProps } from "@interfaces/IContentTemplate"
import React from "react"

const RightSidebarContent = ({
  content,
  aside,
  className
}: IContentTemplateProps) => (
  <div className={`flex-row gap-3 md:flex ${className?.toString()}`}>
    <div className="bg-neutral-780border-opacity-80 mb-3 min-h-[500px] w-full rounded-md border-[1px] border-neutral-700 bg-neutral-780 p-4 md:w-4/6">
      {content}
    </div>
    <div className="mb-3 min-h-[500px] rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-2/6">
      {aside}
    </div>
  </div>
)

export default RightSidebarContent
