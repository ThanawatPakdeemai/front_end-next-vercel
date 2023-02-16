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
import useGamesById from "./useFindGameById"

/**
 * @description Game Overview Hook functions to handle all game overview data
 * @param gameId
 * @param gameType
 */
const useGameOverview = (gameId: string, gameType: IGetType) => {
  const gameTags: IGameTag[] = []
  const gameDataMedia: IVerticalThumbSlide[] = []
  const gamePartnerSocial: IMenuBase[] = []
  const { gameData, partnerGames } = useGamesById(gameId, gameType)

  const [gameDataState, setGameDataState] = React.useState<IGame>()
  const [gamePartnerState, setGamePartnerState] =
    React.useState<IPartnerGameData>()

  useEffect(() => {
    if (gameData) setGameDataState(gameData)
    if (partnerGames) setGamePartnerState(partnerGames)
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
          gameData.category_list.map((category) =>
            gameTags.push({
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
        return (partnerGames && partnerGames.short_detail.developer) || "-"

      default:
        return (gameData && gameData.developer) || "-"
    }
  }

  /**
   * @description Set Game Publisher
   * @returns {string} gamePublisher
   */
  const setPublisher = (): string => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames.short_detail.publisher) || "-"
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
            dayjs(partnerGames.short_detail.release_date).format(
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
              href: partnerGames.social.web || ""
            },
            {
              icon: <DiscordIcon />,
              label: "Discord",
              href: partnerGames.social.discord || ""
            },
            {
              icon: <FacebookIcon />,
              label: "Facebook",
              href: partnerGames.social.facebook || ""
            },
            {
              icon: <MediumIcon />,
              label: "Medium",
              href: partnerGames.social.medium || ""
            },
            {
              icon: <TelegramIcon />,
              label: "Telegram",
              href: partnerGames.social.telegram || ""
            },
            {
              icon: <TiktokIcon />,
              label: "Tiktok",
              href: partnerGames.social.tiktok || ""
            },
            {
              icon: <TwitterIcon />,
              label: "Twitter",
              href: partnerGames.social.twitter || ""
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
        return (partnerGames && partnerGames.description) || "-"
      default:
        return (gameData && gameData.story) || "-"
    }
  }

  const setChainName = () => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames.short_detail.network_name) || "-"
      default:
        return "-"
    }
  }

  const setChainIcon = () => {
    switch (gameType) {
      case "partner-game":
        return (partnerGames && partnerGames.short_detail.network_icon) || "-"
      default:
        return "-"
    }
  }

  /**
   * @description Set game media
   * @returns {IVerticalThumbSlide[]}
   */
  const setGameMedia = (): IVerticalThumbSlide[] => {
    switch (gameType) {
      case "partner-game":
        if (partnerGames && partnerGames.media_list.length > 0) {
          partnerGames.media_list.map((media) =>
            gameDataMedia.push({
              id: media._id,
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
              id: "1",
              type: "image",
              src: gameData ? gameData.image_banner : ""
            },
            {
              id: "2",
              type: "video",
              src: gameData ? gameData.animation_nft_arcade_game : ""
            },
            {
              id: "3",
              type: "image",
              src: gameData ? gameData.image_nft_arcade_game : ""
            },
            {
              id: "4",
              type: "image",
              src: gameData ? gameData.image_background : ""
            },
            {
              id: "5",
              type: "image",
              src: gameData ? gameData.image_category_list : ""
            },
            {
              id: "6",
              type: "image",
              src: gameData ? gameData.image_background : ""
            }
          )
        }
        break
      default:
        gameDataMedia.push(
          {
            id: "1",
            type: "image",
            src: gameData ? gameData.image_banner : ""
          },
          {
            id: "2",
            type: "image",
            src: gameData ? gameData.image_list : ""
          }
        )
        break
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
        return (partnerGames && partnerGames.how_to_play) || ""
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
