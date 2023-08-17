import { Typography } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { arrowMotion, textMotion } from "@styles/themes/partial/motion"

const TextLink = dynamic(() => import("@components/atoms/TextLink"), {
  suspense: true,
  ssr: false
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})

interface IProps {
  title: string
  description: string
}

const WhatsNewBody = ({ title, description }: IProps) => (
  <div
    id="game--versions"
    className="mb-4 gap-10"
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
      <div className="flex">
        <NoData className="" />
      </div>
    )}
  </div>
)
export default WhatsNewBody
