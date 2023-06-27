import React, { useEffect, useMemo } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore/index"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useRouter } from "next/router"
import { MESSAGES } from "@constants/messages"
import { useTranslation } from "next-i18next"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGlobal from "@hooks/useGlobal"
import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"
import GameItemSingleCard from "@components/atoms/GameItemSingleCard"
import { ImageCustom } from "@components/atoms/image/Image"
import CardBuyItemHeader from "@feature/gameItem/molecules/CardBuyItemHeader"
import ArrowJoinIcon from "@components/icons/ArrowJoinIcon"
import useGetProfileGolds from "@feature/profile/containers/hook/useGetProfileGolds"

interface ICardBuyItemProp {
  gameObject: IGame
  buttonStyle?: "green" | "purple"
  hideButtonPlay?: boolean
}

export default function CardItemGold({
  gameObject,
  buttonStyle = "purple",
  hideButtonPlay = false
}: ICardBuyItemProp) {
  const { t } = useTranslation()
  const {
    itemSelected,
    // qtyItemSelected,
    // gameItemList,
    // isHideOnWaitingRoom,
    // onChangeSelectItem,
    // totalPrice,
    isWaitingRoom
  } = useBuyGameItemController()
  const {
    hydrated,
    getGamePokerModeURL,
    isPokerGame,
    goldProfile,
    goldProfileComma
  } = useGlobal()

  const { mutateGetProfileGolds } = useGetProfileGolds()
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()

  const buttonInToGame = useMemo(() => {
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist") return
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]") return
    if (profile) {
      if (!isPokerGame(gameObject)) {
        return buttonStyle === "green" ? (
          <Box
            component="div"
            sx={StartButtonCustomStyle}
            className="flex w-full justify-center uppercase"
          >
            <ButtonGame
              textButton={t("join-game")}
              url={`${router.asPath}/roomlist`}
            />
          </Box>
        ) : (
          <ButtonLink
            text={t("join-game")}
            href={`${router.asPath}/roomlist`}
            icon={<ArrowJoinIcon />}
            size="medium"
            color="secondary"
            variant="contained"
            className="h-[50px] w-full"
          />
        )
      }
      if (goldProfile > 0) {
        return (
          <Box
            component="div"
            sx={StartButtonCustomStyle}
            className="flex w-full justify-center uppercase"
          >
            <ButtonGame
              textButton={t("join-game")}
              url={
                gameObject.game_url
                  ? getGamePokerModeURL(gameObject)
                  : `${router.asPath}/roomlist`
              }
            />
          </Box>
        )
      }
    }
    return (
      <ButtonLink
        text={t(MESSAGES["please_item"])}
        icon={<ArrowJoinIcon />}
        href={`${router.asPath}`}
        size="medium"
        color="secondary"
        variant="contained"
        className="w-full"
        disabled
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router.pathname,
    router.asPath,
    profile,
    isPokerGame,
    gameObject,
    goldProfile,
    buttonStyle,
    getGamePokerModeURL
  ])

  const renderButton = () => (
    <div className="w-full">
      {profile ? (
        buttonInToGame
      ) : (
        <RightMenuNotLogIn
          button={
            <ButtonLink
              text={t("please_login")}
              href=""
              icon={<ArrowJoinIcon />}
              size="medium"
              color="secondary"
              className="h-[50px] w-full whitespace-nowrap bg-secondary-main"
              sxCustomStyled={{
                "&.MuiButton-root:hover": {
                  "background":
                    "linear-gradient(95.05deg, #D91212 0%, #7B5BE6 51.33%, #27F1EC 100.57%)",
                  "boxShadow":
                    "0px -27px 71px rgba(1, 62, 137, 0.25), 0px -11.28px 29.6621px rgba(1, 62, 137, 0.179714), 0px -6.0308px 15.8588px rgba(1, 62, 137, 0.149027), 0px -3.38082px 8.8903px rgba(1, 62, 137, 0.125), 0px -1.79553px 4.72157px rgba(1, 62, 137, 0.100973), 0px -0.747159px 1.96475px rgba(1, 62, 137, 0.0702864), 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 0.4), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
                }
              }}
            />
          }
        />
      )}
    </div>
  )

  useEffect(() => {
    let load = false
    if (!load && profile) {
      mutateGetProfileGolds(profile?.address || "")
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputClasses =
    "flex h-10 items-center justify-between rounded-xl border-[1px] p-[10px] text-center font-neue-machina-semi text-sm"

  return (
    <>
      {hydrated && (
        <>
          <div
            className={`mt-2 flex w-full flex-[1_1_340px] justify-center rounded-3xl border-[1px] border-neutral-800 bg-neutral-800 lg:mt-0 lg:flex-none `}
          >
            <div className="flex flex-col items-center justify-center gap-3 p-4">
              {goldProfileComma && itemSelected && (
                <CardBuyItemHeader
                  image={itemSelected.image_icon}
                  name={itemSelected.name}
                  itemSize={`${goldProfileComma}`}
                  title={isWaitingRoom ? " " : ""}
                  refresh={() => mutateGetProfileGolds(profile?.address || "")}
                />
              )}
              <div className="flex w-full flex-col gap-3 rounded-2xl border-[1px] border-neutral-700 bg-primary-main p-3">
                {/* {gameItemList && isHideOnWaitingRoom && (
                  <>
                    <DropdownListItem
                      isCheck
                      list={gameItemList?.sort((a, b) => a.price - b.price)}
                      onChangeSelect={onChangeSelectItem}
                      hideDropdownIcon
                    />
                  </>
                )} */}
                <div className="flex w-full flex-wrap gap-3">
                  {gameObject && (
                    <div className="flex-1">
                      <GameItemSingleCard
                        image={gameObject?.item?.[0].image}
                        name={gameObject?.item?.[0]?.name}
                        itemId={gameObject?.item?.[0]?._id}
                      />
                    </div>
                  )}
                  <div className="flex w-[calc(100%-164px)] flex-1 flex-col justify-center gap-3">
                    <div
                      className={`${inputClasses} border-neutral-700 bg-neutral-800 text-white-primary`}
                    >
                      <p>{goldProfileComma ?? 0}</p>
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
                    <div
                      className={`${inputClasses} border-neutral-800 bg-neutral-780 text-neutral-500`}
                    >
                      <p className="flex items-center gap-1 p-[10px]">
                        <span>=</span>
                        <span className="total-price">{goldProfileComma}</span>
                      </p>
                      {/* <DollarSolidIcon /> */}
                    </div>
                    {/* {isHideOnWaitingRoom && (
                      <div className="card-buy-item__buyButton w-full">
                        <RightMenuBuyItem
                          disabled={
                            !!(profile === undefined || profile === null)
                          }
                          className="!bg-info-main !text-sm"
                          disabledStartIcon
                        />
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
              {!hideButtonPlay && buttonStyle === "purple" && renderButton()}
            </div>
          </div>
          {!hideButtonPlay && buttonStyle === "green" && renderButton()}
        </>
      )}
    </>
  )
}
