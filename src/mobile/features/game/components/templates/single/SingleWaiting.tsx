// import PlayerCard from "@feature/game/components/molecules/PlayerCard"
import ButtonGame from "@src/mobile/features/game/components/atoms/ButtonGame"
import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import PlayerCardMobile from "@src/mobile/features/game/components/molecules/PlayerCardMobile"
import { useTranslation } from "react-i18next"
import WaitingSkeleton from "@mobile/components/atoms/skelaton/WaitingSkeleton"
import { Box } from "@mui/material"

const SingleWaiting = () => {
  const { t } = useTranslation()
  const { gameData, playersMap, onPlayGame, playersMe, loadingPlayer } =
    useWaitingSingle()

  return (
    <Box
      component="div"
      className="waiting-room__wrapper"
      sx={{
        "& .waiting-room__content": {
          ".game-play-button": {
            maxWidth: "380px",
            marginLeft: "auto",
            "& > div": {
              width: "100%",
              background: "#18181C",
              border: "0.7px solid #35383F",
              borderRadius: "76px",
              padding: "10px",
              "& > .btn-icon-container": {
                margin: "0",
                background: "#F32429!important",
                "circle": {
                  fill: "#F2C94C!important"
                }
              },
              ".MuiTypography-root": {
                fontSize: "10px",
                width: "calc(100% - 140px)",
                fontFamily: "Urbanist",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                margin: "0"
              },
              ".text-button": {
                ".MuiTypography-root": {
                  fontSize: "16px!important"
                }
              }
            }
          }
        }
      }}
    >
      {!loadingPlayer ? (
        <>
          {gameData && playersMap && (
            <Box
              component="div"
              className="waiting-room__content flex flex-col gap-6 font-urbanist"
            >
              <PlayerCardMobile
                players={playersMap as unknown[] as CurrentPlayer[]}
              />
              <div className="game-play-button">
                {playersMe && (
                  <ButtonGame
                    textButton={t("start")}
                    url=""
                    onClick={onPlayGame}
                    textColor="text-green-lemon"
                    classCssButton="!mt-0 !bg-green-lemon h-[40px] !w-[105px]"
                    description="Everyone's here and we're ready to go. Let's start the game!"
                  />
                )}
              </div>
            </Box>
          )}
        </>
      ) : (
        <WaitingSkeleton />
      )}
    </Box>
  )
}

export default SingleWaiting
