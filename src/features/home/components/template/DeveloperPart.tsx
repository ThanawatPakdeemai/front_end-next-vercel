import React, { memo } from "react"
import { Trans } from "react-i18next"
import dynamic from "next/dynamic"

const Grid = dynamic(() => import("@mui/material/Grid"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const CardTitle = dynamic(() => import("@components/organisms/CardTitle"), {
  suspense: true,
  ssr: false
})
const TopPlayer = dynamic(
  () => import("@feature/ranking/components/template/TopPlayer"),
  {
    suspense: true,
    ssr: false
  }
)
const Developer = dynamic(
  () => import("@feature/home/components/organisms/Developer"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const developerPart = () => (
  <Grid
    container
    spacing={2}
  >
    <Grid
      item
      xs={12}
      md={8}
      className="flex-1"
    >
      <div className="h-full w-full rounded-3xl !bg-neutral-800 md:h-[465px]">
        <CardTitle
          width="100%"
          icon={
            <Icomoon className="icon-Screen-Text mr-2 !text-[22px] !text-primary-main" />
          }
          title={
            <Typography
              variant="inherit"
              className="font-neue-machina-semi text-neutral-900"
            >
              <Trans i18nKey="are_you_a_developer?" />
            </Typography>
          }
          background="red"
        />
        <Developer />
      </div>
    </Grid>
    <Grid
      item
      xs={12}
      md={4}
      className="flex-1"
      sx={{
        ".card-title-page": {
          padding: "13px 10px 13px 20px",
          maxHeight: "50px"
        },
        ".card-content__wrapper": {
          padding: "14px 0px 0px 10px"
        },
        ".top-player__wrapper": {
          height: "100%",
          "&-inner": {
            flex: 1
          }
        }
      }}
    >
      <TopPlayer
        rank
        className="!md:h-[465px] ml-auto w-full !bg-neutral-800 xl:w-[449px]"
      />
    </Grid>
  </Grid>
)
export default memo(developerPart)
