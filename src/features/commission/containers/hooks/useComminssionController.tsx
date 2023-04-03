import { ICommissionData } from "@feature/commission/interfaces/ICommission"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Trans } from "react-i18next"
import useGetCommission from "./useGetCommission"

const useCommissionController = () => {
  const { pager, totalCount, setTotalCount, page, setPage } = useGlobal()
  const { profile } = useProfileStore()
  const { getCommissionHistory, isLoading } = useGetCommission()
  const [limit, setLimit] = useState<number>(12)
  const [txHistory, setTxHistory] = useState<ICommissionData[]>([])

  // need to refactor interface res.data <ICommissionService>
  const fetchCommission = useCallback(async () => {
    if (profile.data) {
      await getCommissionHistory({
        _playerId: profile && profile.data.id ? profile.data.id : "",
        _limit: limit,
        _page: page
      }).then((res) => {
        if (res.data.data) {
          setTxHistory(res.data.data)
        }
        if (res.data.info) {
          setTotalCount(res.data.info.totalCount)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page])

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
        title: <Trans i18nKey="time">time</Trans>,
        arrowIcon: false
      },
      {
        title: <Trans i18nKey="status">status</Trans>
      },
      {
        title: <Trans i18nKey="amount">amount</Trans>,
        arrowIcon: false
      },
      {
        title: <Trans i18nKey="details">details</Trans>
      }
    ],
    []
  )
  return {
    commissionTableHeader,
    pager,
    totalCount,
    limit,
    setLimit,
    page,
    setPage,
    isLoading,
    txHistory
  }
}

export default useCommissionController
