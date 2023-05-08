/* eslint-disable no-undef */
import React, { memo } from "react"
import { useTranslation } from "next-i18next"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import SettingIcon from "@components/icons/SettingIcon"
import Link from "next/link"

interface IProps {
  label?: string
  forwardIcon?: JSX.Element
  forwardHref?: string
  backwardIcon?: JSX.Element
  backwardHref?: string
  onClickForWard?: React.MouseEventHandler<HTMLAnchorElement>
  onClickBackWard?: React.MouseEventHandler<HTMLAnchorElement>
}

const HeaderForWardBackWardMobile = ({
  label = "",
  forwardIcon = <SettingIcon />,
  forwardHref = "/",
  backwardIcon = <ArrowBackOutlinedIcon />,
  backwardHref = "/",
  onClickForWard,
  onClickBackWard
}: IProps) => {
  const { t } = useTranslation()
  return (
    <div className="m-4 flex flex-wrap items-center justify-between border-b-2 border-[#161616be] pb-2 text-white-default md:mt-0 md:flex">
      <Link
        href={backwardHref}
        onClick={onClickBackWard}
      >
        {backwardIcon}
      </Link>
      <h1 className="flex-auto py-2 text-center text-default text-neutral-300">
        {t(label)}
      </h1>
      <Link
        href={forwardHref}
        onClick={onClickForWard}
      >
        {forwardIcon}
      </Link>
    </div>
  )
}
export default memo(HeaderForWardBackWardMobile)
