import React, { useEffect, useState, useMemo, useCallback } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import LogoutIcon from "@mui/icons-material/Logout"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { CardMedia } from "@mui/material"
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

interface ICardBuyItemProp {
  gameObject: IGame
}

export default function CardBuyItem({ gameObject }: ICardBuyItemProp) {
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
    return 0
  }, [getListItemDefalut, itemSelect, itemSelected, onSetGameItemSelectd])

  const priceItemSelected = useMemo(() => {
    if (itemSelect) {
      return itemSelect.price
    }
    if (itemSelected) {
      return itemSelected.price
    }
    return 0
  }, [itemSelect, itemSelected])

  const getTotalPriceItemSelectProfile = useCallback(async () => {
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
  }, [itemSelected, priceItemSelected, qtyItemSelected, price])

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
    if (qtyItemSelected) {
      if (qtyItemSelected > 0) {
        return (
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
        text={MESSAGES["please_item"]}
        icon={<LogoutIcon />}
        href={`${router.asPath}`}
        size="medium"
        color="secondary"
        variant="contained"
        className="w-full"
        disabled
      />
    )
  }, [qtyItemSelected, router.asPath, t])

  return (
    <>
      {hydrated && (
        <div
          className={`mt-2 flex h-full flex-[1_1_340px] justify-center lg:mt-0 lg:flex-none ${
            router.pathname === "/[typeGame]/[GameHome]" ? "w-full" : "w-full"
          } rounded-3xl border-[1px] border-neutral-800 bg-neutral-800 `}
        >
          <div className="p-4">
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
            <div
              className={`${
                router.pathname === "/[typeGame]/[GameHome]"
                  ? "w-full"
                  : "w-fit"
              } mb-1 rounded-xl border-[1px] border-primary-main bg-primary-main p-2 first-letter:my-2`}
            >
              <p className="w-[285px] uppercase text-white-default">
                {t("my")}{" "}
                <span className="text-purple-primary]">
                  {itemSelected?.name} {itemSelected?.item_size}
                </span>{" "}
                {t("bag")}
              </p>
            </div>

            <div
              className={`grid ${
                router.pathname === "/[typeGame]/[GameHome]"
                  ? "w-full"
                  : " w-fit"
              } grid-cols-2 gap-4 `}
            >
              <div className="flex items-center justify-center rounded-xl border-[1px] border-primary-main bg-primary-main">
                {gameObject && (
                  <CardMedia
                    className="m-auto block w-[124px]"
                    component="img"
                    height={124}
                    image={gameObject.item?.[0]?.image}
                    alt={gameObject.item?.[0]?.name}
                  />
                )}
              </div>
              <div className="flex w-full flex-col justify-center">
                <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#E1E2E2]  p-2 text-center text-[#111111]">
                  <p>{qtyItemSelected ?? 0}</p>
                  {gameObject && (
                    <Image
                      src={gameObject.item[0].image_icon_color}
                      alt={gameObject.item[0].name}
                      width="30"
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
            {router.pathname === "/[typeGame]/[GameHome]" && (
              <div className="mt-4 w-full">
                {profile ? (
                  buttonInToGame
                ) : (
                  <ButtonLink
                    text={t("please_login")}
                    href="/"
                    icon={<LogoutIcon />}
                    size="medium"
                    color="secondary"
                    className="w-full whitespace-nowrap"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
