import { Box, Typography } from "@mui/material"
import { memo } from "react"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import { useRouter } from "next/router"
import ButtonOwner from "../atoms/ButtonOwner"

interface IProp {
  description: string
  textButton: string
  url: string
  fillIcon?: string
  classCssButton?: string
}
const ButtonGame = ({
  description,
  textButton,
  url,
  fillIcon = "#A0ED61",
  classCssButton = " btn-green-rainbow bg-green-lemon text-primary-main "
}: IProp) => {
  const router = useRouter()
  return (
    <>
      <Box
        className={` ${""} w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main  p-3 text-neutral-300 md:flex`}
      >
        <Typography className="mx-4 text-default">{description}</Typography>
        <ButtonOwner
          startIcon={<Ellipse fill={fillIcon} />}
          handleClick={() => {
            router.push(`${url}`)
          }}
          text={
            <Typography className="w-full   font-neue-machina text-2xl uppercase text-primary-main">
              {textButton}
            </Typography>
          }
          className={`h-[60px] w-[194px] rounded-[50px] ${classCssButton} font-bold capitalize`}
        />
      </Box>
    </>
  )
}
export default memo(ButtonGame)
