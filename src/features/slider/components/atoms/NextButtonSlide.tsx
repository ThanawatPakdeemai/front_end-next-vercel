import React from "react"
import { useTranslation } from "react-i18next"
import IconArrowRight from "@components/icons/arrowRightIcon"

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
      <span className="absolute right-0 top-0">
        {icon || (
          <IconArrowRight
            fontSize="small"
            className="opacity-50"
          />
        )}
      </span>
    </>
  )
}

export default NextButtonSlide
