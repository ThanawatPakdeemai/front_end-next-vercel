export interface IBadgeCriteria {
  formula: string
}

export interface IBadge {
  criterias: IBadgeCriteria[]
  name: string
  image: string
  description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  id: string
}

export interface IBadgeResponse {
  status: boolean
  message: string
  badges: IBadge[]
}
