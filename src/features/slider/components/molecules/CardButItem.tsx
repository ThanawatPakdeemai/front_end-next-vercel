import React, { useEffect, useState, memo, useCallback, useMemo } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import {
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button
} from "@mui/material"
import { useGameItemContext } from "@src/contexts/gameItemContext"
import useProfileStore from "@stores/profileStore/index"
import ItemSize from "@components/atoms/loading/itemSize"
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import {
  IGameItem,
  IGameItemList,
  IGameItemListData
} from "@feature/gameItem/interfaces/IGameItemService"
import Dropdown from "@components/atoms/DropdownCustom"
import RightMenuBuyItem from "@components/molecules/rightMenu/RightMenuBuyItem"
import { useRouter } from "next/router"
import Input from "@mui/material/Input"
import DropdownList from "@components/atoms/DropdownList"
// import { useWeb3 } from "@hooks/useWeb3"
import { Trans, useTranslation } from "react-i18next"
// import { useNetworkContext } from "@src/contexts/networkContext"
// import useContractAction from "@hooks/useContract"
import useLongPress from "@hooks/useLongPress"
import {
  calculateItemPerPrice,
  encodeURILink,
  number4digit
} from "@utils/helpers"
import { buyItems } from "@src/features/buyItem/containers/services/buyItem.service"
import toast from "react-hot-toast"

const ariaLabel = { "aria-label": "description" }

export default function CardButItem() {
  // const web3 = useWeb3()
  const { t } = useTranslation()
  const data: any = useGameStore((state) => state.data)
  const [gameObject, setGameObject] = useState<IGame>()
  const profile = useProfileStore((state) => state.profile.data)
  // const { account } = useNetworkContext()
  const router = useRouter()
  // const { getNakaBalanceOf } = useContractAction()

  // State
  const [amount, setAmount] = useState(0)
  const [buttonDisabled, setButton] = useState(true)
  const [nakaPerItem, setNakaPerItem] = useState<number>(0)
  const [status, setStatus] = useState<boolean>(false)
  const [nakaPriceBuying, setNakaPriceBuying] = useState<number>(0)

  const vaultBalance = "11240.999822406691"

  const [gameItemMultiple, setGameItemMultiple] = useState<IGameItemListData[]>(
    []
  )
  const [gameItemSelected, setGameItemSelected] = useState<IGameItemListData>()
  const [gameItemPrice, setGameItemPrice] = useState<string>("")

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("naka")
  const [priceTotal, setPriceTotal] = useState("")
  const [NAKAPerUSD, setNAKAPerUSD] = useState("")

  const setTotal = (total: number) => {
    const totalNaka = total.toFixed(5)
    const totalPrice = totalNaka.substring(0, totalNaka.length - 1)
    setNakaPriceBuying(parseFloat(totalPrice))
  }

  const handleBuyDecrease = () => {
    if (amount === 0) {
      setAmount(0)
      setTotal(0)
      return
    }
    const x = amount - 1
    setAmount(x)
    setTotal(x * nakaPerItem)
  }

  const handleBuyIncrease = () => {
    const x = amount < 0 ? 0 : Number(amount) + 1
    setAmount(x)
    setTotal(x * nakaPerItem)
  }

  const handleBulletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _number = e.target.value ? Math.abs(parseInt(e.target.value, 10)) : 0
    setAmount(_number)
    const x = _number < 0 ? 0 : _number
    setTotal(x * nakaPerItem)
  }

  const decreseLongPress = useLongPress(handleBuyDecrease, 500)
  const increaseLongPress = useLongPress(handleBuyIncrease, 500)

  const outFocus = () => {
    const _number = Math.abs(amount)
    if (_number) {
      setAmount(_number)
      setTotal(_number * nakaPerItem)
    } else {
      setAmount(0)
    }
  }

  // 1. Get all items from backend
  // 2. Get item amount from smart contact item vault
  // const fetchAllItemType = async () => {};

  // Get balance of bullets --------------------------------------------------------
  useMemo(async () => {
    let cancel = false
    if (!cancel) {
      // fetchItems();
    }
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  useMemo(async () => {
    let cancel = false
    if (!cancel) {
      if (
        gameItemSelected &&
        gameItemSelected.qty >= gameItemSelected.min_item
      ) {
        setButton(false)
      }
      if (gameItemSelected) {
        const _value = await calculateItemPerPrice(gameItemSelected.price)
        if (_value) {
          setNakaPerItem(_value)
        }
      }
    }
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameItemSelected])

  const totalNakaPrice = useMemo(() => {
    if (gameItemSelected && gameItemSelected.qty > 0 && nakaPerItem > 0) {
      return gameItemSelected.qty * nakaPerItem
    }
    return 0
  }, [gameItemSelected, nakaPerItem])

  // Do Transection buy bullets and then get qty of bullets
  const onBuyItem = async (itemId: string) => {
    let cancel = false

    // if (profile && profile.email && account) {/
    if (profile && profile.email) {
      setStatus(true)
      // Set overflow hidden when open modal.
      // document.body.style.overflow = "hidden";
      const response = await buyItems({
        player_id: profile.id,
        item_id: itemId, // gameObject.item[0]._id
        qty: amount
      }).catch((error) => undefined)
      if (response) {
        // const balance = await getNakaBalanceOf(profile.address)
        // if (balance && balance.data) {
        //   const nakaBalance = Number(
        //     web3.utils.fromWei(balance.data.toString(), "ether")
        //   ).toFixed(4)
        //   setVaultBalance(Number(nakaBalance))
        // }
        if (!cancel) {
          setStatus(false)
          setButton(true)
          setAmount(0)
          setTotal(0)
          // fetchItems()
          // Remove overflow hidden when tracsection is loading.
          // document.body.style.removeProperty("overflow");
        }
      } else {
        toast.error("Cannot buy items.")
        if (!cancel) {
          setStatus(false)
          setButton(true)
          setAmount(0)
          setTotal(0)
          // Remove overflow hidden when transection finised.
          // document.body.style.removeProperty("overflow");
        }
      }
    }
    return () => {
      cancel = true
    }
  }

  // Buy Button ----------------------------------------------------------
  const handleSubmit = () => {
    setButton(false)
    if (profile && profile.email) {
      // if (account === undefined) {
      //   toast.error(t("plz_connect_wallet"))
      // } else if (account) {
      //   if (value === "naka") {
      //     setOpen(false)
      //     if (gameItemSelected) {
      //       onBuyItem(gameItemSelected._id)
      //     }
      //   } else {
      //     // pay credit card
      //     setOpen(false)
      //     setButton(true)
      //   }
      // }
    } else {
      toast.error(t("please_login"))
    }
  }
  const dataPayment = {
    open,
    setOpen,
    value,
    setValue,
    nakaPerItem,
    amount,
    nakaPriceBuying,
    submit: handleSubmit,
    icon: gameObject?.item?.[0]?.image_icon,
    priceTotal,
    setPriceTotal,
    NAKAPerUSD,
    setNAKAPerUSD
  }

  // Get value form backend
  // const fetchItems = async () => {
  //   fetchGameItem()
  // }

  const handleChange = async (event: SelectChangeEvent) => {
    const _value = await calculateItemPerPrice(
      parseFloat(event.target.value as string)
    )
    if (_value) {
      setNakaPerItem(_value)
    }
    setGameItemPrice(event.target.value as string)
    // Clear all previous value
    setButton(true)
    setAmount(0)
    setTotal(0)

    // Find current data item selected and set to redux
    const result: any = gameItemMultiple.find(
      (item: any) => item.price === parseFloat(event.target.value as string)
    )
    if (result) {
      if (result.qty >= result.min_item) {
        setButton(false)
      }
      // Set selected value
      setGameItemSelected(result)
    }
  }

  useEffect(() => {
    if (data) {
      // if (
      //   data.game_type === "singleplayer" &&
      //   data.game_type === "multiplayer"
      // ) {
      //   setGameObject(data)
      //   router.push(`${`/free-to-play-games/${data.game_url}`}`)
      // } else {
      setGameObject(data)
      setGameItemMultiple(data.item)
      setGameItemSelected(data.item[0])
      // }
    }
  }, [data])
  return (
    <>
      <div className="h-full w-full rounded-3xl border-[1px] border-[#18181C] bg-[#18181C] ">
        <div className="p-4 ">
          {data && gameObject && (
            <>
              <DropdownList
                title="List Items"
                list={data.item}
                className="w-[300px]"
              />
              {/* <Box className="box-item-list w-full">
                <FormControl className="select-from-group w-full">
                  {gameItemSelected && (
                    <InputLabel id="game-items-select-label">
                      <ItemSize
                        image_icon={gameItemSelected.image_icon}
                        name={gameItemSelected.name}
                        price={gameItemSelected.price}
                        item_size={gameItemSelected.item_size}
                      />
                    </InputLabel>
                  )}
                  <Select
                    labelId="game-items-select-label"
                    id="game-items-select"
                    value={gameItemPrice}
                    label="Game Items"
                    onChange={handleChange}
                    IconComponent={ExpandCircleDownIcon}
                  >
                    {gameItemMultiple &&
                      gameItemMultiple.length > 0 &&
                      gameItemMultiple
                        .slice()
                        .sort((a: any, b: any) => a.price - b.price)
                        .map((item: any) => (
                          <MenuItem
                            key={item._id}
                            value={item.price}
                          >
                            <div className="flex grid grid-cols-2 items-center  justify-items-center  gap-2">
                              <ItemSize
                                image_icon={item.image_icon}
                                name={item.name}
                                price={item.price}
                                item_size={item.item_size}
                              />
                              <p className="text-[#ffffff]">
                                XL{" "}
                                {`${item.qty ? item.qty : 0}${` ${item.name}`}`}
                              </p>
                            </div>
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Box> */}
            </>
          )}
          <div className="my-2 w-full rounded-xl border-[1px] border-[#111111] bg-[#111111] p-2">
            <p className="uppercase text-[#ffffff]">
              MY <span className="text-[#7B5BE6]">Skull XL</span> BAG
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
            <div className="flex w-full flex-col justify-between">
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#E1E2E2]  p-2 text-center text-[#111111]">
                <p>0.00</p>

                <img
                  src="/images/gamePage/skull.png"
                  alt=""
                />
              </div>
              <div className="mb-2 flex w-full justify-between rounded-xl bg-[#232329] p-2 text-center text-[#70727B]">
                <p>= 0.00 </p>
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
              <ButtonLink
                text="Join Game"
                href="/"
                icon={<LogoutIcon />}
                size="medium"
                color="secondary"
                variant="contained"
                className="w-full"
                onClick={() => {
                  router.push(`/${router.asPath}/roomlist`)
                }}
              />
            ) : (
              <ButtonLink
                text="Please Login and Connect Wallet"
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
