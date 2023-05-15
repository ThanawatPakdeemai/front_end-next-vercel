import React from "react"
import { Image } from "@components/atoms/image/index"
import { Box, Chip, Typography } from "@mui/material"
import Slider from "react-slick"
import { useTranslation } from "react-i18next"
import SearchIcon from "@components/icons/SearchIcon"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"
import { useRouter } from "next/router"
import ShareToEarn from "@components/atoms/ShareToEarn"
import CardBuyItemMobile from "@mobile/components/atoms/CardBuyItemMobile"
import StatEstimatedProfit from "@components/molecules/statistic/StatEstimatedProfit"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import VerticalThumbSmallCardSlide from "@feature/slider/components/organisms/VerticalThumbSmallCardSlide"
import HeaderForWardBackWardMobile from "@mobile/components/atoms/HeaderForWardBackWardMobile"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import MoreDetailGameMobile from "@mobile/components/atoms/MoreDetailGameMobile"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"

interface IProps {
  data: IGame
  gameId: string
  gameType: IGetType
}

const GameDetailLayout = ({ data, gameId, gameType }: IProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { gameMedia } = useGameOverview(gameId, gameType)

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1
  }

  const { topPlayerGameId } = useTopPlayerByGameId()

  return (
    <>
      <Box
        component="div"
        className="w-auto"
      >
        <HeaderForWardBackWardMobile
          label="game_details"
          forwardIcon={<SearchIcon stroke="#E1E2E2" />}
          forwardHref="/"
        />
        <Box
          component="div"
          className="mx-auto my-0 flex h-[6.813rem] w-[6.813rem] justify-center rounded-[13px] border border-solid border-neutral-800"
        >
          <Image
            src={data.image_category_list}
            alt="gameDetail"
            width={109}
            height={109}
          />
        </Box>
        <Typography className="py-[9px] text-center text-[16px] font-bold uppercase text-white-default">
          {t("NAKAMOTO WAR")}
        </Typography>
        <Box
          component="div"
          className="pb- flex justify-center pb-4"
        >
          <Chip
            label="Shooting"
            variant="filled"
            size="small"
            className="cursor-default !bg-[#2f2f2fcc] font-neue-machina uppercase !text-[#ffffff99]"
            color="default"
          />
        </Box>
        <Box
          component="div"
          className="flex items-center justify-center"
        >
          <Box
            component="div"
            className="flex justify-center"
          >
            <ButtonGame
              textButton={t("join-game")}
              url={`${router.asPath}/roomlist`}
            />
          </Box>
          <Box
            component="div"
            className="absolute right-5 flex items-center"
          >
            <ShareToEarn id={gameId} />
            <MoreDetailGameMobile
              gameDetails={data.NFT_info.meta_data.description}
              howto={data.howto}
              item={data.item}
            />
          </Box>
        </Box>
        <hr className="mx-0 my-5 text-neutral-800" />
        <Box component="div">
          <Slider {...settings}>
            {gameMedia &&
              gameMedia.map((item, index) => (
                <VerticalThumbSmallCardSlide
                  item={item}
                  key={item.id}
                  index={index}
                />
              ))}
          </Slider>
        </Box>
        <Box
          component="div"
          className="flex"
        >
          <Box component="div">
            <StatisticGameDetail />
          </Box>
          <Box component="div">
            <CardBuyItemMobile
              buttonStyle="green"
              gameObject={data as IGame}
            />
          </Box>
        </Box>
        <Box
          component="div"
          className="mx-[-0.5rem] pl-4 pr-2 pt-8"
        >
          <StatEstimatedProfit
            minValue={0}
            maxValue={0}
          />
        </Box>
        <Box
          component="div"
          className="mx-[-0.5rem] pl-4 pr-2 pt-8"
        >
          <TopPlayer
            element="select"
            subtitle
            background="neutral"
            note
            elevation={0}
            className="lg:max-w-auto max-w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText lg:!h-[424px] xl:!w-[100%]"
            rank
            topPlayerGameId={topPlayerGameId && topPlayerGameId}
          />
        </Box>
      </Box>
    </>
  )
}

export default GameDetailLayout
