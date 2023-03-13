import { useEffect, useState, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import useFilterEvents from "@stores/events"
import useSelectStore from "@stores/selector"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import { v4 as uuid } from "uuid"
import EventsCard from "@feature/event/components/EventsCard"
import useGetEvents from "@feature/event/containers/hooks/useGetEvents"
import { getEventAll } from "../../event/containers/services/events.service"
import { IGetEventResponseData } from "../../event/interface/IEventsService"

const EventsListPage = () => {
  const limitPage = 16
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const queryClient = useQueryClient()
  const { select: selectHeader } = useSelectStore()
  const type = selectHeader
  const searchEvent = useFilterEvents((state: any) => state.search)

  const { getEventAllData, isPreviousData } = useGetEvents({
    limit: limitPage,
    skip: page,
    search: searchEvent,
    sort: type
  })

  useEffect(() => {
    if (!fetchRef.current && getEventAllData) {
      fetchRef.current = true
      setTotalCount(getEventAllData.info.totalCount)
    }
  }, [getEventAllData])

  useEffect(() => {
    if (!isPreviousData && getEventAllData) {
      queryClient.prefetchQuery({
        queryKey: ["events", type, page + 1],
        queryFn: () =>
          getEventAll({
            limit: limitPage,
            skip: page + 1,
            search: "",
            sort: type
          })
      })
    }
  }, [getEventAllData, isPreviousData, page, queryClient, type, limitPage])

  return (
    <>
      <div className="lg: mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getEventAllData?.data.map((item: IGetEventResponseData) => (
          <EventsCard
            key={uuid()}
            title={item.name}
            image={item.banner_image}
            date_start={item.date_start}
          />
        ))}
      </div>
      <PaginationNaka
        totalCount={totalCount}
        limit={limitPage}
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default EventsListPage
