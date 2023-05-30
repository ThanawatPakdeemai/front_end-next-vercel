import React, { memo } from "react"
import { Box } from "@mui/material"
import MainLayoutMobile from "@mobile/components/templates/MainLayoutMobile"
import HeadMenuMobile from "@mobile/components/atoms/headerMenu/HeadMenuMobile"
import GameFilterMobile from "@mobile/components/molecules/GameFilterMobile"
import SearchInputMobile from "@mobile/components/atoms/input/SearchInputMobile"
import FooterMobile from "@mobile/components/organisms/FooterMobile"
import CategoriesModal from "@mobile/components/organisms/modal/CategoriesModal"
import GameList from "@mobile/components/organisms/GameListMobile"
import useHomeControllerMobile from "../game/containers/hooks/useHomeControllerMobile"

const HomeMobile = () => {
  const {
    activeMenu,
    setActiveMenu,
    setSelectedCategory,
    toggleDrawer,
    searchBlog,
    setSearchBlog,
    gameData,
    categories,
    open,
    setOpen,
    loadingFilterGame,
    limit,
    onSetGameStore,
    gameLink
  } = useHomeControllerMobile()

  return (
    <MainLayoutMobile>
      {/* Header */}
      <HeadMenuMobile
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {/* Filter */}
      <GameFilterMobile
        setActiveMenu={setActiveMenu}
        setSelectedCategory={setSelectedCategory}
        toggleDrawer={toggleDrawer}
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
      {gameData && gameData.length > 0 && (
        <GameList
          gameData={gameData}
          loading={loadingFilterGame}
          limit={limit}
          onSetGameStore={onSetGameStore}
          gameLink={gameLink}
        />
      )}

      {/* Modal Category */}
      <CategoriesModal
        open={open}
        setOpen={setOpen}
        setSelectedCategory={setSelectedCategory}
        toggleDrawer={toggleDrawer}
        categories={categories}
      />

      {/* Footer */}
      <FooterMobile />
    </MainLayoutMobile>
  )
}
export default memo(HomeMobile)
