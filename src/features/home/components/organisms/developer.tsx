import CardTitle from "@components/organisms/cardTitle"
import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { ButtonLink } from "@components/atoms/buttonLink"
import DvrIcon from "@mui/icons-material/Dvr"
import DeveloperTitle from "../molecules/developerTitle"
import DeveloperContent from "../molecules/developerContent"

const Developer = () => (
  <Card className="bg-black-02 p-2 sm:h-auto md:h-[465px]">
    <CardTitle
      width="100%"
      icon={<DvrIcon className="mr-2 text-black-01" />}
      title={
        <Typography
          variant="inherit"
          className="text-black-01"
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
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <DeveloperTitle />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <DeveloperContent />
      </Grid>
    </Grid>
  </Card>
)
export default memo(Developer)
