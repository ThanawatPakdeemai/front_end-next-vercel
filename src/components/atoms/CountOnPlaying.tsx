import React from "react"
import { useTranslation } from "react-i18next"

interface IProps {
  count?: number | string
}
const CountOnPlaying = ({ count }: IProps) => {
  const { t } = useTranslation()
  return (
    <div className="h-auto w-fit rounded-less border border-neutral-700 p-1 uppercase">
      {`${t("play")}`} : {count}
    </div>
  )
}

export default CountOnPlaying
