export interface IMetaTag {
  pageTitle: string
  pageDescription: string
  ogURL?: string
  ogType?: string
  ogSiteName?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterImage?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
}

export interface IMetaTagConstants {
  path: string
  metaTag: IMetaTag | null
}
