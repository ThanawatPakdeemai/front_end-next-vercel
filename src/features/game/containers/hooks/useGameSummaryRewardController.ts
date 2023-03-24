import CONFIGS from "@configs/index"
import { IGame, IGameSummary } from "@feature/game/interfaces/IGameService"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
import useNotificationRead from "@feature/notification/containers/hooks/useNotificationRead"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import useGetReward from "@feature/rewardWeekly/containers/hooks/useGetReward"
import { IRewardWeeklyData } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"
import useGlobal from "@hooks/useGlobal"
import { IGameReward } from "@src/types/games"
import useGameStore from "@stores/game"
import useNotiStore from "@stores/notification"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useState } from "react"
import useGetGameByPath from "./useFindGameByPath"
import useGetGameRoomById from "./useGetGameRoomById"
import useGetSummaryGameByRoomId from "./useGetSummaryGameByRoomId"

const useGameSummaryRewardController = () => {
  // Store
  const { notification, playHistory } = useNotiStore()
  const profile = useProfileStore((state) => state.profile.data)
  const { onSetGameData, data: dataGameStore } = useGameStore()
  const { getTypeGamePathFolder } = useGlobal()

  // State
  const [notificationItem, setNotificationItem] =
    useState<INotification | null>(null)
  const [playHistoryItem, setPlayHistory] = useState<IHistory | null>(null)
  const [playerWeekly, setPlayerWeekly] = useState<IRewardWeeklyData[]>([])
  const [playerSummary, setPlayerSummary] = useState<IGameReward[]>([])
  const [gameDataState, setGameDataState] = useState<IGame>({} as IGame)
  const [totalGameReward, setTotalGameReward] = useState<number>(0)
  const [summaryDataPlayerId, setSummaryDataPlayerId] = useState<IGameSummary>(
    {} as IGameSummary
  )
  const [summaryDataPlayerIdWeekly, setSummaryDataPlayerIdWeekly] =
    useState<IRewardWeeklyData>({} as IRewardWeeklyData)
  const [shareURL, setShareURL] = useState<string>("")
  const [gameItemBalance, setGameItemBalance] = useState<number>(0)

  // Hooks
  const { gameRoomById } = useGetGameRoomById(
    notification?.room_id || playHistory?.room_id || ""
  )
  const { summaryGameData } = useGetSummaryGameByRoomId(
    notification?.room_id || playHistory?.room_id || ""
  )
  const { balanceofItem } = useGetBalanceOf({
    _address: profile?.address || "",
    _item_id:
      (summaryDataPlayerId &&
        summaryDataPlayerId.detail_used_items &&
        summaryDataPlayerId.detail_used_items.item_id_smartcontract) ||
      (dataGameStore?.item &&
        dataGameStore?.item.length > 0 &&
        dataGameStore?.item[0].item_id_smartcontract) ||
      0
  })
  const { mutateUpdateNotiStatusById } = useNotificationRead(
    notification?._id || ""
  )

  /**
   * @description Get pool id from notification
   * @returns
   */
  const getPoolId = (): string => {
    if (notification?.type === "REWARD_WEEKLY") {
      return notification?.weekly_pool_id || ""
    }
    if (notification?.type === "REWARD_GAME_POOL") {
      return notification?.pool_id || ""
    }
    return notification?.room_id || playHistory?.room_id || ""
  }

  /**
   * @description Get reward data from notification type
   */
  const { dataWeeklyPool, dataGamePoolReward } = useGetReward({
    _poolId: getPoolId(),
    _gameId: notification?.game_id || "",
    _type: notification?.type || "REWARD"
  })

  /**
   * @description Get game data from notification game path
   */
  const { gameData } = useGetGameByPath(
    notification?.path || playHistory?.path || ""
  )

  /**
   * @description Get players by notification type
   */
  const fetchPlayersByNotificationType = useCallback(
    () => {
      switch (notification?.type) {
        case "REWARD_WEEKLY":
          if (!dataWeeklyPool) return
          if (dataWeeklyPool) {
            setPlayerWeekly(dataWeeklyPool)
            const _totalGameReward = dataWeeklyPool.reduce(
              (partialSum, a) => partialSum + a.reward,
              0
            )
            setTotalGameReward(_totalGameReward)

            // Find current player's summary data by player id
            const _currentPlayerData = dataWeeklyPool.find(
              (item) =>
                item.player_id ===
                (notification?.player_id || playHistoryItem?.player_id)
            )
            if (_currentPlayerData) {
              setSummaryDataPlayerIdWeekly(_currentPlayerData)
            }
          }
          break

        case "REWARD_GAME_POOL":
          if (!dataGamePoolReward) return
          if (dataGamePoolReward) {
            setPlayerWeekly(dataGamePoolReward as IRewardWeeklyData[])
            const _totalGameReward = (
              dataGamePoolReward as IRewardWeeklyData[]
            ).reduce((partialSum, a) => partialSum + a.reward, 0)
            setTotalGameReward(_totalGameReward)
          }
          break

        // Get reward by room id using /api/summary/${room_id}
        default:
          if (!summaryGameData) return
          if (summaryGameData) {
            const sortResult = summaryGameData.sort(
              (a, b) => b.current_score - a.current_score
            )
            setPlayerSummary(sortResult)

            // Sum total reward
            const _totalGameReward = summaryGameData.reduce(
              (partialSum, a) => partialSum + a.naka_for_player,
              0
            )
            setTotalGameReward(_totalGameReward)

            // Find current player's summary data by player id
            const _currentPlayerData = summaryGameData.find(
              (item) =>
                item.player_id ===
                (notification?.player_id || playHistoryItem?.player_id)
            )
            if (_currentPlayerData) {
              setSummaryDataPlayerId(_currentPlayerData)
            }
          }
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      playHistory,
      notification,
      dataWeeklyPool,
      dataGamePoolReward,
      summaryGameData
    ]
  )

  const fetchPlayersList = () => {
    switch (notification?.type) {
      case "REWARD_WEEKLY":
      case "REWARD_GAME_POOL":
        return playerWeekly
      default:
        return playerSummary
    }
  }

  const fetchItemName = () => {
    if (summaryDataPlayerId && summaryDataPlayerId.detail_used_items) {
      return summaryDataPlayerId.detail_used_items.name
    }
    if (gameDataState.item && gameDataState.item.length > 0) {
      return gameDataState.item[0].name
    }
    return "-"
  }

  const fetchUsedItemAmount = () => {
    if (
      summaryDataPlayerId &&
      summaryDataPlayerId.used_items &&
      summaryDataPlayerId.used_items.length > 0
    ) {
      return summaryDataPlayerId.used_items[0].qty
    }
    return 0
  }

  const fetchUsedItemImage = () => {
    if (summaryDataPlayerId.detail_used_items) {
      return {
        white: summaryDataPlayerId.detail_used_items.image_icon,
        red: summaryDataPlayerId.detail_used_items.image_icon_color
      }
    }
    if (gameDataState.item && gameDataState.item.length > 0) {
      return {
        white: gameDataState.item[0].image_icon,
        red: gameDataState.item[0].image_icon_color
      }
    }
    return {
      white: "",
      red: ""
    }
  }

  /**
   * @description Update notification status to read when click notification item
   * @param _notificationItem
   * @returns
   */
  const onUpdateReadNotification = (_notificationItem: INotification) => {
    if (_notificationItem?.read === true) return
    mutateUpdateNotiStatusById()
  }

  /**
   * Set notification to store
   */
  useEffect(() => {
    if (!notification) return
    if (notification) {
      setNotificationItem(notification)
      onUpdateReadNotification(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  /**
   * Set notification to store
   */
  useEffect(() => {
    if (!playHistory) return
    if (playHistory) {
      setPlayHistory(playHistory)
    }
  }, [playHistory])

  /**
   * Set game data to store
   */
  useEffect(() => {
    if (gameData) {
      onSetGameData(gameData)
      setGameDataState(gameData)
      setShareURL(
        `${CONFIGS.BASE_URL.FRONTEND}/${getTypeGamePathFolder(gameData)}/${
          gameData.path
        }`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData, onSetGameData])

  useEffect(() => {
    if (!balanceofItem) return
    if (balanceofItem && balanceofItem.data) {
      setGameItemBalance(balanceofItem.data)
    }
  }, [balanceofItem])

  /**
   * Check summary/reward data from notification type
   */
  useEffect(() => {
    fetchPlayersByNotificationType()
  }, [
    fetchPlayersByNotificationType,
    notification,
    dataWeeklyPool,
    dataGamePoolReward,
    summaryGameData,
    gameRoomById,
    gameData
  ])

  return {
    playHistoryItem,
    notificationItem,
    gameRoomById,
    totalGameReward,
    gameDataState,
    players: fetchPlayersList(),
    summaryDataPlayerId,
    summaryDataPlayerIdWeekly,
    shareURL,
    usedItem: {
      name: fetchItemName(),
      usedAmount: fetchUsedItemAmount(),
      images: fetchUsedItemImage()
    },
    gameItemBalance
  }
}

export default useGameSummaryRewardController
