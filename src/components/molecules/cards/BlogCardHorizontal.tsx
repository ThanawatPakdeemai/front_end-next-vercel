import React from "react"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { v4 as uuid } from "uuid"
import { Chip, Typography } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"
import Link from "next/link"
import { IBlogCard } from "./BlogCard"

const BlogCardHorizontal = ({
  image,
  title,
  description,
  date_released,
  blog_id,
  className,
  tags
}: IBlogCard) => (
  <motion.div
    whileHover="hover"
    initial="rest"
    key={uuid()}
    className={`card--blog__horizontal flex w-full gap-4 border-b-[1px] border-neutral-700 px-14 py-7 ${
      className ?? ""
    }`}
  >
    <div className="card--blog__horizontal-content max-w-[300px] flex-1">
      <Typography className="mb-0 line-clamp-2 h-[40px] font-neue-machina-semi text-default uppercase text-neutral-400">
        {title}
      </Typography>
      <Typography className="my-[8px] line-clamp-1 text-sm text-neutral-500">
        {description}
      </Typography>
      <div className="flex items-center gap-2">
        <Chip
          label={dayjs(date_released).format("DD MMM YYYY")}
          size="small"
          className="cursor-default uppercase !text-neutral-300"
          variant="outlined"
        />
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => (
            <Chip
              key={uuid()}
              label={tag.name}
              variant="filled"
              color="success"
              size="small"
              className="!bg-neutral-500 uppercase"
            />
          ))}
      </div>
    </div>
    <div className="card--blog__horizontal-image h-[100px] w-[100px] max-w-[100px] flex-1 overflow-hidden rounded-lg">
      <Link href={`/blog/${blog_id}`}>
        <ImageCustom
          src={image}
          alt={title}
          width={200}
          height={200}
          className="h-full w-full object-cover object-center"
        />
      </Link>
    </div>
  </motion.div>
)

export default BlogCardHorizontal
