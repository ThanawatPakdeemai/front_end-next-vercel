import React, { useEffect, useState, useMemo, useCallback } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore/index"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import RightMenuBuyItem from "@feature/gameItem/components/molecules/RightMenuBuyItem"
import { useRouter } from "next/router"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import { MESSAGES } from "@constants/messages"
import Helper from "@utils/helper"
import { useTranslation } from "next-i18next"
import { useToast } from "@feature/toast/containers"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import useGlobal from "@hooks/useGlobal"
import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"
import GameItemSingleCard from "@components/atoms/GameItemSingleCard"
import { ImageCustom } from "@components/atoms/image/Image"
import CardBuyItemHeader from "@feature/gameItem/molecules/CardBuyItemHeader"
import DollarSolidIcon from "@components/icons/DollarSolidIcon"
import ArrowJoinIcon from "@components/icons/ArrowJoinIcon"

interface ICardBuyItemProp {
  gameObject: IGame
  buttonStyle?: "green" | "purple"
  hideButtonPlay?: boolean
}

export default function CardBuyItem({
  gameObject,
  buttonStyle = "purple",
  hideButtonPlay = false
}: ICardBuyItemProp) {
  const { t } = useTranslation()
  const { itemSelected, onSetGameItemSelectd } = useBuyGameItemController()
  const { price } = useNakaPriceProvider()
  const { hydrated } = useGlobal()
  const { errorToast } = useToast()

  // State
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()

  const isHideOnWaitingRoom =
    router.pathname !== "/[typeGame]/[GameHome]/roomlist/[id]"
  const isWaitingRoom =
    router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]"

  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: gameObject ? gameObject._id : ""
  })

  const getListItemDefalut = useMemo(() => {
    if (profile && gameItemList) {
      gameItemList?.sort((a, b) => a.price - b.price)
      return gameItemList[0]
    }
  }, [gameItemList, profile])

  const itemSelect = useMemo(() => {
    if (itemSelected) {
      if (gameItemList) {
        const item = gameItemList.find((ele) => ele._id === itemSelected._id)
        return item
      }
      return itemSelected
    }
  }, [gameItemList, itemSelected])

  const qtyItemSelected = useMemo(() => {
    if (profile) {
      if (itemSelect) {
        return itemSelect.qty
      }
      if (itemSelected) {
        return itemSelected.qty
      }
      if (getListItemDefalut) {
        const dataItem = getListItemDefalut as IGameItemListData
        setTotalPrice(
          Number(
            Helper.formatNumber((dataItem?.qty ?? 0) * (dataItem?.price ?? 0), {
              maximumFractionDigits: 4
            })
          )
        )
        onSetGameItemSelectd(dataItem)
        return dataItem?.qty ?? 0
      }
    }
    return 0
  }, [
    getListItemDefalut,
    itemSelect,
    itemSelected,
    onSetGameItemSelectd,
    profile
  ])

  const priceItemSelected = useMemo(() => {
    if (profile) {
      if (itemSelect) {
        return itemSelect.price
      }
      if (itemSelected) {
        return itemSelected.price
      }
    }
    return 0
  }, [itemSelect, itemSelected, profile])

  const getTotalPriceItemSelectProfile = useCallback(async () => {
    if (profile) {
      if (itemSelected) {
        if (price && qtyItemSelected) {
          setTotalPrice(
            Number(
              Helper.formatNumber(qtyItemSelected * priceItemSelected, {
                maximumFractionDigits: 4
              })
            )
          )
        } else {
          setTotalPrice(
            Number(
              Helper.formatNumber(qtyItemSelected * priceItemSelected, {
                maximumFractionDigits: 4
              })
            )
          )
        }
      }
    }
  }, [profile, itemSelected, price, qtyItemSelected, priceItemSelected])

  useEffect(() => {
    let load = false

    if (!load) {
      if (itemSelected) getTotalPriceItemSelectProfile()
    }

    return () => {
      load = true
    }
  }, [getTotalPriceItemSelectProfile, itemSelected])

  const onChangeSelectItem = (_item: IGameItemListData) => {
    onSetGameItemSelectd(_item as IGameItemListData)
    if (_item.qty < 1) {
      errorToast(MESSAGES["you-don't-have-item"])
    }
  }
  useEffect(() => {
    let load = false

    if (!load) {
      if (gameObject) {
        const item_name =
          gameObject.item && 0 in gameObject.item ? gameObject.item[0].name : 0
        const item_selected = itemSelect ? itemSelect?.name : 1
        if (item_name !== item_selected) {
          onSetGameItemSelectd(null)
        }
      }
    }

    return () => {
      load = true
    }
  }, [gameObject, itemSelect, onSetGameItemSelectd])

  const buttonInToGame = useMemo(() => {
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist") return
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]") return
    if (qtyItemSelected) {
      if (qtyItemSelected > 0) {
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
  }, [qtyItemSelected, router.asPath, buttonStyle, router.pathname])

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
              {itemSelected && (
                <CardBuyItemHeader
                  image={itemSelected.image_icon}
                  name={itemSelected.name}
                  itemSize={itemSelected.item_size}
                  title={isWaitingRoom ? " " : ""}
                />
              )}
              <div className="flex w-full flex-col gap-3 rounded-2xl border-[1px] border-neutral-700 bg-primary-main p-3">
                {gameItemList && isHideOnWaitingRoom && (
                  <>
                    <DropdownListItem
                      isCheck
                      list={gameItemList?.sort((a, b) => a.price - b.price)}
                      onChangeSelect={onChangeSelectItem}
                      hideDropdownIcon
                    />
                  </>
                )}
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
                    <div
                      className={`${inputClasses} border-neutral-800 bg-neutral-780 text-neutral-500`}
                    >
                      <p className="flex items-center gap-1 p-[10px]">
                        <span>=</span>
                        <span className="total-price">{totalPrice}</span>
                      </p>
                      <DollarSolidIcon />
                    </div>
                    {isHideOnWaitingRoom && (
                      <div className="card-buy-item__buyButton w-full">
                        <RightMenuBuyItem
                          disabled={
                            !!(profile === undefined || profile === null)
                          }
                          className="!bg-info-main !text-sm"
                          disabledStartIcon
                        />
                      </div>
                    )}
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
