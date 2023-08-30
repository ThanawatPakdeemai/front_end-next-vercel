import { Divider, Link } from "@mui/material"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import { SOCIAL } from "@configs/socialShare"
import { NAKA_GAME } from "@configs/nakaGame"
import { NAKA_SERVICES, NAKA_SERVICES_2 } from "@configs/nakaServices"
import { NAKA_ECOSYSTEMSS } from "@configs/nakaEcosystems"
import { useState } from "react"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import {
  arrowMotion,
  iconmotion,
  textMotion
} from "@styles/themes/partial/motion"
import dynamic from "next/dynamic"

const ShakeIcon = dynamic(() => import("@components/atoms/LigthShake"), {
  suspense: true,
  ssr: false
})
const NakaMask3 = dynamic(() => import("@components/atoms/svg/NaKaMask3"), {
  suspense: true,
  ssr: false
})
const NakaMask2 = dynamic(() => import("@components/atoms/svg/NaKaMask2"), {
  suspense: true,
  ssr: false
})
const NakaMask1 = dynamic(() => import("@components/atoms/svg/NaKaMask1"), {
  suspense: true,
  ssr: false
})

const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const TextLink = dynamic(() => import("@components/atoms/TextLink"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const Footer = () => {
  const { openInNewTab } = useGlobal()
  const router = useRouter()

  const { t } = useTranslation()

  const [isHover, setIsHover] = useState<boolean>(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <>
      <div className="mx-2 flex items-center sm:flex" />
      <Divider
        className={`footer-divider mb-12 mt-6 sm:mt-0 ${
          router.asPath.includes("inventory") ? "md:mb-16" : "md:my-16"
        } `}
        sx={{ marginTop: 10, marginBottom: 10 }}
      />
      <div className="w-full justify-between overflow-hidden text-[12px] md:px-4 lg:flex">
        <div className="hidden grid-cols-2 justify-center gap-3 whitespace-nowrap p-5 sm:block md:flex md:gap-0 md:p-10">
          <div className="flex-auto sm:flex-none md:w-48">
            <div className="mb-4 uppercase text-white-primary">
              {t("games")}
            </div>
            {NAKA_GAME?.map((item) => (
              <div key={`game_${item.label}`}>
                {item.game.map((game) => (
                  <div
                    key={`game-${item.label}-${game.name}`}
                    className="flex"
                  >
                    <Link
                      key={game.name}
                      href={game.path}
                    >
                      <TextLink
                        name={item.label}
                        initial="rest"
                        whileHover="hover"
                        variantsText={textMotion}
                        variantsArrow={arrowMotion}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex-auto sm:flex-none md:w-48">
            <div className="mb-4 uppercase text-white-primary">
              {t("Services")}
            </div>
            {NAKA_SERVICES?.map((item) => (
              <Link
                key={item.label}
                href={item.path}
              >
                <TextLink
                  name={String(t(item.label))}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variantsArrow={arrowMotion}
                  variantsText={textMotion}
                />
              </Link>
            ))}
          </div>
          <div className="flex-auto sm:flex-none md:w-48">
            <div className="mb-8 uppercase text-white-primary" />
            {NAKA_SERVICES_2?.map((item) => (
              <Link
                key={item.label}
                href={item.path}
              >
                <TextLink
                  name={String(t(item.label))}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variantsArrow={arrowMotion}
                  variantsText={textMotion}
                />
              </Link>
            ))}
          </div>
          <div className="col-span-2 flex-auto sm:flex-none md:col-span-1 md:w-48">
            <div className="mb-4 whitespace-normal uppercase text-white-primary">
              {t("About")}
            </div>
            {NAKA_ECOSYSTEMSS?.map((item) => (
              <Link
                href={item.path}
                key={item.label}
              >
                <TextLink
                  name={String(t(item.label))}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variantsArrow={arrowMotion}
                  variantsText={textMotion}
                  icon={
                    item.icon ? (
                      <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
                    ) : null
                  }
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-[20px] text-center md:text-left lg:justify-center lg:p-0">
          <div className="flex max-w-[480px] flex-col items-center justify-self-end lg:items-start">
            <div className="mb-4 uppercase text-white-primary">
              {t("be_a_part_of_the_play_to_earn_revolution")}
            </div>
            <div className="max-w-[400px] px-4 text-center sm:px-0 sm:text-start">
              {t("footer_title")}
            </div>
            <div className="my-8">
              <ButtonToggleIcon
                handleClick={() => openInNewTab("https://t.me/NakamotoGames")}
                startIcon={<Icomoon className="icon-Wine" />}
                text={t("join_the_revolution")}
                className="btn-rainbow-theme b h-[50px] !w-[260px] bg-secondary-main font-bold capitalize text-white-default"
                type="button"
              />
            </div>
            <div
              className={
                isMobile
                  ? `flex max-w-[360px] gap-2 overflow-x-auto`
                  : `flex flex-wrap justify-center`
              }
            >
              {SOCIAL?.map((item, index) => (
                <Link
                  key={Number(index)}
                  href={item.href}
                  target="_blank"
                  className="no-underline"
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
                    className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-white-primary"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* // TODO: Open after launch V2 */}
      {/* <GameDeveloperFooter /> */}
      <div className="my-8 flex flex-col items-center justify-center text-[10px] uppercase text-neutral-600 sm:my-0 md:flex-row md:justify-between lg:m-4 lg:py-[20px]">
        <h4>COPYRIGHT 2023 © NAKAMOTO GAMES</h4>
        <div
          className="h-[80px] cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHover ? (
            <ShakeIcon
              iconArray={[
                <NakaMask2 key="NaKaMask" />,
                <NakaMask3 key="NaKaMask" />
              ]}
              second={100}
            />
          ) : (
            <NakaMask1 />
          )}
        </div>
        <h4>Secure by : polygon network</h4>
      </div>
    </>
  )
}

export default Footer
