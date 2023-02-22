import React, { memo } from "react"
import { Box, ButtonGroup, CircularProgress } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined"
import useGameStore from "@stores/game"
import { Image } from "@components/atoms/image"
import { Controller, useForm } from "react-hook-form"
import useProfileStore from "@stores/profileStore"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import DropdownListCurrency from "@feature/gameItem/atoms/DropdownListCurrency"
import DropdownListItem from "@feature/gameItem/atoms/DropdownListItem"
import { useToast } from "@feature/toast/containers"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { useTranslation } from "next-i18next"
import Helper from "@utils/helper"
import useGetBalanceVault from "@feature/inventory/containers/hooks/useGetBalanceVault"
import useWalletStore from "@stores/wallet"
import useLoadingStore from "@stores/loading"
import useChainSupport from "@stores/chainSupport"

import CONFIGS from "@configs/index"
import { DEFAULT_CURRENCY_BNB, DEFAULT_CURRENCY_NAKA } from "@configs/currency"
import { BaseToastComponent } from "@feature/toast/components"
import useAllBalances from "@hooks/useAllBalances"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useBuyGameItems from "../containers/hooks/useBuyGameItems"

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
interface IProp {
  handleClose?: () => void
  chainId: string
}

interface IFormData {
  player_id: string
  item_id: string
  qty: number
  currency: ITokenContract
  nakaPerItem: number
  item: IGameItemListData
}

const FromBuyItem = ({ handleClose, chainId }: IProp) => {
  const { t } = useTranslation()
  const game = useGameStore((state) => state.data)
  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast, successToast } = useToast()
  const { gameItemList, refetch } = useGamesByGameId({
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
      qty: 1,
      item: {},
      currency: {},
      nakaPerItem: 0
    }
  })

  const { mutateBuyItems, isLoading, mutateBuyItemsBSC } = useBuyGameItems()
  const { balanceVaultNaka } = useGetBalanceVault(
    profile?.address ?? "",
    !!profile
  )
  const { busdVaultBalance } = useAllBalances()
  const { setVaultBalance } = useWalletStore()
  const { chainSupport } = useChainSupport()
  const { setOpen, setClose } = useLoadingStore()

  const onSubmit = (_data: IFormData | any) => {
    setOpen("Blockchain transaction in progress...")
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        mutateBuyItemsBSC({
          _player_id: _data.player_id,
          _item_id: _data.item_id,
          _qty: Number(_data.qty),
          _tokenAddress: _data.currency.address,
          _symbol: _data.currency.symbol
        })
          .then((res) => {
            // TODO: check balance vault dynamic
            if (res && busdVaultBalance && busdVaultBalance.digit) {
              refetch()
              // setVaultBalance(Number(busdVaultBalance))
              successToast("Buy Items Success")
              setClose()
              if (handleClose) handleClose()
            }
          })
          .catch((error) => {
            errorToast(error.message)
            setClose()
          })
        break

      default:
        mutateBuyItems({
          _player_id: _data.player_id,
          _item_id: _data.item_id,
          _qty: Number(_data.qty)
        })
          .then((res) => {
            if (res && balanceVaultNaka && balanceVaultNaka.data) {
              refetch()
              setVaultBalance(Number(balanceVaultNaka.data))
              successToast("Buy Items Success")
              setClose()
              if (handleClose) handleClose()
            }
          })
          .catch((error) => {
            errorToast(error.message)
            setClose()
          })
        break
    }
  }

  const onError = () => {
    errorToast("Please fill in the required fields")
    setClose()
  }

  const updatePricePerItem = () => {
    Helper.calculateItemPerPrice(
      (watch("item") as IGameItemListData).price
    ).then((res) => {
      if (res) {
        setValue("nakaPerItem", Number(res))
      } else {
        setValue("nakaPerItem", 0)
      }
    })
  }

  const onQtyUp = () => {
    setValue("qty", watch("qty") >= 99 ? 99 : Number(watch("qty")) + 1)
    updatePricePerItem()
  }

  const onQtyDown = () => {
    setValue("qty", watch("qty") <= 1 ? 1 : Number(watch("qty")) - 1)
    updatePricePerItem()
  }

  const MessageAlert = (): string => {
    if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      return "You can switch your Metamask to Polygon network \n  to using your NAKA token to buy items"
    }
    return "You can switch your Metamask to BSC network \n to using another token to buy items"
  }

  const getDefaultCoin = () => {
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return DEFAULT_CURRENCY_BNB
      default:
        return DEFAULT_CURRENCY_NAKA
    }
  }

  return (
    <>
      {game && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Box>
            <div className=" grid grid-cols-2 justify-center gap-4">
              <div className="flex justify-center rounded-2xl border-[1px] border-neutral-700">
                <Image
                  src={game.item[0].image}
                  alt={game.item[0].name}
                  width={100}
                  height={100}
                  className="w-full p-4"
                />
              </div>
              <div className="custom-scroll overflow-y-scroll">
                <p className="text-white-default">Asset</p>
                <p className="text-black-default">{game.item[0].name}</p>
                <p className="text-white-default">Descriptions</p>
                <div className="text-black-default">{game.item[0].detail}</div>
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
                      setValue("item", _item as IGameItemListData)
                      setValue("item_id", _item._id)
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
          <Box className="my-4 w-full pr-4">
            <p className="py-2 uppercase text-black-default">Currency</p>
            <Controller
              name="currency"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DropdownListCurrency
                  {...field}
                  list={
                    chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB
                      ? chainSupport
                      : getDefaultCoin()
                  }
                  className="w-[410px]"
                  onChangeSelect={(_item) => {
                    setValue("currency", _item as ITokenContract)
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

          <div className="my-4  grid grid-cols-6  content-center gap-4">
            <div className="btn">
              <ButtonIcon
                onClick={onQtyDown}
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
                    className="h-full w-[220px] bg-neutral-700 pt-2 text-center text-neutral-500 focus-visible:bg-neutral-700 focus-visible:outline-0"
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
                onClick={onQtyUp}
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
                watch("qty") ??
                  0 * Number((watch("item") as IGameItemListData)?.price) ??
                  0
              )}
            </p>
          </div>
          <ButtonGroup className="mt-10 flex flex-col  gap-3">
            <ButtonLink
              href=""
              size="medium"
              disabled={isLoading}
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

          <Box
            sx={{
              ".MuiTypography-root": {
                fontSize: "90%"
              },
              ".MuiAlert-action": {
                display: "none"
              },
              ".switch-chain--subtitle": {
                fontSize: "80%"
              }
            }}
          >
            <BaseToastComponent
              text={MessageAlert()}
              status="info"
              onClose={() => {}}
              className="mt-10 w-full"
            />
            {/* <SwitchChain variant={"simple"} /> */}
          </Box>
        </form>
      )}
    </>
  )
}
export default memo(FromBuyItem)
