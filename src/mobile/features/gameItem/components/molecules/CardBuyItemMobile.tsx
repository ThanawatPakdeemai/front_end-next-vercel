import React, { useCallback } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGlobal from "@hooks/useGlobal"
import GameItemSingleCard from "@components/atoms/GameItemSingleCard"
import { ImageCustom } from "@components/atoms/image/Image"
import DollarSolidIcon from "@components/icons/DollarSolidIcon"
import { Box } from "@mui/material"
import useLoadingStore from "@stores/loading"
import CONFIGS from "@configs/index"
import OpenMetamask from "../atoms/OpenMetamask"

interface ICardBuyItemMobileProp {
  gameObject: IGame
}

export default function CardBuyItemMobile({
  gameObject
}: ICardBuyItemMobileProp) {
  const { t } = useTranslation()
  const {
    qtyItemSelected,
    gameItemList,
    isHideOnWaitingRoom,
    onChangeSelectItem,
    totalPrice
  } = useBuyGameItemController()

  const { hydrated, getGameStoryModeURL } = useGlobal()
  const router = useRouter()
  const { setOpen } = useLoadingStore()

  const inputClasses =
    "flex h-10 items-center justify-between rounded-xl border-[1px]  border-neutral-700 bg-neutral-800 text-white-primary p-[10px] text-center font-neue-machina-semi text-sm !bg-[#18181C]"

  /**
   * @description Button go to room list
   */
  const buttonGotoRoomlist = () => {
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist") return
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]") return
    return (
      <ButtonLink
        icon={<></>}
        text={t("join-game")}
        size="large"
        color="error"
        variant="contained"
        className="w-full !p-[8px_20px] font-urbanist !text-white-primary"
        onClick={() => {
          setOpen("")
          router.push(`${router.asPath}/roomlist`)
        }}
      />
    )
  }

  const buttonInToGame = useCallback(() => {
    switch (gameObject.game_mode) {
      case "story-mode":
        return (
          <ButtonLink
            icon={<></>}
            text="Play"
            size="large"
            color="error"
            variant="contained"
            className="w-full !p-[8px_20px] font-urbanist !text-white-primary"
            href={getGameStoryModeURL(gameObject)}
          />
        )
      case "free-to-earn":
      case "free-to-play":
        return buttonGotoRoomlist()
      case "play-to-earn":
        if (router.pathname === "/[typeGame]/[GameHome]/roomlist") return
        if (router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]") return
        if (qtyItemSelected) {
          if (qtyItemSelected > 0) {
            return buttonGotoRoomlist()
          }
        } else {
          // Jumb to Metamask app to buy item
          const path = `${gameObject.game_mode}/${gameObject.path}`
          return (
            <OpenMetamask
              url={`${CONFIGS.BASE_URL.FRONTEND.replace(
                "https://",
                ""
              )}/${path}`}
            />
          )
        }
        break
      default:
        return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qtyItemSelected, router, gameObject])

  /**
   * @description Render Form Buy Item
   */
  const renderFormItem = useCallback(() => {
    if (!gameObject) return null
    switch (gameObject.game_mode) {
      case "story-mode":
      case "free-to-play":
      case "free-to-earn":
        return null
      case "play-to-earn":
        return (
          <div className="flex w-full flex-col gap-3">
            {gameItemList && isHideOnWaitingRoom && (
              <DropdownListItem
                isCheck
                list={gameItemList?.sort((a, b) => a.price - b.price)}
                onChangeSelect={onChangeSelectItem}
                hideDropdownIcon
              />
            )}
            <div className="flex w-full flex-wrap gap-3">
              {gameObject && (
                <div className="flex max-w-[100px] flex-1 items-center justify-center rounded-2xl bg-[#18181C]">
                  <GameItemSingleCard
                    image={gameObject?.item?.[0].image}
                    name={gameObject?.item?.[0]?.name}
                    itemId={gameObject?.item?.[0]?._id}
                  />
                </div>
              )}
              <div className="flex w-[calc(100%-164px)] flex-1 flex-col justify-center gap-3">
                <div className={`${inputClasses}`}>
                  <p>{qtyItemSelected ?? 0}</p>
                  {gameObject && (
                    <div className="game-item-image h-6 w-6 p-[4px]">
                      <ImageCustom
                        src={gameObject.item[0].image_icon}
                        alt={gameObject.item[0].name}
                        width={20}
                        height={20}
                        className="h-full w-full object-contain opacity-40"
                      />
                    </div>
                  )}
                </div>
                <div className={`${inputClasses}`}>
                  <p className="flex items-center gap-1 p-[10px]">
                    <span>=</span>
                    <span className="total-price">{totalPrice}</span>
                  </p>
                  <DollarSolidIcon />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        null
    }
  }, [
    qtyItemSelected,
    gameObject,
    gameItemList,
    isHideOnWaitingRoom,
    onChangeSelectItem,
    totalPrice
  ])

  return hydrated ? (
    <Box
      component="div"
      className="flex flex-col items-center justify-center gap-3"
      sx={{
        ".MuiButton-containedError:hover": {
          background: "#F42728",
          boxShadow: "none"
        },
        ".text-green-lemon": {
          color: "#F2C94C"
        }
      }}
    >
      {renderFormItem()}
      <Box
        component="footer"
        className="card-buy-item__footer w-full"
        sx={{
          ".MuiButtonBase-root:focus, .MuiButtonBase-root:hover": {
            background: "#F42728!important",
            boxShadow: "none!important"
          }
        }}
      >
        {buttonInToGame()}
      </Box>
    </Box>
  ) : (
    <></>
  )
}
