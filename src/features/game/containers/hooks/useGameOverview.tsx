import React, { useEffect, useState } from "react"
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
import { GAME_MOCKUP_CARD, SLIDES_GAME_MOCKUP } from "@constants/images"
import { v4 as uuid } from "uuid"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGetReward from "@feature/rewardWeekly/containers/hooks/useGetReward"
import { IWeeklyPoolByGameIdData } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"

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
  const { gameItemList } = useBuyGameItemController()

  const [gameDataState, setGameDataState] = React.useState<IGame>()
  const [gamePartnerState, setGamePartnerState] =
    React.useState<IPartnerGameData>()

  const [weeklyPoolByGameId, setWeeklyPoolByGameId] =
    useState<IWeeklyPoolByGameIdData>()
  const [poolId, setPoolId] = useState<string>("")

  // Get weekly pool data any weeks
  const {
    dataWeeklyPoolByGameId,
    refetchWeeklyPoolByGameId,
    isFetchingWeeklyPoolByGameId
  } = useGetReward({
    _gameId: gameId,
    _type: "REWARD_WEEKLY",
    _poolId: poolId
  })

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
                  ? `${category.slug}?id=${category._id}`
                  : `${category.name.toLocaleLowerCase().split(" ")[1]}?id=${
                      category._id
                    }`
              }`
            })
          )
        break

      default:
        gameData && gameData.category_list && gameData.category_list.length > 0
          ? gameData.category_list.map((category) =>
              gameTags.push({
                id: category.id,
                name: category.name,
                link: `/categories/${
                  category.slug
                    ? `${category.slug}?id=${category.id}`
                    : `${category.name.toLocaleLowerCase().split(" ")[1]}?id=${
                        category.id
                      }`
                }`
              })
            )
          : gameData?.category &&
            gameTags.push({
              id: gameData?.category.id,
              name: gameData?.category.name,
              link: `/categories/${
                gameData?.category.slug
                  ? `${gameData?.category.slug}/?id=${gameData?.category.id}`
                  : `${
                      gameData?.category.name.toLocaleLowerCase().split(" ")[1]
                    }/?id=${gameData?.category.id}`
              }`
            })
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
              src: gameData ? gameData.image_banner : GAME_MOCKUP_CARD[0].src
            },
            {
              id: uuid(),
              type: "video",
              src: gameData
                ? gameData.animation_nft_arcade_game
                : GAME_MOCKUP_CARD[1].src
            },
            {
              id: uuid(),
              type: "image",
              src: gameData
                ? gameData.image_nft_arcade_game
                : GAME_MOCKUP_CARD[2].src
            },
            {
              id: uuid(),
              type: "image",
              src: gameData
                ? gameData.image_background
                : GAME_MOCKUP_CARD[3].src
            },
            {
              id: uuid(),
              type: "image",
              src: gameData
                ? gameData.image_category_list
                : GAME_MOCKUP_CARD[4].src
            },
            {
              id: uuid(),
              type: "image",
              src: gameData
                ? gameData.image_background
                : GAME_MOCKUP_CARD[5].src
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
        gameDataMedia.push(
          {
            id: uuid(),
            type: "image",
            src:
              gameData && gameData.image_background
                ? gameData.image_background
                : GAME_MOCKUP_CARD[0].src
          }
          // TODO: uncomment when game data is ready
          // {
          //   id: uuid(),
          //   type: "image",
          //   src: gameData ? gameData.image_category_list : ""
          // },
          // {
          //   id: uuid(),
          //   type: "image",
          //   src: gameData ? gameData.image_room : ""
          // },
          // {
          //   id: uuid(),
          //   type: "image",
          //   src: gameData ? gameData.image_waiting : ""
          // },
          // {
          //   id: uuid(),
          //   type: "image",
          //   src: gameData ? gameData.image_sum : ""
          // },
          // {
          //   id: uuid(),
          //   type: "image",
          //   src: gameData ? gameData.image_reward : ""
          // }
          // ...EMPTY_MEDIAS,
          // ...EMPTY_MEDIAS
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
    if (gameData) {
      switch (gameType) {
        case "arcade-emporium":
          return gameData.is_NFT &&
            "is_NFT" in gameData &&
            gameData.NFT_info.NFT_token !== null
            ? gameData.NFT_Owner
            : "-"
        default:
          return gameData.developer || "-"
      }
    }
    return "-"
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
        return (gameData && gameData.item) || gameItemList || []
    }
  }

  const getPlayingCount = (): number | undefined => {
    if (gameDataState && "game_type" in gameDataState) {
      switch (gameType) {
        case "story-mode-games":
          return gameDataState.play_total_count
        default:
          return undefined
      }
    } else {
      return undefined
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataWeeklyPoolByGameId) {
        setWeeklyPoolByGameId(dataWeeklyPoolByGameId)
      }
    }

    return () => {
      load = true
    }
  }, [dataWeeklyPoolByGameId])

  useEffect(() => {
    refetchWeeklyPoolByGameId()
  }, [poolId, refetchWeeklyPoolByGameId])

  const onClickedPrevWeeklyPrizePoolByGameId = (_previousId: string) => {
    setPoolId(_previousId)
  }
  const onClickedNextWeeklyPoolByGameId = (_nextId: string) => {
    setPoolId(_nextId)
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
    gameItems: setGameItems(),
    playCount: getPlayingCount(),
    onClickedNext: onClickedNextWeeklyPoolByGameId,
    onClickedPrev: onClickedPrevWeeklyPrizePoolByGameId,
    weeklyPoolByGameId,
    isLoadingWeeklyPoolByGameId: isFetchingWeeklyPoolByGameId
  }
}

export default useGameOverview
