import { IReviewList } from "@feature/review/interfaces/IReviewGame"
import { IInfo } from "@interfaces/IHelper"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllGameReview } from "@feature/review/containers/services/review.services"
import useProfileStore from "@stores/profileStore"
import useMutateReview from "./useMutateReview"

const useReviewContext = (_id: string) => {
  const { profile } = useProfileStore()
  const { mutateCheckOwnerReview } = useMutateReview()
  const [reviewLoading, setReviewLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(5)
  const [page, setPage] = useState<number>(1)
  const [reviewList, setReviewList] = useState<Array<IReviewList>>([])
  const [reviewInfo, setReviewInfo] = useState<IInfo | undefined>(undefined)
  const [ownerReview, setOwnerReview] = useState<IReviewList | undefined>(
    undefined
  )

  const getReviewListById = async (_checkOwner: boolean) => {
    setReviewLoading(true)
    let _list: Array<IReviewList> = []
    let _info: IInfo | undefined
    const { status, data, info } = await getAllGameReview({
      _limit: limit,
      _page: page,
      _gameId: _id,
      _sort: "createdAt"
    })
    if (status && data) {
      _list = data.map((r) => ({
        id: r._id,
        createdAt: r.createdAt,
        review_comment: r.review_comment,
        review_rate: r.review_rate,
        status: r.status,
        player_info: {
          id: r.player_id._id,
          username: r.player_id.username,
          avatar: r.player_id.avatar
        }
      }))
      _info = info
    }
    if (profile.data) {
      const { status: checkStatus, data: checkData } =
        await mutateCheckOwnerReview(_id)
      if (checkStatus && checkData && checkData.is_active) {
        setOwnerReview({
          id: checkData._id,
          createdAt: checkData.createdAt,
          review_comment: checkData.review_comment,
          review_rate: checkData.review_rate,
          status: checkData.status,
          player_info: {
            id: checkData.player_id._id,
            username: checkData.player_id.username,
            avatar: checkData.player_id.avatar
          }
        })
      }
    }
    setReviewList(_list)
    setReviewInfo(_info)
    setReviewLoading(false)
    return _list
  }

  const updateReviewList = async (
    _action: "add" | "update" | "delete",
    _review: IReviewList
  ) => {
    let _dummy: Array<IReviewList> = []
    switch (_action) {
      case "add":
        _dummy = [...reviewList, _review]
        break
      case "update": {
        const _findOwnerReview = reviewList.findIndex(
          (f) => f.id === _review.id
        )
        if (reviewList.length > 0 && _findOwnerReview >= 0) {
          _dummy = reviewList.splice(_findOwnerReview, 1, _review) && reviewList
        }
        break
      }
      case "delete": {
        const _findOwnerReview = reviewList.findIndex(
          (f) => f.id === _review.id
        )
        if (reviewList.length > 0 && _findOwnerReview >= 0) {
          _dummy = reviewList.splice(_findOwnerReview, 1) && reviewList
        }
        break
      }
      default:
        break
    }
    if (_dummy && _dummy !== reviewList) setReviewList(_dummy)
    if (_action === "delete") {
      setOwnerReview(undefined)
      getReviewListById(false)
    } else setOwnerReview(_review)
  }

  const { refetch: reFetchReviewList } = useQuery({
    queryKey: ["getGameReviewById", limit, page, _id],
    queryFn: () => getReviewListById(true),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_id,
    retry: false
  })

  return {
    gameId: _id,
    limit,
    setLimit,
    page,
    setPage,
    reviewList,
    reviewInfo,
    ownerReview,
    reFetchReviewList,
    reviewLoading,
    updateReviewList
  }
}

export default useReviewContext
