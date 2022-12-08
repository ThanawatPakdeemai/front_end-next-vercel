import CardBodyList from "@feature/ranking/components/organisms/cardBodyList"
import CardTitle from "@components/organisms/cardTitle"
import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { ButtonLink } from "@components/atoms/buttonLink"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import { useTopPlayer } from "../../containers/hook/useTopPlayer"

const TopPlayer = () => {
  const { topPlayerAllGame } = useTopPlayer()

  return (
    <>
      <Card
        sx={{ maxWidth: "449px" }}
        className="rounded-md bg-grey-A100 p-2"
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
            />
          }
        />
        {topPlayerAllGame && (
          <CardBodyList
            width="433px"
            players={topPlayerAllGame}
          />
        )}
      </Card>
    </>
  )
}

export default memo(TopPlayer)
