import TextLink from "@components/atoms/TextLink"
import React from "react"
import { useTranslation } from "react-i18next"

export interface INote {
  className?: string
  textTitle?: string | null
  subTitle?: string | null
}

const Note = ({ className, textTitle, subTitle }: INote) => {
  const { t } = useTranslation()
  return (
    <div className={` ${className}`}>
      <TextLink
        name={t("note")}
        arrow={false}
        className="h-fit w-fit rounded-[4px] border border-neutral-800 px-4 py-1  pb-1 text-[10px]"
      />
      <div className="pl-4 text-[10px] text-neutral-600">
        <h1>{textTitle}</h1>
        <h1 className="pt-4 font-bold">{subTitle}</h1>
      </div>
    </div>
  )
}
export default Note
