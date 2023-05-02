import { Grid, Typography } from "@mui/material"
import { memo } from "react"
import CardTitle from "@components/organisms/CardTitle"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import Developer from "@feature/home/components/organisms/Developer"
import { Trans } from "react-i18next"
import ScreenIcon from "@components/icons/ScreenIcon"

const developerPart = () => (
  <>
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
            icon={<ScreenIcon className="mr-2" />}
            title={
              <Typography
                variant="inherit"
                className="font-neue-machina-semi text-neutral-900"
              >
                <Trans i18nKey="are_you_a_developer?" />
              </Typography>
            }
            background="red"
            // TODO: Open after launch V2
            // rightTitle={
            //   <ButtonLink
            //     href="/joinus"
            //     text={<Trans i18nKey="joinus" />}
            //     icon={<AddIcon />}
            //     color="error"
            //     size="small"
            //     className="button-global button-transparent !text-primary-main"
            //   />
            // }
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
  </>
)
export default memo(developerPart)
