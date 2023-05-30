import React, { memo } from "react"
import { Box } from "@mui/material"
import MainLayoutMobile from "@mobile/components/templates/MainLayoutMobile"
import GameFilterMobile from "@mobile/components/molecules/GameFilterMobile"
import SearchInputMobile from "@mobile/components/atoms/input/SearchInputMobile"
import CategoriesModal from "@mobile/components/organisms/modal/CategoriesModal"
import GameListMobile from "@mobile/components/organisms/GameListMobile"
import useHomeControllerMobile from "../game/containers/hooks/useHomeControllerMobile"

const HomeMobile = () => {
  const {
    activeMenu,
    setActiveMenu,
    setSelectedCategory,
    searchBlog,
    setSearchBlog,
    gameData,
    categories,
    open,
    setOpen,
    loadingFilterGame,
    limit
  } = useHomeControllerMobile()

  return (
    <MainLayoutMobile
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
    >
      {/* Filter */}
      <GameFilterMobile
        setActiveMenu={setActiveMenu}
        setSelectedCategory={setSelectedCategory}
        setOpen={setOpen}
      />
      {/* Search */}
      <Box
        component="div"
        className="search-section"
      >
        <SearchInputMobile
          searchBlog={searchBlog}
          setSearchBlog={setSearchBlog}
        />
      </Box>

      {/* Game List */}
      <GameListMobile
        gameData={gameData || []}
        loading={loadingFilterGame}
        limit={limit}
      />

      {/* Modal Category */}
      <CategoriesModal
        open={open}
        setOpen={setOpen}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
    </MainLayoutMobile>
  )
}
export default memo(HomeMobile)
