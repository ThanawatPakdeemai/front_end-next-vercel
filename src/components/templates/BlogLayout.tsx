import ShapeIcon from "@components/icons/ShapeIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_BLOG } from "@configs/menu"
import { MenuList, Typography } from "@mui/material"
import React from "react"
import HeadBlog from "@components/molecules/HeadBlog"
import BlogIcon from "@components/icons/BlogIcon/BlogIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import Banners from "@components/molecules/Banners"
import { useTranslation } from "next-i18next"

const BlogLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { t } = useTranslation()
  return (
    <div className="main-container mx-auto px-2 lg:px-0">
      <Header />
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text={t("christmas_gift")}
        icon={<ShapeIcon fill="#4E5057" />}
      />
      <Banners />
      <div className="flex-row gap-3 md:flex">
        <MenuList className="mx-auto h-fit w-full max-w-xs rounded-[13px] bg-neutral-800 p-[6px] md:mx-0 md:w-[200px]">
          <div>
            <div className="mb-1 flex h-[40px] items-center rounded-xl bg-black-100">
              <BlogIcon className="ml-1 mr-[12px] stroke-neutral-300 text-white-default" />
              <Typography className="text-[14px] text-white-default">
                {t("Blog")}
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
}

export default BlogLayout
