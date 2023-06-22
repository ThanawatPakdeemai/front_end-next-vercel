import { IWebBecomeDevData } from "@feature/become-developer/interfaces/IWebBecome"
import { IImageProps, IMAGES } from "./images"

export interface IFeatureProps {
  key: string
  image: string
  subtitle: string
  title: string
  description: string
}

export const FEATURES_DEVELOPER: IWebBecomeDevData = {
  "button_data": {
    "text": "Subscribe",
    "link": "www.google.com"
  },
  "button": true,
  "is_active": true,
  "list": [
    {
      "_id": "64910b6daf7d875b7497760b",
      "title": "NAKAMOTO play game title",
      "sub_title": "Naka@",
      "detail": "Detail",
      "image_url":
        "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/web_become_dev/banner/undefined/bfa0ba760eb20f94a3a149c3d18c0f50/image/jpeg/bfa0ba760eb20f94a3a149c3d18c0f50.maxresdefault.jpg"
    },
    {
      "_id": "6490609fdb395757f626131c",
      "title": "NAKAMOTO play game title 2",
      "sub_title": "Naka@",
      "detail": "Detail 2",
      "image_url":
        "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/web_become_dev/NAKAMOTO play game title 2/list/8f1ffffad0499bfbb0c2e55140ebf464/image/jpeg/8f1ffffad0499bfbb0c2e55140ebf464.maxresdefault.jpg"
    },
    {
      "_id": "649114551ac68961e49f5383",
      "title": "NAKAMOTO play game title 1",
      "sub_title": "Naka",
      "detail": "Detail",
      "image_url":
        "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/web_become_dev/banner/list/3036c5f71a3dab9ad27e16a6be568bac/image/jpeg/79677c0a3a742e67cbb2e52f13061840.maxresdefault.jpg"
    }
  ],
  "createdAt": "2023-06-19T13:58:37.359Z",
  "updatedAt": "2023-06-19T13:58:37.359Z",
  "section_name": "feature",
  "detail": "NAKAMOTO play game second",
  "image_url":
    "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/web_become_dev/banner/fa6d1226c12e430a95f8db8063f08e45/image/jpeg/fa6d1226c12e430a95f8db8063f08e45.350118135_1249352149081785_7939372991730789324_n.jpg",
  "id": "649118e63cc7157256a196f7"
}

// {
//   title: "Version control",
//   description:
//     "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
//   image: IMAGES.featureImgVersion.src,
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
