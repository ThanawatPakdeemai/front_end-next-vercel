import services from "@configs/axiosGlobalConfig"
import {
  Blog,
  IBlogDetailResponse,
  IBlogResponse,
  ICategoryResponse
} from "@feature/blog/interfaces/IBlogService"

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

export { getBlogDetail, getBlogAll, getCategoryBlogAll }
