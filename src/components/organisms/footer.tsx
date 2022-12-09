import { Card, Divider, Typography } from "@mui/material"
import { ButtonLink } from "@src/components/atoms/buttonLink"
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined"
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined"
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined"
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import ButtonLinkOutLine from "@components/atoms/buttonLink/ButtonLinkOutLine"

const Footer = () => (
  <>
    <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
    <div className="flex justify-between text-[12px]">
      <div className="flex">
        <div className="w-48">
          <div className="mb-4 uppercase text-white-primary">game</div>
          <Typography className="text-[10px] uppercase text-black-default">
            Play To earn
          </Typography>
          <h4>Play To Earn Mode</h4>
          <Typography className="text-[10px] uppercase text-black-default">
            Free to play
          </Typography>
          <h4>Free Mode</h4>
          <h4>Story Mode</h4>
          <Typography className="text-[10px] uppercase text-black-default">
            Events
          </Typography>
          <h4>Tournament</h4>
        </div>
        <div className="w-48">
          <div className="mb-4 uppercase text-white-primary">services</div>
          <h4>P2P DEX</h4>
          <h4>Staking</h4>
          <h4>Referral Program</h4>
          <h4>Coupon</h4>
        </div>
        <div className="w-48">
          <div className="mb-4 uppercase text-white-primary">
            NAKA ecosystemss
          </div>
          <h4>Blog</h4>
          <div className="flex">
            <h4>About Us</h4>
            <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
          </div>
          <div className="flex">
            <h4>Marketplace</h4>
            <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
          </div>
          <div className="flex">
            <h4>Nakaverse</h4>
            <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
          </div>
          <div className="flex">
            <h4>Nakapunks</h4>
            <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
          </div>
        </div>
      </div>

      <div className="w-[500px] justify-self-end">
        <div className="mb-4 uppercase text-white-primary">
          BE A PART OF THE PLAY TO EARN REVOLUTION!
        </div>
        Join the
        {/* industry's  */}
        first comprehensive Play to Earn ecosystem and explore the many benefits
        it has to offer.
        <div className="my-8 w-[280px]">
          <ButtonLink
            href="/"
            text="Join The Revolutions"
            icon={<WineBarOutlinedIcon />}
            color="secondary"
          />
        </div>
        <div className="flex">
          <Card
            sx={{
              color: "#E1E2E2",
              padding: 1.5,
              borderRadius: 0.5,
              marginRight: 1,
              backgroundColor: "#18181C",
              border: 1,
              borderColor: "#232329"
            }}
          >
            <DvrOutlinedIcon />
          </Card>
          <Card
            sx={{
              padding: 1.5,
              borderRadius: 0.5,
              marginRight: 1
            }}
          >
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
        </div>
      </div>
    </div>
    <div className="flex pt-[80px] text-[12px]">
      <Card
        sx={{
          backgroundColor: "#18181C",
          padding: 4
        }}
      >
        <div
          className="flex"
          text-white-primary
        >
          <div className="w-[400px]">
            <ButtonLinkOutLine
              href="/"
              text="Become a Naka Devs"
              icon={<DvrOutlinedIcon />}
              color="primary"
            />
          </div>
          <h3 className="pl-[30px] text-grey-neutral04">
            Join the
            {/* industry's */}
            first comprehensive Play to Earn ecosystem.
          </h3>

          <div className="w-[400px]">
            <ButtonLinkOutLine
              href="/"
              text="Become a Partner"
              icon={<LocalAtmOutlinedIcon />}
              color="primary"
            />
          </div>
          <h3 className="pl-[30px] text-grey-neutral04">
            Earn some serious cash promoting Nakamoto.Games
          </h3>
        </div>
      </Card>
      <Card
        sx={{
          backgroundColor: "#18181C",
          height: "fit",
          marginLeft: 2,
          padding: 5
        }}
      >
        <NorthOutlinedIcon />
      </Card>
    </div>
    <div className="flex justify-between py-[50px] text-[10px] uppercase text-[#4E5057]">
      <h4>Copyright 2022 © Nakamoto Games</h4>
      <h4>icon</h4>
      <h4>Scure by : polygon network</h4>
    </div>
  </>
)

export default Footer
