import { IFormatMessageService } from "@interfaces/IHelper"

export interface IQuestReward {
  type: string
  item_id: null | string
  name: string | null
  image: null | string
  amount: number
}

export interface IQuestTaskList {
  _id: string
  title: string
  formula: string
  condition_value: number
  counter_value: number
  complete_status: boolean
}

export interface IQuestData {
  id: string
  name: string
  type: string
  status: string
  task_list: IQuestTaskList[]
  claim_reward_progress: string
  rewards: IQuestReward[]
  started_at: Date | null
  ended_at: Date | null
  claim_reward_status: boolean
  hot_quest: boolean
}

export interface IQuestService extends IFormatMessageService {
  data: IQuestData[]
}
