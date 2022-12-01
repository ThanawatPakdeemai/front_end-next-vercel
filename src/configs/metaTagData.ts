import { IMetaTagConstants, IMetaTag } from "@interfaces/IMetaTag"

const DEFAULT_META: IMetaTag = {
  pageTitle: "NAKA Staking Portal - Nakamoto Games",
  pageDescription:
    "Stake $NAKA tokens to earn rewards. NAKA coin is one of the top-rated crypto games coins. Available to stake on our official portal."
}

export const DATA_META_TAG: IMetaTagConstants[] = [
  {
    path: "/",
    metaTag: DEFAULT_META
  },
  {
    path: "/login",
    metaTag: DEFAULT_META
  },
  {
    path: "/register",
    metaTag: DEFAULT_META
  },
  {
    path: "tournament",
    metaTag: DEFAULT_META
  },
  {
    path: "play-to-earn-games",
    metaTag: DEFAULT_META
  },
  {
    path: "staking",
    metaTag: DEFAULT_META
  },
  {
    path: "referrals",
    metaTag: DEFAULT_META
  },
  {
    path: "duckhunter",
    metaTag: DEFAULT_META
  },
  {
    path: "nakarunner",
    metaTag: DEFAULT_META
  },
  {
    path: "nakadui",
    metaTag: DEFAULT_META
  },
  {
    path: "alien",
    metaTag: DEFAULT_META
  },
  {
    path: "cat-planet",
    metaTag: DEFAULT_META
  },
  {
    path: "popcorn-popper",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-heist",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-galactic",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-blaster",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-strike",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-racing",
    metaTag: DEFAULT_META
  },
  {
    path: "candy",
    metaTag: DEFAULT_META
  },
  {
    path: "naka-strike-single",
    metaTag: DEFAULT_META
  },
  {
    path: "zaka",
    metaTag: DEFAULT_META
  },
  {
    path: "spooky",
    metaTag: DEFAULT_META
  },
  {
    path: "8ballpool",
    metaTag: DEFAULT_META
  },
  {
    path: "tank-battle",
    metaTag: DEFAULT_META
  },
  {
    path: "night-warrior",
    metaTag: DEFAULT_META
  }
]
