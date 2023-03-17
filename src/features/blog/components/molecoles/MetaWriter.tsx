import React from "react"

export interface IMetaWriter {
  writerName: string
  writerTitle?: string
}

const MetaWriter = ({ writerName, writerTitle = "WRITER" }: IMetaWriter) => (
  <div className="writer-wrapper">
    {writerTitle && (
      <div className="writer-wrapper--title px-6 pt-4 font-neue-machina text-sm text-white-default ">
        {writerTitle}
      </div>
    )}
    <div className="writer-wrapper--text px-6 pt-4 pb-2">
      <div className="text-default text-neutral-500">{writerName}</div>
    </div>
  </div>
)

export default MetaWriter
