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
import { useTranslation } from "react-i18next"
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

  const getTotalPriceItemSelectProfile = useCallback(async () => {
    if (itemSelected) {
      const priceUsd = await Helper.getPriceNakaCurrent()
      if (priceUsd) {
        setTotalPrice(itemSelected.qty * itemSelected.price) //  is dallor $
        // Naka
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
  }, [itemSelected])

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

  const buttonInToGame = useMemo(() => {
    if (itemSelected && (itemSelected as IGameItemListData).qty > 0) {
      return (
        <ButtonLink
          text={t("join-game")}
          href=""
          icon={<LogoutIcon />}
          size="medium"
          color="secondary"
          variant="contained"
          className="w-full"
          onClick={() => {
            router.push(`${router.asPath}/roomlist`)
          }}
        />
      )
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
        onClick={() => {}}
      />
    )
  }, [itemSelected, router, t])

  return (
    <>
      <div className="h-full w-full rounded-3xl border-[1px] border-[#18181C] bg-[#18181C] ">
        <div className="p-4 ">
          {gameItemList && (
            <>
              <DropdownListItem
                isCheck
                list={gameItemList}
                className="w-[300px] "
                onChangeSelect={onChangeSelectItem}
              />
            </>
          )}
          <div className="my-2 w-full rounded-xl border-[1px] border-[#111111] bg-[#111111] p-2">
            <p className="uppercase text-[#ffffff]">
              {t("my")}{" "}
              <span className="text-[#7B5BE6]">
                {itemSelected?.name} {itemSelected?.item_size}
              </span>{" "}
              {t("bag")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="rounded-xl border-[1px] border-[#111111] bg-[#111111]">
              <CardMedia
                component="img"
                height={180}
                image="/images/gamePage/Silver_Skull.png"
                alt=""
              />
            </div>
            <div className="flex w-full flex-col justify-center">
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#E1E2E2]  p-2 text-center text-[#111111]">
                <p>{itemSelected?.qty}</p>
                <Image
                  src="/images/gamePage/skull.png"
                  alt="skull"
                  width="30"
                  height="30"
                />
              </div>
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#232329] p-2 text-center text-[#70727B]">
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
        </div>
      </div>
    </>
  )
}
