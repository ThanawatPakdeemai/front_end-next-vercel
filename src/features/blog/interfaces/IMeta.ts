import { Tag } from "./IBlogTagsService"

export interface IMetaDate {
  date: string
  dateTitle?: string
}

export interface IMetaTags {
  tags: Tag[]
  titleTag?: string
}

export interface IMetaWriter {
  writerName: string
  writerTitle?: string
}
