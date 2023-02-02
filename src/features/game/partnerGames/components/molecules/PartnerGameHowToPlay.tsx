import useGlobal from "@hooks/useGlobal"
import { Typography } from "@mui/material"
import React from "react"

const PartnerGameHowToPlay = () => {
  const { gamePartnerData } = useGlobal()
  return (
    <div
      id="partner-game--how-to-play"
      className="mb-4 flex gap-10"
    >
      {gamePartnerData && (
        <Typography
          className="mb-0 text-neutral-500"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: gamePartnerData.how_to_play
          }}
        />
      )}
    </div>
  )
}

export default PartnerGameHowToPlay
