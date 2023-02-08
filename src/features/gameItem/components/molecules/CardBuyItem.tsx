import React, { useEffect, useState, useMemo, useCallback } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import LogoutIcon from "@mui/icons-material/Logout"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { CardMedia } from "@mui/material"
import useProfileStore from "@stores/profileStore/index"
import useGameStore from "@stores/game"
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

export default function CardButItem() {
  const { t } = useTranslation()
  const { data, onSetGameItemSelectd, itemSelected } = useGameStore()
  const [gameObject, setGameObject] = useState<IGame | undefined>()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { errorToast } = useToast()

  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()

  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: gameObject ? gameObject._id : ""
  })

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
    return 0
  }, [itemSelect, itemSelected])

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
      const priceUsd = await Helper.getPriceNakaCurrent()
      if (priceUsd && qtyItemSelected) {
        setTotalPrice(
          Number(
            Helper.formatNumber(qtyItemSelected * priceItemSelected, {
              maximumFractionDigits: 4
            })
          )
        ) //  is dallor $
        //  isNaka
        // Helper.calculateItemPerPrice(Number(itemSelected.price) ?? 0).then(
        //   (value) => {
        //     // eslint-disable-next-line no-restricted-globals
        //     if (isNaN(value)) {
        //       setTotalPrice(0)
        //     } else {
        //       setTotalPrice(Number(value) * Number(itemSelected.qty ?? 0))
        //     }
        //   }
        // )
      }
    }
  }, [itemSelected, priceItemSelected, qtyItemSelected])

  useEffect(() => {
    if (data) setGameObject(data)
    if (itemSelected) getTotalPriceItemSelectProfile()
    return () => {
      setGameObject(undefined)
    }
  }, [data, getTotalPriceItemSelectProfile, itemSelected])

  const onChangeSelectItem = (_item: IGameItemListData) => {
    if (_item.qty > 0) {
      onSetGameItemSelectd(_item as IGameItemListData)
    } else {
      errorToast(MESSAGES["you-don't-have-item"])
    }
  }
  useEffect(() => {
    if (data) {
      const item_name = data.item && 0 in data.item ? data.item[0].name : 0
      const item_selected = itemSelect ? itemSelect?.name : 1
      if (item_name !== item_selected) {
        onSetGameItemSelectd(null)
      }
    }
  }, [data, itemSelect, onSetGameItemSelectd])

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
      <div
        className={`h-fit ${
          router.pathname === "/[GameHome]" ? "w-full" : "mb-3 w-fit"
        } rounded-3xl border-[1px] border-neutral-800 bg-neutral-800 `}
      >
        <div className="p-4 ">
          {gameItemList && router.pathname !== "/[GameHome]/roomlist/[id]" && (
            <>
              <DropdownListItem
                isCheck
                list={gameItemList}
                className={`  w-[300px]`}
                onChangeSelect={onChangeSelectItem}
              />
            </>
          )}
          <div
            className={`${
              router.pathname === "/[GameHome]" ? "w-full" : "w-fit"
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
              router.pathname === "/[GameHome]" ? "w-full" : " w-fit"
            } grid-cols-2 gap-4 `}
          >
            <div className="rounded-xl border-[1px] border-primary-main bg-primary-main ">
              <CardMedia
                className="m-auto block w-[124px]"
                component="img"
                height={124}
                image="/images/gamePage/Silver_Skull.png"
                alt=""
              />
            </div>
            <div className="flex w-full flex-col justify-center">
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#E1E2E2]  p-2 text-center text-[#111111]">
                <p>{qtyItemSelected ?? 0}</p>
                <Image
                  src="/images/gamePage/skull.png"
                  alt="skull"
                  width="30"
                  height="30"
                />
              </div>
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#111111] p-2 text-center text-black-default">
                <p>= {totalPrice}</p>
                {/* <Input
                  defaultValue=" 0.00"
                  inputProps={ariaLabel}
                /> */}
                <AttachMoneyIcon />
              </div>
              <div className="w-full">
                <RightMenuBuyItem />
              </div>
            </div>
          </div>
          {router.pathname === "/[GameHome]" && (
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
                  className="w-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
