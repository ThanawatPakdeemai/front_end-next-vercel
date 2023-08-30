import { MapOutlined } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material"
import dynamic from "next/dynamic"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import useCreateRoomController from "@feature/rooms/hooks/useCreateRoomController"
import SwitchCustom from "@styles/themes/partial/SwitchCustom"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonClose = dynamic(
  () => import("@components/atoms/button/ButtonClose"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const CountItem = dynamic(() => import("@components/molecules/CountItem"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  gameData: IGame
}

const ModalCreateRoom = ({ gameData }: IProp) => {
  const { t } = useTranslation()
  const {
    handleOpen,
    open,
    handleClose,
    map,
    maps,
    setMap,
    handleSetIsCurrent,
    isPublicRoom,
    setIsPublicRoom,
    isLoading,
    handleSubmit
  } = useCreateRoomController({
    gameData
  })

  return (
    <>
      <ButtonToggleIcon
        handleClick={handleOpen}
        startIcon={<Icomoon className="icon-Plus1" />}
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
          <CountItem
            endIcon={<Icomoon className="icon-Users-Group" />}
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
              aria-label="public room"
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
              aria-label="private room"
              onClick={() => handleSetIsCurrent(false)}
            >
              <span className={!isPublicRoom ? "!text-neutral-300" : ""}>
                {t("private")}
              </span>
            </button>
          </div>
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
