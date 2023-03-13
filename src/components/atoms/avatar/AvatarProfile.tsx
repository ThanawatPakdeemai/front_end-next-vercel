import { Box, Avatar, Badge, Chip, Typography } from "@mui/material"
import React, { memo } from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  border?: { width: string; height: string }
  borderColor?: string
  image?: { width: string; height: string }
  src?: string
  imageBadge?: string
  badgeCenter?: { status: boolean; name: string }
  height?: string
  badgeColor?: string
}
const AvatarProfile = ({
  border = { width: "!w-[92px]", height: "!h-[92px]" },
  borderColor = "border-error-main",
  image = { width: "!w-[88px]", height: "!h-[88px]" },
  imageBadge,
  src,
  badgeCenter = { status: false, name: "" },
  height = "h-[92px]",
  badgeColor = "!bg-green-lemon"
}: IProp) => (
  <div className="flex justify-center	">
    <Box
      className={` flex ${height} items-center justify-center
        ${border.width}  ${border.height}] 
        rounded-xl border-2 ${borderColor}`}
    >
      <Badge
        sx={{ "span": { backgroundColor: "transparent !important" } }}
        badgeContent={
          imageBadge ? (
            <Image
              src={imageBadge}
              width={40}
              height={40}
              alt="image-profile"
              className="$ h-[44px] w-[44px] rounded-xl object-cover object-center p-[3px]"
            />
          ) : (
            <></>
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
            <>
              <Box className=" relative w-full">
                <Image
                  src={src ?? "/images/mocks/free2playGames/camoratuc_game.png"}
                  width={88}
                  height={88}
                  alt={`image-${src}`}
                  className={`${image.width} rounded-xl object-cover object-center p-[3px] ${image.height}`}
                />
                {badgeCenter.status && badgeCenter.name && (
                  <Chip
                    size="small"
                    label={
                      <Typography className=" font-neue-machina text-xs capitalize text-primary-main">
                        {badgeCenter.name}
                      </Typography>
                    }
                    className={`absolute left-[20px] top-[60px]
                  !h-[20px] rounded-less ${badgeColor}`}
                  />
                )}
              </Box>
            </>
          )}
        </Avatar>
      </Badge>
    </Box>
  </div>
)
export default memo(AvatarProfile)
