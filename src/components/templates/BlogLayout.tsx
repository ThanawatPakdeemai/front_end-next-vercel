import MenuItemCustom from "@components/atoms/MenuItemCustom"
import ShapeIcon from "@components/icons/ShapeIcon"
import Banner from "@components/molecules/Banner"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_BLOG } from "@configs/menu"
import { GAME_BLOG_BANNER } from "@constants/gameBanner"
import { MenuList, Typography } from "@mui/material"
import React from "react"
import HeadBlog from "@components/molecules/HeadBlog"
import BlogIcon from "@components/icons/BlogIcon/BlogIcon"

const BlogLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Tagline
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="This Christmas, you’re the best gift I could ask for."
      icon={<ShapeIcon fill="#4E5057" />}
    />
    <Banner data={GAME_BLOG_BANNER} />
    <div className="flex flex-row gap-3">
      <MenuList className="h-fit w-[200px] rounded-[13px] bg-neutral-800 p-[6px]">
        <div>
          <div className="mb-1 flex h-[40px] items-center rounded-xl bg-black-100">
            <BlogIcon className="mr-[12px] ml-1 stroke-neutral-300 text-white-default" />
            <Typography className="text-[14px] text-white-default">
              Blog
            </Typography>
          </div>
          {MENU_BLOG.map((ele) => (
            <MenuItemCustom
              key={ele.id}
              id={ele.id}
              label={ele.label}
              icon={ele.icon}
              href={ele.href}
              external={ele.external}
              endIcon
            />
          ))}
        </div>
      </MenuList>
      <HeadBlog>{children}</HeadBlog>
    </div>
    <Footer />
  </div>
)

export default BlogLayout
