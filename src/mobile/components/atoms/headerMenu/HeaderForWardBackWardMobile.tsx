/* eslint-disable no-undef */
import React, { memo } from "react"
import { useTranslation } from "next-i18next"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import Link from "next/link"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  label?: string | JSX.Element | null
  forwardIcon?: JSX.Element | null
  forwardHref?: string
  backwardIcon?: JSX.Element | null
  backwardHref?: string
  onClickForWard?: React.MouseEventHandler<HTMLAnchorElement>
  onClickBackWard?: React.MouseEventHandler<HTMLAnchorElement>
  showForwardIcon?: boolean
  classNameLabel?: string
}

const HeaderForWardBackWardMobile = ({
  label = "",
  forwardIcon = <Icomoon className="icon-Settings" />,
  forwardHref = "/",
  backwardIcon = <ArrowBackOutlinedIcon />,
  backwardHref = "/",
  onClickForWard,
  onClickBackWard,
  showForwardIcon = true,
  classNameLabel
}: IProps) => {
  const { t } = useTranslation()
  return (
    <Box
      component="div"
      className="m-4 flex items-center justify-between border-b-2 border-[#161616be] pb-2 text-white-default"
    >
      <Link
        href={backwardHref}
        onClick={onClickBackWard}
      >
        {backwardIcon}
      </Link>
      <h1
        className={`flex-auto py-2 text-center text-default text-neutral-300 ${classNameLabel}`}
      >
        {typeof label === "string" ? t(label) : label}
      </h1>
      {showForwardIcon && (
        <Link
          href={forwardHref}
          onClick={onClickForWard}
        >
          {forwardIcon}
        </Link>
      )}
    </Box>
  )
}
export default memo(HeaderForWardBackWardMobile)
