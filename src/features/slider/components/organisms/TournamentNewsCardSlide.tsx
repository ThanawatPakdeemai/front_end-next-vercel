import LanguageIcon from "@mui/icons-material/Language"
import { Card, Typography } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { INewsCardDetail } from "../molecules/CardTournamentNewsSlide"

const CardTitle = dynamic(() => import("@components/organisms/CardTitle"), {
  suspense: true,
  ssr: true
})
const CardTournamentNewsSlide = dynamic(
  () => import("../molecules/CardTournamentNewsSlide"),
  {
    suspense: true,
    ssr: true
  }
)

interface INewsCardSlide {
  slide: INewsCardDetail
}

const TournamentNewsCardSlide = ({ slide }: INewsCardSlide) => (
  <>
    <Card className="h-[300px] overflow-y-auto border !border-neutral-800 bg-neutral-780 p-2 lg:h-[391px]">
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
      <CardTournamentNewsSlide
        title={slide.title}
        description={slide.description}
        image={slide.image}
        path={slide.path}
      />
    </Card>
  </>
)

export default TournamentNewsCardSlide
