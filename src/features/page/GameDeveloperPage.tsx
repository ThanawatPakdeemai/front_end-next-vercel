/* eslint-disable max-len */
import React from "react"
import Jumbotron from "@components/molecules/Jumbotron"
// import CardPlatformItems from "@components/organisms/CardPlatformItems"
import CardFeaturedDeveloperItems from "@components/organisms/CardFeaturedDeveloperItems"
import { FEATURES_DEVELOPER } from "@constants/features"
// import { PLATFORM_LIST } from "@configs/platform"
// import CardTestimonialItems from "@components/organisms/CardTestimonialItems"
// import TESTIMONAILS from "@constants/testimonial"
import GameDeveloperContent from "@components/templates/contents/GameDeveloperContent"
import { Chip } from "@mui/material"
// import { IMAGES } from "@constants/images"
import HeroSection from "@components/templates/contents/HeroSection"
import { VIDEOS } from "@constants/video"
// import FullWidthContent from "@components/templates/contents/FullWidthContent"
import ButtonScroll from "@components/atoms/button/ButtonScroll"

const ChipStyles = {
  backgroundColor: "#A0ED61!important",
  marginBottom: "1.5rem"
}

const GameDeveloperPage = () => (
  <main>
    <HeroSection
      hasVideo
      src={VIDEOS.gameDeveloperVideoMain.src}
      poster={VIDEOS.gameDeveloperVideoMain.poster}
      className="!items-end !justify-start pb-12"
    >
      <div className="flex items-center justify-between">
        <Jumbotron
          hrefButton="/joinus"
          // textTitle="nakamoto.games"
          // textTitleDark="FOR GAME DEVELOPERS_"
          textTitle=""
          textTitleGreen="Unlock Your Game's Potential with"
          textTitleLight="NAKAMOTO.GAMES!"
          text="We handle infrastructure and distribution, allowing you to concentrate on what you love - creating games. 
Take the leap and publish your game with us today!"
          // text="We take care of the infrastructure and distribution so you can focus on creating games. Publish your Web3 game now ⚡"
          className="w-[620px]"
          textButton="Submit Game"
        />
        <ButtonScroll anchorLink="game-developer--section-1" />
      </div>
    </HeroSection>
    {/* <GameDeveloperContent
      id="game-developer--section-1"
      image={IMAGES.gameDeveloperSection1}
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
          hrefButton="/joinus"
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
    </GameDeveloperContent> */}
    <GameDeveloperContent
      id="game-developer--section-2"
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
          hrefButton="/joinus"
          textTitle="Features"
          text="We provide everything a Web3 game needs to maximize distribution."
          className="mb-8"
        />
        <CardFeaturedDeveloperItems items={FEATURES_DEVELOPER} />
      </div>
    </GameDeveloperContent>
    {/* <FullWidthContent>
      <GameDeveloperContent
        id="game-developer--section-1"
        image={IMAGES.gameDeveloperSection2}
        sxCustomStyled={{
          ".game-developer__content": {
            order: 1
          },
          ".game-developer__image": {
            order: 2
          },
          ".game-developer__wrapper": {
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
            textButton="Submit Game"
            hrefButton="/joinus"
          />
        </div>
      </GameDeveloperContent>
    </FullWidthContent> */}
    {/* <GameDeveloperContent
      id="game-developer--section-3"
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
            hrefButton="/joinus"
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
    </GameDeveloperContent> */}
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
          hrefButton="/joinus"
          // textTitle="WANT TO READ MORE?"
          // textTitleDark="FOR GAME DEVELOPERS_"
          textTitle="Embrace the Future of Gaming"
          textTitleDark="with NAKAMOTO.GAMES!"
          // text="We love sharing stories about our development progress, mechanics, updates and much more!"
          text="Submit your game for evaluation and get ready to launch in just a few days. Begin your Web3 gaming adventure now!"
          className="w-[620px]"
          textButton="Submit Game"
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

export default GameDeveloperPage
