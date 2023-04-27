import LogoNaka from "@components/atoms/logo/LogoNaka"
import SelectNaka from "@components/atoms/select/SelectNaka"
import { Button, Divider, Typography, Box } from "@mui/material"
import { memo, useCallback, useEffect, useState } from "react"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { useRouter } from "next/router"
import { Image } from "@components/atoms/image/index"
import { FLAGS } from "@constants/flags"
import useGlobal from "@hooks/useGlobal"
import Link from "next/link"
import MarketplaceTextIcon from "@components/icons/marketplace/MarketplaceTextIcon"
import GameDeveloperIcon from "@components/icons/GameDeveloperIcon"
import GlobalIcon from "@components/icons/GlobalIcon"
import { styleIcon } from "./HeadMenu"

const HeadLogo = () => {
  const router = useRouter()
  const [scrollPage, setScrollY] = useState(0)
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const onScroll = useCallback(() => {
    const { pageYOffset } = window // scrollY
    setScrollY(pageYOffset)
  }, [])

  useEffect(() => {
    let load = false

    if (!load) {
      // add eventlistener to window
      window.addEventListener("scroll", onScroll, { passive: true })
      // remove event on unmount to prevent a memory leak with the cleanup
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      load = true
    }
  }, [onScroll])

  /**
   * @description Get color logo
   * @returns {string}
   */
  const themeColor = (): string => {
    if (isMarketplace) {
      return "!text-secondary-main"
    }
    if (isDeveloperPage) {
      return "!text-green-lemon"
    }
    return "text-error-main"
  }

  /**
   * @description Get color divider
   * @returns {string}
   */
  const dividerColor = (): string => {
    if (isMarketplace) {
      return "border-neutral-700"
    }
    if (isDeveloperPage) {
      return "border-green-lemon"
    }
    return "border-neutral-700"
  }

  /**
   * @description Get color divider
   * @returns {"text" | "outlined" | "contained" | undefined}
   */
  const renderVariant = (): "text" | "outlined" | "contained" | undefined => {
    if (isMarketplace) {
      return "text"
    }
    if (isDeveloperPage) {
      return "text"
    }
    return "contained"
  }

  return (
    <>
      <Box
        component="div"
        className={`head-logo mt-2 flex w-full items-center justify-center transition-all duration-75 sm:justify-start md:flex-1 lg:mt-0 ${
          isMarketplace ? "lg:w-[500px]" : "lg:w-[360px]"
        } lg:flex-none ${scrollPage < 100 ? "opacity-100" : "opacity-0"}`}
      >
        <div className="ml-2 flex w-full items-center md:w-auto md:justify-center lg:ml-0">
          <Link
            href="/"
            className="col-span-3 mx-auto w-full md:col-span-1"
          >
            <LogoNaka />
          </Link>
          {/* {scrollPage < 100 && (
            
          )} */}

          {isDeveloperPage && (
            <Box
              component="div"
              className="ml-4"
            >
              <GameDeveloperIcon />
            </Box>
          )}
          {isMarketplace && (
            <Link
              href="/marketplace"
              className="col-span-2 md:col-span-1"
            >
              <MarketplaceTextIcon className="ml-3" />
            </Link>
          )}
          <Divider
            className={`my-2 hidden md:!mx-5 md:block ${dividerColor().toString()}`}
            orientation="vertical"
            flexItem
          />
          <Box
            component="div"
            className="ms:ml-0 col-span-1 ml-auto flex h-auto items-center "
          >
            <GlobalIcon className={themeColor().toString()} />
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
                  className={`!rounded-[8px] ${themeColor().toString()}`}
                  variant={renderVariant()}
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
