import { IMetaWriter } from "@feature/blog/interfaces/IMeta"
import React from "react"
import { useTranslation } from "react-i18next"

const MetaWriter = ({ writerName, writerTitle = "WRITER" }: IMetaWriter) => {
  const { t } = useTranslation()
  return (
    <div className="writer-wrapper flex h-full w-full flex-col justify-center gap-2">
      {writerTitle && (
        <div className="writer-wrapper--title font-neue-machina text-sm text-white-default">
          {t(`${writerTitle}`)}
        </div>
      )}
      <div className="writer-wrapper--text">
        <div className="text-neutral-500">{writerName}</div>
      </div>
    </div>
  )
}

export default MetaWriter
