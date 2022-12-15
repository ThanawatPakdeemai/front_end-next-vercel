import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CardTitle from "@components/organisms/CardTitle"
import { useTopPlayer } from "../../containers/hook/useTopPlayer"
import CardBodyList from "../organisms/CardBodyList"

const TopPlayer = () => {
  const { topPlayerAllGame } = useTopPlayer()

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
