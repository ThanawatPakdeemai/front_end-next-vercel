import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface INextButtonSlide {
  icon?: React.ReactNode
  text?: string
}

const NextButtonSlide = ({ icon, text = "next" }: INextButtonSlide) => {
  const { t } = useTranslation()
  return (
    <>
      <p className="mb-4 mt-1 text-[70%] uppercase text-white-default/50">
        {`${t(text)}`}
      </p>
      <span className="absolute right-0 top-0 text-[24px]">
        {icon || <Icomoon className="icon-Full-Arrow-Right" />}
      </span>
    </>
  )
}

export default NextButtonSlide
