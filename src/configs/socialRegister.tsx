import { IMenuBase } from "@interfaces/IMenu"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"

export const SocialRegister: IMenuBase[] = [
  {
    icon: <FacebookIcon />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <TwitterIcon />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <GoogleIcon />,
    label: "substack",
    href: "https://nakamotogames.substack.com/"
  },
  {
    icon: <MetaMarkIcon />,
    label: "metamark",
    href: "https://metamask.io/"
  }
]
