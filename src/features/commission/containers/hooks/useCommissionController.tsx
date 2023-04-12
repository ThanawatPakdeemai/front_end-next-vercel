import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Trans } from "react-i18next"
import { ICommissionData } from "@feature/commission/interfaces/ICommission"
import useGetCommission from "./useGetCommission"

const useCommissionController = () => {
  const { pager, totalCount, setTotalCount, page, setPage, limit, setLimit } =
    useGlobal()
  const { profile } = useProfileStore()
  const { commissionHistoryData, isLoadingCommissionHistory } =
    useGetCommission({
      _playerId: profile && profile.data ? profile.data.id : "",
      _limit: limit,
      _page: page
    })
  const [commissionHistory, setCommissionHistory] = useState<ICommissionData[]>(
    []
  )

  // need to refactor interface res.data <ICommissionService>
  const fetchCommission = useCallback(async () => {
    if (profile) {
      if (
        commissionHistoryData &&
        commissionHistoryData.data &&
        commissionHistoryData.data.length > 0
      ) {
        setCommissionHistory(commissionHistoryData.data)
        setTotalCount(commissionHistoryData.info.totalCount)
        setLimit(commissionHistoryData.info.limit)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, profile, commissionHistoryData])

  useEffect(() => {
    let load = false

    if (!load) fetchCommission()

    return () => {
      load = true
    }
  }, [fetchCommission])

  const commissionTableHeader = useMemo(
    () => [
      {
        title: <Trans i18nKey="time" />,
        arrowIcon: false
      },
      {
        title: <Trans i18nKey="status" />
      },
      {
        title: <Trans i18nKey="amount_naka" />,
        arrowIcon: false
      },
      {
        title: <Trans i18nKey="details" />
      }
    ],
    []
  )
  return {
    commissionHistoryState: commissionHistory,
    commissionTableHeader,
    pager,
    totalCount,
    limit,
    page,
    setPage,
    setLimit,
    isLoadingCommissionHistory
  }
}

export default useCommissionController
