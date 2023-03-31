import { IImageProps, IMAGES } from "./images"

export interface IFeatureProps {
  title: string
  description: string
  image: IImageProps
  subtitle: string
}

export const FEATURES_DEVELOPER: IFeatureProps[] = [
  {
    title: "Version control",
    description:
      "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
    image: IMAGES.featureImgVersion,
    subtitle: "Launcher & auto-updater"
  },
  {
    title: "Amplify",
    description:
      "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
    image: IMAGES.featureImgAmpiply,
    subtitle: "Community Activation"
  },
  {
    title: "Social",
    description:
      "Our dynamic friend system allows players to invite friends to their games. Get your friends together with in-game and desktop notifications. ",
    image: IMAGES.featureImgSocial,
    subtitle: "Friends system"
  },
  {
    title: "Secure Access",
    description:
      "We test all the games submitted in a Sandbox OS. Gamers can rest assured with with our strict security protocols. ",
    image: IMAGES.featureImgSecure,
    subtitle: "Safe Distribution"
  }
]
