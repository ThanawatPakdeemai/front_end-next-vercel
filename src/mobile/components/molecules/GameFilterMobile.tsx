import { Box } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { defaultCategory, useBaseProvider } from "@providers/BaseProvider"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonOutlineTemplate = dynamic(
  () => import("../templates/ButtonOutlineTemplate"),
  {
    suspense: true,
    ssr: false
  }
)

interface IGameFilterMobile {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GameFilterMobile = ({ setOpen }: IGameFilterMobile) => {
  const { selectedCategory, setSelectedCategory } = useBaseProvider()

  return (
    <Box
      component="section"
      className="section-filter"
    >
      <Box
        component="div"
        className="section-filter__title flex flex-wrap gap-[12px] whitespace-nowrap text-[90%]"
      >
        <ButtonOutlineTemplate
          onClick={() => {
            setSelectedCategory(defaultCategory)
          }}
        >
          All
        </ButtonOutlineTemplate>
        {/* <ButtonOutlineTemplate
          onClick={() => {
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
          <Icomoon className="icon-app-bold icon-Arrow---Down-2" />
        </ButtonOutlineTemplate>
      </Box>
    </Box>
  )
}

export default GameFilterMobile
