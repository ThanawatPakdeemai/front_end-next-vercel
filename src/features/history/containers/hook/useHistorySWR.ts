import useSWR from "swr"
import { IGetHistory } from "@feature/history/interfaces/IHistoryService"
import { getHistory } from "../services/history.service"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useHistorySWR = ({ player_id, limit, skip }: IGetHistory) => {
  const { data: historyData, error: historyError } = useSWR(
    ["getHistory"],
    () =>
      getHistory({
        player_id,
        limit,
        skip
      }),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      errorRetryCount: 0,
      errorRetryInterval: 0,
      fetcher
    }
  )

  const historyIsLoading = !historyData && !historyError
  const historyIsError = !!historyError
  const historyIsSuccess = !!historyData

  return {
    getHistoryData: getHistory,
    historyData,
    historyError,
    historyIsLoading,
    historyIsError,
    historyIsSuccess
  }
}

export default useHistorySWR
