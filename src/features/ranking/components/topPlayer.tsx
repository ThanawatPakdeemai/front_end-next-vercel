import IconPlusIcon from "@components/icons/PlusIcon"
import CardBodyList from "@components/organisms/cardBodyList"
import CardTitle from "@components/organisms/cardTitle"
import { Card } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { memo } from "react"
import { getPlayersRanking } from "../containers/services/ranking.service"

function TopPlayer() {
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
          icon={
            <IconPlusIcon.Ori
              width={16}
              height={16}
              className="mr-3"
            />
          }
          title="Top NAKA Players"
          rightTitle={
            <div className="flex cursor-pointer items-center pr-3 font-neue-machina text-sm font-[700] leading-[26px] text-white-primary">
              <IconPlusIcon.Ori
                width={16}
                height={16}
                className="mr-3"
              />
              View All
            </div>
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
