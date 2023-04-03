import { Image } from "@components/atoms/image"
import { BANNER_DATA } from "@constants/banner"
import { useRouter } from "next/router"
import React from "react"

/**
 *
 * @description this is dynamic banner to add more please
 * go to constants/banner.ts
 */
const Banners = () => {
  const router = useRouter()
  const { title, textColor, imgSrc } =
    BANNER_DATA.find(({ path }) => path === router.pathname) ||
    (router.pathname.includes("marketplace") &&
      BANNER_DATA.find(({ path }) => path === "/marketplace")) ||
    BANNER_DATA[0]

  return (
    <div className="bg-line-linear-gradient mb-2 hidden h-48 overflow-hidden rounded-3xl border border-neutral-800 bg-primary-main uppercase sm:flex md:mb-12">
      <div className="z-10 mx-[0.3rem] flex w-full items-center justify-center md:mx-0">
        <div className="flex w-full select-none items-center justify-between">
          <span
            className={`mx-auto font-neue-machina-bold text-[46px] font-black uppercase md:pl-20 lg:mx-0
            ${title === "referral program" ? " px-5 " : ""}
            ${
              textColor === "red"
                ? "text-shadow-red text-error-main"
                : "text-shadow-purple text-secondary-main"
            }`}
          >
            {title}
          </span>
          <Image
            src={imgSrc}
            alt={title}
            width={635}
            height={180}
            className="hidden md:flex"
          />
        </div>
      </div>
    </div>
  )
}

export default Banners
