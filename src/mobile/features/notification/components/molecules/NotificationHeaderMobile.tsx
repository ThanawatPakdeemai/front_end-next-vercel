import React, { memo } from "react"
import { useTranslation } from "next-i18next"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import Link from "next/link"

const Header = () => {
  const { t } = useTranslation()
  return (
    <div className="m-4 flex flex-wrap items-center justify-between border-b-2 border-[#161616be] pb-2 text-white-default md:mt-0 md:flex">
      <Link href="/">
        <ArrowBackOutlinedIcon />
      </Link>
      <h1 className="flex-auto py-2 text-center text-base uppercase sm:mr-3 sm:flex-none sm:text-left">
        {t("notifications")}
      </h1>
    </div>
  )
}
export default memo(Header)
