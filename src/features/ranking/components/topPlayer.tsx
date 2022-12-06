import CardBodyList from "@components/organisms/cardBodyList"
import CardTitle from "@components/organisms/cardTitle"
import { Card } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { ButtonLink } from "@components/atoms/buttonLink"
import { getPlayersRanking } from "../containers/services/ranking.service"

const TopPlayer = () => {
  const { data, status, isLoading } = useQuery({
    queryKey: ["topPlayer"],
    queryFn: () => getPlayersRanking("game/ranks-all").then((res) => res)
  })

  return (
    <>
      <Card
        sx={{ background: "#18181C", maxWidth: "449px" }}
        className="rounded-md p-3"
      >
        <CardTitle
          width="433px"
          icon={<AddIcon className="mr-2" />}
          title="Top NAKA Players"
          rightTitle={
            <ButtonLink
              href="/"
              text="View All"
              icon={<AddIcon />}
            />
          }
        />
        {data && status && !isLoading && data !== undefined && (
          <CardBodyList
            width="433px"
            players={data}
          />
        )}
      </Card>
    </>
  )
}

export default memo(TopPlayer)
