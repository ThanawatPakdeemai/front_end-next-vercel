import { Box, Skeleton } from "@mui/material"

const SkeletonBlogDetail = () => (
  <div className="skeleton--blog-detail">
    <Skeleton className="h-[300px] w-full" />
    <div className="mx-5 grid grid-cols-1 lg:grid-cols-4 xl:flex">
      <Box
        component="div"
        className="relative col-span-3 mr-5 flex h-auto w-full flex-col lg:w-[95%] xl:w-[calc(100%-512px)]"
      >
        <Skeleton className="h-screen w-full transform-none" />
      </Box>
      <div className="relative flex w-full flex-col xl:w-[512px]">
        <Skeleton className="h-screen w-full transform-none" />
      </div>
    </div>
  </div>
)

export default SkeletonBlogDetail
