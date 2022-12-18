import { Box, Button, Typography } from "@mui/material"
import { memo } from "react"
import { Image } from "@components/atoms/image/index"
import SelectNaka from "@components/atoms/select/SelectNaka"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { useTranslation } from "next-i18next"
import { MENU } from "@constants/menu"
import Link from "next/link"
import { IMAGES } from "@constants/images"
import { useRouter } from "next/router"

export const styleIcon = {
  fontSize: "20px !important"
}
const HeadMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "15px !important"
  }
  return (
    <Box
      component="div"
      className="xs:table xs:my-5 m-auto my-5 w-max items-center justify-center gap-1 rounded-default bg-neutral-700 p-1 md:flex lg:my-0"
    >
      {MENU.map((item) => {
        if (!item.isChide) {
          return (
            <Link
              href={item.link}
              className="m-auto table"
              key={`${item.name}`}
            >
              <Button
                sx={styleButton}
                className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary mb-1 !text-black-default ${
                  router.pathname === item.link
                    ? "!bg-primary-main"
                    : "!bg-neutral-800"
                } md:mb-0`}
                variant="contained"
                size="large"
              >
                <Typography className="!font-neue-machina-semi !text-sm">
                  {t(`${item.name}`)}
                </Typography>
              </Button>
            </Link>
          )
        }
        return (
          <div
            className="m-auto table"
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
                  textEnd: ele.textRight,
                  link: ele.link,
                  icon: typeof ele.icon === "string" ? ele.icon : <ele.icon />
                })) ?? [{ label: "", value: "", link: "/" }]
              }
              widthOption="600px"
              title={item.name}
              left={item.left}
              button={
                <Button
                  sx={styleButton}
                  className={`button-select-naka xs:mb-1 !hover:bg-error-main  !hover:text-white-primary mb-1 px-2 !text-black-default md:mb-0 ${
                    router.pathname === item.link
                      ? "!bg-primary-main"
                      : "!bg-neutral-800"
                  }`}
                  variant="contained"
                  size="large"
                >
                  <Typography className="!whitespace-nowrap !font-neue-machina-semi !text-sm">
                    {t(`${item.name}`)}
                  </Typography>
                  <DragHandleIcon
                    className="ml-2"
                    sx={styleIcon}
                  />
                </Button>
              }
            />
          </div>
        )
      })}
    </Box>
  )
}

export default memo(HeadMenu)
