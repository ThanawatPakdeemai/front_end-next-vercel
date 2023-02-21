import services from "@configs/axiosGlobalConfig"
import {
  IGetReferrals,
  IReferralsPlayload
} from "@feature/referral/interface/IReferralService"

export const getReferrals = async ({ player_id, skip, limit }: IGetReferrals) =>
  new Promise<IReferralsPlayload>((resolve, reject) => {
    const data = {
      player_id,
      limit,
      skip
    }
    services
      .post<IReferralsPlayload>(
        `/profile/referral/friend/activities`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
