import services from "@configs/axiosGlobalConfig"
import { PopularTags } from "@feature/blog/interfaces/IBlogPopularTags"
import {
  Blog,
  IBlogDetailResponse,
  IBlogResponse,
  ICategoryResponse
} from "@feature/blog/interfaces/IBlogService"
import {
  BlogTags,
  BlogTagsPayload
} from "@feature/blog/interfaces/IBlogTagsService"

const getBlogAll = ({
  limit = 10,
  skip = 1,
  search = "",
  cate = "all",
  sort = ""
}: Blog) =>
  new Promise<IBlogResponse>((resolve, reject) => {
    const data = {
      limit,
      skip,
      search,
      sort
    }
    services
      .post<IBlogResponse>(`/blog/list/${cate}`, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

const getBlogDetail = (blog_id: string) =>
  new Promise<IBlogDetailResponse>((resolve, reject) => {
    if (blog_id) {
      services
        .get(`/blog/${blog_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

const getCategoryBlogAll = ({ limit, skip, search, sort }: Blog) =>
  new Promise<ICategoryResponse>((resolve, reject) => {
    const data = {
      search,
      limit,
      skip,
      sort
    }
    services
      .post<ICategoryResponse>(`/blog/all/category`, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

const getBlogTags = ({ limit, skip, sort, search, tags_id }: BlogTagsPayload) =>
  new Promise<BlogTags>((resolve, reject) => {
    const data = {
      limit,
      skip,
      sort,
      search,
      tags_id
    }
    services
      .post<BlogTags>(`/blog/list-tag`, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

const getPopularTags = () =>
  new Promise<PopularTags>((resolve, reject) => {
    services
      .post<PopularTags>(`/blog/popular`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

export {
  getBlogDetail,
  getBlogAll,
  getCategoryBlogAll,
  getBlogTags,
  getPopularTags
}
