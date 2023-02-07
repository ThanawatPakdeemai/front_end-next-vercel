import React, { memo } from "react"
import { Box, ButtonGroup } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined"
import useGameStore from "@stores/game"
import { CURRENCY } from "@configs/currency"
import { Image } from "@components/atoms/image"
import { Controller, useForm } from "react-hook-form"
import useProfileStore from "@stores/profileStore"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import DropdownListCurrency from "@feature/gameItem/atoms/DropdownListCurrency"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"
import { useToast } from "@feature/toast/containers"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { useTranslation } from "next-i18next"
// import { registTournament } from "@feature/tournament/containers/services/tournament.service"

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

const FromBuyItem = () => {
  const { t } = useTranslation()
  const game = useGameStore((state) => state.data)
  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast } = useToast()

  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      player_id: profile ? profile?.id : "",
      item_id: "",
      currency_id: "",
      qty: 1,
      item: {},
      currency: {}
    }
  })
  const onSubmit = (_data) => {
    // console.log(_data)
  }

  const onError = (_data) => {
    errorToast("error")
  }
  return (
    <>
      {game && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Box>
            <div className=" grid grid-cols-2 justify-center gap-4">
              <div className="flex justify-center rounded-2xl border-[1px] border-neutral-700">
                <Image
                  src={
                    (watch("item") as IGameItemListData).image_icon ??
                    "/images/gamePage/Silver_Skull.png"
                  }
                  alt="Silver_Skull"
                  width={100}
                  height={100}
                  className="w-full p-4"
                />
              </div>
              <div className="">
                <p className="text-white-default">Asset</p>
                <p className="text-black-default">
                  {(watch("item") as IGameItemListData).name}
                </p>
                <p className="text-white-default">Descriptions</p>
                <div className=" text-black-default line-clamp-4 ">
                  {(watch("item") as IGameItemListData).detail}
                </div>
              </div>
            </div>
          </Box>
          <Box className="my-4 w-full pr-4">
            <p className="py-2 uppercase text-black-default">Tier assets</p>
            {gameItemList && (
              <Controller
                name="item_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DropdownListItem
                    {...field}
                    list={gameItemList}
                    className="w-[410px]"
                    onChangeSelect={(_item) => {
                      setValue("item", _item)
                      setValue("item_id", _item._id)
                    }}
                  />
                )}
              />
            )}
            {"item_id" in errors && (
              <p className="text-sm text-error-main">{t("required")}</p>
            )}
          </Box>
          <Box className="my-4 w-full pr-4">
            <p className="py-2 uppercase text-black-default">Currency</p>
            <Controller
              name="currency_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DropdownListCurrency
                  {...field}
                  list={CURRENCY}
                  className="w-[410px]"
                  onChangeSelect={(_item) => {
                    setValue("currency", _item)
                    setValue("currency_id", _item.id)
                  }}
                />
              )}
            />
            {"currency_id" in errors && (
              <p className="text-sm text-error-main">{t("required")}</p>
            )}
          </Box>
          <p className="uppercase text-purple-primary">
            Skull {} = 13.8389 NAKA
          </p>

          <div className="my-4  grid grid-cols-6  content-center gap-4">
            <div className="btn">
              <ButtonIcon
                onClick={() =>
                  setValue("qty", watch("qty") <= 1 ? 1 : watch("qty") - 1)
                }
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <RemoveOutlinedIcon className="h-[30px] w-[30px] text-white-primary" />
                }
                className="ml-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main"
              />
            </div>
            <div className="input col-span-4">
              <div className="flex h-full w-full justify-between rounded-xl bg-neutral-700 p-2  text-neutral-500">
                <div className="text-center">
                  <input
                    {...register("qty", { required: true })}
                    onChange={(event: any) => {
                      const qty = Number(event.target.value)
                      if (qty <= 1) {
                        setValue("qty", 1)
                      } else if (qty >= 99) {
                        setValue("qty", 99)
                      } else {
                        setValue("qty", qty)
                      }
                    }}
                    className="h-full w-[220px] bg-neutral-700 pt-2 text-center text-neutral-500 focus-visible:outline-0"
                    value={watch("qty")}
                  />
                </div>
                <Image
                  src="/images/gamePage/skull.png"
                  alt="skull"
                />
              </div>
            </div>
            <div className="btn">
              <ButtonIcon
                onClick={() =>
                  setValue("qty", watch("qty") >= 99 ? 99 : watch("qty") + 1)
                }
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={
                  <AddOutlinedIcon className="h-[30px] w-[30px] rotate-90 text-white-primary" />
                }
                className="ml-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-secondary-main"
              />
            </div>
          </div>
          <div className="my-2 flex w-full justify-between rounded-xl border border-neutral-700 p-4">
            <div className="">
              <p>TOTAL PRICE:</p>
            </div>
            <div className="flex items-baseline text-secondary-main">
              <p className="pr-2">0.00</p>
              <Image
                src="/images/logo/Logo-Master2.png"
                alt="Master2"
                width="30"
                height="30"
              />
            </div>
          </div>
          <div className="w-full text-end">
            <p className="text-sm text-black-default">= $0.00</p>
          </div>
          <ButtonGroup className="mt-10 flex flex-col  gap-3">
            <ButtonLink
              href=""
              size="medium"
              className="h-[40px] w-full text-sm "
              text={t("buy-now")}
              onClick={() => {}}
              type="submit"
              color="secondary"
              variant="contained"
            />
            <div className="flex w-full justify-center rounded-2xl  border border-black-200">
              <ButtonLink
                className="h-[40px] w-full text-sm"
                href="/"
                text="View in Marketplace"
                size="medium"
                variant="contained"
                icon={<ShoppingCartOutlinedIcon />}
              />
            </div>
          </ButtonGroup>
        </form>
      )}
    </>
  )
}
export default memo(FromBuyItem)
