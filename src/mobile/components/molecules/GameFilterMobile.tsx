import { Box } from "@mui/material"
import React from "react"
import ArrowDownRoundIcon from "@components/icons/ArrowDownRoundIcon"
import { IGetType } from "@feature/game/interfaces/IGameService"
import ButtonOutlineTemplate from "../templates/ButtonOutlineTemplate"

interface IGameFilterMobile {
  setActiveMenu: React.Dispatch<React.SetStateAction<IGetType>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  choiceType: string
}

const GameFilterMobile = ({
  setActiveMenu,
  setSelectedCategory,
  setOpen,
  choiceType
}: IGameFilterMobile) => (
  <Box
    component="section"
    className="section-filter"
  >
    <Box
      component="div"
      className="section-filter__title flex flex-wrap gap-[12px] whitespace-nowrap text-[90%]"
    >
      {/* <ButtonOutlineTemplate
        onClick={() => {
          setActiveMenu("all")
          setSelectedCategory("all")
        }}
      >
        All
      </ButtonOutlineTemplate> */}
      <ButtonOutlineTemplate
        onClick={() => {
          setActiveMenu("free-to-play")
          setSelectedCategory("all")
        }}
      >
        Top Games
      </ButtonOutlineTemplate>
      <ButtonOutlineTemplate
        onClick={() => setOpen(true)}
        sxCustom={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "4px"
        }}
      >
        {choiceType}
        <i>
          <ArrowDownRoundIcon />
        </i>
      </ButtonOutlineTemplate>
    </Box>
  </Box>
)

export default GameFilterMobile
