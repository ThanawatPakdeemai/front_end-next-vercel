import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import useTopPlayer from "@feature/ranking/containers/hook/useTopPlayer"
import { v4 as uuid } from "uuid"
import SkeletonTopPlayer from "@components/atoms/skeleton/SkeletonTopPlayer"
import Dropdown from "@components/atoms/DropdownCustom"
import Note from "@components/molecules/Note"
import CardBodyList from "../organisms/CardBodyList"

export interface IPlayer {
  element?: "button" | "select"
  className?: string
  rank?: boolean
  note?: boolean
  subtitle?: boolean
  elevation?: number
  background?: "purple" | "red" | "neutral"
}

const TopPlayer = ({
  element = "button",
  className,
  rank,
  note = false,
  subtitle,
  elevation,
  background
}: IPlayer) => {
  const { topPlayerAllGame, isLoading } = useTopPlayer()
  const skeleton = 10

  return (
    <>
      <Card
        sx={{ maxWidth: "550px" }}
        className={`${className} rounded-md !p-2`}
      >
        <CardTitle
          width="534px"
          icon={<TrackChangesIcon className="mr-2" />}
          title="Top NAKA Players"
          subtitle={subtitle}
          background={background}
          elevation={elevation}
          rightTitle={
            element === "button" ? (
              <ButtonLink
                href="/"
                text="View All"
                icon={<AddIcon />}
                color="secondary"
                size="small"
                className="button-global button-transparent"
              />
            ) : (
              <Dropdown
                title="Currently Week"
                className=""
              />
            )
          }
        />
        {isLoading ? (
          <div className="custom-scroll h-[375px] overflow-y-scroll pr-4">
            {[...Array(skeleton)].map((item, index) => (
              <SkeletonTopPlayer
                key={uuid()}
                className={index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"}
              />
            ))}
          </div>
        ) : (
          topPlayerAllGame && (
            <CardBodyList
              width="433px"
              players={topPlayerAllGame}
            />
          )
        )}
      </Card>
      {note ? (
        <Note
          className="flex  w-[550px] uppercase"
          textTitle=" System will distribute these rewards every Sunday 0:00 UTC and reset
        Tier (Bronze, Silver, Gold, Platinum)"
          subTitle=" Rank 1st - 10th from totals score."
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default memo(TopPlayer)
