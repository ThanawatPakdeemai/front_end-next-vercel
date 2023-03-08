import React from "react"
import dayjs from "dayjs"
import { motion, Variants } from "framer-motion"
import { v4 as uuid } from "uuid"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import FireIcon from "@components/icons/BlogIcon/FireIcon"
import { CardMedia, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link"

export interface IBlogCard {
  iconmotion?: Variants
  arrowMotion?: Variants
  imgMotion?: Variants
  image: any
  title: any
  description: any
  date_released: any
  blog_id: string
  className?: string
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
      className={`mx-auto w-[265px] cursor-pointer md:mx-0 lg:w-[250px] 2xl:w-[272px] ${className}`}
    >
      <div className="relative">
        <ButtonIcon
          variants={iconmotion}
          icon={<FireIcon />}
          className="z-4 absolute top-0 right-0 m-4 flex items-center justify-center rounded-lg bg-neutral-900 p-1"
        />
        <motion.div variants={imgMotion}>
          <CardMedia
            image={image}
            sx={{
              height: "238px",
              borderRadius: "24px"
            }}
          />
        </motion.div>
      </div>

      <Typography className="mt-4 text-default uppercase">{title}</Typography>
      <Typography className="mt-4 text-sm">{description}</Typography>
      <motion.div className="mt-[20px] flex justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 py-[10px] px-[30px]">
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
