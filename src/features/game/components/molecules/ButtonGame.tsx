import React, { memo } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import { isMobile } from "@hooks/useGlobal"

const Ellipse = dynamic(() => import("@components/atoms/svg/Ellipse"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const ButtonPlayer = dynamic(
  () => import("@feature/game/components/atoms/ButtonPlayer"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  description?: string
  textButton: string
  url: string
  fillIcon?: string
  classCssButton?: string
  onClick?: () => void
}
const ButtonGame = ({
  description,
  textButton,
  url,
  classCssButton = "btn-green-rainbow bg-green-lemon text-primary-main ",
  onClick,
  fillIcon = "#A0ED61"
}: IProp) => {
  const router = useRouter()
  return (
    <Box
      component="div"
      className="w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main  p-3 text-neutral-300 md:flex"
    >
      {description && (
        <Typography className="mx-4 text-default">{description}</Typography>
      )}
      <ButtonPlayer
        startIcon={<Ellipse fill={fillIcon} />}
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
        className={`rounded-[50px] ${classCssButton} font-bold capitalize ${
          isMobile ? "h-[44px] w-[130px]" : "h-[60px] w-[194px]"
        }`}
      />
    </Box>
  )
}
export default memo(ButtonGame)
