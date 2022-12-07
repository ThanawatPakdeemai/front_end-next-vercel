import CardTitle from "@components/organisms/cardTitle"
import { Card, Grid, Typography } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { ButtonLink } from "@components/atoms/buttonLink"
import DvrIcon from "@mui/icons-material/Dvr"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

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
        <div className="p-4">
          <Typography className="text-default text-white-primary">
            HEAVEN FOR DEVELOPERS:
          </Typography>
          <Typography className="text-default text-white-primary">
            UNLIMITED OPPORTUNITIES YOUR WAY 👀
          </Typography>
          <Typography className="mt-3 text-sm text-black-default">
            Just like mobile app developers deploy their applications on the
            Google Play Store, gaming developers now have access to the Nakamoto
            User Base - an all-in-one exclusive platform to launch their very
            own Play to Earn games. Now monetize your game in any way you want
            with our versatile platform and explore the array of interesting
            possibilities that Nakamoto Games has on board for skilled
            developers like you!
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <div className="relative">
          <Image
            src={IMAGES.tableCom.src}
            width={IMAGES.tableCom.width}
            height={IMAGES.tableCom.height}
            alt={IMAGES.tableCom.alt}
            className="m-auto"
          />
          <Image
            src={IMAGES.nakaLogo.src}
            width={IMAGES.nakaLogo.width}
            height={IMAGES.nakaLogo.height}
            alt={IMAGES.nakaLogo.alt}
            className="absolute top-5 right-5 rotate-12 text-red-default  hover:rotate-0"
          />
        </div>
      </Grid>
    </Grid>
  </Card>
)
export default memo(Developer)
