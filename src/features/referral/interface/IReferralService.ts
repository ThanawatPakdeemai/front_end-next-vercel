export interface IReferralsActivities {
  _id: string
  referral_earn: number
  date: string
  referral_id: string
  username: string
}

export interface IReferralsInfo {
  currentCount: number
  limit: number
  pages: number
  totalCount: number
}

export interface IGetReferrals {
  player_id: string
  skip: number
  limit: number
}

// export interface AxiosResponse<T = IReferralsData> {
//   data: T
//   status: number
//   statusText: string
//   config: AxiosRequestConfig
// }

export interface IReferrals {
  data: IReferrals
  info: IReferralsInfo
  youEarn: number
  countReferral: number
  gameCountReferralPlay: number
  data_activities: IReferralsActivities[]
}

export interface IReferralsPlayload {
  data: IReferrals
  info: IReferralsInfo
}

export interface IReferralsData {
  data: IReferralsPlayload
}
