import LogoNaka from "@components/atoms/logoNaka"
import SelectNaka from "@components/atoms/selectNaka"
import { Button, Divider, Typography } from "@mui/material"
import { memo } from "react"
import LanguageIcon from "@mui/icons-material/Language"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { useRouter } from "next/router"
import { Image } from "@components/atoms/image/index"
import { FLAGS } from "@constants/flags"

const HeadLogo = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center">
        <LogoNaka />
        <Divider
          className="mx-5 my-2 border-grey-900"
          orientation="vertical"
          flexItem
        />
        <div className="flex items-center">
          <LanguageIcon className="text-error-main" />
          <SelectNaka
            imageSelectd={
              <Image
                src={
                  FLAGS.find((flag) => flag.code === router.locale)?.flag_4x3 ??
                  "/assets/flags/4x3/us.svg"
                }
                width="50"
                height="50"
                alt="th"
              />
            }
            options={
              router.locales?.map((item) => ({
                label: item,
                value: item,
                image: (
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
            title="language"
            button={
              <Button
                sx={{ minWidth: "10px !important" }}
                className="text-error-main"
                variant="contained"
              >
                <Typography className="font-neue-machina">
                  {router.locale}
                </Typography>
                <DragHandleIcon />
              </Button>
            }
          />
        </div>
      </div>
    </>
  )
}
export default memo(HeadLogo)
