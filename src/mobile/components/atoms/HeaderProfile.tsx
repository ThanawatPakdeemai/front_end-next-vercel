import useProfileStore from "@stores/profileStore"
import dayjs from "dayjs"
import { Image } from "@components/atoms/image/index"

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
            className={`before:d-inline text-green-lemon before:mx-2 before:h-[6px] before:w-[6px] before:rounded-full ${
              profile ? " before:bg-green-lemon " : " before:bg-error-main "
            }before:content-['**']
            `}
          >
            LV. {profile?.level}{" "}
            {profile ? (
              "Online"
            ) : (
              <span className=" text-error-main">Offline</span>
            )}
          </p>
          <p className=" font-mondwest text-[20px] capitalize text-neutral-300">
            {title}
          </p>
        </div>
        <div className=" flex w-auto max-w-fit items-center  justify-end rounded-[14px] border-[2px]  border-neutral-700 p-[6px]">
          <Image
            src={profile?.avatar || ""}
            alt={profile?.username || "avatar profile"}
            width={40}
            height={40}
            loading="lazy"
            className=" rounded-[14px] object-cover object-center"
          />
        </div>
      </div>
    </>
  )
}
export default HeaderProfile
