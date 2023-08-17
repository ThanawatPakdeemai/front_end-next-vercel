import { MenuList, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { MENU_BLOG } from "@configs/menu"

const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})

const HeadBlog = dynamic(() => import("@components/molecules/HeadBlog"), {
  suspense: true,
  ssr: false
})
const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const BlogLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { t } = useTranslation()
  return (
    <div className="main-container mx-auto w-full px-2 lg:px-0">
      <Header />
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text={t("christmas_gift")}
        icon={<Icomoon className="icon-require" />}
        show={false}
      />
      <Banners />
      <div className="flex-row justify-between gap-3 md:flex">
        <MenuList className="mx-auto h-fit w-full max-w-xs rounded-[13px] bg-neutral-800 p-[6px] md:mx-0 md:w-[200px]">
          <div className="mb-1 flex h-[40px] items-center rounded-xl bg-black-100">
            <Icomoon className="icon-Book ml-1 mr-[12px]" />
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
        </MenuList>
        <HeadBlog>{children}</HeadBlog>
      </div>
      <Footer />
    </div>
  )
}

export default BlogLayout
