import React from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  title: string
}

const HeaderProfile = ({ title }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const today = dayjs(new Date()).format("dddd DD MMMM YYYY")

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2 p-[16px]">
        <div className="flex max-w-[239px] flex-wrap items-center font-neue-machina text-xs uppercase leading-[30px] text-neutral-600">
          <p>{today}</p>
          <p
            className={`before:d-inline  before:mx-2 before:h-[6px] before:w-[6px] before:rounded-full after:text-xs ${
              profile
                ? " text-green-lemon before:bg-green-lemon"
                : " text-error-main before:bg-error-main"
            } before:content-['**']
            `}
          >
            LV. {profile?.level}{" "}
            {profile ? (
              "Online"
            ) : (
              <span className=" text-error-main">Offline</span>
            )}
          </p>
          <p className=" truncate whitespace-nowrap font-mondwest text-[20px] normal-case  text-neutral-300">
            {title}
          </p>
        </div>
        <div className=" relative flex w-auto  max-w-fit items-center justify-end  rounded-[14px] border-[2px] border-neutral-700 p-[6px]">
          <div className="before:d-inline text-error-main after:absolute after:right-[7px] after:top-[7px] after:h-[12px] after:w-[12px] after:rounded-full after:bg-error-main after:text-xs after:content-['**']" />
          <Image
            src={Helper.convertAvatar(profile?.avatar || "")}
            alt={profile?.username || "avatar profile"}
            width={40}
            height={40}
            loading="lazy"
            className=" rounded-[14px] object-cover object-center "
          />
        </div>
      </div>
    </>
  )
}
export default HeaderProfile
