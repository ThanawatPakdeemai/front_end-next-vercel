import { Box, Typography } from "@mui/material"
import { memo } from "react"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import { useRouter } from "next/router"
import ButtonPlayer from "@feature/game/components/atoms/ButtonPlayer"
import { isMobile } from "react-device-detect"

interface IProp {
  description?: string
  textButton: string
  url: string
  fillIcon?: string
  classCssButton?: string
  onClick?: () => void
  textColor?: string
}
const ButtonGame = ({
  description,
  textButton,
  url,
  fillIcon = "#A0ED61",
  classCssButton = "btn-green-rainbow bg-green-lemon text-primary-main ",
  onClick,
  textColor
}: IProp) => {
  const router = useRouter()
  return (
    <>
      <Box
        component="div"
        className="m-auto flex  w-fit items-center justify-center gap-3 rounded-[50px] border  border-neutral-800 bg-primary-main p-1 text-neutral-300"
      >
        {description && (
          <Typography className={`mx-4 w-[99px] text-[6.2px] ${textColor}`}>
            {description}
          </Typography>
        )}
        <ButtonPlayer
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
          // className={`h-[60px] w-[194px] rounded-[50px] ${classCssButton} font-bold capitalize`}
          className={`rounded-[50px] ${classCssButton} font-bold capitalize ${
            isMobile ? "h-[44px] w-[130px]" : "h-[60px] w-[194px]"
          }`}
        />
      </Box>
    </>
  )
}
export default memo(ButtonGame)
