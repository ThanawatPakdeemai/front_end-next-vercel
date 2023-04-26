/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import ButtonTournament from "@components/atoms/button/ButtonTournament"
import ButtonTournamentRegister from "@components/atoms/button/ButtonTournamentRegister"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import usetournament from "@feature/tournament/containers/hooks/usetournament"
import { Box, Stack } from "@mui/material"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import { useTranslation } from "react-i18next"

const TournamentRegister = () => {
  const time: boolean = true
  const { handleClose, handleOpen, openForm } = usetournament()
  const [readed, setReaded] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  // When user scroll
  // const listInnerRef = useRef<HTMLDivElement>(null)

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
  //     const hScroll = scrollHeight - 900
  //     // scrollHeight
  //     if (scrollTop + clientHeight >= hScroll) {
  //       setReaded(true)
  //     } else {
  //       setReaded(false)
  //     }
  //   }
  // }

  const handleOverlayDismiss = () => {
    setIsOpen((prev: boolean) => !prev)
    setReaded(false)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="flex h-auto w-full rounded-[19px] border-neutral-780 bg-neutral-800">
      <div className="m-2 w-full">
        <ButtonTournament time={time} />
        <div className="my-6 text-sm">
          <div className="my-4 flex  w-full items-baseline border-b-2 border-neutral-950 ">
            <div className="rounded-[10px] border-2   border-neutral-600 bg-neutral-800 px-2 py-[4px]">
              <CloseOutlinedIcon className="text-sm" />
            </div>
            <div className="mb-2 ml-4 rounded-[9px]  border-2   border-neutral-700 bg-neutral-900 px-2  py-[4px] text-neutral-400">
              <p className="uppercase ">Need 20 Tickets</p>
            </div>
          </div>
          <div className="my-2 flex  w-full items-baseline border-b-2 border-neutral-950 ">
            <div className="rounded-[10px] border-2   border-neutral-600 bg-neutral-800 px-2 py-[4px]">
              <CloseOutlinedIcon className="text-sm" />
            </div>
            <div className="mb-2 ml-4 rounded-[9px]  border-2   border-neutral-700 bg-neutral-900 px-2  py-[4px] text-neutral-400">
              <p className="uppercase ">
                5 transaction at any games in our system
              </p>
            </div>
          </div>
          <div className="my-2 flex  w-full items-baseline border-b-2 border-neutral-950 ">
            <div className="rounded-[10px] border-2   border-green-lemon bg-neutral-800 px-2 py-[4px] ">
              <CheckOutlinedIcon className="text-sm text-green-lemon" />
            </div>
            <div className="mb-2 ml-4 rounded-[9px]  border-2   border-neutral-700 bg-green-lemon px-2  py-[4px] text-black-100">
              <p className="uppercase ">Separate group by time zone</p>
            </div>
          </div>
          <div className="my-2 flex  w-full items-baseline border-b-2 border-neutral-950 ">
            <div className="rounded-[10px] border-2   border-neutral-600 bg-neutral-800 px-2 py-[4px]">
              <CloseOutlinedIcon className="text-sm" />
            </div>
            <div className="mb-2 ml-4 rounded-[9px]  border-2   border-neutral-700 bg-neutral-900 px-2  py-[4px] text-neutral-400">
              <p className="uppercase ">Each zone can see only their rooms</p>
            </div>
          </div>
        </div>
        <ButtonTournamentRegister
          time={time}
          handleButton={handleOpen}
        />
        <ModalCustom
          open={openForm}
          onClose={handleClose}
          className="h-[200px] min-w-[515px] gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
              <ModalHeader
                handleClose={handleClose}
                title="Tournament Terms & Conditions"
              />
            </div>
            <Box
              component="div"
              className="hide-scroll flex h-[580px] w-full flex-col overflow-y-scroll "
            >
              <div className="relative my-2 flex flex-col overflow-hidden rounded-2xl bg-primary-main  p-2 sm:m-0">
                <div className="panel-content relative h-[400px]">
                  <div className="custom-scroll h-[90%] overflow-y-scroll pr-4">
                    <p className="bg-primary-main  py-2 text-start text-sm text-neutral-500 lg:px-6">
                      We all live in an age that belongs to the young at heart.
                      Life that is becoming extremely fast, day to day, also
                      asks us to remain physically young. Young at heart, young
                      in mind and young in your body has become the principle of
                      survival. Yet our age increases with every day of our
                      life. The fast pace of the world around us in fact makes
                      us age faster. But, it is important to retain our youthful
                      vigor, for it is only with young passion and energy that
                      we can work towards success, enjoy a peaceful, healthy
                      life, indulge ourselves in the pleasure of sex, and keep
                      ourselves happy. How to remain young forever? How to defy
                      your age? How to retain the youthful joy? How to remain
                      passionate and energetic. Here I outline six steps to keep
                      you young forever – steps, if you follow regularly will
                      ensure you remain young at heart, young in mind, and young
                      in your body. Step One: Imagine yourself leading a life
                      that is youthful and vigorous. Picture yourself in various
                      situations that the young indulge in. It can be a wild
                      night in the disco, a wild game of football, romancing
                      with the person you love – it can be anything. Just
                      concentrate yourself in youthful action. Step Two: The
                      picture you create for yourself should produce the
                      specific effects that you have in your mind. That is, if
                      you think you are becoming old and falling behind times,
                      then enjoy a dance in the disco that keeps you up with
                      time with youthfulness. If you are old and wrinkled and
                      want to look young, picture yourself with smooth, supple,
                      wrinkle-free skin. Step Three: Picture yourself as
                      extremely alert, athletic and youthful. Imagine yourself
                      in movements that you performed as freely as when you were
                      a teenager. This is a very important visual. Practice it
                      at least twice a week for an indefinite period. Your aim
                      is to preserve your body by using the power of creative
                      visualization. Thus, this is a lifetime program aimed to
                      evoke your youthful vigor always, anytime, anywhere. Step
                      Four: If you are suffering from any old-age disease,
                      incorporate the visuals from How to lead a healthy life,
                      with the steps outlined here. You will see a marked
                      improvement in your health. Step Five: Bring together all
                      your senses – Sight, Sound, Smell, Taste and Touch. Direct
                      your mind to improve each of them. Imagine yourself
                      pictures of yourself where you hear more, taste better,
                      see well, smell proper and become sensual to touch.
                      Practice them at least once every two days. You will see
                      your awareness is functioning better than all who are of
                      your age. Step Six: Visualize yourself in a sea of endless
                      energy. The water is warm and comfortable. The sky is
                      bright and sunny. Swim through the refreshing water. Enjoy
                      the swim. Stretch your legs; push through the water, as
                      the energy envelops you. Come out of the water and dry
                      yourself with a large, soft towel. You are refreshingly
                      young now. You are filled to the brim with energy. You
                      also feel that the energy in you has changed your body and
                      bones. All aches and pain of old age has disappeared. You
                      are a new man now. You are young, energetic with a
                      passionate vigor in you. You are young in mind, body and
                      spirit. Enjoy your youth.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-780/0 to-primary-main" />
                </div>
              </div>
              <div className="my-4 flex flex-col items-center justify-center text-center">
                <div
                  className={`flex items-baseline ${readed ? `checked` : ""}`}
                >
                  <label className="checkbox bounce">
                    <input
                      type="checkbox"
                      className="outline outline-2 outline-offset-2"
                      onChange={() => {
                        readed ? setReaded(false) : setReaded(true)
                      }}
                      disabled
                      checked={readed}
                    />
                  </label>
                  <p className="text-sm">{t("nakamoto_games_newsletter")}</p>
                </div>
                <div className="my-4 grid w-full grid-cols-2 gap-4">
                  <button
                    // variant="link"
                    className="mb-4   flex w-full items-center justify-center rounded-full border-2 border-neutral-700
            bg-black-100 px-4 py-2 text-center  text-sm text-neutral-300  hover:rotate-0"
                    type="button"
                    onClick={handleOverlayDismiss}
                  >
                    DECLINE
                  </button>
                  <button
                    disabled={!readed}
                    id="accept"
                    className="mb-4 flex w-full
            items-center justify-center  rounded-full bg-secondary-main px-4 py-2
             text-center  text-sm text-neutral-300  hover:rotate-0"
                    type="button"
                    // onClick={onHandleRegister}
                  >
                    ACCEPT
                  </button>
                </div>
              </div>
            </Box>
          </Stack>
        </ModalCustom>
        {!time && (
          <button
            type="button"
            className="mb-4 flex w-full items-center
            justify-center rounded-full border-2  border-black-200 bg-black-700 p-4 text-center text-neutral-300   hover:rotate-0"
          >
            <RemoveRedEyeOutlinedIcon />
            <p className="ml-4 uppercase">View Tournament</p>
          </button>
        )}
      </div>
    </div>
  )
}
export default TournamentRegister
