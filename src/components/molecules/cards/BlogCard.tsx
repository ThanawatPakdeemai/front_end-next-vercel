import React from "react"
import dayjs from "dayjs"
import { motion, Variants } from "framer-motion"
import { v4 as uuid } from "uuid"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import FireIcon from "@components/icons/BlogIcon/FireIcon"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link"
import { ImageCustom } from "@components/atoms/image/Image"
import { Tag } from "@feature/blog/interfaces/IBlogTagsService"

export interface IBlogCard {
  iconmotion?: Variants
  arrowMotion?: Variants
  imgMotion?: Variants
  image: string
  title: string
  description: string
  date_released: Date | string
  blog_id: string
  className?: string
  tags?: Tag[]
}

const BlogCard = ({
  iconmotion,
  arrowMotion,
  imgMotion,
  image,
  title,
  description,
  date_released,
  blog_id,
  className
}: IBlogCard) => (
  <div>
    <motion.div
      whileHover="hover"
      initial="rest"
      key={uuid()}
      className={`mx-auto w-[265px] md:mx-0 md:w-[256px] lg:w-[250px] 2xl:w-[272px] ${
        className ?? ""
      }`}
    >
      <Link href={`/blog/${blog_id}`}>
        <div className="relative">
          <ButtonIcon
            variants={iconmotion}
            icon={<FireIcon />}
            className="z-4 absolute right-0 top-0 m-4 flex items-center justify-center rounded-lg bg-neutral-900 p-1"
          />

          <motion.div
            variants={imgMotion}
            className="overflow-hidden rounded-md"
          >
            <ImageCustom
              src={image}
              alt={title}
              width={300}
              height={300}
              className="h-full min-h-[190px] w-full object-cover object-center"
            />
          </motion.div>
        </div>

        <Typography className="mt-4 line-clamp-2 min-h-[40px] text-default uppercase text-neutral-400">
          {title}
        </Typography>
      </Link>
      <Typography className="my-4 min-h-[40px] text-sm text-neutral-500">
        {description}
      </Typography>
      <motion.div className="mb-4 flex justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 px-[30px] py-[10px]">
        {/* {blog_id} */}
        <Typography className="self-center text-sm">
          {dayjs(date_released).format("DD MMM YYYY")}
        </Typography>
        <div className="border-r border-neutral-700 border-opacity-80" />
        <Link href={`/blog/${blog_id}`}>
          <div className="flex items-center">
            <Typography className="text-sm">Blockchain</Typography>
            <motion.div
              variants={arrowMotion}
              className="opacity-1 absolute ml-16"
            >
              <ArrowForwardIcon sx={{ height: 14, displayBlock: "none" }} />
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  </div>
)

export default BlogCard
