import React from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const LogoNaka = dynamic(() => import("@components/atoms/logo/LogoNaka"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface ISystemTemplateProps {
  content: React.ReactNode
  image: React.ReactNode
}

const SystemTemplate = ({ content, image }: ISystemTemplateProps) => (
  <Box
    component="div"
    sx={{
      background: `url(${IMAGES.eventBackground.src}) no-repeat center center`,
      backgroundSize: "cover",
      overflow: "hidden",
      ".logo-naka-icon__rect": {
        width: "205px"
      },
      "h1, h2, h3, h4, h5": {
        fontSize: "36px",
        fontFamily: "neueMachinaSemiBold, Helvetica, Arial, sans-serif",
        color: "#F42728",
        textShadow:
          "0px 0px 2.2138051986694336px rgba(240, 3, 37, 0.12), 0px 0px 5.32008171081543px rgba(240, 3, 37, 0.17), 0px 0px 10.017241477966309px rgba(240, 3, 37, 0.21), 0px 0px 17.869047164916992px rgba(240, 3, 37, 0.25), 0px 0px 33.422088623046875px rgba(240, 3, 37, 0.30), 0px 0px 80px rgba(240, 3, 37, 0.42)"
      },
      "p": {
        color: "#70727B",
        fontSize: "18px"
      }
    }}
    className="section-system-template md:0 flex h-screen min-h-[500px]  w-full flex-auto flex-col items-center justify-center bg-primary-main p-8"
  >
    <div className="items-center justify-center md:flex">
      <div className="flex max-w-[563px] flex-col gap-6 md:gap-[60px]">
        <LogoNaka hover={false} />
        {content}
        <div className="back-to-home__button">
          <ButtonLink
            className="flex !h-[50px] !w-[200px] items-center"
            href="/"
            text="Back to Hompage"
            icon={<Icomoon className="icon-Arrow-in-Box-Left" />}
            size="medium"
            color="secondary"
            variant="contained"
          />
        </div>
      </div>
      <div className="mx-auto mt-10 hidden max-w-md md:mx-0 md:block md:max-w-none">
        {image}
      </div>
    </div>
  </Box>
)

export default SystemTemplate
