import React from "react"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import Link from "next/link"
// import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "react-i18next"

const HeaderBackPageMobile = ({ text }: any) => {
  const { t } = useTranslation()
  return (
    <div className="mx-4 my-4 flex flex-1 items-center justify-between border-b-2 border-[#161616be] text-white-default">
      <Link href="/">
        <ArrowBackOutlinedIcon />
      </Link>
      <h1 className="flex-auto py-2 text-center text-base uppercase sm:mr-3 sm:flex-none sm:text-left">
        {t(text)}
      </h1>
      {/* <SearchIcon /> */}
    </div>
  )
}
export default HeaderBackPageMobile
