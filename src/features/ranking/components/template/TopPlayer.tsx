import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import useTopPlayer from "@feature/ranking/containers/hook/useTopPlayer"
import { v4 as uuid } from "uuid"
import SkeletonTopPlayer from "@components/atoms/skeleton/SkeletonTopPlayer"
import CardBodyList from "../organisms/CardBodyList"

const TopPlayer = () => {
  const { topPlayerAllGame, isLoading } = useTopPlayer()
  const skeleton = 10

  return (
    <>
      <Card
        sx={{ maxWidth: "449px" }}
        className="!md:h-[465px] rounded-md !bg-neutral-800 !p-2"
      >
        <CardTitle
          width="433px"
          icon={<TrackChangesIcon className="mr-2" />}
          title="Top NAKA Players"
          rightTitle={
            <ButtonLink
              href="/"
              text="View All"
              icon={<AddIcon />}
              color="secondary"
              size="small"
              className="button-global button-transparent"
            />
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
    </>
  )
}

export default memo(TopPlayer)
