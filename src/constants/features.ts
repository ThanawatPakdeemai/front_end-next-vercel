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
      "We deliver an efficient auto-update manager as simple as drag & drop your new build in our dev dashboard and you game is updated to everyone.",
    image: IMAGES.featureImgVersion,
    subtitle: "Launcher & auto-updater"
  },
  {
    title: "Amplify",
    description:
      "We deliver an efficient auto-update manager as simple as drag & drop your new build in our dev dashboard and you game is updated to everyone.",
    image: IMAGES.featureImgAmpiply,
    subtitle: "Community Activation"
  },
  {
    title: "Social",
    description:
      "We provide a dynamic friend system similar to Steam. Allow your players to invite their friends to your game with in-game & desktop notifications.",
    image: IMAGES.featureImgSocial,
    subtitle: "Friends system"
  },
  {
    title: "Secure Access",
    description:
      "We test all the playable builds submitted to the platform in a sandbox OS. Our gamers rest assured with our strict security protocols.",
    image: IMAGES.featureImgSecure,
    subtitle: "Safe Distribution"
  }
]
