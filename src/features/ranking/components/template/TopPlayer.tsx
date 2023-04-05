import { Card } from "@mui/material"
import { memo } from "react"
// import AddIcon from "@mui/icons-material/Add"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
// import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import useTopPlayer from "@feature/ranking/containers/hook/useTopPlayer"
import { v4 as uuid } from "uuid"
import SkeletonTopPlayer from "@components/atoms/skeleton/SkeletonTopPlayer"
// import Dropdown from "@components/atoms/DropdownCustom"
import Note from "@components/molecules/Note"
import CardRank from "@components/organisms/CardRank"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { useTranslation } from "react-i18next"
import CardBodyList from "../molecules/CardBodyList"

export interface IPlayer {
  element?: "button" | "select"
  className?: string
  rank?: boolean
  note?: boolean
  subtitle?: boolean
  elevation?: number
  background?: "purple" | "red" | "neutral"
  topPlayerGameId?: IPlayerRanking[]
}

const TopPlayer = ({
  // element = "button",
  className,
  rank,
  note = false,
  subtitle,
  elevation,
  background,
  topPlayerGameId
}: IPlayer) => {
  const { topPlayerAllGame, isLoading } = useTopPlayer()
  const skeleton = 10
  const { t } = useTranslation()

  const sumTopPlayerGameId =
    topPlayerGameId &&
    topPlayerGameId.reduce((_acc, _curr) => _acc + _curr.naka_earn, 0)

  const sumTopPlayerAllGame =
    topPlayerAllGame &&
    topPlayerAllGame.reduce((_acc, curr) => _acc + curr.naka_earn, 0)

  return (
    <div className="flex w-full flex-col">
      <Card
        sx={{ maxWidth: "550px" }}
        className={`${className} flex h-full flex-wrap rounded-md !p-2 lg:h-auto`}
      >
        <CardTitle
          width="534px"
          icon={<TrackChangesIcon className="mr-2" />}
          title={t("top_naka_player")}
          subtitle={subtitle}
          background={background}
          elevation={elevation}
          sumTotal={
            rank
              ? (sumTopPlayerGameId as number)
              : (sumTopPlayerAllGame as number)
          }
          // rightTitle={
          //   element === "button" ? (
          //     <ButtonLink
          //       href="/"
          //       text="View All"
          //       icon={<AddIcon />}
          //       color="secondary"
          //       size="small"
          //       className="button-global button-transparent"
          //     />
          //   ) : (
          //     <Dropdown
          //       title="Currently Week"
          //       className=""
          //     />
          //   )
          // }
        />
        {isLoading && topPlayerAllGame === undefined ? (
          <div className="custom-scroll h-[375px] w-full overflow-y-scroll pr-4">
            {[...Array(skeleton)].map((item, index) => (
              <SkeletonTopPlayer
                key={uuid()}
                className={index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"}
              />
            ))}
          </div>
        ) : (
          <div className="ml-auto w-full sm:flex-[0_0_100%] lg:mt-auto lg:ml-0 lg:flex-none">
            {rank
              ? topPlayerGameId && (
                  <CardRank topPlayerGameId={topPlayerGameId} />
                )
              : topPlayerAllGame && (
                  <CardBodyList
                    width="433px"
                    players={topPlayerAllGame}
                  />
                )}
          </div>
        )}
      </Card>
      {note ? (
        <Note
          className="flex justify-center pt-6 uppercase xl:w-[550px] xl:justify-start"
          textTitle={t("top_player_note_title")}
          subTitle={t("top_player_note_subtitle")}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default memo(TopPlayer)
