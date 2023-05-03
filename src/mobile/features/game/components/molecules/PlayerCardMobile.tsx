/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Image } from "@components/atoms/image"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import useProfileStore from "@stores/profileStore"
import { useTranslation } from "next-i18next"

interface IProps {
  players: CurrentPlayer[]
}

const PlayerCardMobile = ({ players }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { t } = useTranslation()
  const { checkTextCard, kickRoom } = useSocketProviderWaiting()
  // const { checkTextCard } = useWaitingMulti()
  return (
    <>
      <div className=" custom-scroll grid w-full grid-cols-4 flex-wrap items-center justify-center overflow-y-auto px-[20px]">
        {players &&
          players.map((player: CurrentPlayer, index) =>
            player ? (
              <div
                key={player?._id}
                className="relative pt-3"
              >
                <div
                  className={` m-auto flex h-[59px] w-[59px] flex-row items-center justify-center rounded-[8px] border-2 ${
                    profile?.id === player.player_id
                      ? "border-secondary-main"
                      : "border-error-main"
                  } bg-neutral-780 p-[3px]`}
                >
                  <Image
                    src={player?.avatar}
                    alt={player?.username}
                    width={45}
                    height={45}
                    className="h-auto w-full rounded-[8px]"
                  />
                  {player?.rank && (
                    <Image
                      src={`/images/gamePage/rank/${player?.rank}.svg`}
                      alt={player?.username}
                      width={45}
                      height={45}
                      className="absolute right-0 top-0 h-auto w-[35px]"
                    />
                  )}

                  <div
                    className={`${
                      player.status === "inroom" ? " bg-warning-light" : ""
                    } ${player.status === "ready" ? " bg-green-lemon" : ""} ${
                      player.status === "playing" ? " bg-error-light" : ""
                    } absolute bottom-[55px] flex h-[16px] items-center justify-center rounded bg-info-main px-1 font-neue-machina text-[8px] uppercase  text-primary-main`}
                  >
                    {player?.status || ""}
                  </div>
                </div>
                <div className="m-auto mb-1 mt-3 h-8 w-[55px]">
                  <p className=" truncate text-center text-sm uppercase text-neutral-300">
                    {player?.username}
                  </p>
                  <p
                    className={`${
                      profile && profile?.id === player?.player_id
                        ? " text-secondary-main "
                        : " text-error-main "
                    } truncate  text-center text-xs uppercase `}
                  >
                    {checkTextCard(player as CurrentPlayer) === "kick" ? (
                      <button
                        role="button"
                        className={`${" cursor-pointer"}  uppercase`}
                        onClick={() => {
                          kickRoom(player.player_id)
                        }}
                      >
                        {t("kick")}
                      </button>
                    ) : (
                      t(checkTextCard(player as CurrentPlayer))
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={Number(index)}
                className="pt-3"
              >
                <div className=" m-auto flex h-[59px]  w-[59px] items-center justify-center rounded-[8px] border-2 border-neutral-780 p-[3px] ">
                  <div className=" flex h-full w-full items-center justify-center rounded-[8px] bg-neutral-780">
                    <Image
                      src="/images/home/logoNakaMaster.svg"
                      alt="logoNakaMaster"
                      width={29}
                      height={22}
                    />
                  </div>
                </div>
                <div className="mb-1 mt-3 h-8" />
              </div>
            )
          )}
      </div>
    </>
  )
}

export default PlayerCardMobile
