import React, { memo, useCallback } from "react"
import { Box } from "@mui/material"
import MainLayoutMobile from "@mobile/components/templates/MainLayoutMobile"
import GameFilterMobile from "@mobile/components/molecules/GameFilterMobile"
import SearchInputMobile from "@mobile/components/atoms/input/SearchInputMobile"
import CategoriesModal from "@mobile/components/organisms/modal/CategoriesModal"
import GameListMobile from "@mobile/components/organisms/GameListMobile"
import useGameStore from "@stores/game"
import { useBaseProvider } from "@providers/BaseProvider"
import useGlobal from "@hooks/useGlobal"
import { IGame } from "@feature/game/interfaces/IGameService"
import useDrawerControllerMobile from "../game/containers/hooks/useDrawerControllerMobile"
import useGameControllerMobile from "../game/containers/hooks/useGameControllerMobile"
import useGamePageListControllerMobile from "../game/containers/hooks/useGamePageListControllerMobile"
import useFavoriteGameControllerMobile from "../game/containers/hooks/useFavoriteGameControllerMobile"

const HomeMobile = () => {
  const { allCategory, allGameFreeToPlay, allGameStoryMode } = useGameStore()
  const { searchBlog, setSearchBlog } = useGameControllerMobile()
  const { open, setOpen } = useDrawerControllerMobile()
  const { activeMenu } = useBaseProvider()
  const { gameAllFilterIsLoading } = useGamePageListControllerMobile()
  const { stateProfile, defaultBody } = useGlobal()
  const { gameFavorite } = useFavoriteGameControllerMobile({
    defaultBody,
    profileId: stateProfile?.id || ""
  })

  const handleFavouriteData = useCallback(
    (gameData: IGame[]) => {
      if (gameData.length === 0) return []
      const mapFavouriteData = gameData.map((_item) =>
        gameFavorite.find((_elm) => _elm._id === _item._id)
          ? { ..._item, favorite: true }
          : { ..._item, favorite: false }
      )
      return mapFavouriteData
    },
    [gameFavorite]
  )

  const renderGameByActiveMenu = () => {
    switch (activeMenu) {
      case "free-to-play":
        return (
          <GameListMobile
            gameData={
              handleFavouriteData(allGameFreeToPlay || []) ||
              allGameFreeToPlay ||
              []
            }
            loading={gameAllFilterIsLoading}
          />
        )
      case "story-mode":
        return (
          <GameListMobile
            gameData={
              handleFavouriteData(allGameStoryMode || []) ||
              allGameStoryMode ||
              []
            }
            loading={gameAllFilterIsLoading}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <MainLayoutMobile>
      {/* Filter */}
      <GameFilterMobile setOpen={setOpen} />
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
      {renderGameByActiveMenu()}

      {/* Modal Category */}
      <CategoriesModal
        open={open}
        setOpen={setOpen}
        categories={allCategory || []}
      />
    </MainLayoutMobile>
  )
}
export default memo(HomeMobile)
