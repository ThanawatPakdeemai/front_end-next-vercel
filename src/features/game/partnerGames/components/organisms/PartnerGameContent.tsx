import React from "react"
import PanelContent from "@components/molecules/PanelContent"
import { Box, Chip, Tab } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import { useTranslation } from "react-i18next"
import WhatsNewIcon from "@components/icons/WhatsNewIcon"
import HowToPlayIcon from "@components/icons/HowToPlayIcon/HowToPlayIcon"
import IDiamond from "@components/icons/Diamond"
import PartnerGameWhatsNew from "../molecules/PartnerGameWhatsNew"
import PartnerGameHowToPlay from "../molecules/PartnerGameHowToPlay"
import PartnerGameItems from "../molecules/PartnerGameItems"

const TabStyle = {
  padding: "0!important"
}

const PartnerGameContent = () => {
  const { hydrated } = useGlobal()
  const { t } = useTranslation()
  const { handleChangeTab, tabValue } = useGlobal()

  /**
   * @description Tab Content Partner Game
   */
  const PARTNER_GAME_TAB_CONTENT: {
    id: string
    label: string
    icon: React.ReactNode
    component?: React.ReactNode
  }[] = [
    {
      id: "1",
      label: t("whats_new"),
      icon: <WhatsNewIcon color="#70727B" />,
      component: <PartnerGameWhatsNew />
    },
    {
      id: "2",
      label: t("how_to_play"),
      icon: <HowToPlayIcon stroke="#70727B" />,
      component: <PartnerGameHowToPlay />
    },
    {
      id: "3",
      label: t("ntf_game"),
      icon: <IDiamond stroke="#70727B" />,
      component: <PartnerGameItems />
    }
  ]

  return hydrated ? (
    <Box className="relative h-full">
      <div className="absolute top-[-80px] left-[-20px] flex">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-neutral-700 bg-opacity-40 px-1 capitalize">
          {PARTNER_GAME_TAB_CONTENT.map((item) => (
            <Tab
              sx={TabStyle}
              onClick={() => handleChangeTab(item.id)}
              label={
                <Chip
                  label={item.label}
                  size="medium"
                  className={`bg-nuetral-800 cursor-pointer font-bold capitalize hover:text-white-default ${
                    item.id === tabValue ? " !text-white-default" : ""
                  }`}
                  sx={item.id === tabValue ? { path: { stroke: "#fff" } } : {}}
                  icon={item.icon as React.ReactElement}
                />
              }
              value={item.id}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <PanelContent>
        <div className="p-4">
          {PARTNER_GAME_TAB_CONTENT.map(
            (item) =>
              item.id === tabValue && (
                <Box
                  role="tabpanel"
                  key={item.id}
                >
                  {item.component}
                </Box>
              )
          )}
        </div>
      </PanelContent>
    </Box>
  ) : (
    <></>
  )
}

export default PartnerGameContent
