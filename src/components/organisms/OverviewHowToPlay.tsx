import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const PanelContent = dynamic(
  () => import("@components/molecules/PanelContent"),
  {
    suspense: true,
    ssr: false
  }
)
const AsideLayout = dynamic(
  () => import("@components/templates/contents/AsideLayout"),
  {
    suspense: true,
    ssr: true
  }
)

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

  return (
    <div className="relative my-2 flex flex-col overflow-hidden rounded-2xl bg-neutral-780 p-2 sm:m-0 md:min-w-[330px]">
      <AsideLayout
        icon={<Icomoon className="icon-Radar-02" />}
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
