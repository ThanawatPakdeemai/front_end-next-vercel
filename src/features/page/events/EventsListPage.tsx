import { useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { v4 as uuid } from "uuid"
import useGlobal from "@hooks/useGlobal"
import useSelectStore from "@stores/selector"
import useEventFilter from "@stores/event"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import EventsCard from "@feature/event/components/EventsCard"
import useGetEventList from "@feature/event/containers/hooks/useGetEventList"
import { getEventList } from "@feature/event/containers/services/events.service"
import { IGetEventResponseData } from "@feature/event/interface/IEventsService"

const EventsListPage = () => {
  const { page, limit, setPage, totalCount, setTotalCount } = useGlobal()
  const fetchRef = useRef(false)
  const queryClient = useQueryClient()
  const { select: selectHeader } = useSelectStore()
  const type = selectHeader
  const searchEvent = useEventFilter((state: any) => state.search)

  const { eventListData, isPreviousData } = useGetEventList({
    limit,
    skip: page,
    search: searchEvent,
    sort: type
  })

  useEffect(() => {
    let load = false
    if (!load) {
      if (!fetchRef.current && eventListData) {
        fetchRef.current = true
        setTotalCount(eventListData.info.totalCount)
      }
    }
    return () => {
      load = true
    }
  }, [eventListData, setTotalCount])

  useEffect(() => {
    let load = false
    if (!load) {
      if (!isPreviousData && eventListData) {
        queryClient.prefetchQuery({
          queryKey: ["events", type, page + 1],
          queryFn: () =>
            getEventList({
              limit,
              skip: page + 1,
              search: "",
              sort: type
            })
        })
      }
    }
    return () => {
      load = true
    }
  }, [eventListData, isPreviousData, page, queryClient, type, limit])

  return (
    <div className="blog-list-page w-full">
      <div className="my-6 !mb-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 md:my-0 xl:grid-cols-5">
        {eventListData
          ? eventListData.data.map((item: IGetEventResponseData) => (
              <EventsCard
                key={uuid()}
                event_id={item._id}
                title={item.name}
                image={item.icon_image ? item.icon_image : item.banner_image}
                date_start={item.date_start}
                date_end={item.date_end}
                status={item.status}
                color={item.status === "on going" ? "success" : "error"}
                variant="filled"
              />
            ))
          : [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default EventsListPage
