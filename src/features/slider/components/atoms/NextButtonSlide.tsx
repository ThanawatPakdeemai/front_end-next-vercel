import React, { Fragment } from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

interface INextButtonSlide {
  icon?: React.ReactNode
  text?: string
}

const NextButtonSlide = ({ icon, text = "Next" }: INextButtonSlide) => (
  <>
    <p className="mb-4 mt-1 text-[70%] uppercase text-white-default/50">
      {text}
    </p>
    <span className="absolute right-0 top-0">
      {icon || (
        <ArrowForwardIcon
          fontSize="small"
          className="opacity-50"
        />
      )}
    </span>
  </>
)

export default NextButtonSlide
