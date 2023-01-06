import { Box, Avatar } from "@mui/material"
import React, { memo } from "react"
import { IMAGES } from "@constants/images"
import { Image } from "@components/atoms/image"

interface IProp {
  border?: { width: string; height: string }
  borderColor?: string
  image?: { width: string; height: string }
  src?: string
}
const AvatarProfile = ({
  border = { width: "!w-[92px]", height: "!h-[92px]" },
  borderColor = "border-error-main",
  image = { width: "!w-[88px]", height: "!h-[88px]" },
  src
}: IProp) => (
  <>
    <Box
      className={` m-auto !block
        ${border.width}  ${border.height}] 
        rounded-xl border-2 ${borderColor}`}
    >
      <Avatar
        variant="square"
        className={`${image.height} ${image.width}  bg-[transparent] `}
      >
        {src && (
          <Image
            src={src ?? "/images/mocks/free2playGames/camoratuc_game.png"}
            width={88}
            height={88}
            alt={`image-${src}`}
            className={`w-full rounded-xl object-cover object-center p-[3px] ${image.height}`}
          />
        )}
      </Avatar>
    </Box>
  </>
)
export default memo(AvatarProfile)
