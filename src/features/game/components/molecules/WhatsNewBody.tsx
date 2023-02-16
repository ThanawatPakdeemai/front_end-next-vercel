import TextLink from "@components/atoms/TextLink"
import NoData from "@components/molecules/NoData"
import { arrowMotion, textMotion } from "@components/organisms/Footer"
import { Typography } from "@mui/material"
import React from "react"

interface IProps {
  title: string
  description: string
}

const WhatsNewBody = ({ title, description }: IProps) => (
  <div
    id="game--versions"
    className="mb-4 flex gap-10"
  >
    <aside
      id="version-aside"
      className="w-[170px]"
    >
      <TextLink
        name={`Version ${title || "1.0.0"}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variantsArrow={arrowMotion}
        variantsText={textMotion}
      />
    </aside>
    {description ? (
      <div
        id="version-content"
        className="w-[calc(100%-150px)]"
      >
        <Typography
          className="mb-4 font-neue-machina-semi text-[14px] uppercase"
          variant="h2"
        >
          Update
        </Typography>
        <Typography
          className="mb-0 text-neutral-500"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      </div>
    ) : (
      <NoData className="" />
    )}
  </div>
)
export default WhatsNewBody
