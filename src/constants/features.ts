import { IWebBecomeDevData } from "@feature/become-developer/interfaces/IWebBecome"
import { IMAGES } from "./images"

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
      "title": "Version control",
      "sub_title": "Launcher & auto-updater",
      "detail":
        "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
      "image_url": IMAGES.featureImgVersion.src
    },
    {
      "_id": "6490609fdb395757f626131c",
      "title": "Amplify",
      "sub_title": "Community Activation",
      "detail":
        "Our auto-update manager is simple and easy to use.  Just drag and drop your new build in the dashboard and your game is ready to go.",
      "image_url": IMAGES.featureImgAmpiply.src
    },
    {
      "_id": "649114551ac68961e49f5383",
      "title": "Social",
      "sub_title": "Friends system",
      "detail":
        "Our dynamic friend system allows players to invite friends to their games. Get your friends together with in-game and desktop notifications.",
      "image_url": IMAGES.featureImgSocial.src
    },
    {
      "_id": "649114551ac68961e49f5383",
      "title": "Secure Access",
      "sub_title": "Safe Distribution",
      "detail":
        "We test all the games submitted in a Sandbox OS. Gamers can rest assured with with our strict security protocols.",
      "image_url": IMAGES.featureImgSecure.src
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
