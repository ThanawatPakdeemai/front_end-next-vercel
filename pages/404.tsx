import { ImageCustom } from "@components/atoms/image/Image"
import IconArrowRight from "@components/icons/arrowRightIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Typography } from "@mui/material"
import Meta from "@src/meta"
import { useRouter } from "next/router"
import React from "react"

const CustomPage404 = () => {
  const router = useRouter()
  return (
    <div className="not-found relative flex h-screen w-screen flex-col items-center justify-center">
      {/* Meta */}
      <Meta title="404 Not Found" />

      <div className="mx-auto grid-cols-2 items-center px-4 md:container md:grid md:px-0">
        <div className="xs:p-0 flex flex-col items-center sm:pl-36 md:items-start">
          <div className="inline-block">
            <ImageCustom
              src="/images/logo_404.svg"
              width={170}
              height={45}
              alt="404-logo"
            />
          </div>
          <div className="mt-6 mb-4">
            <Typography
              variant="h1"
              className="font-extrabold "
            >
              404
            </Typography>
          </div>
          <Typography
            variant="h4"
            className="text-white"
          >
            Whoa, you&apos;ve traveled too far...
          </Typography>
          <Typography
            variant="body2"
            className="mt-4"
          >
            The page is lost, sorry.
          </Typography>
          <ButtonToggleIcon
            type="button"
            className=" mt-5 w-[50%] bg-error-main font-bold text-error-contrastText !no-underline"
            text="Back to Home"
            startIcon={null}
            handleClick={() => {
              router.push("/")
            }}
            endIcon={<IconArrowRight stroke="#010101" />}
          />
        </div>
        <div className="mx-auto mt-10 max-w-md md:mx-0 md:max-w-none">
          <ImageCustom
            src="/images/not_found.webp"
            alt="404 Not Found"
            width={600}
            height={450}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default CustomPage404
