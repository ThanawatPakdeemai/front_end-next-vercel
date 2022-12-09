import CardBodyList from "@feature/ranking/components/organisms/CardBodyList"
import CardTitle from "@components/organisms/cardTitle"
import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ButtonLink from "@components/atoms/button/ButtonLink"
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
              size="small"
              className="button-global button-transparent"
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
