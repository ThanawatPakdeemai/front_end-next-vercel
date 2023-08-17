import React, { useMemo } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useProfileStore from "@stores/profileStore/index"
import { IGame } from "@feature/game/interfaces/IGameService"
import { MESSAGES } from "@constants/messages"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGlobal from "@hooks/useGlobal"
import { StartButtonCustomStyle } from "@feature/game/components/templates/lobby/GameContent"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"

const RightMenuBuyItem = dynamic(
  () => import("@feature/gameItem/components/molecules/RightMenuBuyItem"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const RightMenuNotLogIn = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuNotLogIn"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonGame = dynamic(
  () => import("@feature/game/components/molecules/ButtonGame"),
  {
    suspense: true,
    ssr: false
  }
)
const GameItemSingleCard = dynamic(
  () => import("@components/atoms/GameItemSingleCard"),
  {
    suspense: true,
    ssr: false
  }
)
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const CardBuyItemHeader = dynamic(
  () => import("@feature/gameItem/molecules/CardBuyItemHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
  const {
    itemSelected,
    qtyItemSelected,
    gameItemList,
    isHideOnWaitingRoom,
    onChangeSelectItem,
    totalPrice,
    isWaitingRoom
  } = useBuyGameItemController()
  const { hydrated } = useGlobal()
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()

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
            icon={<Icomoon className="icon-Arrow-in-Box-Right" />}
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
        icon={<Icomoon className="icon-Arrow-in-Box-Right" />}
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
              icon={<Icomoon className="icon-Arrow-in-Box-Right" />}
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
                  <DropdownListItem
                    isCheck
                    list={gameItemList?.sort((a, b) => a.price - b.price)}
                    onChangeSelect={onChangeSelectItem}
                    hideDropdownIcon
                  />
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
                      <Icomoon className="icon-Dollar" />
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
