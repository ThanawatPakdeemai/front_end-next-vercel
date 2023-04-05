import React from "react"
import { useTranslation } from "react-i18next"

export interface IMetaWriter {
  writerName: string
  writerTitle?: string
}

const MetaWriter = ({ writerName, writerTitle = "WRITER" }: IMetaWriter) => {
  const { t } = useTranslation()
  return (
    <div className="writer-wrapper grid h-full w-full grid-rows-2">
      {writerTitle && (
        <div className="writer-wrapper--title items-middle flex px-6 pt-4 font-neue-machina text-sm text-white-default ">
          {t(`${writerTitle}`)}
        </div>
      )}
      <div className="writer-wrapper--text px-6 pt-4 pb-2">
        <div className="text-default text-neutral-500">{writerName}</div>
      </div>
    </div>
  )
}

export default MetaWriter
