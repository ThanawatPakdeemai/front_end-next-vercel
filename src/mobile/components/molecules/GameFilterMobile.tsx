import { Box } from "@mui/material"
import React from "react"
import ArrowDownRoundIcon from "@components/icons/ArrowDownRoundIcon"
import { IGetType } from "@feature/game/interfaces/IGameService"
import ButtonGreenTemplate from "../templates/ButtonGreenTemplate"

interface IGameFilterMobile {
  setActiveMenu: React.Dispatch<React.SetStateAction<IGetType>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  toggleDrawer: (newOpen: boolean) => void
}

const GameFilterMobile = ({
  setActiveMenu,
  setSelectedCategory,
  toggleDrawer
}: IGameFilterMobile) => (
  <Box
    component="section"
    className="section-filter"
  >
    <Box
      component="div"
      className="section-filter__title flex gap-[12px] whitespace-nowrap text-[90%]"
    >
      <ButtonGreenTemplate
        onClick={() => {
          setActiveMenu("all")
          setSelectedCategory("all")
        }}
      >
        All
      </ButtonGreenTemplate>
      <ButtonGreenTemplate
        onClick={() => {
          setActiveMenu("play-to-earn")
          setSelectedCategory("all")
        }}
      >
        Top game
      </ButtonGreenTemplate>
      <ButtonGreenTemplate
        onClick={() => toggleDrawer(true)}
        sxCustom={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "4px"
        }}
      >
        Categories
        <i>
          <ArrowDownRoundIcon />
        </i>
      </ButtonGreenTemplate>
    </Box>
  </Box>
)

export default GameFilterMobile
