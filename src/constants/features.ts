/* eslint-disable max-len */
import { IImageProps, IMAGES } from "./images"

export interface IFeatureProps {
  title: string
  description: string
  image: IImageProps
  subtitle: string
}

export const FEATURES_DEVELOPER: IFeatureProps[] = [
  {
    title: "Streamlined Version Control",
    description:
      "Enables seamless game launching and automatic updates, ensuring players always have access to the latest version of your game.",
    image: IMAGES.featureImgVersion,
    subtitle: "Game Launcher & Auto-Updater"
  },
  {
    title: "Maximizing User Engagement",
    description:
      "Equip developers with the tools to activate and interact with their player base, driving engagement and player retention.",
    image: IMAGES.featureImgAmpiply,
    subtitle: "Community Activation Tools"
  },
  {
    title: "Enhancing Social Interactions",
    description:
      "A built-in social feature that encourages connectivity and collaboration among players, fostering a vibrant and interactive gaming community.",
    image: IMAGES.featureImgSocial,
    subtitle: "Integrated Friends System"
  },
  {
    title: "Ensuring Safe Access for All",
    description:
      "Our platform guarantees safe and secure game distribution, providing developers and players alike with confidence in the integrity of their gaming experience.",
    image: IMAGES.featureImgSecure,
    subtitle: "Secure Distribution Platform"
  }
  // {
  //   title: "Version control",
  //   description:
  //     "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
  //   image: IMAGES.featureImgVersion,
  //   subtitle: "Launcher & auto-updater"
  // },
  // {
  //   title: "Amplify",
  //   description:
  //     "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
  //   image: IMAGES.featureImgAmpiply,
  //   subtitle: "Community Activation"
  // },
  // {
  //   title: "Social",
  //   description:
  //     "Our dynamic friend system allows players to invite friends to their games. Get your friends together with in-game and desktop notifications. ",
  //   image: IMAGES.featureImgSocial,
  //   subtitle: "Friends system"
  // },
  // {
  //   title: "Secure Access",
  //   description:
  //     "We test all the games submitted in a Sandbox OS. Gamers can rest assured with with our strict security protocols. ",
  //   image: IMAGES.featureImgSecure,
  //   subtitle: "Safe Distribution"
  // }
]
