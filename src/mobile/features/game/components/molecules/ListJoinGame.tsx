import { Box } from "@mui/material"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import StopwatchIcon from "@components/icons/StopwatchIcon"
import { ImageCustom } from "@components/atoms/image/Image"
import PlayersIcon from "@components/icons/PlayersIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { TRoomStatus } from "@components/molecules/roomList/RoomListBar"
import { useTranslation } from "react-i18next"

interface IProps {
  image: string
  name: string
  desc?: string
  onClick?: () => void
  textChip?: string
  descChip1?: string
  descChip2?: string
  time?: string
  text?: string
  btnText: TRoomStatus
}
const ListJoinGame = ({
  image,
  name,
  onClick,
  textChip,
  descChip2,
  time,
  btnText
}: IProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[80px_calc(100%-200px)_1fr] items-center gap-4">
        <div className="roomlist-card__item--image h-[80px] w-[80px] overflow-hidden rounded-[22px]">
          <ImageCustom
            src={image}
            alt={name}
            width={80}
            height={80}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Roomlist Info */}
        <div className="roomlist-card__item--info">
          <p className="text-[18px] font-bold">Room: {textChip}</p>
          <Box
            component="div"
            sx={{
              ".timer-box": {
                background: "transparent",
                padding: "0",
                border: "0",
                ".MuiTypography-root": {
                  color: "#F2C94C",
                  fontSize: "14px"
                }
              },
              "svg": {
                width: "auto",
                "path": {
                  stroke: "#F2C94C",
                  transform: "scale(0.7)"
                }
              }
            }}
          >
            {time ? (
              <RoomListBox
                type="timer"
                timer={{
                  time: new Date(time),
                  onExpire: () => null
                }}
                color="green"
                shade="lemon"
                showClock={
                  <StopwatchIcon
                    stroke="#F32429"
                    className="mr-[-7px] w-[12px]"
                    width={16}
                    height={16}
                  />
                }
              />
            ) : (
              name
            )}
          </Box>
          <Box
            component="div"
            sx={{
              "svg": {
                width: "auto",
                "path": {
                  stroke: "#F2C94C",
                  transform: "scale(0.7)"
                }
              }
            }}
            className="flex items-center gap-2 text-[12px] text-[#F2C94C]"
          >
            <PlayersIcon
              width={20}
              height={20}
              stroke="#F2C94C"
            />
            {descChip2}
          </Box>
        </div>

        <Box
          component="div"
          sx={{
            ".btn-icon-container": {
              width: "auto !important",
              maxWidth: "80px",
              "p": {
                fontFamily: "Urbanist !important",
                fontWeight: 700
              }
            }
          }}
          className="roomlist-card__item--button ml-auto"
        >
          <ButtonToggleIcon
            handleClick={onClick}
            text={t(btnText as string) || t("join")}
            className={`first-letter:btn-green-rainbow z-[2] h-[40px] !w-[95px] ${
              btnText === "full" ? " bg-error-light" : "!bg-error-main"
            } ${
              btnText === "played"
                ? " border-[1px] border-neutral-700 bg-primary-contrastText bg-transparent !text-neutral-100"
                : "!bg-error-main"
            } text-white font-bold capitalize`}
            type="button"
            disabled={
              btnText === "full" ||
              btnText === "played" ||
              btnText === "unavailable"
            }
            startIcon={<></>}
          />
        </Box>
      </div>
    </div>
  )
}
export default ListJoinGame
