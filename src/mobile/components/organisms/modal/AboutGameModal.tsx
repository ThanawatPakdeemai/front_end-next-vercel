import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { IGame } from "@feature/game/interfaces/IGameService"

interface IAboutGameModalProps {
  open: boolean
  setOpenAboutGame: React.Dispatch<React.SetStateAction<boolean>>
  gameData: IGame
}

const AboutGameModal = ({
  open,
  setOpenAboutGame,
  gameData
}: IAboutGameModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()

  const classesGridItem = "about-section__grid--item"
  const classesGridTitle =
    "about-section__grid--item--title font-urbanist text-[18px] font-bold"
  const classesGridContent = "about-section__grid--item--content"

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenAboutGame(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenAboutGame(true)
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={StyleDrawer}
    >
      <Box
        component="div"
        className="setting-list flex h-full flex-col p-[8px_24px_36px] font-urbanist text-white-primary"
        sx={{
          "h2": {
            lineHeight: "1",
            alignItems: "flex-start"
          }
        }}
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
          onClick={() => setOpenAboutGame(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          About this Game
        </h2>
        <div className="flex flex-col gap-2">
          <div className="about-section about-section__description mb-6 border-b-[1px] border-b-[#35383F] pb-6">
            <div
              dangerouslySetInnerHTML={{
                __html: gameData.story || ""
              }}
            />
          </div>
          <div className="about-section about-section__how-to-play mb-6 grid grid-cols-1 gap-1 border-b-[1px] border-b-[#35383F] pb-6">
            <h3 className={classesGridTitle}>How to play</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: gameData?.howto?.details || ""
              }}
            />
          </div>
          <div className="about-section about-section__grid">
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className={classesGridItem}>
                  <h3 className={classesGridTitle}>Version</h3>
                  <div className={classesGridContent}>{gameData.version}</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className={classesGridItem}>
                  <h3 className={classesGridTitle}>Developer</h3>
                  <div className={classesGridContent}>{gameData.developer}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </SwipeableDrawer>
  )
}
export default AboutGameModal
