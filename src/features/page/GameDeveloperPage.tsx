/* eslint-disable max-len */
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useBecomeDeveloper from "@feature/become-developer/containers/hooks/useBecomeDeveloper"
import { IWebBecomeDevData } from "@feature/become-developer/interfaces/IWebBecome"

const CardTestimonialItems = dynamic(
  () => import("@components/organisms/CardTestimonialItems"),
  {
    suspense: true,
    ssr: false
  }
)
const FullWidthContent = dynamic(
  () => import("@components/templates/contents/FullWidthContent"),
  {
    suspense: true,
    ssr: false
  }
)
const CardPlatformItems = dynamic(
  () => import("@components/organisms/CardPlatformItems"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonScroll = dynamic(
  () => import("@components/atoms/button/ButtonScroll"),
  {
    suspense: true,
    ssr: false
  }
)
const HeroSection = dynamic(
  () => import("@components/templates/contents/HeroSection"),
  {
    suspense: true,
    ssr: false
  }
)
const GameDeveloperContent = dynamic(
  () => import("@components/templates/contents/GameDeveloperContent"),
  {
    suspense: true,
    ssr: false
  }
)
const Jumbotron = dynamic(() => import("@components/molecules/Jumbotron"), {
  suspense: true,
  ssr: false
})
const CardFeaturedDeveloperItems = dynamic(
  () => import("@components/organisms/CardFeaturedDeveloperItems"),
  {
    suspense: true,
    ssr: false
  }
)
const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})

const ChipStyles = {
  backgroundColor: "#A0ED61!important",
  marginBottom: "1.5rem"
}

function GameDeveloperPage() {
  const { becomeDeveloperData } = useBecomeDeveloper()
  const [sectionIntro, setSectionIntro] = useState<IWebBecomeDevData>()
  const [sectionExistingNFT, setSectionExistingNFT] =
    useState<IWebBecomeDevData>()
  const [sectionFeature, setSectionFeature] = useState<IWebBecomeDevData>()
  const [sectionSubscribe, setSectionSubscribe] = useState<IWebBecomeDevData>()
  const [sectionHelping, setSectionHelping] = useState<IWebBecomeDevData>()
  const [sectionFooter, setSectionFooter] = useState<IWebBecomeDevData>()

  const filterBecomeDevIntro = () => {
    const filterIntro = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "intro"
    )
    setSectionIntro(filterIntro)
  }
  const filterBecomeDevExistingNFT = () => {
    const filterExistingNFT = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "existingNFTs"
    )
    setSectionExistingNFT(filterExistingNFT)
  }
  const filterBecomeDevFeature = () => {
    const filterFeature = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "features"
    )
    setSectionFeature(filterFeature)
  }
  const filterBecomeDevSubscribe = () => {
    const filterSubscribe = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "subscribe"
    )
    setSectionSubscribe(filterSubscribe)
  }
  const filterBecomeDevHelping = () => {
    const filterHelping = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "helping"
    )
    setSectionHelping(filterHelping)
  }
  const filterBecomeDevFooter = () => {
    const filterFooter = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "footer"
    )
    setSectionFooter(filterFooter)
  }

  useEffect(() => {
    let load = true

    if (becomeDeveloperData && becomeDeveloperData.length > 0 && load) {
      ;(async () => {
        await filterBecomeDevIntro()
        await filterBecomeDevExistingNFT()
        await filterBecomeDevFeature()
        await filterBecomeDevSubscribe()
        await filterBecomeDevHelping()
        await filterBecomeDevFooter()
      })()
    }

    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [becomeDeveloperData])

  return (
    <main>
      {sectionIntro && sectionIntro.button && (
        <HeroSection
          hasVideo
          src={sectionIntro.image_url}
          poster=""
          className="!items-end !justify-start pb-12"
        >
          <div className="flex items-center justify-between">
            <Jumbotron
              detail={sectionIntro.detail}
              className="w-[620px]"
              textButton={sectionIntro.button_data?.text}
              hrefButton={sectionIntro.button_data?.link}
              sectionName={sectionIntro.section_name}
            />
            <ButtonScroll anchorLink="become-developer--section-1" />
          </div>
        </HeroSection>
      )}
      {sectionExistingNFT && sectionExistingNFT.button && (
        <GameDeveloperContent
          id="become-developer--section-1"
          image={sectionExistingNFT.image_url}
        >
          <div className="inner-content">
            <Chip
              variant="filled"
              color="success"
              label="ONE-CLICK SOLUTION"
              size="small"
              sx={ChipStyles}
            />
            <Jumbotron
              detail={sectionExistingNFT.detail}
              text="Display your in-game NFTs in the Nakamoto.Games storefront. Get gamers watching your in-game assets 🎮"
              className="mb-4 w-[620px]"
            />
            <CardPlatformItems
              className="max-w-[560px]"
              items={sectionExistingNFT.list}
            />
          </div>
        </GameDeveloperContent>
      )}
      {sectionFeature && sectionFeature.button && (
        <GameDeveloperContent
          id="become-developer--section-2"
          className="my-20 min-h-[640px]"
          sxCustomStyled={{
            ".jumbotron": {
              "@media (min-width: 768px)": {
                display: "flex",
                alignItems: "center",
                gap: "5rem"
              }
            },
            ".jumbotron-text": {
              margin: "0"
            }
          }}
        >
          <div className="inner-content">
            <Chip
              variant="filled"
              color="success"
              label="ALL YOU NEED"
              size="small"
              sx={ChipStyles}
            />
            <Jumbotron
              detail={sectionFeature.detail}
              sectionName={sectionFeature.section_name}
              text={
                sectionFeature?.detail ||
                "We provide everything a Web3 game needs to maximize distribution."
              }
              className="mb-8"
            />
            <CardFeaturedDeveloperItems items={sectionFeature?.list} />
          </div>
        </GameDeveloperContent>
      )}
      {sectionSubscribe && sectionSubscribe.button && (
        <FullWidthContent>
          <GameDeveloperContent
            id="become-developer--section-1"
            image={sectionSubscribe.image_url}
            sxCustomStyled={{
              ".become-developer__content": {
                order: 1
              },
              ".become-developer__image": {
                order: 2
              },
              ".become-developer__wrapper": {
                minHeight: "0px"
              }
            }}
          >
            <div className="inner-content ml-10">
              <Jumbotron
                detail={sectionSubscribe.detail}
                sectionName={sectionSubscribe.section_name}
                className="w-[576px] text-center"
                sxCustomStyled={{
                  ".jumbotron-title--text": {
                    display: "block",
                    whiteSpace: "nowrap"
                  },
                  ".jumbotron-button": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }
                }}
                textButton="Subscribe Now"
                hrefButton="/joinus"
              />
            </div>
          </GameDeveloperContent>
        </FullWidthContent>
      )}
      {sectionHelping && sectionHelping.button && (
        <GameDeveloperContent
          id="become-developer--section-3"
          className="flex min-h-[720px] items-center justify-center"
        >
          <div className="container mx-auto overflow-hidden">
            <div className="inner-content">
              <Chip
                variant="filled"
                color="success"
                label="What people say about our product"
                size="small"
                sx={ChipStyles}
              />
              <Jumbotron
                detail={sectionHelping.detail}
                text="We provide everything a Web3 game needs to maximize distribution."
                className="mb-8"
                hrefButton="/joinus"
                sxCustomStyled={{
                  ".jumbotron-title span": {
                    color: "#A0ED61"
                  }
                }}
              />
            </div>
            <div className="mx-[-0.5rem] w-[calc(100%+0.5rem)]">
              <CardTestimonialItems
                isSlider
                items={sectionHelping.list}
                buttonData={sectionHelping.button_data}
              />
            </div>
          </div>
        </GameDeveloperContent>
      )}
      {sectionFooter && sectionFooter.button && (
        <HeroSection
          hasVideo
          src={sectionFooter.image_url}
          poster=""
          sxCustomStyled={{
            "&.hero-section__wrapper": {
              maxHeight: "750px",
              position: "relative"
            },
            "&::before": {
              content: "''",
              background: "#101013",
              opacity: "0.6",
              position: "absolute",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              zIndex: "1"
            }
          }}
        >
          <div className="relative z-[2] flex items-center justify-center text-center">
            <Jumbotron
              detail={sectionFooter.detail}
              className="w-[620px]"
              textButton={sectionFooter.button_data?.text}
              hrefButton={sectionFooter.button_data?.link}
              sectionName={sectionFooter.section_name}
              sxCustomStyled={{
                ".jumbotron-button": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }}
            />
          </div>
        </HeroSection>
      )}
    </main>
  )
}

export default GameDeveloperPage
