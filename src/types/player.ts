export interface IPlayer {
  id: string
  name: string
  cover: string
  isActive: boolean
  owner?: boolean // For create room function only
  tag?: string
}

// Waiting room player socket
export interface IPlayerSocket {
  id: string
  name: string
  cover: string
  rank: null
  isActive: boolean
  owner: boolean
  kick: boolean
  ready: boolean
  item_burn: boolean
  transaction_status: boolean
  empty: boolean
}
