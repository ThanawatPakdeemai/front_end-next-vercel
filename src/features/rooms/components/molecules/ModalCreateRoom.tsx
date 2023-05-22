/* eslint-disable no-nested-ternary */
import ButtonClose from "@components/atoms/button/ButtonClose"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
// import FlagIcon from "@components/icons/FlagIcon"
// import LockIcon from "@components/icons/LockIcon"
import PlayersIcon from "@components/icons/PlayersIcon"
import CountItem from "@components/molecules/CountItem"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { MESSAGES } from "@constants/messages"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useCreateRoom from "@feature/rooms/hooks/useCreateRoom"
import { useToast } from "@feature/toast/containers"
import { MapOutlined } from "@mui/icons-material"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material"
import { useSocketProviderRoom } from "@providers/SocketProviderRoom"
import useCountStore from "@stores/countComponant"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { unstable_batchedUpdates } from "react-dom"
// import { Image } from "@components/atoms/image/index"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGameGlobal from "@hooks/useGameGlobal"

interface IProp {
  gameData: IGame
}
interface IPropMessage {
  status: boolean
  message: string
}
const ModalCreateRoom = ({ gameData }: IProp) => {
  const [maps, setMaps] = useState<IGameMap[]>([])
  const [map, setMap] = useState<number>(1)
  const [itemUse, setItemUse] = useState<number>(1)
  const [isPublicRoom, setIsPublicRoom] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [profile, setProfile] = useState<IProfile>()

  const router = useRouter()
  const { successToast, errorToast } = useToast()
  const { fetchRoom } = useSocketProviderRoom()
  const profileStore = useProfileStore((state) => state.profile)
  const { itemSelected, setQtyItemOfRoom } = useGameStore()
  const count = useCountStore((state) => state.count)
  const setCount = useCountStore((state) => state.setCount)
  const setMin = useCountStore((state) => state.setMin)
  const setMax = useCountStore((state) => state.setMax)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { conditionGameFree, conditionPlayToEarn } = useGameGlobal()

  const { mutateCreateRoom, isLoading } = useCreateRoom()
  const { t } = useTranslation()
  const { gameItemList, balanceofItem } = useBuyGameItemController()
  // const { gameItemList } = useGamesByGameId({
  //   _playerId: profile ? profile.id : "",
  //   _gameId: gameData ? gameData._id : ""
  // })

  const handleSetIsCurrent = (status: boolean) => {
    setIsPublicRoom(status)
  }

  const handleSubmit = () => {
    if (
      gameItemList &&
      balanceofItem &&
      balanceofItem.data > 0 &&
      balanceofItem.data >= itemUse
    ) {
      const gameItem = gameItemList.find((ele) => ele._id === itemSelected?._id)
      if (conditionGameFree || (gameItem && gameItem.qty >= itemUse)) {
        if (conditionPlayToEarn) {
          setItemUse(0)
        }

        if (profile) {
          mutateCreateRoom({
            _gameId: gameData.id,
            _playerId: profile ? profile.id : "",
            _walletAddress: profile ? profile.address : "",
            _itemId: conditionGameFree
              ? gameItemList?.[0]?._id
              : itemSelected
              ? itemSelected?._id
              : "",
            _maxPlayer: count,
            _numberItem: itemUse,
            _mapId: map,
            _publicRoom: isPublicRoom
          })
            .then(async (_res) => {
              if (_res) {
                await setOpen(false)
                fetchRoom()
                setQtyItemOfRoom(itemUse)
                setCount(gameData.min_player || 2)
                successToast(MESSAGES["create-room-success"])
                await router.push(`${router.asPath}/${_res?.data.room_id}`)
              }
            })
            .catch((error) => {
              if ((error as IPropMessage)?.message?.length > 0) {
                errorToast(
                  (error as IPropMessage)?.message?.[0]?.["msg"] ?? "Error"
                )
              } else {
                errorToast((error as IPropMessage)?.message ?? "Error")
              }
            })
        }
      } else {
        errorToast(MESSAGES["you-not-enough"])
      }
    } else {
      errorToast(MESSAGES["you-not-enough"])
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (profileStore && profileStore.data) {
        setProfile(profileStore.data)
      }
    }

    return () => {
      load = true
    }
  }, [profileStore])

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) {
        if (gameData.map && gameData.type_code === "multi_02") {
          setMaps(gameData.map)
        }
        unstable_batchedUpdates(() => {
          setCount(gameData.min_player || 2)
          setMin(gameData.min_player || 2)
          setMax(gameData.max_players || 8)
        })
      }
    }

    return () => {
      load = true
    }
  }, [gameData, setCount, setMax, setMin])

  return (
    <>
      <ButtonToggleIcon
        handleClick={handleOpen}
        startIcon={<PlusIcon />}
        text={t("create_room")}
        className="btn-rainbow-theme z-[2] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
        type="button"
      />
      <ModalCustom
        open={open}
        onClose={handleClose}
        width={353}
      >
        <div className="flex w-full flex-col gap-y-[22px]">
          <Box
            component="div"
            className="flex items-center rounded-lg bg-neutral-800 pr-[7px]"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <Typography className="pl-[22px] uppercase text-neutral-300">
                {t("create_room")}
              </Typography>
            </div>
            <ButtonClose onClick={handleClose} />
          </Box>
          {/* <TextField
            label="Room Name"
            placeholder="Room Name..."
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlagIcon />
                </InputAdornment>
              )
            }}
          /> */}
          {/* <CountItem
            _item={itemUse}
            _addItem={() => setItemUse(itemUse > 9 ? 10 : itemUse + 1)}
            _minusItem={() => setItemUse(itemUse < 2 ? 1 : itemUse - 1)}
            endIcon={
              <Image
                src={gameItemList?.[0]?.image_icon ?? ""}
                width={15}
                height={15}
                alt={gameItemList?.[0]?.item_size ?? ""}
              />
            }
            label={t("number_of_items")}
          /> */}
          <CountItem
            endIcon={<PlayersIcon />}
            label={t("number_of_players")}
          />
          {gameData && gameData.type_code === "multi_02" && (
            <TextField
              label={t("select_map")}
              select
              placeholder={`${t("select_map")}...`}
              value={map}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapOutlined />
                  </InputAdornment>
                )
              }}
            >
              {maps &&
                maps.map((option: IGameMap) => (
                  <MenuItem
                    sx={{
                      borderRadius: 4
                    }}
                    key={option.map_id}
                    value={option.map_id}
                    onClick={() => setMap(Number(option.map_id))}
                  >
                    {option.map_name}
                  </MenuItem>
                ))}
            </TextField>
          )}
          <div className="flex text-sm text-neutral-500">
            <span>{t("room_status")} :</span>
            <button
              className="ml-2 mr-[10px]"
              type="button"
              onClick={() => handleSetIsCurrent(true)}
            >
              <span className={isPublicRoom ? "!text-neutral-300" : ""}>
                {t("public")}
              </span>
            </button>
            <SwitchCustom
              checked={isPublicRoom}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsPublicRoom(true)
                } else {
                  setIsPublicRoom(false)
                }
              }}
            />
            <button
              className="ml-[10px] mr-2"
              type="button"
              onClick={() => handleSetIsCurrent(false)}
            >
              <span className={!isPublicRoom ? "!text-neutral-300" : ""}>
                {t("private")}
              </span>
            </button>
          </div>
          {/* <TextField
            placeholder="Password..."
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon stroke="#70727B" />
                </InputAdornment>
              )
            }}
          /> */}
          <ButtonToggleIcon
            className=" flex items-center bg-secondary-main text-white-default"
            startIcon={null}
            disabled={isLoading}
            text={
              isLoading ? (
                <CircularProgress
                  color="primary"
                  size={20}
                />
              ) : (
                t("create")
              )
            }
            handleClick={handleSubmit}
            type="button"
          />
        </div>
      </ModalCustom>
    </>
  )
}

export default ModalCreateRoom
