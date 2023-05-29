import React, { memo, useEffect, useState } from "react"
import { Box, SwipeableDrawer, SxProps, TextField, Theme } from "@mui/material"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import { ISlideList } from "@components/molecules/gameSlide/GameCarouselHeader"
import useCategories from "@hooks/useCategories"
import ButtonGreenTemplate from "@mobile/components/templates/ButtonGreenTemplate"
import ArrowDownRoundIcon from "@components/icons/ArrowDownRoundIcon"
import { ImageCustom } from "@components/atoms/image/Image"
import useFilterStore from "@stores/blogFilter"
import { useTranslation } from "react-i18next"
import SearchIconMobile from "@mobile/components/atoms/icons/SearchIconMobile"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import NoData from "@components/molecules/NoData"

const f2pMenu: ISlideList[] = [
  {
    id: "play-to-earn",
    label: "Free To Earn",
    type: "play-to-earn"
  },
  // {
  //   id: "free-to-earn",
  //   label: "Free To Earn",
  //   type: "free-to-earn"
  // },
  {
    id: "free-to-play",
    label: "Free To Play",
    type: "free-to-play"
  },
  {
    id: "story-mode",
    label: "Story Mode",
    type: "story-mode"
  }
]

const drawerBleeding = 56

const StyledInput: SxProps<Theme> = {
  fontFamily: "Urbanist",
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
  opacity: 1
}

const HomeMobile = () => {
  // Hook
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { t } = useTranslation()

  // State
  const [gameData, setGameData] = useState<IGame[]>([])
  const [activeMenu, setActiveMenu] = useState<IGetType>("play-to-earn")
  const [categories, setCategories] = useState<IGameCategory[]>()
  const [open, setOpen] = useState(false)

  const { getCategoriesAll, isFetchingCategories } = useCategories({
    limit: 100
  })
  const { gameFilter: dataGames } = useGamePageListController(activeMenu)

  /**
   * @description Toggle drawer
   * @param newOpen
   * @returns
   */
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataGames && dataGames.length > 0) {
        setGameData(dataGames)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGames])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!isFetchingCategories && getCategoriesAll) {
        setCategories(getCategoriesAll)
      }
    }
    return () => {
      load = true
    }
  }, [getCategoriesAll, isFetchingCategories])

  return (
    <Box
      component="div"
      className="home-page__mobile flex flex-col gap-6"
      sx={{
        marginTop: "-50px",
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 120px)",
        padding: "32px",
        background: "#181A20",
        borderRadius: "30px 30px 0 0"
      }}
    >
      <Box
        component="div"
        sx={{}}
        className="home-menu__mobile flex items-center"
      >
        {f2pMenu.map((item) => (
          <Box
            onClick={() => {
              setActiveMenu(item.type)
            }}
            component="button"
            key={item.id}
            className={`relative flex-1 px-[6px] py-[12px] font-urbanist text-[18px] ${
              activeMenu === item.type
                ? "active-menu text-[#F32429]"
                : "text-[#616161]"
            }`}
            sx={{
              fontWeight: "bold",
              "&:after": {
                content: '""',
                background: "#35383F",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px"
              },
              "&.active-menu:after": {
                background: "#F32429",
                height: "4px",
                borderRadius: "2px",
                bottom: "-1px"
              }
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
      <Box
        component="section"
        className="section-filter"
      >
        <Box
          component="div"
          className="section-filter__title flex gap-[12px]"
        >
          <ButtonGreenTemplate>All</ButtonGreenTemplate>
          <ButtonGreenTemplate>Top game</ButtonGreenTemplate>
          <ButtonGreenTemplate
            onClick={toggleDrawer(true)}
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
      <Box
        component="div"
        className="search-section"
      >
        <TextField
          value={searchBlog}
          onChange={(event) => {
            let { value } = event.target
            value = value.replace(/[^A-Za-z0-9]/gi, "")
            setSearchBlog(value)
          }}
          placeholder={`${t("search_games")}...`}
          InputProps={{
            startAdornment: <SearchIconMobile />
          }}
          sx={{
            background: "rgba(242, 201, 76, 0.08)",
            border: "1px solid #F2C94C",
            borderRadius: "16px",
            maxWidth: "100%",
            minWidth: "100%",
            width: "100%",
            height: "56px",
            justifyContent: "center",
            ...StyledInput,
            input: {
              ...StyledInput
            },
            "input::placeholder": {
              ...StyledInput
            },
            ".MuiOutlinedInput-root": {
              height: "auto",
              borderRadius: "inherit",
              background: "transparent",
              border: 0,
              gap: "10px",
              "&:hover": {
                border: 0
              }
            }
          }}
        />
      </Box>

      {/* Game List */}
      <Box
        component="section"
        className="game-section grid grid-cols-2 gap-5"
      >
        {gameData && gameData.length > 0 ? (
          gameData.map((_game) => (
            <div
              key={_game.id}
              className="game-section__list flex flex-col gap-3"
            >
              <div className="relative w-full overflow-hidden rounded-[20px] pt-[84%]">
                <ImageCustom
                  src={_game.image_category_list}
                  alt={_game.name}
                  width={200}
                  height={200}
                  className="absolute left-0 top-0 h-full w-full object-cover object-center"
                />
              </div>
              <h2 className="font-urbanist text-[20px] font-semibold text-white-primary line-clamp-2">
                {_game.name}
              </h2>
              <div className="flex gap-2">
                {_game.category_list && _game.category_list.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-[14px]">
                    {_game.category_list.map((_category) => (
                      <div key={_category.id}>{_category.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          ".MuiDrawer-paper": {
            background: "#18181C",
            borderRadius: "44px 44px 0px 0px"
          }
        }}
      >
        <Box
          component="div"
          className="categories-list flex flex-col p-[8px_24px_36px]"
          sx={{
            width: "100%",
            maxHeight: "calc(100vh - 240px)",
            h2: {
              padding: "30px 0",
              borderBottom: "1px solid #35383F"
            }
          }}
        >
          <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-white-primary">
            Categories
          </h2>
          <Box
            component="div"
            className="flex flex-col"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px",
              "button + button": {
                borderTop: "1px solid #35383F"
              }
            }}
          >
            {categories &&
              categories.length > 0 &&
              categories.map((item) => (
                <Box
                  component="button"
                  key={item.id}
                  className="category-item__title flex h-[56px] w-full items-center gap-3 font-urbanist text-white-primary"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600
                  }}
                >
                  <div className="relative h-[56px] w-[56px] scale-50 overflow-hidden rounded-lg">
                    <ImageCustom
                      src={item.image_list}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <span>{item.name}</span>
                </Box>
              ))}
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}
export default memo(HomeMobile)
