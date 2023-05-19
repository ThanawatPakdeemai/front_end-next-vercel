import React from "react"
import { useTranslation } from "next-i18next"

interface IGamePlayTimeProps {
  playTime: number
}
const GamePlayTime = ({ playTime }: IGamePlayTimeProps) => {
  const { t } = useTranslation()
  return (
    <div className="text-neutral-600">
      {t("play")}: <span className="ml-2 text-info-main">{playTime}</span>
    </div>
  )
}
export default GamePlayTime
