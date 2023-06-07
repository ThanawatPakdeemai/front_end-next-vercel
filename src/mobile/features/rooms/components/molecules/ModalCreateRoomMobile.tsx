import React from "react"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlayersIcon from "@components/icons/PlayersIcon"
import CountItem from "@components/molecules/CountItem"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import ModalWithHeaderTemplate from "@mobile/components/templates/ModalWithHeaderTemplate"
import GameInfoCard from "@mobile/features/game/components/molecules/GameInfoCard"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { StyleCreateRoom, StyleDrawer } from "@mobile/styles/muiStyleMobile"
import { MapOutlined } from "@mui/icons-material"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  SwipeableDrawer,
  Button
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
      <ModalWithHeaderTemplate title="Create Room">
        <Box
          component="div"
          className="modal-create-room flex w-full flex-col gap-y-[22px] py-4"
          sx={StyleCreateRoom}
        >
          <GameInfoCard
            key={gameData._id}
            id={gameData._id}
            image={gameData.image_category_list}
            title={gameData.name}
          />
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
          <div className="modal-create-room__roomStatus flex justify-between text-sm text-neutral-500">
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
          <Box
            component="div"
            className="flex gap-3"
          >
            <Button
              variant="contained"
              className=" h-[58px] w-[170px] min-w-0 rounded-[100px] rounded-bl-3xl border border-solid border-neutral-710 !bg-neutral-710"
              onClick={() => clearAllDrawer()}
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Cancel
              </div>
            </Button>
            <Button
              variant="contained"
              className="h-[58px] w-[170px] min-w-0 rounded-[100px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
              onClick={props.handleSubmit}
              disabled={props.isLoading}
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                {t("create")}
              </div>
            </Button>
            {/* <ButtonToggleIcon
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
            /> */}
          </Box>
        </Box>
      </ModalWithHeaderTemplate>
    </SwipeableDrawer>
  )
}

export default ModalCreateRoomMobile
