import { Box, Avatar, Badge } from "@mui/material"
import React, { memo } from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  border?: { width: string; height: string }
  borderColor?: string
  image?: { width: string; height: string }
  src?: string
  imageBadge?: string
}
const AvatarProfile = ({
  border = { width: "!w-[92px]", height: "!h-[92px]" },
  borderColor = "border-error-main",
  image = { width: "!w-[88px]", height: "!h-[88px]" },
  imageBadge,
  src
}: IProp) => (
  <>
    <Box
      className={` flex h-[92px] items-center justify-center
        ${border.width}  ${border.height}] 
        rounded-xl border-2 ${borderColor}`}
    >
      <Badge
        sx={{ "span": { backgroundColor: "transparent !important" } }}
        badgeContent={
          imageBadge && (
            <Image
              src={imageBadge ?? imageBadge}
              width={40}
              height={40}
              alt={`image-${src}`}
              className="$ h-[44px] w-[44px] rounded-xl object-cover object-center p-[3px]"
            />
          )
        }
        color="primary"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Avatar
          variant="square"
          className={`${image.height} ${image.width} bg-[transparent] `}
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
      </Badge>
    </Box>
  </>
)
export default memo(AvatarProfile)
