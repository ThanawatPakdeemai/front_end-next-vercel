export interface IImageProps {
  src: string
  srcWebp: string
  blurDataURL: string
  width: number
  height: number
  alt: string
}
export const IMAGES: {
  [key: string]: IImageProps
} = {
  nakaLogo: {
    src: "/images/home/logo_naka_red.webp",
    srcWebp: "/images/home/logo_naka_red.png",
    blurDataURL: "/images/home/logo_naka_red.webp",
    width: 120,
    height: 37,
    alt: "naka-logo"
  },
  nakaBannerHover: {
    src: "/images/home/naka-band-hover.svg",
    srcWebp: "/images/home/naka-band-hover.svg",
    blurDataURL: "/images/home/naka-band-hover.svg",
    width: 225,
    height: 37,
    alt: "naka-logo-hover"
  },
  nakaMarketplaceLogo: {
    src: "/images/home/naka-marketplace-logo.svg",
    srcWebp: "/images/home/naka-marketplace-logo.svg",
    blurDataURL: "/images/home/naka-marketplace-logo.svg",
    width: 166,
    height: 30,
    alt: "naka-marketplace-logo"
  },
  nakaMarketplaceLogoHover: {
    src: "/images/home/naka-marketplace-logo-hover.svg",
    srcWebp: "/images/home/naka-marketplace-logo-hover.svg",
    blurDataURL: "/images/home/naka-marketplace-logo-hover.svg",
    width: 225,
    height: 37,
    alt: "naka-marketplace-logo"
  },
  tableCom: {
    src: "/images/home/table-com/table-com.webp",
    srcWebp: "/images/home/table-com/table-com.webp",
    blurDataURL: "/images/home/table-com/table-com.png",
    width: 335,
    height: 319,
    alt: "table-com"
  },
  nakaLogoMaster: {
    src: "/assets/icons/logo_master.svg",
    srcWebp: "/assets/icons/logo_master.svg",
    blurDataURL: "/assets/icons/logo_master.svg",
    width: 24,
    height: 11,
    alt: "naka-logo-master"
  },
  nakaBand: {
    src: "/images/home/nakamoto-band.svg",
    srcWebp: "/images/home/nakamoto-band.svg",
    blurDataURL: "/images/home/nakamoto-band.svg",
    width: 166,
    height: 30,
    alt: "nakamoto-band"
  },
  backHomeNakaNFT: {
    src: "/images/home/backHomeNakaNFT/backHomeNakaNFT.png",
    srcWebp: "/images/home/backHomeNakaNFT/backHomeNakaNFT.webp",
    blurDataURL: "/images/home/backHomeNakaNFT/backHomeNakaNFT.png",
    width: 124,
    height: 124,
    alt: "blog-band"
  },
  homeNakaNFT: {
    src: "/images/home/homeNakaNFT/homeNakaNFT.png",
    srcWebp: "/images/home/homeNakaNFT/homeNakaNFT.webp",
    blurDataURL: "/images/home/homeNakaNFT/homeNakaNFT.png",
    width: 124,
    height: 124,
    alt: "blog-band"
  },
  frontBlogBand: {
    src: "/images/home/front_blog/front_blog.png",
    srcWebp: "/images/home/front_blog/front_blog.webp",
    blurDataURL: "/images/home/front_blog/front_blog.png",
    width: 124,
    height: 124,
    alt: "blog-band"
  },
  backBlogBand: {
    src: "/images/home/back_blog/back_blog.png",
    srcWebp: "/images/home/back_blog/back_blog.webp",
    blurDataURL: "/images/home/back_blog/back_blog.png",
    width: 124,
    height: 124,
    alt: "blog-band"
  },
  frontCouponBand: {
    src: "/images/home/front_coupon/front_coupon.png",
    srcWebp: "/images/home/front_coupon/front_coupon.webp",
    blurDataURL: "/images/home/front_coupon/front_coupon.png",
    width: 124,
    height: 124,
    alt: "coupon-band"
  },
  backCouponBand: {
    src: "/images/home/back_coupon/back_coupon.png",
    srcWebp: "/images/home/back_coupon/back_coupon.webp",
    blurDataURL: "/images/home/back_coupon/back_coupon.png",
    width: 124,
    height: 124,
    alt: "coupon-band"
  },
  frontNakaSwap: {
    src: "/images/home/front_naka_swap/front_naka_swap.png",
    srcWebp: "/images/home/front_naka_swap/front_naka_swap.webp",
    blurDataURL: "/images/home/front_naka_swap/front_naka_swap.webp",
    width: 124,
    height: 124,
    alt: "P2P DEX"
  },
  backNakaSwap: {
    src: "/images/home/back_naka_swap/back_naka_swap.png",
    srcWebp: "/images/home/back_naka_swap/back_naka_swap.webp",
    blurDataURL: "/images/home/back_naka_swap/back_naka_swap.webp",
    width: 124,
    height: 124,
    alt: "P2P DEX"
  },
  frontStaking: {
    src: "/images/home/front_staking/front_staking.png",
    srcWebp: "/images/home/front_staking/front_staking.webp",
    blurDataURL: "/images/home/front_staking/front_staking.webp",
    width: 124,
    height: 124,
    alt: "Staking"
  },
  backStaking: {
    src: "/images/home/back_staking/back_staking.png",
    srcWebp: "/images/home/back_staking/back_staking.png",
    blurDataURL: "/images/home/back_staking/back_staking.webp",
    width: 123,
    height: 123,
    alt: "Staking"
  },
  frontReferrals: {
    src: "/images/home/front_referrals/front_referrals.png",
    srcWebp: "/images/home/front_referrals/front_referrals.webp",
    blurDataURL: "/images/home/front_referrals/front_referrals.webp",
    width: 123,
    height: 123,
    alt: "naka-referrals"
  },
  backReferrals: {
    src: "/images/home/back_referrals/back_referrals.png",
    srcWebp: "/images/home/back_referrals/back_referrals.webp",
    blurDataURL: "/images/home/back_referrals/back_referrals.webp",
    width: 123,
    height: 123,
    alt: "naka-referrals"
  },
  marketPlace: {
    src: "/images/home/marketplace/marketplace.png",
    srcWebp: "/images/home/marketplace/marketplace.webp",
    blurDataURL: "/images/home/marketplace/marketplace.webp",
    width: 393,
    height: 238,
    alt: "marketPlace"
  },
  nakaVerse: {
    src: "/images/home/nakaverse-bg/nakaverse-bg.png",
    srcWebp: "/images/home/nakaverse-bg/nakaverse-bg.webp",
    blurDataURL: "/images/home/nakaverse-bg/nakaverse-bg.webp",
    width: 678,
    height: 218,
    alt: "blog-nakaVerse-bg"
  },
  worldNakaverse: {
    src: "/images/home/world/world.png",
    srcWebp: "/images/home/world/world.webp",
    blurDataURL: "/images/home/world/world.webp",
    width: 171,
    height: 174,
    alt: "worldNakaverse"
  },
  ringNakaverse: {
    src: "/images/home/ring/ring.png",
    srcWebp: "/images/home/ring/ring.webp",
    blurDataURL: "/images/home/ring/ring.webp",
    width: 195,
    height: 182,
    alt: "ringNakaverse"
  },
  nakaVerseMascot: {
    src: "/images/home/nakaVerseMascot/nakaVerseMascot.png",
    srcWebp: "/images/home/nakaVerseMascot/nakaVerseMascot.webp",
    blurDataURL: "/images/home/nakaVerseMascot/nakaVerseMascot.webp",
    width: 276,
    height: 172,
    alt: "nakaVerseMascot"
  },
  nakaIconWhite: {
    src: "/images/alert/nakaIcon.svg",
    srcWebp: "/images/alert/nakaIcon.svg",
    blurDataURL: "/images/alert/nakaIcon.svg",
    width: 25,
    height: 25,
    alt: "nakaIcon"
  },
  flagIcon: {
    src: "/images/alert/flagIcon.svg",
    srcWebp: "/images/alert/flagIcon.svg",
    blurDataURL: "/images/alert/flagIcon.svg",
    width: 25,
    height: 25,
    alt: "flagIcon"
  },
  radiation: {
    src: "/images/alert/radiation.svg",
    srcWebp: "/images/alert/radiation.svg",
    blurDataURL: "/images/alert/radiation.svg",
    width: 25,
    height: 25,
    alt: "radiation"
  },
  metamask: {
    src: "/images/home/metamask.svg",
    srcWebp: "/images/home/metamask.svg",
    blurDataURL: "/images/home/metamask.svg",
    width: 35,
    height: 35,
    alt: "metamask-icon"
  },
  ro: {
    src: "/images/home/ro.svg",
    srcWebp: "/images/home/ro.svg",
    blurDataURL: "/images/home/ro.svg",
    width: 60.75,
    height: 60.75,
    alt: "ro-icon"
  },
  vectorWorld: {
    src: "/images/home/vectorWorld.svg",
    srcWebp: "/images/home/vectorWorld.svg",
    blurDataURL: "/images/home/vectorWorld.svg",
    width: 50,
    height: 50,
    alt: "vectorWorld"
  },
  rectagle: {
    src: "/images/home/rectagle.svg",
    srcWebp: "/images/home/rectagle.svg",
    blurDataURL: "/images/home/rectagle.svg",
    width: 764,
    height: 840,
    alt: "vectorWorld"
  },
  no_image: {
    src: "/images/common/no_image.webp",
    srcWebp: "/images/common/no_image.webp",
    blurDataURL: "/images/common/no_image.webp",
    width: 218,
    height: 218,
    alt: "no_image"
  },
  no_avatar: {
    src: "/images/common/no_login_avatar.png",
    srcWebp: "/images/common/no_login_avatar.png",
    blurDataURL: "/images/common/no_login_avatar.png",
    width: 50,
    height: 50,
    alt: "no_avatar"
  },
  MetaMaskds: {
    src: "/images/Profile/Wallet/MetaMaskds.svg",
    srcWebp: "/images/Profile/Wallet/MetaMaskds.svg",
    blurDataURL: "/images/Profile/Wallet/MetaMaskds.svg",
    width: 35,
    height: 35,
    alt: "meta_maskds"
  },
  Frame: {
    src: "/images/Profile/Wallet/Frame.webp",
    srcWebp: "/images/Profile/Wallet/Frame.webp",
    blurDataURL: "/images/Profile/Wallet/Frame.webp",
    width: 120,
    height: 80,
    alt: "frame"
  },
  RectangleRed: {
    src: "/images/Profile/Wallet/Rectangle-red.svg",
    srcWebp: "/images/Profile/Wallet/Rectangle-red.svg",
    blurDataURL: "/images/Profile/Wallet/Rectangle-red.svg",
    width: 10,
    height: 10,
    alt: "rectangle-red"
  },
  RectangleBlack: {
    src: "/images/Profile/Wallet/Rectangle-black.svg",
    srcWebp: "/images/Profile/Wallet/Rectangle-black.svg",
    blurDataURL: "/images/Profile/Wallet/Rectangle-black.svg",
    width: 10,
    height: 10,
    alt: "rectangle-black"
  },
  NAKACoin: {
    src: "/images/coin/naka/large.png",
    srcWebp: "/images/coin/naka/large.webp",
    blurDataURL: "/images/coin/naka/large.webp",
    width: 35,
    height: 35,
    alt: "naka-coin"
  },
  featureImgVersion: {
    src: "/images/features/feature_01.png",
    srcWebp: "/images/features/feature_01.webp",
    blurDataURL: "/images/features/feature_01.webp",
    width: 200,
    height: 200,
    alt: "featureImgVersion"
  },
  featureImgAmpiply: {
    src: "/images/features/feature_02.png",
    srcWebp: "/images/features/feature_02.webp",
    blurDataURL: "/images/features/feature_02.webp",
    width: 200,
    height: 200,
    alt: "featureImgAmpiply"
  },
  featureImgSocial: {
    src: "/images/features/feature_03.png",
    srcWebp: "/images/features/feature_03.webp",
    blurDataURL: "/images/features/feature_03.webp",
    width: 200,
    height: 200,
    alt: "featureImgSocial"
  },
  featureImgSecure: {
    src: "/images/features/feature_04.png",
    srcWebp: "/images/features/feature_04.webp",
    blurDataURL: "/images/features/feature_04.webp",
    width: 200,
    height: 200,
    alt: "featureImgSecure"
  },
  gameDeveloperSection1: {
    src: "/images/gameDeveloper/game_developer_01.png",
    srcWebp: "/images/gameDeveloper/game_developer_01.webp",
    blurDataURL: "/images/gameDeveloper/game_developer_01.webp",
    width: 1000,
    height: 1000,
    alt: "Import your existing NFTs."
  },
  gameDeveloperSection2: {
    src: "/images/gameDeveloper/game_developer_02.png",
    srcWebp: "/images/gameDeveloper/game_developer_02.webp",
    blurDataURL: "/images/gameDeveloper/game_developer_02.webp",
    width: 1000,
    height: 1000,
    alt: "READY TO TRY NAKAMOTO.GAMES?"
  },
  noDataImage: {
    src: "/images/sticker.png",
    srcWebp: "/images/sticker.png",
    blurDataURL: "/images/sticker.png",
    width: 125,
    height: 125,
    alt: "NodataImage"
  },
  stickerFree: {
    src: "/images/home/sticker/sticker_free.png",
    srcWebp: "/images/home/sticker/sticker_free.webp",
    blurDataURL: "/images/home/sticker/sticker_free.webp",
    width: 190,
    height: 96,
    alt: "Free"
  },
  stickerEarn: {
    src: "/images/home/sticker/sticker_earn.png",
    srcWebp: "/images/home/sticker/sticker_earn.webp",
    blurDataURL: "/images/home/sticker/sticker_earn.webp",
    width: 190,
    height: 96,
    alt: "Free"
  },
  eventBackground: {
    src: "/images/events/background_event/background_event.webp",
    srcWebp: "/images/events/background_event/background_event.webp",
    blurDataURL: "/images/events/background_event/background_event.webp",
    width: 1024,
    height: 740,
    alt: "event background"
  }
}

export const SLIDES_GAME_MOCKUP: IImageProps[] = [
  {
    src: "/images/mocks/gameSlide/demo_slide_01.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_01.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_01.webp",
    width: 852,
    height: 479,
    alt: "slide1"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_02.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_02.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_02.webp",
    width: 852,
    height: 479,
    alt: "slide2"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_03.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_03.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_03.webp",
    width: 852,
    height: 479,
    alt: "slide3"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_04.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_04.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_04.webp",
    width: 852,
    height: 479,
    alt: "slide4"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_05.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_05.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_05.webp",
    width: 852,
    height: 479,
    alt: "slide5"
  }
]

export const GAME_MOCKUP_CARD: IImageProps[] = [
  {
    src: "/images/mocks/gameSlide/demo_slide_06.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_06.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_06.webp",
    width: 852,
    height: 479,
    alt: "slide6"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_07.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_07.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_07.webp",
    width: 852,
    height: 479,
    alt: "slide7"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_08.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_08.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_08.webp",
    width: 852,
    height: 479,
    alt: "slide8"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_09.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_09.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_09.webp",
    width: 852,
    height: 479,
    alt: "slide9"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_10.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_10.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_10.webp",
    width: 852,
    height: 479,
    alt: "slide10"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_11.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_11.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_11.webp",
    width: 852,
    height: 479,
    alt: "slide11"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_12.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_12.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_12.webp",
    width: 852,
    height: 479,
    alt: "slide12"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_13.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_13.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_13.webp",
    width: 852,
    height: 479,
    alt: "slide13"
  },
  {
    src: "/images/mocks/gameSlide/demo_slide_14.png",
    srcWebp: "/images/mocks/gameSlide/demo_slide_14.webp",
    blurDataURL: "/images/mocks/gameSlide/demo_slide_14.webp",
    width: 852,
    height: 479,
    alt: "slide14"
  }
]
