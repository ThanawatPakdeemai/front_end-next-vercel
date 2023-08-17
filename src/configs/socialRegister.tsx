import dynamic from "next/dynamic"
import { IMenuBase } from "@interfaces/IMenu"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const IcomoonWallet = dynamic(
  () => import("@components/atoms/icomoon/IcomoonWallet"),
  {
    suspense: true,
    ssr: false
  }
)

export const SocialRegister: IMenuBase[] = [
  {
    icon: <Icomoon className="icon-Facebook" />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <Icomoon className="icon-twitter" />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <Icomoon className="icon-Substack text-[110%]" />,
    label: "substack",
    href: "https://nakamotogames.substack.com/"
  },
  {
    icon: <IcomoonWallet className="icon-Metamask" />,
    label: "metamark",
    href: "https://metamask.io/"
  }
]
