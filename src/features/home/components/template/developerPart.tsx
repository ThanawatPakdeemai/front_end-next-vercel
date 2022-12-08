import { ButtonLink } from "@components/atoms/buttonLink"
import CardTitle from "@components/organisms/cardTitle"
import TopPlayer from "@feature/ranking/components/template/topPlayer"
import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import DvrIcon from "@mui/icons-material/Dvr"
import Developer from "../organisms/developer"

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
        <Card className="bg-grey-A100 p-2 sm:h-auto md:h-[465px]">
          <CardTitle
            width="100%"
            icon={<DvrIcon className="mr-2 text-grey-A200" />}
            title={
              <Typography
                variant="inherit"
                className="text-grey-A200"
              >{`Looking for NAKA<DEVELOPERs>`}</Typography>
            }
            background="red"
            rightTitle={
              <ButtonLink
                href="/"
                text="Register"
                icon={<AddIcon />}
                color="error"
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
