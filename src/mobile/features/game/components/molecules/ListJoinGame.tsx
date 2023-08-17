import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { TGameRoomStatus } from "@feature/game/interfaces/IGameService"

const RoomListBox = dynamic(
  () => import("@components/molecules/roomList/RoomListBox"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
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
  btnText: TGameRoomStatus
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
                  <Icomoon className="icon-Stopwatch w-[12px mr-[-7px] text-[F32429]" />
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
            <Icomoon className="icon-Users-Group text-[#F2C94C]" />
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
            // When logout button display "join" text
            text={btnText === "unavailable" ? "join" : t(btnText as string)}
            className={`first-letter:btn-green-rainbow z-[2] h-[40px] !w-[95px] ${
              btnText === "full" ? " bg-error-light" : "!bg-error-main"
            } ${
              btnText === "played"
                ? " border-[1px] border-error-main !bg-transparent !text-error-main"
                : "!bg-error-main"
            } text-white font-bold capitalize`}
            type="button"
            disabled={btnText === "full" || btnText === "unavailable"}
            startIcon={<></>}
          />
        </Box>
      </div>
    </div>
  )
}
export default ListJoinGame
