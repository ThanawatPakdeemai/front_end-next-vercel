import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Trans } from "react-i18next"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"

const useCommissionController = () => {
  const { pager, totalCount, setTotalCount, page, setPage } = useGlobal()
  const { profile } = useProfileStore()
  const { getTransHistory, isLoading } = useGetTransWallet()
  const [limit, setLimit] = useState<number>(12)
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])

  // need to refactor interface res.data <ICommissionService>
  const fetchCommission = useCallback(async () => {
    if (profile) {
      await getTransHistory({
        _playerId: profile && profile.data ? profile.data.id : "",
        _type: ["PayCommission", "PayOwnerCommission"],
        _limit: limit,
        _page: page
      }).then((res) => {
        // res.status === 200 -> ok
        if (res.data) {
          setTxHistory(res.data)
        }
        if (res.info) {
          setTotalCount(res.info.totalCount)
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
