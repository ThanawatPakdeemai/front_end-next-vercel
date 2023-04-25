import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { Link, ToggleButtonGroup, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { Image } from "@components/atoms/image"
import useGlobal from "@hooks/useGlobal"
import useFavoriteGame from "@feature/favourite/containers/hooks/useFavoriteGame"
import { IGame } from "@feature/game/interfaces/IGameService"
import Slider, { Settings } from "react-slick"
import { v4 as uuid } from "uuid"
import MobileGameCard from "@components/molecules/cards/MobileGameCard"
import dayjs from "dayjs"
import MuiToggleButton from "@mui/material/ToggleButton"
import { styled } from "@mui/material/styles"
import CardDetail from "./molecule/cardDetail.tsx/CardDetail"

const Home = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const [alignment, setAlignment] = React.useState("Feed")
  const [pageSize, setPageSize] = useState<number>(25)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [gameFavouriteState, setGameFavouriteState] = useState<IGame[]>()

  const sliderRef = useRef<Slider>(null)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const {
    stateProfile,
    getTypeGamePathFolder,
    isRedirectRoomlist,
    defaultBody
  } = useGlobal()
  const { gameFavourite, gameFavouriteInfo } = useFavoriteGame({
    playerId: stateProfile?.id ?? "",
    ...defaultBody
  })

  const fetchGameFavorite = useCallback(async () => {
    if (gameFavourite && gameFavourite.length > 0) {
      setGameFavouriteState(gameFavourite)
      setPageSize(gameFavouriteInfo.limit)
      setCurrentPage(gameFavouriteInfo.pages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameFavourite,
    gameFavouriteInfo,
    gameFavouriteInfo.totalCount,
    gameFavouriteInfo.limit,
    gameFavouriteInfo.pages
  ])

  useEffect(() => {
    let load = false

    if (!load) fetchGameFavorite()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, fetchGameFavorite])

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: false
  }

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected": {
      color: "#E1E1E2",
      backgroundColor: "#010101 !important",
      border: "0px",
      borderBottom: "1px solid #18181C"
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#010101 !important"
    }
  })

  return (
    <>
      <div className="mx-[16px] my-[14px] flex h-[52px] flex-row items-center justify-between">
        <div className="flex h-full flex-col justify-around">
          <Typography className="text-[10px] uppercase text-neutral-600">
            {dayjs().format("dddd D MMMM YYYY")}
          </Typography>
          <Typography className="font-mondwest text-[20px] text-neutral-300">
            ⛅️ {profile?.username}
          </Typography>
        </div>
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border-[2px] border-solid border-neutral-700">
          <Link href={`/profile/${profile?.id}`}>
            <Image
              src={profile?.avatar || "/images/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>
        </div>
      </div>

      <ToggleButtonGroup
        sx={{ width: "100%", height: "40px" }}
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton
          value="Feed"
          sx={{
            width: "50%",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            border: "0px",
            textTransform: "capitalize",
            fontSize: "12px",
            color: "#70727B",
            backgroundColor: "#18181C !important",
            ":hover": {
              color: "#E1E1E2",
              backgroundColor: "#F42728 !important"
            }
          }}
        >
          Feed
        </ToggleButton>
        <ToggleButton
          value="Tournaments"
          sx={{
            width: "50%",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            border: "0px",
            textTransform: "capitalize",
            fontSize: "12px",
            color: "#70727B",
            backgroundColor: "#18181C !important",
            ":hover": {
              color: "#E1E1E2",
              backgroundColor: "#F42728 !important"
            }
          }}
        >
          Tournaments
        </ToggleButton>
      </ToggleButtonGroup>

      {alignment === "Feed" ? (
        <>
          <div className="ml-[16px] mt-[25px]">
            <Typography className="mb-[16px] text-[10px] uppercase text-white-primary">
              Favourite Games
            </Typography>
            <Slider
              ref={sliderRef}
              {...settings}
            >
              {gameFavouriteState &&
                gameFavouriteState.length > 0 &&
                gameFavouriteState.map((item) => (
                  <MobileGameCard
                    key={uuid()}
                    img={item.image_list}
                    text={item.name}
                    href={`/${getTypeGamePathFolder(item)}/${
                      item.path
                    }${isRedirectRoomlist(item).toString()}`}
                  />
                ))}
            </Slider>
          </div>
          <div className="border-b-[1px] border-solid border-neutral-700" />
          <CardDetail
            type="quest"
            title="Naka bot"
            detail="WIN 3 GAMES"
            image="/images/moblie/home/dairy-quest.png"
          />
          <CardDetail
            title="Naka bot"
            detail="You just advanced to level 2!"
            image="/images/moblie/home/naka-bot.png"
          />
          <CardDetail
            title="Naka News"
            detail="Happy new year 2023"
            image="/images/moblie/home/naka-news.png"
          />
          <CardDetail
            title={`Your naka id is ${profile?.username}`}
            detail="You can change in profile"
            image="/images/moblie/home/profile.png"
          />
        </>
      ) : null}
    </>
  )
}
export default memo(Home)
