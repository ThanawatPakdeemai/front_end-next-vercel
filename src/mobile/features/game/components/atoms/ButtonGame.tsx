import { Box, Typography } from "@mui/material"
import { memo, ReactNode } from "react"
import { useRouter } from "next/router"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"

const ButtonPlayer = dynamic(
  () => import("@feature/game/components/atoms/ButtonPlayer"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonCountdown = dynamic(
  () => import("@feature/game/components/atoms/ButtonCountdown"),
  {
    suspense: true,
    ssr: false
  }
)

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
              <span
                className={`flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#18181C] p-[6px] before:h-[100%] before:w-[100%] before:rounded-full before:bg-[${
                  fillIcon ? fillIcon.toString() : "#F2C94C"
                }]`}
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
