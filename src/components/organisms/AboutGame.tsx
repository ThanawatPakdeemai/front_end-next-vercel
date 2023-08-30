import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

interface IAboutGameProps {
  title?: string
  text: string
}

const AboutGame = ({ text, title }: IAboutGameProps) => {
  const { t } = useTranslation()
  return (
    <Box component="div">
      {title && (
        <Typography
          variant="h2"
          className="mb-4 mt-6 font-neue-machina-semi text-[14px] uppercase text-neutral-400"
        >
          {title || t("game_partner_about")}
        </Typography>
      )}
      <div className="pb-6">
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{
            __html: text
          }}
        />
      </div>
    </Box>
  )
}

export default AboutGame
