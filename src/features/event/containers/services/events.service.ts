import services from "@configs/axiosGlobalConfig"
import {
  IGetAllEventsProps,
  IGetEventResponse,
  IResponseLeaderBoard,
  IResponseTopScoreSummaryDataData
} from "../../interface/IEventsService"

export const getEventList = async ({
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
      .get<IGetEventResponse>(`/event/${_id}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

export const getEventLeaderBoard = async (_id: string) =>
  new Promise<IResponseLeaderBoard>((resolve, reject) => {
    services
      .get<IResponseLeaderBoard>(`/event/leaderboard/new/${_id}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

export const getEventTopScore = async (_id: string) =>
  new Promise<IResponseTopScoreSummaryDataData>((resolve, reject) => {
    services
      .get<IResponseTopScoreSummaryDataData>(`/event/summary/${_id}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
