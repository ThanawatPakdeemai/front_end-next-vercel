import OverviewIcon from "@components/icons/OverviewIcon"
import TagMultiple from "@components/molecules/TagMultiple"
import TagSingular from "@components/molecules/TagSingular"
import { Divider } from "@mui/material"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { iconmotion } from "@components/organisms/Footer"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"
import PanelContent from "@components/molecules/PanelContent"
import AsideLayout from "@components/templates/contents/AsideLayout"
// import AboutGame from "./AboutGame"

interface IOverviewGameProps {
  gameId: string
  gameType: IGetType
  title?: string
  gameIdNFT?: string
}

const OverviewContent = ({
  gameId,
  gameType,
  title,
  gameIdNFT
}: IOverviewGameProps) => {
  const { t } = useTranslation()
  const { hydrated } = useGlobal()
  const {
    gameTags,
    gameDeveloper,
    gamePublisher,
    // gameReleaseDate,
    gamePartnerSocial,
    // chainName,
    // chainIcon,
    gameTypeCode,
    gameOwner
    // singleVersion
  } = useGameOverview(gameId, gameType)

  return (
    <div className="relative flex w-full min-w-[333px] flex-col justify-start rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4">
      {hydrated && (
        <AsideLayout
          icon={<OverviewIcon />}
          title={title || t("game_overview")}
        >
          <PanelContent height="h-[500px]">
            <div className="text-start text-sm text-neutral-500 lg:pl-6 lg:pr-3 lg:pt-3">
              <TagMultiple
                title={`${t("genre")}`}
                tags={gameTags}
              />
              <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
              <TagSingular
                title={t("developer")}
                label={gameDeveloper}
                link={`/publishers/${gameDeveloper.toLocaleLowerCase()}`}
              />

              {gamePublisher !== "-" && (
                <>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <TagSingular
                    title={t("publisher")}
                    label={gamePublisher}
                    link={`/publishers/${gamePublisher.toLocaleLowerCase()}`}
                  />
                </>
              )}

              {/* <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
              <div className="overview-row grid gap-2 lg:grid-cols-2">
                <div
                  id="overview-release-date"
                  className="overview-col"
                >
                  <TagSingular
                    title="relate date"
                    label={gameReleaseDate.toString()}
                  />
                </div>

                {chainName !== "-" && (
                  <div
                    id="overview-chain-id"
                    className="overview-col border-neutral-700 lg:border-l-[1px] lg:pl-3"
                  >
                    <TagSingular
                      title="Chain"
                      label={chainName}
                      icon={chainIcon}
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </div> */}
              {gameTypeCode !== "-" && (
                <>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <div className="overview-row grid grid-cols-2">
                    <div
                      id="overview-game-type"
                      className="overview-col"
                    >
                      <TagSingular
                        title={t("game_type")}
                        label={gameTypeCode}
                      />
                    </div>
                  </div>
                </>
              )}
              {gameOwner !== "-" ||
                (gameOwner !== undefined && (
                  <>
                    <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                    <div className="overview-row grid gap-2 lg:grid-cols-2">
                      <div
                        id="overview-game-owner"
                        className="overview-col whitespace-nowrap"
                      >
                        <TagSingular
                          title={t("game_owner")}
                          label={gameOwner}
                          idNFT={gameIdNFT}
                        />
                      </div>
                    </div>
                  </>
                ))}
              {/* {singleVersion !== "-" && (
                <>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <div className="overview-row grid gap-2 lg:grid-cols-2">
                    <div
                      id="overview-game-version"
                      className="overview-col whitespace-nowrap"
                    >
                      <TagSingular
                        title="Game Version"
                        label={singleVersion}
                      />
                    </div>
                  </div>
                </>
              )} */}
              {gamePartnerSocial && gamePartnerSocial.length > 0 && (
                <>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <div className="flex flex-wrap">
                    {gamePartnerSocial.map(
                      (item, index) =>
                        item.href && (
                          <Link
                            key={Number(index)}
                            href={item.href}
                            target="_blank"
                          >
                            <ButtonIcon
                              variants={iconmotion}
                              whileHover="hover"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 4
                              }}
                              icon={item.icon}
                              className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                            />
                          </Link>
                        )
                    )}
                  </div>
                </>
              )}
              <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
              {/* {gameDescription && <AboutGame text={gameDescription} />} */}
            </div>
          </PanelContent>
        </AsideLayout>
      )}
    </div>
  )
}

export default OverviewContent
