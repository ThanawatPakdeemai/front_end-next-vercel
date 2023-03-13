import services from "@configs/axiosGlobalConfig"
import {
  IGetAllEventsProps,
  IGetEventResponse
} from "../../interface/IEventsService"

export const getEventAll = async ({
  limit,
  skip,
  sort,
  search
}: IGetAllEventsProps) =>
  new Promise<IGetEventResponse>((resolve, reject) => {
    const body = {
      limit: limit || 20,
      skip: skip || 1,
      sort: sort || "_id",
      search: search || ""
    }
    services
      .post<IGetEventResponse>(`/event/all`, body)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

export const getEventDetail = async (_id: string) =>
  new Promise<IGetEventResponse>((resolve, reject) => {
    services
      .post<IGetEventResponse>(`/event/${_id}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
