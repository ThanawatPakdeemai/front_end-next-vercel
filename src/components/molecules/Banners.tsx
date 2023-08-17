import { useRouter } from "next/router"
import React from "react"
import dynamic from "next/dynamic"
import { BANNER_DATA } from "@constants/banner"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  className?: string
}

/**
 *
 * @description this is dynamic banner to add more please
 * go to constants/banner.ts
 */
const Banners = ({ className }: IProp) => {
  const router = useRouter()
  const banner = BANNER_DATA.find(({ path }) => path === router.asPath)

  return banner ? (
    <div
      className={`bg-line-linear-gradient mb-2 hidden h-48 overflow-hidden rounded-3xl border border-neutral-780 bg-primary-main uppercase sm:flex md:mb-12 ${className}`}
    >
      <div className="z-10 mx-[0.3rem] flex w-full items-center justify-center md:mx-0">
        <div className="flex w-full select-none items-center justify-between">
          <span
            className={`mx-auto font-neue-machina-bold text-[46px] font-black uppercase md:pl-20 lg:mx-0
            ${banner.title === "referral program" ? " px-5 " : ""}
            ${
              banner.textColor === "red"
                ? "text-shadow-red text-error-main"
                : "text-shadow-purple text-secondary-main"
            }`}
          >
            {banner.title}
          </span>
          <Image
            src={banner.imgSrc}
            alt={banner.title}
            width={635}
            height={180}
            className="hidden md:flex"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Banners
