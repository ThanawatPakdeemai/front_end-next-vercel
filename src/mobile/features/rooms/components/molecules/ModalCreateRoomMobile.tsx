import ButtonClose from "@components/atoms/button/ButtonClose"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlayersIcon from "@components/icons/PlayersIcon"
import CountItem from "@components/molecules/CountItem"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import useCreateRoomController from "@feature/rooms/hooks/useCreateRoomController"
import ButtonFilledTemplate from "@mobile/components/templates/ButtonFilledTemplate"
import ModalWithHeaderTemplate from "@mobile/components/templates/ModalWithHeaderTemplate"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import { MapOutlined } from "@mui/icons-material"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  SwipeableDrawer
} from "@mui/material"
import { useTranslation } from "react-i18next"

interface ICreateRoomProps {
  map: number
  maps: IGameMap[]
  setMap: React.Dispatch<React.SetStateAction<number>>
  handleSetIsCurrent: (_status: boolean) => void
  isPublicRoom: boolean
}

interface IProp extends ICreateRoomProps {
  gameData: IGame
  openCreateRoom: boolean
  setOpenCreateRoom: React.Dispatch<React.SetStateAction<boolean>>
  setIsPublicRoom: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  handleSubmit: () => void
}

const ModalCreateRoomMobile = ({
  gameData,
  openCreateRoom,
  setOpenCreateRoom,
  ...props
}: IProp) => {
  const { t } = useTranslation()
  const { clearAllDrawer } = useDrawerControllerMobile()

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={openCreateRoom}
      onClose={() => setOpenCreateRoom(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenCreateRoom(true)
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={StyleDrawer}
    >
      <ModalWithHeaderTemplate title={"Create Room"}>
        <div className="flex w-full flex-col gap-y-[22px]">
          {/* <Box
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
          </Box> */}
          <CountItem
            endIcon={<PlayersIcon />}
            label={t("number_of_players")}
          />
          {gameData && gameData.type_code === "multi_02" && (
            <TextField
              label={t("select_map")}
              select
              placeholder={`${t("select_map")}...`}
              value={props.map}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapOutlined />
                  </InputAdornment>
                )
              }}
            >
              {props.maps &&
                props.maps.map((option: IGameMap) => (
                  <MenuItem
                    sx={{
                      borderRadius: 4
                    }}
                    key={option.map_id}
                    value={option.map_id}
                    onClick={() => props.setMap(Number(option.map_id))}
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
              onClick={() => props.handleSetIsCurrent(true)}
            >
              <span className={props.isPublicRoom ? "!text-neutral-300" : ""}>
                {t("public")}
              </span>
            </button>
            <SwitchCustom
              checked={props.isPublicRoom}
              onChange={(e) => {
                if (e.target.checked) {
                  props.setIsPublicRoom(true)
                } else {
                  props.setIsPublicRoom(false)
                }
              }}
            />
            <button
              className="ml-[10px] mr-2"
              type="button"
              onClick={() => props.handleSetIsCurrent(false)}
            >
              <span className={!props.isPublicRoom ? "!text-neutral-300" : ""}>
                {t("private")}
              </span>
            </button>
          </div>
          <ButtonToggleIcon
            className=" flex items-center bg-secondary-main text-white-default"
            startIcon={null}
            disabled={props.isLoading}
            text={
              props.isLoading ? (
                <CircularProgress
                  color="primary"
                  size={20}
                />
              ) : (
                t("create")
              )
            }
            handleClick={props.handleSubmit}
            type="button"
          />
        </div>
      </ModalWithHeaderTemplate>
    </SwipeableDrawer>
  )
}

export default ModalCreateRoomMobile
