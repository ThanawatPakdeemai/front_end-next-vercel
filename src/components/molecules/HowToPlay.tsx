import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@mui/material"
import dynamic from "next/dynamic"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"

const Support = dynamic(() => import("@components/molecules/Support"), {
  suspense: true,
  ssr: false
})

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)

const ShareToEarn = dynamic(() => import("@components/atoms/ShareToEarn"), {
  suspense: true,
  ssr: false
})

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  data: IGame
}

const Howto = ({ data }: IProp) => {
  const { stateProfile, handleClickScroll } = useGlobal()
  const { t } = useTranslation()
  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: data?.id ?? ""
  })

  return (
    <div className="game-mini__navbar mb-3 flex flex-col items-center justify-between rounded-2xl border-[1px] border-neutral-800 bg-neutral-780 p-2 md:p-5 xl:max-h-[52px] xl:flex-row">
      <div className="game-info__left flex items-center gap-4">
        <div className="game-into__name text-sm uppercase">
          <span className="text-neutral-600">{t("game")}: </span>
          <span className="text-neutral-400">{data && data.name}</span>
        </div>
        <div className="game-into__assets text-sm uppercase">
          <span className=" text-neutral-600">{t("assets")}: </span>
          <span className="text-neutral-400">
            {data && data.item && data.item.length > 0
              ? t(data.item[0].name)
              : null}
          </span>
        </div>

        {data.device_support && data.device_support.length > 0 && (
          <Support
            name={t("devices")}
            items={data.device_support}
          />
        )}

        {data.browser_support && data.browser_support.length > 0 && (
          <Support
            name={t("browsers")}
            items={data.browser_support}
          />
        )}
      </div>
      <div className="game-info__right flex items-center justify-end">
        <div className="flex items-center justify-end">
          <Button
            className="md flex !min-w-[6.25rem] flex-[1_1_150px] items-center justify-center text-sm text-neutral-400 md:flex-none"
            onClick={() => {
              handleClickScroll("full-width-content")
            }}
          >
            <Icomoon className="icon-Book mr-2 text-[200%]" />
            {t("how_to_play")}
          </Button>
        </div>
        <ShareToEarn id={data.id} />
        <div className="flex items-center justify-end">
          <ButtonLink
            onClick={() => onClickFavouriteButton()}
            text={
              favouriteStatus ? t("delete_favourite") : t("add_to_favourite")
            }
            icon={
              favouriteStatus ? (
                <Icomoon className="icon-app-bold icon-Heart mr-2 flex items-center justify-center text-error-main" />
              ) : (
                <Icomoon className="icon-Heart mr-2 flex items-center justify-center" />
              )
            }
            size="medium"
            color="secondary"
            variant="contained"
            className="md h-[34px] flex-[1_1_100%] items-center justify-center !bg-transparent text-sm text-neutral-400 md:justify-end"
            sxCustomStyled={{
              "&:hover": {
                background: "transparent!important",
                boxShadow: "none!important"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default Howto
