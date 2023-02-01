import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { SOCIAL_SHARE } from "@configs/socialShare"
import { Link, Typography } from "@mui/material"
import React from "react"
import { v4 as uuidv4 } from "uuid"

const SideSocialShare = () => (
  <div className="sticky top-[202px]">
    <div className="absolute top-0 right-[-10%] rounded-3xl border border-neutral-800 p-2 ">
      <div className="flex flex-col items-center">
        <Typography
          sx={{
            textOrientation: "sideways",
            writingMode: "vertical-lr"
          }}
          className="my-6 font-bold text-red-card"
        >
          SHARE PLAYER CARD
        </Typography>
        <div>
          {SOCIAL_SHARE.map((item) => (
            <Link
              key={uuidv4()}
              href={item.href}
              target="_blank"
            >
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                icon={item.icon}
                className="my-3 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-red-card/20 "
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default SideSocialShare
