import React, { memo } from "react"
import { Badge, Box, Button, Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import SelectNaka from "@components/atoms/select/SelectNaka"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { IMAGES } from "@constants/images"
import { useRouter } from "next/router"
import { MENU, MENU_MARKETPLACE } from "@configs/menu"
import tailwindResolver from "tailwindResolver"
import useGlobal from "@hooks/useGlobal"
import HamburgerIcon from "@components/icons/HamburgerIcon"

const HeadMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "15px !important",
    "&:hover": {
      boxShadow: "none !important",
      "svg rect": {
        fill: "#E1E2E2 !important"
      }
    }
  }
  const { isMarketplace } = useGlobal()
  const MENU_DATA = isMarketplace ? MENU_MARKETPLACE : MENU

  const renderIcon = (ele) => {
    if (typeof ele.icon === "string") {
      return (
        <Image
          src={ele.icon}
          alt={ele.name}
          width="20"
        />
      )
    }
    if (React.isValidElement(ele.icon)) {
      return ele.icon
    }
    return (
      <ele.icon
        className="!hover:text-neutral-300 !text-primary-contrastText"
        stroke={
          tailwindResolver
            ? tailwindResolver?.theme?.colors?.["primary"]["contrastText"]
            : "#E1E2E2"
        }
        strokeWidth="0.1"
      />
    )
  }

  return (
    <Box
      component="div"
      className="order-3 w-full rounded-[19px] p-[6px] sm:order-2 sm:w-auto"
      sx={{
        background: "rgba(1, 1, 1, 0.2)",
        backdropFilter: "blur(15px)"
      }}
    >
      <Box
        component="div"
        className="xs:my-5 m-auto grid max-w-[505px] flex-[1_1_100%] grid-cols-2 items-center justify-center gap-1 overflow-hidden rounded-[13px] bg-neutral-700 p-[5px] sm:flex md:order-1 md:mb-0 lg:my-0 lg:flex-none"
      >
        {MENU_DATA.map((item, _index) => {
          // const activeHomeMarket: boolean =
          //   router.asPath.split("/")[2] !== "p2p" &&
          //   item.link.split("/")[2] !== "p2p" &&
          //   router.asPath.split("/")[2] !== "map" &&
          //   item.link.split("/")[2] !== "map"

          // const activeP2p =
          //   router.asPath.split("/")[2] === "p2p" &&
          //   item.link.split("/")[2] === "p2p"

          if (!item.isChide && item.chide === undefined) {
            return (
              <Link
                href={item.link}
                className="m-auto table w-full md:w-auto"
                key={`${item.name}`}
              >
                <Button
                  sx={styleButton}
                  className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary w-full !rounded-[8px] !px-[23px] !py-[12px] !text-black-default ${
                    router.pathname === item.link
                      ? "!bg-primary-main"
                      : "!bg-neutral-800"
                  } md:mb-0`}
                  variant="contained"
                  size="large"
                >
                  <Typography
                    className={`!font-neue-machina-semi !text-sm ${
                      router.pathname === item.link ? "!text-neutral-300" : ""
                    }`}
                  >
                    {t(`${item.name}`)}
                  </Typography>
                </Button>
              </Link>
            )
          }
          return (
            <div
              className="m-auto table w-full md:w-auto "
              key={`${item.name}`}
            >
              <SelectNaka
                imageSelectd={
                  <Image
                    src={item.image.src ?? IMAGES.tableCom.src}
                    width={item.image.widthImg ?? IMAGES.tableCom.height}
                    height={item.image.height ?? IMAGES.tableCom.height}
                    alt={item.image.alt ?? IMAGES.tableCom.height}
                    className="m-auto"
                  />
                }
                options={
                  item.chide?.map((ele) => ({
                    label: ele.name,
                    value: ele.name,
                    textEnd: t(ele.textRight),
                    link: ele.link,
                    icon: renderIcon(ele)
                  })) ?? [{ label: "", value: "", link: "/" }]
                }
                widthOption="600px"
                title={item.name === "NAKA Ecosystem" ? "Others" : item.name}
                left={item.left}
                button={
                  <Button
                    sx={styleButton}
                    className={`button-select-naka xs:mb-1 !hover:bg-error-main  !hover:text-white-primary group w-full !min-w-[100px]  !rounded-[8px] !py-[12px] px-2 !text-black-default last:p-[15px_5px_13px] md:mb-0 md:w-auto ${
                      // item.isChide &&
                      // item.chide &&
                      router.pathname ===
                      [...item.chide].find(
                        (ele) => ele.link === router.pathname
                      )?.link
                        ? "!bg-primary-main"
                        : "!bg-neutral-800"
                    }`}
                    variant="contained"
                    size="large"
                  >
                    {/* // TODO: Open after launch V2 */}
                    <Badge
                      color="error"
                      variant="dot"
                      invisible // ถ้ามี แจ้งเตือน false
                      // sx={{ "& .MuiBadge-badge": { margin: "9px -10px 0 0" } }}
                    >
                      {item.name !== "NAKA Ecosystem" ? (
                        <div className="flex items-center gap-1">
                          <Typography
                            className={`!whitespace-nowrap !font-neue-machina-semi !text-sm ${
                              router.pathname ===
                              [...item.chide].find(
                                (ele) => ele.link === router.pathname
                              )?.link
                                ? "!text-neutral-300"
                                : ""
                            }`}
                          >
                            {t(`${item.name}`)}
                          </Typography>
                          <HamburgerIcon fill="#70727B" />
                          {/* <DragHandleIcon
                            // className="ml-4"
                            sx={styleIcon}
                          /> */}
                        </div>
                      ) : (
                        <>
                          <Typography className="flex h-4 items-center !whitespace-nowrap !font-neue-machina-semi !text-[7px]">
                            &#x2022; &#x2022; &#x2022;
                          </Typography>
                        </>
                      )}
                    </Badge>
                  </Button>
                }
              />
            </div>
          )
        })}
      </Box>
    </Box>
  )
}

export default memo(HeadMenu)
