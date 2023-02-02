import { IFormatMessageService, IFormatService } from "@interfaces/IHelper"
import { IGetUserByIdData } from "@src/types/profile"

export interface IGamePartnerReviewsData {
  _id: string
  createdAt: Date
  user_id: string
  review_comment: string
  review_rate: string
  status: string
  user: IGetUserByIdData
  id: string
}

export interface IGamePartnerReviewsReponse
  extends IFormatMessageService,
    IFormatService {
  data: IGamePartnerReviewsData[]
}
