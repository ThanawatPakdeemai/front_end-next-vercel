import ButtonClose from "@components/atoms/button/ButtonClose"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import PlayersIcon from "@components/icons/PlayersIcon"
import CountItem from "@components/molecules/CountItem"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import { MapOutlined } from "@mui/icons-material"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material"
import { useTranslation } from "react-i18next"

interface IProp {
  gameData: IGame
}

const ModalCreateRoom = ({ gameData }: IProp) => {
  const { t } = useTranslation()

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
