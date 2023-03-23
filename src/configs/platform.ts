export interface IPlatformList {
  title: string
  icon: string
  link?: string
}
export const PLATFORM_LIST: IPlatformList[] = [
  {
    title: "Opensea",
    icon: "/images/platforms/opensea.png",
    link: "https://opensea.io/"
  },
  {
    title: "Magic Eden",
    icon: "/images/platforms/megic_eden.png",
    link: "https://magic.eden/"
  },
  {
    title: "Rarible",
    icon: "/images/platforms/rarible.png",
    link: "https://rarible.com/"
  },
  {
    title: "Custon Intergration",
    icon: "/images/platforms/custom_platform.svg"
  }
]
