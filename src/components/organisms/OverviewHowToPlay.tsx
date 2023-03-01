import OverviewIcon from "@components/icons/OverviewIcon"
import PanelContent from "@components/molecules/PanelContent"
import AsideLayout from "@components/templates/contents/AsideLayout"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { useTranslation } from "react-i18next"

interface IOverviewGameProps {
  gameId: string
  gameType: IGetType
  hight?: string
  title?: string
}

const OverviewHowToPlay = ({
  gameId,
  gameType,
  hight = "h-[400px]",
  title
}: IOverviewGameProps) => {
  const { t } = useTranslation()
  const { gameHowToPlay } = useGameOverview(gameId, gameType)

  // const { hydrated } = useGlobal()
  // const { data } = useGameStore()
  // const [gameData, setGameData] = useState<IGame>()
  // useEffect(() => {
  //   if (data) setGameData(data)
  // }, [data])

  return (
    <div className="relative my-2 flex flex-col overflow-hidden rounded-2xl bg-neutral-780 p-2 sm:m-0">
      <AsideLayout
        icon={<OverviewIcon />}
        title={title ? `${t(title)}` : `${t("game_overview")}`}
      >
        <PanelContent height={hight.toString()}>
          <p
            className="py-2 text-start text-sm text-neutral-500 lg:px-6"
            dangerouslySetInnerHTML={{
              __html: gameHowToPlay
            }}
          />
        </PanelContent>
      </AsideLayout>
    </div>
  )
}

export default OverviewHowToPlay
