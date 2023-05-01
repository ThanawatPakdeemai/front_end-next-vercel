import { IContentTemplateProps } from "@interfaces/IContentTemplate"
import React from "react"

const LeftSidebarContent = ({ content, aside }: IContentTemplateProps) => (
  <div className="flex-row gap-[30px] md:flex">
    <div className="mb-3 h-[500px] flex-auto rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-2/6 md:max-w-[333px]">
      {aside}
    </div>
    <div className="mb-3 min-h-[400px] w-full flex-auto rounded-md border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-4/6">
      {content}
    </div>
  </div>
)

export default LeftSidebarContent
