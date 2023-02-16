import OverviewIcon from "@components/icons/OverviewIcon"
import PanelContent from "@components/molecules/PanelContent"
import AsideLayout from "@components/template/AsideLayout"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { useTranslation } from "react-i18next"

interface IOverviewGameProps {
  gameId: string
  gameType: IGetType
}

const OverViewGameStoryMode = ({ gameId, gameType }: IOverviewGameProps) => {
  const { t } = useTranslation()
  const { gameDescription } = useGameOverview(gameId, gameType)

  // const { hydrated } = useGlobal()
  // const { data } = useGameStore()
  // const [gameData, setGameData] = useState<IGame>()
  // useEffect(() => {
  //   if (data) setGameData(data)
  // }, [data])

  return (
    <div className="flex flex-col">
      <AsideLayout
        icon={<OverviewIcon />}
        title={`${t("game_overview")}`}
      >
        <PanelContent height="h-[400px]">
          <p
            className="px-6 py-2 text-start text-sm text-neutral-500"
            dangerouslySetInnerHTML={{
              __html: gameDescription
            }}
          />
        </PanelContent>
      </AsideLayout>
    </div>
  )
}

export default OverViewGameStoryMode
