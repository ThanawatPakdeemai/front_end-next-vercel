import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import {
  Blog,
  IBlogDetailResponse,
  IBlogResponse,
  ICategoryResponse
} from "../../interface/blog"

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
      .post(`${BASE_URL.api}/blog/list/${cate}`, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

const getBlogDetail = (blog_id: string) =>
  new Promise<IBlogDetailResponse>((resolve, reject) => {
    if (blog_id) {
      services
        .get(`${BASE_URL.api}/blog/${blog_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

const getCategoryBlogAll = ({
  limit = 20,
  skip = 1,
  search = "",
  sort = ""
}: Blog) =>
  new Promise<ICategoryResponse>((resolve, reject) => {
    const data = {
      search,
      limit,
      skip,
      sort
    }
    services
      .post<ICategoryResponse>(`${BASE_URL.api}/blog/all/category`, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })

export { getBlogDetail, getBlogAll, getCategoryBlogAll }
