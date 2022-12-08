import { Card, Divider } from "@mui/material"
import { ButtonLink } from "@src/components/atoms/buttonLink"
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined"
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined"
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined"
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined"

const Footer = () => (
  <>
    <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
    <div className="flex justify-between">
      <div className="flex">
        <div className="w-48">
          <div>game</div>
          <h4>Play To earn</h4>
          <h4>Free to play</h4>
          <h4>Free Mode</h4>
          <h4>Story Mode</h4>
          <h4>Events</h4>
          <h4>Tournament</h4>
        </div>
        <div className="w-48">
          <div>services</div>
          <h4>P2P DEX</h4>
          <h4>Staking</h4>
          <h4>Referral Program</h4>
          <h4>Coupon</h4>
        </div>
        <div className="w-64">
          <div>NAKA ecosystemss</div>
          <h4>Blog</h4>
          <h4>About Us</h4>
          <h4>Marketplace</h4>
          <h4>Nakaverse</h4>
          <h4>Nakapunks</h4>
        </div>
      </div>

      <div className="w-[500px] justify-self-end">
        <div>BE A PART OF THE PLAY TO EARN REVOLUTION!</div>
        Join the
        {/* industry's  */}
        first comprehensive Play to Earn ecosystem and explore the many benefits
        it has to offer.
        <div className="my-6 w-[280px]">
          <ButtonLink
            href="/"
            text="Join The Revolutions"
            icon={<WineBarOutlinedIcon />}
            color="secondary"
          />
        </div>
        <div className="flex">
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
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
          <Card sx={{ padding: 1.5, borderRadius: 0.5, marginRight: 1 }}>
            <DvrOutlinedIcon />
          </Card>
        </div>
      </div>
    </div>
    <div className="flex pt-[80px]">
      <Card
        sx={{
          padding: 4
        }}
      >
        <div className="flex">
          <div className="w-[400px]">
            <ButtonLink
              href="/"
              text="Become a Naka Devs"
              icon={<DvrOutlinedIcon />}
              color="primary"
            />
          </div>
          <h3 className="pl-[30px]">
            Join the
            {/* industry's */}
            first comprehensive Play to Earn ecosystem.
          </h3>

          <div className="w-[400px]">
            <ButtonLink
              href="/"
              text="Become a Partner"
              icon={<LocalAtmOutlinedIcon />}
              color="primary"
            />
          </div>
          <h3 className="pl-[30px]">
            Earn some serious cash promoting Nakamoto.Games
          </h3>
        </div>
      </Card>
      <Card
        sx={{
          height: "fit",
          marginLeft: 2,
          padding: 5
        }}
      >
        <NorthOutlinedIcon />
      </Card>
    </div>
    <div className="flex justify-between py-[50px]">
      <h1>Copyright 2022 © Nakamoto Games</h1>
      <h1>icon</h1>
      <h1>Scure by : polygon network</h1>
    </div>
  </>
)

export default Footer
