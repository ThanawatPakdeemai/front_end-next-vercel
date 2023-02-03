import TextLink from "@components/atoms/TextLink"
import { arrowMotion, textMotion } from "@components/organisms/Footer"
import { Typography } from "@mui/material"
import React from "react"
import useGamePartners from "../../containers/hook/useGamePartners"

const PartnerGameWhatsNew = () => {
  const { newVersionData } = useGamePartners()
  return (
    <div
      id="partner-game--versions"
      className="mb-4 flex gap-10"
    >
      <aside
        id="version-aside"
        className="w-[170px]"
      >
        {newVersionData && (
          <TextLink
            name={`Version ${newVersionData.version}`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variantsArrow={arrowMotion}
            variantsText={textMotion}
          />
        )}
      </aside>
      {newVersionData && (
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
              __html: newVersionData.content
            }}
          />
        </div>
      )}
    </div>
  )
}
export default PartnerGameWhatsNew
