import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import DvrIcon from "@mui/icons-material/Dvr"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import Developer from "../organisms/Developer"

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
      >
        <Card className="!bg-neutral-800 p-2 sm:h-auto md:h-[465px]">
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
                href="/"
                text="Register"
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
      >
        <TopPlayer />
      </Grid>
    </Grid>
  </>
)
export default memo(developerPart)
