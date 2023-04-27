import React, { memo } from "react"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import CardTitle from "@components/organisms/CardTitle"
import useTopPlayer from "@feature/ranking/containers/hook/useTopPlayer"
import { v4 as uuid } from "uuid"
import SkeletonTopPlayer from "@components/atoms/skeleton/SkeletonTopPlayer"
import Note from "@components/molecules/Note"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { useTranslation } from "react-i18next"
import NoData from "@components/molecules/NoData"
import { useRouter } from "next/router"
import { IWeeklyPoolByGameIdDataRecord } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"
import { Box } from "@mui/material"
import CardRank from "@components/organisms/CardRank"
import CardBodyList from "../molecules/CardBodyList"

export interface IPlayer {
  element?: "button" | "select"
  className?: string
  rank?: boolean
  note?: boolean
  subtitle?: boolean
  elevation?: number
  background?: "purple" | "red" | "neutral"
  topPlayerGameId?: IPlayerRanking[] | IWeeklyPoolByGameIdDataRecord[]
  isFetching?: boolean
  rightContent?: React.ReactNode
}

const TopPlayer = ({
  // element = "button",
  className,
  rank,
  note = false,
  subtitle,
  elevation,
  background,
  topPlayerGameId,
  rightContent,
  isFetching = false
}: IPlayer) => {
  const { topPlayerAllGame, isLoading } = useTopPlayer()
  const skeleton = 10
  const { t } = useTranslation()
  const route = useRouter()
  const { pathname } = route

  /**
   * @description sum top player game id (weekly prize pool only)
   */
  const sumTopPlayerGameId = (): number => {
    if (topPlayerGameId && topPlayerGameId.length === 0) return 0
    if (topPlayerGameId === undefined) return 0

    return (
      (topPlayerGameId as IWeeklyPoolByGameIdDataRecord[]).reduce(
        (_acc, _curr) => _acc + _curr.reward,
        0
      ) ||
      (topPlayerGameId as IPlayerRanking[]).reduce(
        (_acc, _curr) => _acc + _curr.naka_earn,
        0
      )
    )
  }

  const sumTopPlayerAllGame =
    topPlayerAllGame &&
    topPlayerAllGame.reduce((_acc, curr) => _acc + curr.naka_earn, 0)

  const renderRankContent = () => {
    if (!rank) {
      return <NoData />
    }

    if (topPlayerGameId && topPlayerGameId.length > 0) {
      return (
        <div className="top-player__content h-[calc(100%-136px)] w-[calc(100%-20px)] p-[14px_0px_0px_10px]">
          <CardRank topPlayerGameId={topPlayerGameId} />
        </div>
      )
    }

    if (
      topPlayerAllGame &&
      topPlayerAllGame.length > 0 &&
      pathname !== "/[typeGame]/[GameHome]"
    ) {
      return (
        <div className="top-player__content h-[calc(100%-136px)] w-[calc(100%-20px)] p-[14px_0px_0px_10px]">
          <CardBodyList
            width="433px"
            players={topPlayerAllGame}
          />
        </div>
      )
    }

    return (
      <div className="top-player__content h-[calc(100%-136px)] w-[calc(100%-20px)] p-[14px_0px_0px_30px]">
        <NoData />
      </div>
    )
  }

  return (
    <Box
      component="div"
      className="top-player__wrapper relative flex w-full flex-col"
      sx={{
        ".top-player__wrapper-inner": {
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "74px",
            width: "100%",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)"
          }
        }
      }}
    >
      <div
        className={`${className} top-player__wrapper-inner flex h-full flex-wrap overflow-hidden rounded-md lg:h-auto`}
      >
        <CardTitle
          width="534px"
          icon={<TrackChangesIcon className="mr-2" />}
          title={t("top_naka_player")}
          subtitle={subtitle}
          background={background}
          elevation={elevation}
          sumTotal={
            rank ? sumTopPlayerGameId() : (sumTopPlayerAllGame as number)
          }
          rightContent={rightContent}
        />

        {(isLoading && topPlayerAllGame === undefined) || isFetching ? (
          <div className="custom-scroll mx-[30px] my-3 h-[270px] w-full overflow-y-scroll">
            {[...Array(skeleton)].map((item, index) => (
              <SkeletonTopPlayer
                key={uuid()}
                className={index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"}
              />
            ))}
          </div>
        ) : (
          renderRankContent()
        )}
      </div>
      {note ? (
        <Note
          className="flex justify-center pt-6 uppercase xl:w-[550px] xl:justify-start"
          textTitle={t("top_player_note_title")}
          subTitle={t("top_player_note_subtitle")}
        />
      ) : (
        <></>
      )}
    </Box>
  )
}

export default memo(TopPlayer)
