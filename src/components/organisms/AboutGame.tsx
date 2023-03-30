import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

interface IAboutGameProps {
  text: string
}

const AboutGame = ({ text }: IAboutGameProps) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Typography
        variant="h2"
        className="mb-4 mt-6 font-neue-machina-semi text-[14px] uppercase text-neutral-400"
      >
        {t("game_partner_about")}
      </Typography>
      <div className="pb-6">
        <p
          dangerouslySetInnerHTML={{
            __html: text
          }}
        />
      </div>
    </Box>
  )
}

export default AboutGame
