import React, { useMemo } from "react"
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
import NoReady from "../atoms/NoReady"

interface ICardBuyItemMobileProp {
  gameObject: IGame
  buttonStyle?: "green" | "purple"
}

export default function CardBuyItemMobile({
  gameObject,
  buttonStyle = "purple"
}: ICardBuyItemMobileProp) {
  const { t } = useTranslation()
  const {
    qtyItemSelected,
    gameItemList,
    isHideOnWaitingRoom,
    onChangeSelectItem,
    totalPrice
  } = useBuyGameItemController()
  const { hydrated } = useGlobal()
  const router = useRouter()

  const buttonInToGame = useMemo(() => {
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist") return
    if (router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]") return
    if (qtyItemSelected) {
      if (qtyItemSelected > 0) {
        return (
          <ButtonLink
            icon={<></>}
            text={t("join-game")}
            size="large"
            color="error"
            variant="contained"
            className="w-full !p-[8px_20px] font-urbanist !text-white-primary"
            href={`${router.asPath}/roomlist`}
          />
        )
      }
    }
    return <NoReady />
    // eslint-disable-next-line max-len
    // TODO: Open this after In-App Purchase is ready
    // return (
    //   <ButtonLink
    //     text={t(MESSAGES["please_item"])}
    //     icon={<ArrowJoinIcon />}
    //     href={`${router.asPath}`}
    //     size="medium"
    //     color="secondary"
    //     variant="contained"
    //     className="w-full"
    //     disabled
    //   />
    // )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qtyItemSelected, router.asPath, buttonStyle, router.pathname])

  const inputClasses =
    "flex h-10 items-center justify-between rounded-xl border-[1px]  border-neutral-700 bg-neutral-800 text-white-primary p-[10px] text-center font-neue-machina-semi text-sm !bg-[#18181C]"

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
      <Box
        component="footer"
        className="card-buy-item__footer w-full"
      >
        {buttonInToGame}
      </Box>
    </Box>
  ) : (
    <></>
  )
}
