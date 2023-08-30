import React, { memo, useCallback } from "react"
import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import { useBaseProvider } from "@providers/BaseProvider"
import useGlobal from "@hooks/useGlobal"
import { IGame } from "@feature/game/interfaces/IGameService"
import useDrawerControllerMobile from "@src/mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useGameControllerMobile from "@src/mobile/features/game/containers/hooks/useGameControllerMobile"
import useGamePageListControllerMobile from "@src/mobile/features/game/containers/hooks/useGamePageListControllerMobile"
import useFavoriteGameControllerMobile from "@src/mobile/features/game/containers/hooks/useFavoriteGameControllerMobile"
import dynamic from "next/dynamic"

const MainLayoutMobile = dynamic(
  () => import("@mobile/components/templates/MainLayoutMobile"),
  {
    suspense: true,
    ssr: false
  }
)
const GameFilterMobile = dynamic(
  () => import("@mobile/components/molecules/GameFilterMobile"),
  {
    suspense: true,
    ssr: false
  }
)

const SearchInputMobile = dynamic(
  () => import("@mobile/components/atoms/input/SearchInputMobile"),
  {
    suspense: true,
    ssr: false
  }
)

const CategoriesModal = dynamic(
  () => import("@mobile/components/organisms/modal/CategoriesModal"),
  {
    suspense: true,
    ssr: false
  }
)

const GameListMobile = dynamic(
  () => import("@mobile/components/organisms/GameListMobile"),
  {
    suspense: true,
    ssr: false
  }
)

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
