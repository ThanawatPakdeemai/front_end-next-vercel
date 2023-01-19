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
import RightMenuBuyItem from "@feature/gameItem/components/molecules/RightMenuBuyItem"
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

import { Image } from "@components/atoms/image"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import { MESSAGES } from "@constants/messages"

export default function CardButItem() {
  // const web3 = useWeb3()
  const { t } = useTranslation()
  const { data, onSetGameItemSelectd, itemSelected } = useGameStore()
  const [gameObject, setGameObject] = useState<IGame | undefined>()
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: gameObject ? gameObject._id : ""
  })

  useEffect(() => {
    if (data) setGameObject(data)
    return () => {
      setGameObject(undefined)
    }
  }, [data])

  const onChangeSelectItem = (_item: IGameItemListData) => {
    onSetGameItemSelectd(_item)
  }

  const buttonInToGame = useMemo(() => {
    if (itemSelected && (itemSelected as IGameItemListData).qty > 0) {
      return (
        <ButtonLink
          text="Join Game"
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
  }, [itemSelected, router])

  return (
    <>
      <div className="h-full w-full rounded-3xl border-[1px] border-[#18181C] bg-[#18181C] ">
        <div className="p-4 ">
          {gameItemList && (
            <>
              <DropdownList
                title="List Items"
                list={gameItemList}
                className="w-[300px]"
                onChangeSelect={onChangeSelectItem}
              />
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
                <Image
                  src="/images/gamePage/skull.png"
                  alt="skull"
                  width="30"
                  height="30"
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
              buttonInToGame
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
