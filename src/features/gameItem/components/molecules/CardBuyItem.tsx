import React, { useEffect, useState, useMemo, useCallback } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import LogoutIcon from "@mui/icons-material/Logout"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore/index"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import RightMenuBuyItem from "@feature/gameItem/components/molecules/RightMenuBuyItem"
import { useRouter } from "next/router"
import { Image } from "@components/atoms/image"
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
            icon={<LogoutIcon />}
            size="medium"
            color="secondary"
            variant="contained"
            className="w-full"
          />
        )
      }
    }
    return (
      <ButtonLink
        text={t(MESSAGES["please_item"])}
        icon={<LogoutIcon />}
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
    <div className="mt-4 w-full">
      {profile ? (
        buttonInToGame
      ) : (
        <RightMenuNotLogIn
          button={
            <ButtonLink
              text={t("please_login")}
              href=""
              icon={<LogoutIcon />}
              size="medium"
              color="secondary"
              className="w-full whitespace-nowrap"
            />
          }
        />
      )}
    </div>
  )

  return (
    <>
      {hydrated && (
        <>
          <div
            className={`mt-2 flex w-full flex-[1_1_340px] justify-center rounded-3xl border-[1px] border-neutral-800 bg-neutral-800 lg:mt-0 lg:flex-none `}
          >
            <div className="flex flex-col items-center justify-center p-4">
              {gameItemList && (
                <>
                  <DropdownListItem
                    isCheck
                    list={gameItemList?.sort((a, b) => a.price - b.price)}
                    className="w-[300px]"
                    onChangeSelect={onChangeSelectItem}
                  />
                </>
              )}
              <div className="mb-1 w-full rounded-xl border-[1px] border-primary-main bg-primary-main p-2 first-letter:my-2">
                <p className="w-[285px] uppercase text-white-default">
                  {t("my")}
                  {itemSelected && (
                    <span className="text-purple-primary]">
                      {t(itemSelected.name)} {itemSelected.item_size}
                    </span>
                  )}
                  {/* <span className="text-purple-primary]">
                    {t(itemSelected?.name)} {itemSelected?.item_size}
                  </span>{" "} */}
                  {t("bag")}
                </p>
              </div>

              <div className={`grid w-full grid-cols-2 gap-4 `}>
                {gameObject && (
                  <GameItemSingleCard
                    image={gameObject?.item?.[0].image}
                    name={gameObject?.item?.[0]?.name}
                    itemId={gameObject?.item?.[0]?._id}
                  />
                )}
                <div className="flex w-full flex-col justify-center">
                  <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#E1E2E2]  p-2 text-center text-[#111111]">
                    <p>{qtyItemSelected ?? 0}</p>
                    {gameObject && (
                      <Image
                        src={gameObject.item[0].image_icon_color}
                        alt={gameObject.item[0].name}
                        width={
                          gameObject.item[0].name === "Bullet" ? "0" : "30"
                        }
                        height="30"
                      />
                    )}
                  </div>
                  <div className="mb-2 flex w-full justify-between rounded-xl bg-neutral-700 p-2 text-center text-black-default">
                    <p>= {totalPrice}</p>
                    {/* <Input
                      defaultValue=" 0.00"
                      inputProps={ariaLabel}
                    /> */}
                    <AttachMoneyIcon />
                  </div>
                  <div className="w-full">
                    <RightMenuBuyItem
                      disabled={!!(profile === undefined || profile === null)}
                    />
                  </div>
                </div>
              </div>
              {/* {buttonStyle === "purple" && (
                <div className="mt-4">{renderButton()}</div>
              )} */}
            </div>
          </div>
          {!hideButtonPlay && buttonStyle === "green" && renderButton()}
        </>
      )}
    </>
  )
}
