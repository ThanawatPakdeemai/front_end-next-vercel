import CardBodyList from "@feature/ranking/components/organisms/cardBodyList"
import CardTitle from "@components/organisms/cardTitle"
import { Card } from "@mui/material"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { ButtonLink } from "@components/atoms/buttonLink"
import CircleIcon from "@components/icons/CircleIcon"
import { useTopPlayer } from "../../containers/hook/useTopPlayer"

const TopPlayer = () => {
  const { topPlayerAllGame } = useTopPlayer()

  return (
    <>
      <Card
        sx={{ background: "#18181C", maxWidth: "449px" }}
        className="rounded-md p-3"
      >
        <CardTitle
          width="433px"
          icon={<CircleIcon.Ori className="mr-2" />}
          title="Top NAKA Players"
          rightTitle={
            <ButtonLink
              href="/"
              text="View All"
              icon={<AddIcon />}
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
