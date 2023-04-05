import React, { memo } from "react"
import { Box, ButtonGroup, CircularProgress } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined"
import { Image } from "@components/atoms/image"
import { Controller } from "react-hook-form"
import DropdownListCurrency from "@feature/gameItem/atoms/DropdownListCurrency"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { useTranslation } from "next-i18next"
import Helper from "@utils/helper"
import Balance from "@components/molecules/balance/Balance"
import CONFIGS from "@configs/index"
import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import { useWeb3Provider } from "@providers/Web3Provider"
import useBuyGameItemController from "../containers/hooks/useBuyGameItemController"

const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}

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

  return (
    <>
      {game && (
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Box className="w-full">
            <div className=" grid grid-cols-1 justify-center gap-4 md:grid-cols-2">
              <div className="flex justify-center rounded-2xl border-[1px] border-neutral-700">
                <Image
                  src={game.item[0].image}
                  alt={game.item[0].name}
                  width={500}
                  height={500}
                  className="w-[80%] object-contain p-4"
                />
              </div>
              <div className="custom-scroll w-full overflow-y-scroll">
                <p className="text-white-default">Asset</p>
                <p className="text-black-default">{game.item[0].name}</p>
                <p className="text-white-default">Descriptions</p>
                <div className="text-black-default">{game.item[0].detail}</div>
              </div>
            </div>
          </Box>
          <Box className="my-4 w-full">
            <p className="py-2 uppercase text-black-default">Tier assets</p>
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
                    />
                  )}
                />
              )}
            {"item_id" in errors && (
              <p className="text-sm text-error-main">{t("required")}</p>
            )}
          </Box>
          <Box className="my-4 w-full">
            <p className="py-2 uppercase text-black-default">Currency</p>
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
          </Box>
          <p className="uppercase text-purple-primary">
            Assets / 1 Item = {watch("nakaPerItem")} NAKA
          </p>

          <div className="my-4  grid grid-cols-6  content-center gap-2 md:gap-4">
            <div className="btn">
              <ButtonIcon
                onClick={onQtyDown}
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <RemoveOutlinedIcon className="h-[30px] w-[30px] text-white-primary" />
                }
                className="flex h-[50px] w-full items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main md:ml-1 md:w-[50px]"
              />
            </div>
            <div className="input col-span-4">
              <div className="flex h-full w-full items-center justify-between rounded-xl bg-neutral-700  p-2 text-neutral-500">
                <div className="text-center">
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
                    className="hidden-input-number h-full w-full bg-neutral-700 pt-2 pl-8 text-center text-neutral-500 focus-visible:bg-neutral-700 focus-visible:outline-0 md:w-[220px]"
                    value={watch("qty")}
                  />
                </div>
                <div className="flex items-start">
                  <Image
                    src={game.item[0].image_icon}
                    alt={game.item[0].name}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
            <div className="btn">
              <ButtonIcon
                onClick={onQtyUp}
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <AddOutlinedIcon className="h-[30px] w-[30px] rotate-90 text-white-primary" />
                }
                className="flex h-[50px] w-full items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main md:ml-1 md:w-[50px]"
              />
            </div>
          </div>
          <Box className="my-4 w-full">
            <p className="py-2 uppercase text-black-default">Your Balance</p>
            <Balance
              buyItemCoinSeleced={watch("currency")}
              widthBalance="w-full"
            />
          </Box>
          <div className="my-2 flex w-full justify-between rounded-xl border border-neutral-700 p-4">
            <div className="">
              <p>TOTAL PRICE:</p>
            </div>
            <div className="flex items-baseline text-secondary-main">
              <p className="pr-2">
                {Helper.formatNumber(watch("nakaPerItem") * watch("qty") ?? 0, {
                  maximumFractionDigits: 4
                })}
              </p>
              <Image
                src="/images/logo/Logo-Master2.png"
                alt="Master2"
                width="30"
                height="30"
              />
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
          <ButtonGroup className="mt-5 flex flex-col  gap-3">
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

            <div className="flex w-full justify-center rounded-2xl  border border-black-200">
              <ButtonLink
                className="h-[40px] w-full text-sm"
                href={CONFIGS.BASE_URL.MARKETPLACE}
                target="_blank"
                text="View in Marketplace"
                size="medium"
                variant="contained"
                icon={<ShoppingCartOutlinedIcon />}
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
