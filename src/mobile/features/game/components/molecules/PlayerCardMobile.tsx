/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { IPropsPlayerMulti } from "@feature/game/components/organisms/SeatPlayersMulti"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import useProfileStore from "@stores/profileStore"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

export const classesWrapper =
  "relative m-auto flex flex-row items-center justify-center overflow-hidden rounded-[8px] pt-[94%]"
export const classesImage =
  "absolute left-0 top-0 h-full w-full rounded-lg object-cover object-center min-h-[70px]"
export const classesActionText =
  "flex h-[16px] items-center justify-center rounded px-1 font-neue-machina text-[8px] text-primary-main absolute top-0 left-0"
export const classesAvatar =
  "rounded-[10px] border-2 bg-neutral-780 p-[5px] w-full"

const PlayerCardMobile = ({ players }: IPropsPlayerMulti) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { t } = useTranslation()
  const { checkTextCard, kickRoom } = useSocketProviderWaiting()

  return (
    <div className="custom-scroll overflow-y-auto">
      <div className="grid w-full grid-cols-4 flex-wrap justify-center gap-3 sm:grid-cols-8">
        {players &&
          players.map((player, index) =>
            player ? (
              <div
                key={player?._id}
                className="relative flex flex-col items-center justify-center gap-1 pt-6"
              >
                <div
                  className={`${classesActionText} ${
                    player.status === "inroom" ? " bg-warning-light" : ""
                  } ${player.status === "ready" ? " bg-green-lemon" : ""} ${
                    player.status === "playing" ? " bg-error-light" : ""
                  } ${player.status === "played" ? "bg-purple-primary" : ""}`}
                >
                  {player?.status || ""}
                </div>
                <div
                  className={`${classesAvatar} ${
                    profile?.id === player.player_id
                      ? "border-secondary-main"
                      : "border-error-main"
                  }`}
                >
                  <div className={classesWrapper}>
                    <Image
                      src={player?.avatar}
                      alt={player?.username}
                      width={45}
                      height={45}
                      className={classesImage}
                    />
                  </div>

                  {player?.rank && (
                    <Image
                      src={`/images/gamePage/rank/${player?.rank}.svg`}
                      alt={player?.username}
                      width={45}
                      height={45}
                      className="absolute right-0 top-0 h-auto w-[35px]"
                    />
                  )}
                </div>
                <div className="player-name">
                  <p className="truncate text-center font-urbanist text-sm font-semibold uppercase text-neutral-300">
                    {player?.username}
                  </p>
                  {checkTextCard && (
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
                  )}
                </div>
              </div>
            ) : (
              <div
                key={Number(index)}
                className="relative pt-6"
              >
                <div className="rounded-[10px] border-2 border-[#18181C] p-[5px]">
                  <div className={classesWrapper}>
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#18181C]">
                      <Image
                        src="/images/home/logoNakaMaster.svg"
                        alt="logoNakaMaster"
                        width={45}
                        height={45}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default PlayerCardMobile
