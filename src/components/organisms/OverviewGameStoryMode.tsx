import OverviewIcon from "@components/icons/OverviewIcon"
import AsideLayout from "@components/templates/contents/AsideLayout"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const OverViewGameStoryMode = () => {
  const { data } = useGameStore()
  const { t } = useTranslation()
  const [gameData, setGameData] = useState<IGame>()
  useEffect(() => {
    if (data) setGameData(data)
  }, [data])
  return (
    <div className="flex flex-col">
      <AsideLayout
        icon={<OverviewIcon />}
        title={`${t("game_overview")}`}
      >
        <p
          className="px-6 py-2 text-start text-sm text-neutral-500"
          dangerouslySetInnerHTML={{
            __html: gameData ? gameData.banner_description : ""
          }}
        />
      </AsideLayout>
    </div>
  )
}

export default OverViewGameStoryMode
