import React from "react"
import { Box, Divider } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import { iconmotion } from "@styles/themes/partial/motion"

const AsideLayout = dynamic(
  () => import("@components/templates/contents/AsideLayout")
)
const TagMultiple = dynamic(() => import("@components/molecules/TagMultiple"), {
  suspense: true,
  ssr: false
})
const TagSingular = dynamic(() => import("@components/molecules/TagSingular"), {
  suspense: true,
  ssr: false
})
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
  const { hydrated, stateProfile } = useGlobal()
  const {
    gameTags,
    gameDeveloper,
    gamePublisher,
    gameOwnerCommission,
    // gameReleaseDate,
    gamePartnerSocial,
    // chainName,
    // chainIcon,
    gameTypeCode,
    gameOwner
    // singleVersion
  } = useGameOverview(gameId, gameType)
  const { data } = useGameStore()

  return (
    <Box
      component="div"
      className="relative flex w-full flex-col justify-start rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 lg:min-w-[333px]"
    >
      {hydrated && (
        <AsideLayout
          icon={<Icomoon className="icon-Radar-02" />}
          title={title || t("game_overview")}
        >
          <div className="text-start text-sm text-neutral-500 lg:pl-4 lg:pr-3 lg:pt-3">
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
            {gameOwner && gameOwner !== "-" && (
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
            )}
            {gameOwnerCommission !== undefined &&
              stateProfile &&
              data &&
              stateProfile.id === data.NFT_info?.owner_id?._id.toString() && (
                <>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <div className="overview-row grid gap-2 lg:grid-cols-2">
                    <div
                      id="overview-game-owner"
                      className="overview-col whitespace-nowrap"
                    >
                      <TagSingular
                        title={t("earn_amount")}
                        label={gameOwnerCommission.total_amount_commission.toString()}
                      />
                    </div>
                  </div>
                  <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
                  <div className="overview-row grid gap-2 lg:grid-cols-2">
                    <div
                      id="overview-game-owner"
                      className="overview-col whitespace-nowrap"
                    >
                      <TagSingular
                        title={t("play_count")}
                        label={gameOwnerCommission.total_transaction.toString()}
                      />
                    </div>
                  </div>
                </>
              )}
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
        </AsideLayout>
      )}
    </Box>
  )
}

export default OverviewContent
