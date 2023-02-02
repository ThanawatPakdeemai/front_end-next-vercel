export interface IGetfeegas {
  effectiveGasPrice: string
  gasUsed: number
}

// interface ITopics {
//   topices: string[]
// }

// interface IRaw {
//   data: string
//   topics: ITopics
// }

export interface IGeteventlog {
  allowed: string[]
  events: object
}

export interface IWeiToNaka {
  amount: string
}
