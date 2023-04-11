import React from "react"
import { useTranslation } from "react-i18next"

interface IGamePlayTimeProps {
  playTime: number
}
const GamePlayTime = ({ playTime }: IGamePlayTimeProps) => {
  const { t } = useTranslation()
  return (
    <h2 className="text-neutral-600">
      {t("play")}:<span className="ml-2 text-info-main">{playTime}</span>
    </h2>
  )
}
export default GamePlayTime
