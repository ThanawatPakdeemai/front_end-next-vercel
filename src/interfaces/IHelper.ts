export interface IPropsFormatNumberOption {
  notation?: "standard" | "scientific" | "engineering" | "compact"
  compactDisplay?: "short" | "long"
  maximumFractionDigits?: number
}

export interface IInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}
