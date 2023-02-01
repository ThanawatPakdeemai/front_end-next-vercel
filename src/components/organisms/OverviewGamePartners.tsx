import OverviewIcon from "@components/icons/OverviewIcon"
import TagMultiple from "@components/molecules/TagMultiple"
import TagSingular from "@components/molecules/TagSingular"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import { Divider, Typography } from "@mui/material"
import useGameStore from "@stores/game"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { iconmotion } from "@components/organisms/Footer"
import Link from "next/link"
import GlobalIcon from "@components/icons/GlobalIcon"
import { IMenuBase } from "@interfaces/IMenu"
import DiscordIcon from "@components/icons/SocialIcon/DiscordIcon"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import MediumIcon from "@components/icons/SocialIcon/MediumIcon"
import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import TiktokIcon from "@components/icons/SocialIcon/TiktokIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import AsideLayout from "@components/template/AsideLayout"
// import { useTranslation } from "react-i18next"

const OverviewGamePartners = () => {
  const { dataGamePartner } = useGameStore()
  // const { t } = useTranslation()

  const [gameData, setGameData] = useState<IPartnerGameData>()
  const [gamePartnerSocial, setGamePartnerSocial] = useState<IMenuBase[]>([])
  const gameTags: IGameTag[] = []

  useEffect(() => {
    if (dataGamePartner) {
      setGameData(dataGamePartner)
      if (dataGamePartner && dataGamePartner.social)
        setGamePartnerSocial([
          {
            icon: <GlobalIcon />,
            label: "Website",
            href: dataGamePartner.social.web || ""
          },
          {
            icon: <DiscordIcon />,
            label: "Discord",
            href: dataGamePartner.social.discord || ""
          },
          {
            icon: <FacebookIcon />,
            label: "Facebook",
            href: dataGamePartner.social.facebook || ""
          },
          {
            icon: <MediumIcon />,
            label: "Medium",
            href: dataGamePartner.social.medium || ""
          },
          {
            icon: <TelegramIcon />,
            label: "Telegram",
            href: dataGamePartner.social.telegram || ""
          },
          {
            icon: <TiktokIcon />,
            label: "Tiktok",
            href: dataGamePartner.social.tiktok || ""
          },
          {
            icon: <TwitterIcon />,
            label: "Twitter",
            href: dataGamePartner.social.twitter || ""
          }
        ])
    }
  }, [dataGamePartner])

  gameData &&
    gameData.genres.length > 0 &&
    gameData.genres.map((category) =>
      gameTags.push({
        name: category.name,
        link: `category/${category.slug}`
      })
    )

  return (
    <div className="flex flex-col justify-start">
      <AsideLayout
        icon={<OverviewIcon />}
        title="Game overview"
      >
        <div className="pl-6 pt-3 pr-3 text-start text-sm text-neutral-500">
          <TagMultiple
            // title={`${t("genre")}`}
            title="Genre"
            tags={gameTags}
          />
          <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
          <TagSingular
            title="developer"
            label={gameData?.short_detail?.developer || "-"}
            link={gameData?.short_detail?.developer || "-"}
          />
          <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
          <TagSingular
            title="publisher"
            label={gameData?.short_detail?.publisher || "-"}
            link={gameData?.short_detail?.publisher || "-"}
          />
          <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
          <div className="overview-row grid grid-cols-2">
            <div
              id="overview-release-date"
              className="overview-col"
            >
              <TagSingular
                title="relate date"
                label={
                  gameData?.short_detail?.release_date
                    ? dayjs(gameData?.short_detail?.release_date).format(
                        "DD MMM YYYY"
                      )
                    : "-"
                }
              />
            </div>
            <div
              id="overview-chain-id"
              className="overview-col border-l-[1px] border-neutral-700 pl-3"
            >
              <TagSingular
                title="Chain"
                label={gameData?.short_detail?.network_name || "-"}
                icon={gameData?.short_detail?.network_icon || ""}
                width={20}
                height={20}
              />
            </div>
          </div>
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
          <Typography
            variant="h2"
            className="mb-4 mt-6 font-neue-machina-semi text-[14px] uppercase text-neutral-400"
          >
            {/* {t("game_partner_about")} */}
            ABOUT THIS GAME
          </Typography>
          <div className="pb-6">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  gameData && "description" in gameData
                    ? gameData.description
                    : ""
              }}
            />
          </div>
        </div>
      </AsideLayout>
    </div>
  )
}

export default OverviewGamePartners
