import React, { useState, memo, useEffect, useCallback } from "react"
import { Box } from "@mui/material"
import MainLayoutMobile from "@mobile/components/templates/MainLayoutMobile"
import GameFilterMobile from "@mobile/components/molecules/GameFilterMobile"
import SearchInputMobile from "@mobile/components/atoms/input/SearchInputMobile"
import CategoriesModal from "@mobile/components/organisms/modal/CategoriesModal"
import GameListMobile from "@mobile/components/organisms/GameListMobile"
import { IGame } from "@feature/game/interfaces/IGameService"
import useLoadingStore from "@stores/loading"
import useDrawerControllerMobile from "../game/containers/hooks/useDrawerControllerMobile"
import useGameControllerMobile from "../game/containers/hooks/useGameControllerMobile"
import useFavoriteGameControllerMobile from "../game/containers/hooks/useFavoriteGameControllerMobile"

const HomeMobile = () => {
  const {
    setSelectedCategory,
    searchBlog,
    setSearchBlog,
    gameData,
    categories,
    loadingFilterGame,
    activeMenu,
    setActiveMenu
  } = useGameControllerMobile()
  const { open, setOpen } = useDrawerControllerMobile()
  const { gameFavorite } = useFavoriteGameControllerMobile()
  const [gameDataWithFavouriteData, setGameDataWithFavouriteData] = useState<
    IGame[]
  >([])
  const { setClose } = useLoadingStore()
  const [choiceType, setChoiceType] = useState<string>("Categories")

  const handleFavouriteData = useCallback(() => {
    const mapFavouriteData = gameData.map((_item) =>
      gameFavorite.find((_elm) => _elm._id === _item._id)
        ? { ..._item, favorite: true }
        : { ..._item, favorite: false }
    )
    if (mapFavouriteData) setGameDataWithFavouriteData(mapFavouriteData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData, gameFavorite])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!gameData.length) return
      handleFavouriteData()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  useEffect(() => {
    let load = false

    if (!load) {
      setClose()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setClose])

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
        choiceType={choiceType}
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
        gameData={gameDataWithFavouriteData}
        loading={loadingFilterGame}
      />

      {/* Modal Category */}
      <CategoriesModal
        open={open}
        setOpen={setOpen}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        choiceType={(_name) => setChoiceType(_name)}
      />
    </MainLayoutMobile>
  )
}
export default memo(HomeMobile)
