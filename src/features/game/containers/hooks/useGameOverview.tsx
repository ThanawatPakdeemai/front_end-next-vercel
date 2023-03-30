import React, { useEffect } from "react"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import dayjs from "dayjs"
import GlobalIcon from "@components/icons/GlobalIcon"
import { IMenuBase } from "@interfaces/IMenu"
import DiscordIcon from "@components/icons/SocialIcon/DiscordIcon"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import MediumIcon from "@components/icons/SocialIcon/MediumIcon"
import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import TiktokIcon from "@components/icons/SocialIcon/TiktokIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGameStore from "@stores/game"
import { SLIDES_GAME_MOCKUP } from "@constants/images"
import { v4 as uuid } from "uuid"

/**
 * @description Game Overview Hook functions to handle all game overview data
 * @param gameId
 * @param gameType
 */
const useGameOverview = (gameId: string, gameType: IGetType) => {
  const gameTags: IGameTag[] = []
  const gameDataMedia: IVerticalThumbSlide[] = []
  const gamePartnerSocial: IMenuBase[] = []
  const gameData = useGameStore((state) => state.data)
  const partnerGames = useGameStore((state) => state.dataGamePartner)

  const [gameDataState, setGameDataState] = React.useState<IGame>()
  const [gamePartnerState, setGamePartnerState] =
    React.useState<IPartnerGameData>()

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) setGameDataState(gameData)
      if (partnerGames) setGamePartnerState(partnerGames)
    }

    return () => {
      load = true
    }
  }, [gameData, partnerGames])

  /**
   * @description Set Game Tags
   * @returns {IGameTag[]} gameTags
   */
  const setGameTags = (): IGameTag[] => {
    switch (gameType) {
      case "partner-game":
        partnerGames &&
          partnerGames.genres.map((category) =>
            gameTags.push({
              id: category._id,
              name: category.name,
              link: `/categories/${
                category.slug
                  ? category.slug
                  : category.name.toLocaleLowerCase()
              }`
            })
          )
        break

      default:
        gameData &&
          gameData.category_list &&
          gameData.category_list.length > 0 &&
          gameData.category_list.map((category) =>
            gameTags.push({
              id: category.id,
              name: category.name,
              link: `/categories/${
                category.slug
                  ? category.slug
                  : category.name.toLocaleLowerCase()
              }`
            })
          )
        break
    }
    return gameTags
  }

  /**
   * @description Set Game Developer
   * @returns {string} gameDeveloper
   */
  const setGameDeveloper = (): string => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.short_detail?.developer) || "-"

      default:
        return (gameData && gameData?.developer) || "-"
    }
  }

  /**
   * @description Set Game Publisher
   * @returns {string} gamePublisher
   */
  const setPublisher = (): string => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.short_detail?.publisher) || "-"
      default:
        return "-"
    }
  }

  /**
   * @description Set Game Release Date
   * @returns {string} gameReleaseDate
   */
  const setReleaseDate = (): Date | string => {
    switch (gameType) {
      case "partner-game":
        return (
          (partnerGames &&
            dayjs(partnerGames?.short_detail?.release_date).format(
              "DD MMM YYYY"
            )) ||
          "-"
        )
      default:
        return "-"
    }
  }

  /**
   * @description Set Game Partner Social
   * @returns {IMenuBase[]} gamePartnerSocial
   */
  const setPartnerSocial = (): IMenuBase[] => {
    switch (gameType) {
      case "partner-game":
        partnerGames &&
          gamePartnerSocial.push(
            {
              icon: <GlobalIcon />,
              label: "Website",
              href: partnerGames?.social?.web || ""
            },
            {
              icon: <DiscordIcon />,
              label: "Discord",
              href: partnerGames?.social?.discord || ""
            },
            {
              icon: <FacebookIcon />,
              label: "Facebook",
              href: partnerGames?.social?.facebook || ""
            },
            {
              icon: <MediumIcon />,
              label: "Medium",
              href: partnerGames?.social?.medium || ""
            },
            {
              icon: <TelegramIcon />,
              label: "Telegram",
              href: partnerGames?.social?.telegram || ""
            },
            {
              icon: <TiktokIcon />,
              label: "Tiktok",
              href: partnerGames?.social?.tiktok || ""
            },
            {
              icon: <TwitterIcon />,
              label: "Twitter",
              href: partnerGames?.social?.twitter || ""
            }
          )
        return gamePartnerSocial

      default:
        return []
    }
  }

  /**
   * @description Set Game Description
   * @returns {string} gameDescription
   */
  const setDescription = (): string => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.description) || "-"
      default:
        return (gameData && gameData.story) || "-"
    }
  }

  const setChainName = () => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.short_detail?.network_name) || "-"
      default:
        return "-"
    }
  }

  const setChainIcon = () => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.short_detail?.network_icon) || "-"
      default:
        return "-"
    }
  }

  /**
   * @description Set game media
   * @returns {IVerticalThumbSlide[]}
   */
  const setGameMedia = (): IVerticalThumbSlide[] => {
    const EMPTY_MEDIAS: IVerticalThumbSlide[] = []
    SLIDES_GAME_MOCKUP.map((slide) =>
      EMPTY_MEDIAS.push({
        id: slide.alt,
        type: "image",
        src: slide.src
      })
    )
    switch (gameType) {
      case "partner-game":
        if (partnerGames && partnerGames?.media_list?.length > 0) {
          partnerGames?.media_list?.map((media) =>
            gameDataMedia.push({
              id: uuid(),
              type: media.media_type,
              src: media.path
            })
          )
        }
        break
      case "arcade-emporium":
        if (gameData) {
          gameDataMedia.push(
            {
              id: uuid(),
              type: "image",
              src: gameData ? gameData.image_banner : ""
            },
            {
              id: uuid(),
              type: "video",
              src: gameData ? gameData.animation_nft_arcade_game : ""
            },
            {
              id: uuid(),
              type: "image",
              src: gameData ? gameData.image_nft_arcade_game : ""
            },
            {
              id: uuid(),
              type: "image",
              src: gameData ? gameData.image_background : ""
            },
            {
              id: uuid(),
              type: "image",
              src: gameData ? gameData.image_category_list : ""
            },
            {
              id: uuid(),
              type: "image",
              src: gameData ? gameData.image_background : ""
            }
          )
        }
        break
      default:
        // TODO: Change to use media_list
        // gameData.meta_data_list.map((metaData) =>
        //   gameDataMedia.push({
        //     id: uuid(),
        //     type: metaData.type,
        //     src: metaData.image as string
        //   })
        // )
        // ;[...Array(10)].map(() => {
        //   return gameDataMedia.push({
        //     id: uuid(),
        //     type: "image",
        //     src: gameData?.image_background || ""
        //   })
        // })
        gameDataMedia.push(
          {
            id: uuid(),
            type: "image",
            src: gameData ? gameData.image_background : ""
          },
          {
            id: uuid(),
            type: "image",
            src: gameData ? gameData.image_category_list : ""
          },
          ...EMPTY_MEDIAS,
          ...EMPTY_MEDIAS
        )
    }
    return gameDataMedia
  }

  /**
   * @description Set game type
   * @returns {string} gameTypeCode
   */
  const setGameType = (): string => {
    switch (gameType) {
      case "arcade-emporium":
        return (gameData && gameData.game_type) || "-"
      default:
        return "-"
    }
  }

  /**
   * @description Set game owner's wallet address
   * @returns {string} gameOwner
   */
  const setGameOwner = (): string => {
    switch (gameType) {
      case "arcade-emporium":
        return (gameData && gameData.NFT_Owner) || "-"
      default:
        return "-"
    }
  }

  /**
   * @description Set game single version
   * @returns {string} gameSingleVersion
   */
  const setSingleVersion = (): string => {
    switch (gameType) {
      case "arcade-emporium":
        return (gameData && gameData.version) || "-"

      default:
        return "-"
    }
  }

  /**
   * @description Set game how to play
   * @returns {string} gameHowToPlay
   */
  const setGameHowToPlay = (): string => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames?.how_to_play) || ""
      default:
        return (
          (gameData &&
            `<h2 class="text-lg uppercase mb-2 font-neue-machina-semi">${gameData.howto.title}</h2><div class="mb-2">${gameData.howto.details}</div>`) ||
          ""
        )
    }
  }

  /**
   * @description Set game items
   * @returns {IGameItemList[] | string} gameItems
   */
  const setGameItems = (): IGameItemList[] | string => {
    switch (gameType) {
      case "partner-game":
        return []
      case "arcade-emporium":
        return (gameData && gameData.item) || []
      default:
        return []
    }
  }

  return {
    gameTags: setGameTags(),
    gameDeveloper: setGameDeveloper(),
    gamePublisher: setPublisher(),
    gameReleaseDate: setReleaseDate(),
    gamePartnerSocial: setPartnerSocial(),
    gameDescription: setDescription(),
    gamePartnerSocialState: gamePartnerSocial,
    gameDataState:
      gameDataState || gamePartnerState || gameData || partnerGames || null,
    chainName: setChainName(),
    chainIcon: setChainIcon(),
    gameMedia: setGameMedia(),
    gameTypeCode: setGameType(),
    gameOwner: setGameOwner(),
    singleVersion: setSingleVersion(),
    gameHowToPlay: setGameHowToPlay(),
    gameItems: setGameItems()
  }
}

export default useGameOverview
