import React from "react"
import { Box, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import usetournament from "@feature/tournament/containers/hooks/usetournament"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import HowToPlayIcon from "@components/icons/HowToPlayIcon/HowToPlayIcon"

const HowToPlayMobile = () => {
  const { handleOpen, handleClose, openForm } = usetournament()
  const { t } = useTranslation()

  const onCloseModalCustom = () => {
    handleClose()
  }

  return (
    <>
      <HowToPlayIcon
        onClick={handleOpen}
        className="mr-8"
      />
      <ModalCustom
        open={openForm}
        onClose={onCloseModalCustom}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={onCloseModalCustom}
              title={t("how_to_play")}
            />
          </div>
          <Box
            component="div"
            className="hide-scroll flex h-[220px] w-full flex-col overflow-y-scroll"
          >
            <h3 className="font-neue-machina-bold">HOW TO PLAY GOAL RUSH</h3>
            <Box
              component="div"
              className="custom-scroll overflow-y-scroll"
            >
              <p className="mt-2.5 text-sm">{`Featuring an exciting soccer table that puts your aim and skill to the test, this game is the perfect challenge for fans of the beautiful game. With intuitive controls and stunning graphics, you'll feel like you're right there on the pitch, scoring goals and making epic saves.
          `}</p>
              <p className="mt-2.5 text-sm">{`But that's not all - as you progress through the story mode, you'll unlock your favorite teams and players, each with their own unique strengths and abilities. From Argentina to France, you'll travel the world and take on the toughest competition in soccer history.
          `}</p>
              <p className="mt-2.5 text-sm">{`So what are you waiting for? Strap on your boots and get ready to score some goals! With this amazing soccer table game, the only limit is your own skill and determination. So lace up your cleats, grab your ball, and get ready to take on the world like never before!
          `}</p>
            </Box>
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}

export default HowToPlayMobile
