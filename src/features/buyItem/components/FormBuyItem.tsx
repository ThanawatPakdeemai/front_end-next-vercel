import React, { memo } from "react"
import { Box, ButtonGroup, CircularProgress } from "@mui/material"
import { Controller } from "react-hook-form"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import Helper from "@utils/helper"
import CONFIGS from "@configs/index"
import { useWeb3Provider } from "@providers/Web3Provider"
import { iconmotion } from "@styles/themes/partial/motion"
import useBuyGameItemController from "../containers/hooks/useBuyGameItemController"

const DropdownListCurrency = dynamic(
  () => import("@feature/gameItem/components/atoms/DropdownListCurrency"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownListItem = dynamic(
  () => import("@feature/gameItem/components/atoms/DropdownListItem"),
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
const ImageCustom = dynamic(
  () => import("@components/atoms/image/Image").then((mod) => mod.ImageCustom),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const PleaseCheckWallet = dynamic(
  () => import("@components/atoms/PleaseCheckWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const Balance = dynamic(() => import("@components/molecules/balance/Balance"), {
  suspense: true,
  ssr: false
})
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)

const FormBuyItem = () => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    gameItemList,
    game,
    onSubmit,
    onError,
    errors,
    isLoading,
    updatePricePerItem,
    onQtyUp,
    onQtyDown,
    chainSupport,
    isDisabled
  } = useBuyGameItemController()
  // const { handleSwitchNetwork } = useSwitchNetwork()
  const { isConnected } = useWeb3Provider()
  const titleText = "text-xs uppercase"
  const buttonIncreaseDecrease =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-main"

  return (
    <>
      {game && (
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="form-buy-item__gameItem-image flex w-full flex-wrap items-start gap-3">
            {game.item && game.item.length > 0 && (
              <div className="flex-1">
                <GameItemSingleCard
                  image={game.item[0].image}
                  name={game.item[0].name}
                  itemId={game.item[0]._id}
                />
              </div>
            )}
            <div className="flex w-[calc(100%-164px)] flex-1 flex-col justify-center gap-3 text-sm">
              <div className="flex w-full flex-col gap-2">
                <p className={`${titleText} text-white-default`}>
                  {t("assets")}
                </p>
                <p className="text-black-default">{game.item[0].name}</p>
                <p className={`${titleText} text-white-default`}>
                  {t("descriptions")}
                </p>
                <div className="line-clamp-3 overflow-hidden text-black-default">
                  {game.item[0].detail}
                </div>
              </div>
            </div>
          </div>
          <Box
            component="div"
            className="form-buy-item__gameItem-asset flex w-full flex-col gap-2"
          >
            <p className={`${titleText} text-black-default`}>
              {t("tier_assets")}
            </p>
            {gameItemList &&
              gameItemList.length > 0 &&
              (gameItemList as IGameItemListData[]).sort(
                (a, b) => a.price - b.price
              ) && (
                <Controller
                  name="item_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ...field } }) => (
                    <DropdownListItem
                      {...field}
                      list={gameItemList as IGameItemListData[]}
                      className="w-full"
                      onChangeSelect={(_item) => {
                        setValue("item", _item)
                        setValue("item_id", _item.id)
                        updatePricePerItem()
                      }}
                      hideIcon
                    />
                  )}
                />
              )}
            {"item_id" in errors && (
              <p className="text-sm text-error-main">{t("required")}</p>
            )}
          </Box>
          <Box
            component="div"
            className="form-buy-item__currency flex w-full flex-col gap-2"
          >
            <p className={`${titleText} text-black-default`}>{t("currency")}</p>
            <Controller
              name="currency"
              control={control}
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <DropdownListCurrency
                  {...field}
                  list={chainSupport}
                  className="w-full"
                  onChangeSelect={(_item) => {
                    setValue("currency", _item)
                    setValue("currency_id", _item?.address)
                    updatePricePerItem()
                  }}
                />
              )}
            />
            {"currency" in errors && (
              <p className="text-sm text-error-main">{t("required")}</p>
            )}
            <p className={`${titleText} text-purple-primary`}>
              {/* {t("assets")} / 1 {t("item")} = {watch("nakaPerItem")} NAKA */}
              {`1 ${game.item[0].name} = ${watch("nakaPerItem")} NAKA`}
            </p>
          </Box>

          <div className="flex justify-between gap-2">
            <ButtonIcon
              onClick={onQtyDown}
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={
                <Icomoon className="icon-Minus relative top-[4px] text-white-primary" />
              }
              className={buttonIncreaseDecrease.toString()}
            />
            <div className="form-buy-item__value flex h-10 flex-1 items-center justify-between rounded-lg border-[1px] border-solid border-neutral-700 bg-neutral-800 p-3 text-neutral-500">
              <input
                type="number"
                {...register("qty", { required: true })}
                onChange={(event: any) => {
                  event.preventDefault()
                  const qty = Number(event.target.value)
                  if (qty <= 1) {
                    setValue("qty", 1)
                  } else if (qty >= 99) {
                    setValue("qty", 99)
                  } else {
                    setValue("qty", qty)
                  }
                }}
                className="hidden-input-number w-[calc(100%-20px)] bg-transparent text-center text-[14px] text-neutral-500 focus-visible:bg-transparent focus-visible:outline-0"
                value={watch("qty")}
              />
              <div className="game-item-image h-6 w-6 p-[4px]">
                <ImageCustom
                  src={game.item[0].image_icon}
                  alt={game.item[0].name}
                  width={20}
                  height={20}
                  className="h-full w-full object-contain opacity-40"
                />
              </div>
            </div>
            <ButtonIcon
              onClick={onQtyUp}
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={
                <Icomoon className="icon-Plus1 relative top-[4px] text-white-primary" />
              }
              className={buttonIncreaseDecrease.toString()}
            />
          </div>
          <Box
            component="div"
            className="flex w-full flex-col"
          >
            <p className={`${titleText} text-black-default`}>
              {t("your_balance")}
            </p>
            <Balance
              buyItemCoinSeleced={watch("currency")}
              widthBalance="w-full"
            />
          </Box>
          <div className="flex h-[52px] w-full items-center justify-between rounded-lg border border-neutral-700 p-4 uppercase">
            <div className={`${titleText} text-white-primary`}>
              <p>{t("total_price")}:</p>
            </div>
            <div className="flex items-baseline gap-2 font-neue-machina-semi text-[14px] text-secondary-main">
              <p>
                {Helper.formatNumber(watch("nakaPerItem") * watch("qty") ?? 0, {
                  maximumFractionDigits: 4
                })}
              </p>
              <div className="game-item-image flex h-9 w-6 items-center p-0">
                <Icomoon className="icon-Naka text-[#7B5BE6]" />
              </div>
            </div>
          </div>
          <div className="w-full text-end">
            <p className="text-sm text-black-default">
              = $
              {Helper.formatNumber(
                watch("qty") *
                  Number((watch("item") as IGameItemListData)?.price) ?? 0
              )}
            </p>
          </div>
          <ButtonGroup className="flex flex-col gap-3">
            {!isConnected ? (
              <PleaseCheckWallet />
            ) : (
              <ButtonLink
                href=""
                size="medium"
                disabled={isDisabled}
                className="h-[40px] w-full text-sm "
                text={
                  <>
                    {isLoading ? (
                      <CircularProgress
                        color="primary"
                        size={15}
                      />
                    ) : (
                      t("buy-now")
                    )}
                  </>
                }
                onClick={() => {}}
                type="submit"
                color="secondary"
                variant="contained"
              />
            )}

            <div className="flex w-full justify-center rounded-3xl border border-black-200">
              <ButtonLink
                className="h-[40px] w-full text-sm"
                href={CONFIGS.BASE_URL.MARKETPLACE}
                target="_blank"
                text={t("view_in_marketplace")}
                size="medium"
                variant="contained"
                icon={<Icomoon className="icon-Shopping-Cart-01" />}
              />
            </div>
          </ButtonGroup>
          {/* // TODO: Open after launch V2 */}
          {/* <InformSwitchChain
            message={MessageAlert()}
            tokenName={watch("currency")?.tokenName}
            handleClick={
              watch("currency")?.symbol === "NAKA"
                ? () =>
                    handleSwitchNetwork(
                      CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
                    )
                : () =>
                    handleSwitchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX as string)
            }
          /> */}
        </form>
      )}
    </>
  )
}
export default memo(FormBuyItem)
