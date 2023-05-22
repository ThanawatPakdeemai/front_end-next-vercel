import React from "react"
import dayjs from "dayjs"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import useProfileStore from "@stores/profileStore"
import Link from "next/link"

const HeadProfileMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <AppBar className="">
      <Toolbar className="contents">
        <header className="header fixed inset-x-0 z-[999] bg-primary-main">
          <div className="mx-[16px] my-[14px] flex h-[52px] flex-row items-center justify-between">
            <div className="flex h-full flex-col justify-around">
              <Typography className="text-[10px] uppercase text-neutral-600">
                {dayjs().format("dddd D MMMM YYYY")}
              </Typography>
              <Typography className="font-mondwest text-[20px] text-neutral-300">
                ⛅️ {profile?.username}
              </Typography>
            </div>
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border-[2px] border-solid border-neutral-700">
              <Link href={`/profile/${profile?.id}`}>
                <Image
                  src={profile?.avatar || "/images/avatar.png"}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </Link>
            </div>
          </div>
        </header>
      </Toolbar>
    </AppBar>
  )
}

export default HeadProfileMobile
