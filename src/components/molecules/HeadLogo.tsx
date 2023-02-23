import LogoNaka from "@components/atoms/logo/LogoNaka"
import SelectNaka from "@components/atoms/select/SelectNaka"
import { Button, Divider, Typography, Box } from "@mui/material"
import { memo, useCallback, useEffect, useState } from "react"
import LanguageIcon from "@mui/icons-material/Language"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { useRouter } from "next/router"
import { Image } from "@components/atoms/image/index"
import { FLAGS } from "@constants/flags"
import Link from "next/link"
import { styleIcon } from "./HeadMenu"

const HeadLogo = () => {
  const router = useRouter()
  const [scrollPage, setScrollY] = useState(0)

  const onScroll = useCallback(() => {
    const { pageYOffset } = window // scrollY
    // console.log("yOffset", pageYOffset, "scrollY", scrollY)
    setScrollY(pageYOffset)
  }, [])

  useEffect(() => {
    // add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true })
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [onScroll])

  return (
    <>
      <Box
        component="div"
        className={`head-logo flex w-[360px] items-center justify-start ${
          scrollPage < 100 ? "mr-0" : "mr-[19rem]"
        }`}
      >
        <div
          className={`flex items-center justify-center  ${
            scrollPage < 100 ? "block" : " hidden"
          } `}
        >
          <Link href="/">
            <LogoNaka />
          </Link>
          <Divider
            className="!mx-5 my-2 border-neutral-700"
            orientation="vertical"
            flexItem
          />
          <Box
            component="div"
            className="flex items-center"
          >
            <LanguageIcon className="!text-error-main" />
            <SelectNaka
              imageSelectd={
                <Image
                  src={
                    FLAGS.find((flag) => flag.code === router.locale)
                      ?.flag_4x3 ?? "/assets/flags/4x3/us.svg"
                  }
                  width="50"
                  height="50"
                  alt="th"
                />
              }
              options={
                router.locales?.map((item) => ({
                  label: item.toUpperCase(),
                  value: item,
                  icon: (
                    <Image
                      src={
                        FLAGS.find((flag) => flag.code === item)?.flag_4x3 ??
                        "/assets/flags/4x3/us.svg"
                      }
                      width="20"
                      height="20"
                      alt="th"
                    />
                  ),
                  handelClick: () =>
                    router.push(router.pathname, router.asPath, {
                      locale: item
                    })
                })) ?? [{ label: "", value: "" }]
              }
              title="lang_name"
              button={
                <Button
                  sx={{ minWidth: "10px !important" }}
                  className="!rounded-[8px] !text-error-main"
                  variant="contained"
                >
                  <Typography className="!font-neue-machina-semi !text-sm !uppercase">
                    {router.locale}
                  </Typography>
                  <DragHandleIcon
                    className="!ml-2"
                    sx={styleIcon}
                  />
                </Button>
              }
            />
          </Box>
        </div>
      </Box>
    </>
  )
}
export default memo(HeadLogo)
