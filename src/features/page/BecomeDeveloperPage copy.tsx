import Jumbotron from "@components/molecules/Jumbotron"
import React, { useEffect, useState } from "react"
import CardPlatformItems from "@components/organisms/CardPlatformItems"
import CardFeaturedDeveloperItems from "@components/organisms/CardFeaturedDeveloperItems"
// import { FEATURES_DEVELOPER } from "@constants/features"
import { PLATFORM_LIST } from "@configs/platform"
import CardTestimonialItems from "@components/organisms/CardTestimonialItems"
import TESTIMONAILS from "@constants/testimonial"
import BecomeDeveloperContent from "@components/templates/contents/BecomeDeveloperContent"
import { Chip } from "@mui/material"
import { IMAGES } from "@constants/images"
import HeroSection from "@components/templates/contents/HeroSection"
import { VIDEOS } from "@constants/video"
import FullWidthContent from "@components/templates/contents/FullWidthContent"
import ButtonScroll from "@components/atoms/button/ButtonScroll"
import useBecomeDeveloper from "@feature/become-developer/containers/hooks/useBecomeDeveloper"
import { IWebBecomeDevData } from "@feature/become-developer/interfaces/IWebBecome"
import { FEATURES_DEVELOPER } from "@constants/features"

const ChipStyles = {
  backgroundColor: "#A0ED61!important",
  marginBottom: "1.5rem"
}

const BecomeDeveloperPage = () => {
  const { becomeDeveloperData } = useBecomeDeveloper()
  const [sectionIntro, setSectionIntro] = useState<IWebBecomeDevData>()
  const [sectionFeature, setSectionFeature] = useState<IWebBecomeDevData>()

  // eslint-disable-next-line no-console
  console.log("test-webdata", becomeDeveloperData)

  const filterBecomeDevIntro = () => {
    const filterIntro = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "Intro"
    )
    // eslint-disable-next-line no-console
    console.log("test-filterIntro", filterIntro)
    setSectionIntro(filterIntro)
  }

  const filterBecomeDevFeature = () => {
    const filterFeature = becomeDeveloperData?.find(
      (_elm) => _elm.section_name === "feature"
    )

    // eslint-disable-next-line no-console
    console.log("test-filterFeature", filterFeature)

    // const mapListFeature = filterFeature?.list.map((_elm) => ({
    //   title: _elm.title || "title",
    //   description: _elm.detail || "description",
    //   image: {
    //     src: _elm.image_url,
    //     srcWebp: _elm.image_url,
    //     blurDataUR: _elm.image_url,
    //     width: 200,
    //     height: 200,
    //     alt: _elm._id
    //   },
    //   subtitle: _elm.sub_title
    // }))

    // eslint-disable-next-line no-console
    // console.log("test-mapFeature", mapListFeature)

    // const mapDataFeature = { ...filterFeature, list: mapListFeature }

    setSectionFeature(filterFeature || FEATURES_DEVELOPER)
  }

  useEffect(() => {
    let load = false
    if (!load) {
      filterBecomeDevIntro()
      filterBecomeDevFeature()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [becomeDeveloperData])

  // // eslint-disable-next-line no-console
  // console.log("test-FEATURES_DEVELOPER", FEATURES_DEVELOPER)

  // eslint-disable-next-line no-console
  console.log("test-VIDEOS", VIDEOS)

  return (
    <main>
      <HeroSection
        hasVideo
        src={VIDEOS.becomeDeveloperVideo.src}
        poster={VIDEOS.becomeDeveloperVideo.poster}
        className="!items-end !justify-start pb-12"
      >
        <div className="flex items-center justify-between">
          <Jumbotron
            textTitle="nakamoto.games"
            textTitleDark="FOR GAME DEVELOPERS_"
            text="We take care of the infrastructure and distribution so you can focus on creating games. Publish your Web3 game now ⚡"
            className="w-[620px]"
            textButton="Subscribe Now"
          />
          <ButtonScroll anchorLink="become-developer--section-1" />
        </div>
      </HeroSection>
      <BecomeDeveloperContent
        id="become-developer--section-1"
        image={IMAGES.becomeDeveloperSection1}
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
            textTitle={`Import your <br> existing `}
            textTitleDark="NFTs."
            text="Display your in-game NFTs in the Nakamoto.Games storefront. Get gamers watching your in-game assets 🎮"
            className="w-[620px]"
          />
          <CardPlatformItems
            className="max-w-[560px]"
            items={PLATFORM_LIST}
          />
        </div>
      </BecomeDeveloperContent>
      <BecomeDeveloperContent
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
            textTitle="Features"
            text={
              sectionFeature?.detail ||
              "We provide everything a Web3 game needs to maximize distribution."
            }
            className="mb-8"
          />
          {/* FEATURES_DEVELOPER */}
          <CardFeaturedDeveloperItems items={sectionFeature?.list} />
        </div>
      </BecomeDeveloperContent>
      <FullWidthContent>
        <BecomeDeveloperContent
          id="become-developer--section-1"
          image={IMAGES.becomeDeveloperSection2}
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
              textTitle="READY TO TRY <br> NAKAMOTO.GAMES?"
              textTitleDark="FOR GAME DEVELOPERS_"
              text="Submit your game for assessment and be up and running in a matter of days."
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
        </BecomeDeveloperContent>
      </FullWidthContent>
      <BecomeDeveloperContent
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
              textTitle="Helping <span>web3</span> games grow."
              text="We provide everything a Web3 game needs to maximize distribution."
              className="mb-8"
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
              items={TESTIMONAILS}
            />
          </div>
        </div>
      </BecomeDeveloperContent>
      <HeroSection
        hasVideo
        src={VIDEOS.gameDeveloperVideo.src}
        poster={VIDEOS.gameDeveloperVideo.poster}
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
            textTitle="WANT TO READ MORE?"
            textTitleDark="FOR GAME DEVELOPERS_"
            text="We love sharing stories about our development progress, mechanics, updates and much more!"
            className="w-[620px]"
            textButton="Subscribe Now"
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
    </main>
  )
}

export default BecomeDeveloperPage
