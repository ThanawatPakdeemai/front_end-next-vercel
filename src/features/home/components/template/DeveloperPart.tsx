import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import DvrIcon from "@mui/icons-material/Dvr"
import CardTitle from "@components/organisms/CardTitle"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import Developer from "@feature/home/components/organisms/Developer"
import { Trans } from "react-i18next"

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
        <Card className="h-full w-full !bg-neutral-800 p-2 md:h-[465px]">
          <CardTitle
            width="100%"
            icon={<DvrIcon className="mr-2 !text-neutral-900" />}
            title={
              <Typography
                variant="inherit"
                className="text-neutral-900"
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
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className="flex-1"
      >
        <TopPlayer className="!md:h-[465px] ml-auto w-full !bg-neutral-800 !p-2 xl:w-[449px]" />
      </Grid>
    </Grid>
  </>
)
export default memo(developerPart)
