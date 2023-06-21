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
import { useCreateWeb3Provider } from "@hooks/useWeb3Provider"
import RightMenuBuyItem from "@feature/gameItem/components/molecules/RightMenuBuyItem"
import useProfileStore from "@stores/profileStore"
import OpenMetamask from "../atoms/OpenMetamask"

interface ICardBuyItemMobileProp {
  gameObject: IGame
}

export default function CardBuyItemMobile({
  gameObject
}: ICardBuyItemMobileProp) {
  const { t } = useTranslation()
  const { qtyItemSelected, gameItemList, onChangeSelectItem, totalPrice } =
    useBuyGameItemController()
  const { hasMetamask } = useCreateWeb3Provider()
  const profile = useProfileStore((state) => state.profile.data)

  const { hydrated, getGameStoryModeURL } = useGlobal()
  const router = useRouter()
  const { setOpen } = useLoadingStore()

  const inputClasses =
    "flex h-10 items-center justify-between rounded-xl border-[1px]  border-neutral-700 bg-neutral-800 text-white-primary p-[10px] text-center font-neue-machina-semi text-sm !bg-[#18181C]"

  /**
   * @description Button go to room list
   */
  const buttonGotoRoomlist = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Button please login
   */
  const buttonPleaseLogin = useCallback(
    () => (
      <ButtonLink
        icon={<></>}
        text={t("join-game")}
        size="large"
        color="error"
        variant="contained"
        className="w-full !p-[8px_20px] font-urbanist !text-white-primary  hover:!bg-[#F32429]"
        disabled
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /**
   * @description Button open with metamask
   * @returns
   */
  const buttonOpenWithMetamask = useCallback(() => {
    if (!gameObject) return <></>
    const path = `${gameObject.game_mode}/${gameObject.path}`
    return (
      <Box
        component={"section"}
        id="open-with-metamask"
      >
        <OpenMetamask
          url={`${CONFIGS.BASE_URL.FRONTEND.replace("https://", "")}/${path}`}
        />
      </Box>
    )
  }, [gameObject])

  /**
   * @description Button buy asset
   */
  const buttonBuyAsset = useCallback(
    () => (
      <RightMenuBuyItem
        disabled={!!(profile === undefined || profile === null)}
        className="!hover:!bg-[#F32429] !hover:!text-white-primary !w-[7.375rem] !min-w-[7.375rem] !bg-[#F32429] !p-[8px_20px] !font-urbanist !text-sm !text-white-primary"
        disabledStartIcon
      />
    ),
    [profile]
  )

  const renderMyAsset = useCallback(() => {
    return (
      <Box
        component={"section"}
        id="my-assets"
      >
        {gameItemList && (
          <DropdownListItem
            isCheck
            list={gameItemList.sort((a, b) => a.price - b.price)}
            onChangeSelect={onChangeSelectItem}
            hideDropdownIcon
          />
        )}
        <div className="flex w-full flex-wrap gap-3">
          <div className="flex max-w-[100px] flex-1 items-center justify-center rounded-2xl bg-[#18181C]">
            <GameItemSingleCard
              image={gameObject.item?.[0].image}
              name={gameObject.item?.[0]?.name}
              itemId={gameObject.item?.[0]?._id}
            />
          </div>
          <div className="flex w-[calc(100%-164px)] flex-1 flex-col justify-center gap-3">
            <div className={`${inputClasses}`}>
              <p>{qtyItemSelected ?? 0}</p>
              <div className="game-item-image h-6 w-6 p-[4px]">
                <ImageCustom
                  src={gameObject.item[0].image_icon}
                  alt={gameObject.item[0].name}
                  width={20}
                  height={20}
                  className="h-full w-full object-contain opacity-40"
                />
              </div>
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
      </Box>
    )
  }, [
    gameObject,
    gameItemList,
    onChangeSelectItem,
    qtyItemSelected,
    totalPrice
  ])

  /**
   * @description Render Form Buy Item
   */
  const renderGameItemContent = useCallback(() => {
    if (!gameObject) return null
    if (!hasMetamask)
      return (
        <Box
          component="div"
          sx={{
            ".MuiButton-containedError:hover": {
              background: "#F32429!important",
              boxShadow: "none!important"
            }
          }}
          className="flex w-full flex-col gap-3"
        >
          {renderMyAsset()}
          {qtyItemSelected && qtyItemSelected > 0
            ? buttonGotoRoomlist()
            : buttonOpenWithMetamask()}
        </Box>
      )
    return (
      <Box
        component="div"
        sx={{
          ".MuiButton-containedError:hover": {
            background: "#F32429!important",
            boxShadow: "none!important"
          }
        }}
        className="flex w-full flex-col gap-3"
      >
        {renderMyAsset()}
        {qtyItemSelected && qtyItemSelected > 0
          ? buttonGotoRoomlist()
          : buttonBuyAsset()}
      </Box>
    )
  }, [
    gameObject,
    gameItemList,
    hasMetamask,
    onChangeSelectItem,
    totalPrice,
    qtyItemSelected,
    buttonBuyAsset,
    buttonGotoRoomlist,
    buttonOpenWithMetamask
  ])

  /**
   * @description Render Content
   */
  const renderContent = useCallback(() => {
    if (!gameObject) return null
    if (!profile) return buttonPleaseLogin()

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
      case "free-to-play":
      case "free-to-earn":
        return buttonGotoRoomlist()
      case "play-to-earn":
        return renderGameItemContent()
      default:
        return <></>
    }
  }, [
    gameObject,
    profile,
    renderGameItemContent,
    buttonGotoRoomlist,
    buttonPleaseLogin,
    getGameStoryModeURL
  ])

  return hydrated ? (
    <Box
      component="div"
      className="flex flex-col items-center justify-center gap-3"
      sx={{
        ".text-green-lemon": {
          color: "#F2C94C"
        }
      }}
    >
      {renderContent()}
    </Box>
  ) : (
    <></>
  )
}
