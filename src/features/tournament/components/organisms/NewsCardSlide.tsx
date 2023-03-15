import LanguageIcon from "@mui/icons-material/Language"
import { Card, Typography } from "@mui/material"
import React from "react"
import CardTitle from "@components/organisms/CardTitle"
import NewsCardDetail, { INewsCardDetail } from "../moleculs/NewsCardDetail"

interface INewsCardSlide {
  slide: INewsCardDetail
}

const NewsCardSlide = ({ slide }: INewsCardSlide) => (
  <>
    <Card className="h-[391px] border !border-neutral-800 bg-neutral-780 p-2">
      <CardTitle
        width="100%"
        icon={<LanguageIcon className="mr-2 text-neutral-300" />}
        title={
          <Typography
            variant="inherit"
            className="text-neutral-300"
          >
            Tournament News
          </Typography>
        }
        background="neutral"
        className="border border-neutral-700"
      />
      <NewsCardDetail
        title={slide.title}
        description={slide.description}
        image={slide.image}
        path={slide.path}
      />
    </Card>
  </>
)

export default NewsCardSlide
