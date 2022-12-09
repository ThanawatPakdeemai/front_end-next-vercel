import { Box, Button, Typography } from "@mui/material"
import { memo } from "react"
import { Image } from "@components/atoms/image/index"
import SelectNaka from "@components/atoms/select/SelectNaka"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { useTranslation } from "next-i18next"
import { MENU } from "@constants/menu"
import Link from "next/link"
import { IMAGES } from "@constants/images"

const styleButton = {
  minWidth: "10px !important",
  borderRadius: "15px !important"
}
export const styleIcon = {
  fontSize: "20px !important"
}
const HeadMenu = () => {
  const { t } = useTranslation()
  return (
    <Box
      component="div"
      className="items-center justify-center gap-1 rounded-default bg-grey-900 p-1 sm:flex-row md:flex"
    >
      {MENU.map((item) => {
        if (!item.isChide) {
          return (
            <>
              <Link href={item.link}>
                <Button
                  key={`${item.name}`}
                  sx={styleButton}
                  className=" text-black-default hover:bg-error-main hover:text-white-primary"
                  variant="contained"
                  size="large"
                >
                  <Typography className="font-neue-machina-semi text-default">
                    {t(`${item.name}`)}
                  </Typography>
                </Button>
              </Link>
            </>
          )
        }
        return (
          <>
            <SelectNaka
              key={`${item.name}`}
              imageSelectd={
                <Image
                  src={item.image.src ?? IMAGES.footerMock.src}
                  width={item.image.widthImg ?? IMAGES.footerMock.height}
                  height={item.image.height ?? IMAGES.footerMock.height}
                  alt={item.image.alt ?? IMAGES.footerMock.height}
                  className="m-auto"
                />
              }
              options={
                item.chide?.map((ele) => ({
                  label: ele.name,
                  value: ele.name,
                  textEnd: ele.textRight,
                  icon: typeof ele.icon === "string" ? ele.icon : <ele.icon />
                })) ?? [{ label: "", value: "" }]
              }
              widthOption="600px"
              title={item.name}
              left={item.left}
              button={
                <Button
                  sx={styleButton}
                  className="px-2 text-black-default hover:bg-error-main hover:text-white-primary"
                  variant="contained"
                  size="large"
                >
                  <Typography className="whitespace-nowrap font-neue-machina-semi text-sm">
                    {t(`${item.name}`)}
                  </Typography>
                  <DragHandleIcon
                    className="ml-2"
                    sx={styleIcon}
                  />
                </Button>
              }
            />
          </>
        )
      })}
    </Box>
  )
}

export default memo(HeadMenu)
