import { useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import useFilterEvents from "@stores/events"
import useSelectStore from "@stores/selector"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import { v4 as uuid } from "uuid"
import EventsCard from "@feature/event/components/EventsCard"
import useGetEventList from "@feature/event/containers/hooks/useGetEventList"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import useGlobal from "@hooks/useGlobal"
import { getEventList } from "../../event/containers/services/events.service"
import { IGetEventResponseData } from "../../event/interface/IEventsService"

const EventsListPage = () => {
  const { page, limit, setPage, totalCount, setTotalCount } = useGlobal()
  const fetchRef = useRef(false)
  const queryClient = useQueryClient()
  const { select: selectHeader } = useSelectStore()
  const type = selectHeader
  const searchEvent = useFilterEvents((state: any) => state.search)

  const { eventListData, isPreviousData } = useGetEventList({
    limit,
    skip: page,
    search: searchEvent,
    sort: type
  })

  useEffect(() => {
    if (!fetchRef.current && eventListData) {
      fetchRef.current = true
      setTotalCount(eventListData.info.totalCount)
    }
  }, [eventListData, setTotalCount])

  useEffect(() => {
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
  }, [eventListData, isPreviousData, page, queryClient, type, limit])

  return (
    <>
      <div className="lg: mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {eventListData
          ? eventListData.data.map((item: IGetEventResponseData) => (
              <EventsCard
                key={uuid()}
                event_id={item._id}
                title={item.name}
                image={item.banner_image}
                date_start={item.date_start}
                date_end={item.date_end}
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
    </>
  )
}

export default EventsListPage
