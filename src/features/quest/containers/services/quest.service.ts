import services from "@configs/axiosGlobalConfig"
import { IQuestService } from "@feature/quest/interfaces/IQuestService"
import { IFormatMessageService } from "@interfaces/IHelper"

export const getAllQuest = (_playerId: string) =>
  new Promise<IQuestService>((resolve, reject) => {
    services
      .get<IQuestService>(`/profile/quest/${_playerId}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const claimQuestById = (_questId: string) =>
  new Promise<IFormatMessageService>((resolve, reject) => {
    const data = { quest_id: _questId }
    services
      .post<IFormatMessageService>(`/profile/quest/claim-quest-rewards`, {
        ...data
      })
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })
