import { Box, Typography } from "@mui/material"
import { memo, ReactNode } from "react"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import { useRouter } from "next/router"
import ButtonPlayer from "@feature/game/components/atoms/ButtonPlayer"
import { isMobile } from "react-device-detect"
import ButtonCountdown from "@feature/game/components/atoms/ButtonCountdown"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

interface IProp {
  description?: string
  textButton: string | ReactNode
  url: string
  fillIcon?: string
  classCssButton?: string
  onClick?: () => void
  textColor?: string
  disabled?: boolean
  time?: null | Date
  buttonIcon?: { show: boolean; bgColor: string; icon?: ReactNode }
}
const ButtonGame = ({
  description,
  textButton,
  url,
  fillIcon = "#A0ED61",
  classCssButton = "btn-green-rainbow bg-green-lemon text-primary-main ",
  onClick,
  textColor,
  disabled,
  time,
  buttonIcon
}: IProp) => {
  const router = useRouter()
  return (
    <>
      <Box
        component="div"
        className="m-auto flex  w-fit items-center justify-center gap-3 rounded-[50px] border  border-neutral-800 bg-primary-main p-1 text-neutral-300"
      >
        {description && (
          <Typography className={`mx-4 w-[75px] text-[6.2px] ${textColor}`}>
            {description}
          </Typography>
        )}

        {buttonIcon?.show || time ? (
          <ButtonCountdown
            time={!!time}
            endTime={time ? (time as Date) : undefined}
            handleClick={() => {
              if (onClick) {
                onClick()
              } else {
                router.push(`${url}`)
              }
            }}
            text={
              <Typography className="w-[100px] font-neue-machina text-base uppercase  text-green-lemon">
                {textButton}
              </Typography>
            }
            endIcon={
              buttonIcon?.icon || (
                <HighlightOffIcon className=" text-primary-main" />
              )
            }
            className={`${classCssButton} !m-auto  h-[60px] !w-[60px]
                    rounded-full 
                text-primary-main ${
                  buttonIcon?.bgColor || ""
                } font-bold capitalize `}
          />
        ) : (
          <ButtonPlayer
            disabled={disabled}
            startIcon={
              <Ellipse
                width={18}
                height={18}
                fill={fillIcon}
              />
            }
            handleClick={() => {
              if (onClick) {
                onClick()
              } else {
                router.push(`${url}`)
              }
            }}
            text={
              <Typography
                className={`w-full font-neue-machina uppercase text-primary-main ${
                  isMobile ? "text-sm" : "text-2xl"
                }`}
              >
                {textButton}
              </Typography>
            }
            className={`!mt-0 rounded-[50px] ${
              disabled
                ? "btn-green-rainbow bg-neutral-680 text-primary-main"
                : classCssButton
            } font-bold capitalize ${
              isMobile ? "h-[44px] w-[130px]" : "h-[60px] w-[194px]"
            }`}
          />
        )}
      </Box>
    </>
  )
}
export default memo(ButtonGame)
