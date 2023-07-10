import { Box } from "@mui/material"
import React from "react"
import ArrowDownRoundIcon from "@components/icons/ArrowDownRoundIcon"
import { useBaseProvider } from "@providers/BaseProvider"
import ButtonOutlineTemplate from "../templates/ButtonOutlineTemplate"

interface IGameFilterMobile {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GameFilterMobile = ({ setOpen }: IGameFilterMobile) => {
  const { selectedCategory } = useBaseProvider()

  return (
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
            setSelectedCategory(defaultCategory)
          }}
        >
          All
        </ButtonOutlineTemplate>
        <ButtonOutlineTemplate
          onClick={() => {
            setActiveMenu("free-to-play")
            setSelectedCategory(defaultCategory)
          }}
        >
          Top Games
        </ButtonOutlineTemplate> */}
        <ButtonOutlineTemplate
          onClick={() => setOpen(true)}
          sxCustom={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "4px"
          }}
        >
          {selectedCategory.name}
          <i>
            <ArrowDownRoundIcon />
          </i>
        </ButtonOutlineTemplate>
      </Box>
    </Box>
  )
}

export default GameFilterMobile
