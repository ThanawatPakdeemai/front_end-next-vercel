import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import DvrIcon from "@mui/icons-material/Dvr"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import Developer from "@feature/home/components/organisms/Developer"

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
              >{`Looking for NAKA<DEVELOPERs>`}</Typography>
            }
            background="red"
            rightTitle={
              <ButtonLink
                href="/joinus"
                text="joinus"
                icon={<AddIcon />}
                color="error"
                size="small"
                className="button-global button-transparent !text-primary-main"
              />
            }
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
